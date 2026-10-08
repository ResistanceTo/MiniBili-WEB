import { join } from "node:path";
import sharp from "sharp";
import { IMAGE_WIDTHS, variantPath } from "../../scripts/images.mjs";

export interface ResponsiveImage {
	src: string;
	srcset: string;
	width: number;
	height: number;
	original: string;
}

const cache = new Map<string, Promise<ResponsiveImage>>();

// 读取 public 中原图的尺寸，并拼出 scripts/images.mjs 生成的多尺寸 srcset
export const getResponsiveImage = (src: string): Promise<ResponsiveImage> => {
	if (!cache.has(src)) {
		cache.set(
			src,
			sharp(join(process.cwd(), "public", src))
				.metadata()
				.then(({ width = 0, height = 0 }) => {
					const widths = (IMAGE_WIDTHS as number[]).filter((candidate) => candidate < width);
					const srcset = [
						...widths.map((candidate) => `${variantPath(src, candidate)} ${candidate}w`),
						`${src} ${width}w`,
					].join(", ");
					const fallback = widths.find((candidate) => candidate >= 640);
					return {
						src: fallback ? variantPath(src, fallback) : src,
						srcset,
						width,
						height,
						original: src,
					};
				}),
		);
	}
	return cache.get(src)!;
};
