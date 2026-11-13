import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, extname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const distRoot = join(projectRoot, "dist");
const siteOrigin = "https://minibili.zhaohe.org";
const errors = [];

if (!existsSync(distRoot)) {
	console.error("GEO check failed: dist/ does not exist. Run npm run build first.");
	process.exit(1);
}

const walk = (directory) => readdirSync(directory).flatMap((entry) => {
	const file = join(directory, entry);
	return statSync(file).isDirectory() ? walk(file) : [file];
});

const htmlFiles = walk(distRoot).filter((file) => extname(file) === ".html");
const pages = new Map();

// 同源 URL 必须能在 dist/ 中找到对应文件；站外 URL 不检查
const resolvesInDist = (value) => {
	if (!value.startsWith(`${siteOrigin}/`)) return true;
	const pathname = decodeURIComponent(new URL(value).pathname);
	return [join(distRoot, pathname), join(distRoot, pathname, "index.html")].some(existsSync);
};

const extractAttribute = (tag, attribute) => {
	const match = tag.match(new RegExp(`${attribute}=["']([^"']+)["']`, "i"));
	return match?.[1];
};

for (const file of htmlFiles) {
	const html = readFileSync(file, "utf8");
	const canonicalTag = html.match(/<link[^>]+rel=["']canonical["'][^>]*>/i)?.[0];
	const canonical = canonicalTag && extractAttribute(canonicalTag, "href");
	if (!canonical) {
		errors.push(`${relative(projectRoot, file)} has no canonical URL`);
		continue;
	}

	pages.set(canonical, { file, html });

	for (const match of html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
		let data;
		try {
			data = JSON.parse(match[1]);
		} catch (error) {
			errors.push(`${relative(projectRoot, file)} contains invalid JSON-LD: ${error.message}`);
			continue;
		}

		const graphIds = new Set();
		for (const node of data["@graph"] ?? []) {
			if (!node["@id"]) continue;
			if (graphIds.has(node["@id"])) {
				errors.push(`${relative(projectRoot, file)} defines JSON-LD @id more than once: ${node["@id"]}`);
			}
			graphIds.add(node["@id"]);
		}

		const checkSameOriginResource = (value) => {
			if (typeof value !== "string" || resolvesInDist(value)) return;
			errors.push(`${relative(projectRoot, file)} references missing same-origin resource ${value}`);
		};

		const visit = (value, key = "") => {
			if (typeof value === "string") {
				if (/^(?:image|logo|screenshot|contentUrl|thumbnailUrl)$/i.test(key)) checkSameOriginResource(value);
				return;
			}
			if (Array.isArray(value)) return value.forEach((item) => visit(item, key));
			if (value && typeof value === "object") {
				if (value["@type"] === "ImageObject") checkSameOriginResource(value.url);
				for (const [childKey, childValue] of Object.entries(value)) visit(childValue, childKey);
			}
		};
		visit(data);
	}
}

const sitemapIndex = readFileSync(join(distRoot, "sitemap-index.xml"), "utf8");
const sitemapNames = [...sitemapIndex.matchAll(/<loc>[^<]*\/([^/]+\.xml)<\/loc>/g)].map((match) => match[1]);
const sitemapUrls = sitemapNames.flatMap((name) => {
	const xml = readFileSync(join(distRoot, name), "utf8");
	return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
});

for (const url of sitemapUrls) {
	if (!pages.has(url)) errors.push(`sitemap URL does not match any canonical URL: ${url}`);
}

for (const [canonical, { file, html }] of pages) {
	if (/<meta[^>]+name=["']robots["'][^>]+content=["']noindex/i.test(html)) continue;
	if (!sitemapUrls.includes(canonical)) {
		errors.push(`${relative(projectRoot, file)} canonical is missing from sitemap: ${canonical}`);
	}

	for (const tag of html.matchAll(/<link[^>]+rel=["']alternate["'][^>]*hreflang=["'][^"']+["'][^>]*>/gi)) {
		const href = extractAttribute(tag[0], "href");
		if (href && !pages.has(href)) {
			errors.push(`${relative(projectRoot, file)} hreflang does not match a canonical URL: ${href}`);
		}
	}
}

for (const [, { file, html }] of pages) {
	// 隐私政策与服务条款按语言各有一个 <h1>，所以只要求至少一个
	if (!/<h1[\s>]/i.test(html)) errors.push(`${relative(projectRoot, file)} has no <h1>`);

	const ids = [...html.matchAll(/\sid=["']([^"']+)["']/g)].map((match) => match[1]);
	const duplicateIds = [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];
	if (duplicateIds.length > 0) {
		errors.push(`${relative(projectRoot, file)} has duplicate element ids: ${duplicateIds.join(", ")}`);
	}
}

// llms.txt 由配置生成，需与 RSS 中的最新版本保持一致，并符合 llmstxt.org 的格式
// Lighthouse 的 Agentic Browsing 审计要求：有 H1、长度超过 50 个字符、至少有一个 Markdown 链接
const latestBuild = readFileSync(join(distRoot, "rss.xml"), "utf8").match(/<item><title>[^<]*Build (\d+)<\/title>/)?.[1];
const markdownLink = /\[[^\]\n]+\]\((https?:\/\/[^)\s]+)\)/g;
for (const name of ["llms.txt", "llms-full.txt"]) {
	const file = join(distRoot, name);
	if (!existsSync(file)) {
		errors.push(`${name} is missing`);
		continue;
	}

	const text = readFileSync(file, "utf8");
	if (latestBuild && !text.includes(`Build ${latestBuild}`)) {
		errors.push(`${name} does not mention the latest build ${latestBuild}`);
	}
	if (!/^# \S/.test(text)) errors.push(`${name} must start with an H1 title`);
	if (!/^> \S/m.test(text)) errors.push(`${name} has no blockquote summary`);
	if (text.length <= 50) errors.push(`${name} is too short`);

	const links = [...text.matchAll(markdownLink)].map((match) => match[1]);
	if (links.length === 0) errors.push(`${name} contains no Markdown links`);
	for (const url of links) {
		if (!resolvesInDist(url)) errors.push(`${name} links to a missing page: ${url}`);
	}

	// 裸 URL 不会被当作链接解析，必须写成 [名称](URL)
	const bareUrls = text.replace(markdownLink, "").match(/https?:\/\/[^\s)|，。）]+/g) ?? [];
	for (const url of bareUrls) errors.push(`${name} contains a bare URL, use [name](url) instead: ${url}`);
}

// llms.txt 的 H2 段落只放链接列表
const llmsIndex = join(distRoot, "llms.txt");
if (existsSync(llmsIndex)) {
	for (const section of readFileSync(llmsIndex, "utf8").split(/^## /m).slice(1)) {
		const [heading, ...lines] = section.split("\n").filter((line) => line.trim());
		if (lines.length === 0) errors.push(`llms.txt section "${heading}" is empty`);
		for (const line of lines) {
			if (!/^- \[[^\]]+\]\(https?:\/\/[^)\s]+\)/.test(line)) {
				errors.push(`llms.txt section "${heading}" has a line that is not a Markdown link item: ${line}`);
			}
		}
	}
}

const notFoundHtml = readFileSync(join(distRoot, "404.html"), "utf8");
if (!/<meta[^>]+name=["']robots["'][^>]+content=["']noindex, follow["']/i.test(notFoundHtml)) {
	errors.push("dist/404.html must contain robots noindex, follow");
}

const robots = readFileSync(join(distRoot, "robots.txt"), "utf8");
if (!/User-agent:\s*\*[\s\S]*Allow:\s*\//i.test(robots)) {
	errors.push("robots.txt must allow public crawling");
}
if (!robots.includes("Sitemap: https://minibili.zhaohe.org/sitemap-index.xml")) {
	errors.push("robots.txt must reference the sitemap index");
}

if (errors.length > 0) {
	console.error(`GEO check failed with ${errors.length} issue(s):`);
	for (const error of errors) console.error(`- ${error}`);
	process.exit(1);
}

console.log(`GEO check passed: ${pages.size} pages, ${sitemapUrls.length} sitemap URLs, valid JSON-LD and internal resources.`);
