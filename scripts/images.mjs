// 为 public/screenshots 下的截图生成多尺寸 WebP，输出到 public/_img（已加入 .gitignore）
// 由 astro.config.mjs 中的集成在 dev / build 前自动调用，也可以单独运行：node scripts/images.mjs
import { existsSync, mkdirSync, readdirSync, statSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

export const IMAGE_WIDTHS = [320, 640, 960, 1440];

const projectRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const publicRoot = join(projectRoot, "public");
const sourceDirectories = ["screenshots"];

// "/screenshots/iphone/home.webp", 640 -> "/_img/screenshots/iphone/home-640.webp"
export const variantPath = (src, width) => `/_img${src.replace(/\.webp$/, "")}-${width}.webp`;

const walk = (directory) =>
	readdirSync(directory).flatMap((entry) => {
		const file = join(directory, entry);
		return statSync(file).isDirectory() ? walk(file) : [file];
	});

export async function generateResponsiveImages({ log = console.log } = {}) {
	let generated = 0;
	for (const directory of sourceDirectories) {
		const root = join(publicRoot, directory);
		if (!existsSync(root)) continue;

		for (const file of walk(root).filter((path) => path.endsWith(".webp"))) {
			const src = `/${relative(publicRoot, file).split("\\").join("/")}`;
			const sourceTime = statSync(file).mtimeMs;
			const { width } = await sharp(file).metadata();

			for (const targetWidth of IMAGE_WIDTHS.filter((candidate) => candidate < width)) {
				const output = join(publicRoot, variantPath(src, targetWidth));
				if (existsSync(output) && statSync(output).mtimeMs >= sourceTime) continue;
				mkdirSync(dirname(output), { recursive: true });
				await sharp(file).resize({ width: targetWidth }).webp({ quality: 78, effort: 5 }).toFile(output);
				generated += 1;
			}
		}
	}
	if (generated > 0) log(`[images] generated ${generated} responsive image(s) in public/_img`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
	await generateResponsiveImages();
}
