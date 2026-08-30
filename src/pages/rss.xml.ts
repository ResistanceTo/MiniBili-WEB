import type { APIContext } from "astro";
import { changelog } from "../config/changelog";
import type {
	ChangelogEntry,
	ChangelogUpdates,
	ChangelogVersion,
} from "../config/types";

const updateGroups: {
	key: keyof ChangelogUpdates;
	label: string;
}[] = [
	{ key: "feature", label: "新功能" },
	{ key: "improvement", label: "优化改进" },
	{ key: "bugfix", label: "问题修复" },
];

const feedTitle = "MiniBili 更新日志";
const feedDescription = "订阅 MiniBili 的新功能、体验改进和问题修复。";

const entryText = (entry: string | ChangelogEntry) =>
	typeof entry === "string" ? entry : entry.text;

const escapeMarkup = (value: string) =>
	value
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replaceAll('"', "&quot;")
		.replaceAll("'", "&#039;");

const asCdata = (value: string) =>
	`<![CDATA[${value.replaceAll("]]>", "]]]]><![CDATA[>")}]]>`;

const getAllEntries = (updates: ChangelogUpdates) =>
	updateGroups.flatMap(({ key }) => updates[key] ?? []);

const getReleaseLink = (item: ChangelogVersion) => {
	const releaseId = encodeURIComponent(
		[
			item.date,
			item.build,
			item.version,
			...(item.platforms ?? ["iOS"]),
		].join("-"),
	);

	return `/changelog/?release=${releaseId}#${item.build}`;
};

const getDescription = ({ title, updates }: ChangelogVersion) => {
	const entries = getAllEntries(updates).map(entryText);
	const preview = entries.slice(0, 3).join("；");
	const suffix = entries.length > 3 ? `等 ${entries.length} 项更新` : "";

	return [title, preview, suffix].filter(Boolean).join("。 ");
};

const getContent = (item: ChangelogVersion, site: URL) => {
	const itemUrl = new URL(getReleaseLink(item), site).href;
	const platforms = item.platforms?.join("、") ?? "iOS";
	const sections = updateGroups
		.map(({ key, label }) => {
			const entries = item.updates[key];
			if (!entries?.length) return "";

			const listItems = entries
				.map((entry) => {
					const text = escapeMarkup(entryText(entry));
					const images =
						typeof entry === "string"
							? ""
							: (entry.images ?? [])
									.map((image) => {
										const imageUrl = new URL(image, site).href;
										return `<p><img src="${escapeMarkup(imageUrl)}" alt="${text}" /></p>`;
									})
									.join("");

					return `<li>${text}${images}</li>`;
				})
				.join("");

			return `<h2>${label}</h2><ul>${listItems}</ul>`;
		})
		.join("");

	return [
		item.title ? `<p><strong>${escapeMarkup(item.title)}</strong></p>` : "",
		`<p><strong>适用平台：</strong>${escapeMarkup(platforms)}</p>`,
		sections,
		`<p><a href="${escapeMarkup(itemUrl)}">查看完整更新记录</a></p>`,
	].join("");
};

const getCategories = (item: ChangelogVersion) => [
	...(item.platforms ?? ["iOS"]),
	...updateGroups
		.filter(({ key }) => item.updates[key]?.length)
		.map(({ label }) => label),
];

const renderItem = (item: ChangelogVersion, site: URL) => {
	const link = new URL(getReleaseLink(item), site).href;
	const title = `${item.version} · Build ${item.build}`;
	const pubDate = new Date(`${item.date}T00:00:00+08:00`).toUTCString();
	const categories = getCategories(item)
		.map((category) => `<category>${escapeMarkup(category)}</category>`)
		.join("");

	return [
		"<item>",
		`<title>${escapeMarkup(title)}</title>`,
		`<link>${escapeMarkup(link)}</link>`,
		`<guid isPermaLink="true">${escapeMarkup(link)}</guid>`,
		`<pubDate>${pubDate}</pubDate>`,
		`<description>${escapeMarkup(getDescription(item))}</description>`,
		`<content:encoded>${asCdata(getContent(item, site))}</content:encoded>`,
		categories,
		"</item>",
	].join("");
};

export function GET(context: APIContext) {
	const site = context.site ?? new URL("https://minibili.zhaohe.org");
	const latestDate = changelog[0]?.date;
	const feedUrl = new URL("/rss.xml", site).href;
	const lastBuildDate = latestDate
		? new Date(`${latestDate}T00:00:00+08:00`).toUTCString()
		: new Date().toUTCString();
	const items = changelog.map((item) => renderItem(item, site)).join("");
	const xml = [
		'<?xml version="1.0" encoding="UTF-8"?>',
		'<?xml-stylesheet type="text/xsl" href="/rss/styles.xsl"?>',
		'<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">',
		"<channel>",
		`<title>${escapeMarkup(feedTitle)}</title>`,
		`<link>${escapeMarkup(site.href)}</link>`,
		`<description>${escapeMarkup(feedDescription)}</description>`,
		"<language>zh-CN</language>",
		`<lastBuildDate>${lastBuildDate}</lastBuildDate>`,
		`<atom:link href="${escapeMarkup(feedUrl)}" rel="self" type="application/rss+xml" />`,
		items,
		"</channel>",
		"</rss>",
	].join("");

	return new Response(xml, {
		headers: {
			"Content-Type": "application/rss+xml; charset=utf-8",
		},
	});
}
