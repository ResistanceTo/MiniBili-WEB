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
			if (typeof value !== "string" || !value.startsWith(`${siteOrigin}/`)) return;
			const pathname = new URL(value).pathname;
			const candidates = [join(distRoot, pathname), join(distRoot, pathname, "index.html")];
			if (!candidates.some(existsSync)) {
				errors.push(`${relative(projectRoot, file)} references missing same-origin resource ${value}`);
			}
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
