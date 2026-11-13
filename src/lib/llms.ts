import { changelog } from "../config/changelog";
import { withAnchors } from "./changelog";
import { faq } from "../config/faq";
import { featureHighlights } from "../config/featureHighlights";
import { productFacts, releasedRequirementsText } from "../config/productFacts";

// llms.txt 与 llms-full.txt 的共用内容，全部来自 config，避免与页面上的说法不一致
const site = "https://minibili.zhaohe.org";
const { platforms, upcomingPlatforms, sponsorship } = productFacts;
const latest = changelog[0];

export const textResponse = (body: string) =>
	new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });

export const disclaimer = "MiniBili 是非官方第三方客户端，与哔哩哔哩官方无关，仅供学习和个人使用。";
export const disclaimerEn = "MiniBili is an unofficial client and is not affiliated with Bilibili.";

export const keyFacts = [
	`已发布：${Object.values(platforms).map((p) => p.name).join("、")}，最低系统版本：${releasedRequirementsText}。`,
	...Object.values(upcomingPlatforms).map((p) => `${p.status}：${p.name} ${p.minimumVersion}（${p.device}）。`),
	"技术：使用 Apple SwiftUI 原生开发。",
	"隐私：无广告、无跟踪器、无 MiniBili 后端服务器；App 数据仅保存在本地设备，业务请求直接发送到哔哩哔哩官方 API。",
	"价格：App 功能完全免费，赞助不会解锁额外 App 功能。",
	"分发：仅通过 Apple TestFlight，不上架 App Store，不提供 IPA 或第三方分发。",
	`TestFlight：每个 App 最多可邀请 ${productFacts.testflightMaxTesters} 名外部测试者。`,
	"watchOS：独立测试入口已停止更新，Apple Watch 版内置在 iOS 版本中。",
	"界面语言：简体中文、繁体中文、English。",
	`最新版本：Build ${latest.build}（${latest.version}，${latest.date}）。`,
];

// llms.txt 规范要求链接写成 Markdown 形式：[名称](URL): 说明。裸 URL 不会被识别为链接
export const link = (name: string, url: string, note?: string) => `[${name}](${url})${note ? `: ${note}` : ""}`;

export const downloadLinks = [
	link(
		`TestFlight（${platforms.ios.device} / ${platforms.ipados.device} / ${platforms.watchos.device}）`,
		platforms.ios.downloadUrl,
		`需要 ${platforms.ios.name} ${platforms.ios.minimumVersion}，Apple Watch 版内置在 iOS 版本中`,
	),
	link(
		`TestFlight（${platforms.macos.device}）`,
		platforms.macos.downloadUrl,
		`需要 ${platforms.macos.name} ${platforms.macos.minimumVersion}`,
	),
];

export const sponsorshipFacts = [
	`爱发电${sponsorship.keepTestingTiers}赞助：长期保留测试资格，不受公测名额清理机制影响。`,
	`爱发电${sponsorship.perksTier}档位：专属群组与 TestFlight 快速更新。`,
	"赞助不会解锁额外 App 功能。",
];

export const sponsorLink = link(
	"爱发电赞助页面",
	sponsorship.url,
	`${sponsorship.keepTestingTiers}赞助可长期保留 TestFlight 测试资格，${sponsorship.perksTier}档位另有专属群组与快速更新；赞助不会解锁额外 App 功能`,
);

export const communityLinks = [
	link("Telegram 社区", productFacts.telegramUrl, "版本公告、问题反馈与 TestFlight 名额开放通知"),
	sponsorLink,
];

// 了解 MiniBili 最有用的页面
export const pageLinks = [
	link("MiniBili 中文官网", `${site}/`, "产品介绍、截图、功能、常见问题与下载入口"),
	link("MiniBili English site", `${site}/en/`, "English overview, features and FAQ"),
	link("更新日志", `${site}/changelog/`, "每个 Build 的新功能、优化改进与问题修复"),
	link("开发路线图", `${site}/roadmap/`, "各平台的开发进度与计划"),
	link("隐私政策", `${site}/privacy/`, "App 的数据处理方式与隐私说明"),
];

export const fullTextLink = link("完整说明 llms-full.txt", `${site}/llms-full.txt`, "平台状态表、全部功能与常见问题全文");

// 次要信息，上下文有限时可以跳过（对应 llms.txt 规范中的 Optional 段）
export const optionalLinks = [
	link("服务条款", `${site}/terms/`),
	link("更新日志 RSS", `${site}/rss.xml`, "订阅版本更新"),
	link("官网源码仓库", "https://github.com/ResistanceTo/MiniBili-WEB", "仅为官网源码，不代表 MiniBili App 本体开源"),
];

export const featureSections = featureHighlights.map(
	({ title, items }) => `### ${title}\n\n${items.map((item) => `- ${item}`).join("\n")}`,
);

export const faqSections = faq.map(({ question, answer }) => `### ${question}\n\n${answer}`);

export const recentReleases = withAnchors(changelog).slice(0, 5).map(({ anchor, build, version, date, updates }) => {
	const count = (updates.feature?.length ?? 0) + (updates.improvement?.length ?? 0) + (updates.bugfix?.length ?? 0);
	return `- ${link(`Build ${build}`, `${site}/changelog/#${anchor}`, `${version}，${date}，${count} 项更新`)}`;
});

export const list = (items: string[]) => items.map((item) => `- ${item}`).join("\n");
