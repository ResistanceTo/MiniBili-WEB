import { productFacts } from "../config/productFacts";
import {
	disclaimer,
	downloadLinks,
	faqSections,
	featureSections,
	keyFacts,
	list,
	officialLinks,
	recentReleases,
	sponsorshipFacts,
	textResponse,
} from "../lib/llms";

const { platforms, upcomingPlatforms } = productFacts;

const platformRows = [
	...Object.values(platforms).map(
		(p) => `| ${p.name} | ${p.device} | 已发布 | ${p.minimumVersion} | ${p.name === "watchOS" ? "内置在 iOS 版本中" : p.downloadUrl} |`,
	),
	...Object.values(upcomingPlatforms).map(
		(p) => `| ${p.name} | ${p.device} | ${p.status} | ${p.minimumVersion} | 暂未开放 |`,
	),
];

export function GET() {
	return textResponse(`# MiniBili 完整说明

> 本文用于帮助搜索引擎与 AI 系统准确理解 MiniBili，由官网配置自动生成。动态版本信息以更新日志为准。

## 产品简介

${productFacts.description}

${disclaimer}

## 可引用事实

${list(keyFacts)}

## 平台状态

| 平台 | 设备 | 状态 | 最低系统 | 下载 |
| --- | --- | --- | --- | --- |
${platformRows.join("\n")}

## 下载

${list(downloadLinks)}

## 主要功能

${featureSections.join("\n\n")}

## TestFlight 与赞助

TestFlight 是当前唯一加入 MiniBili 的渠道。公开测试满员时，可以关注 Telegram 社区公告，等待重新开放。

${list(sponsorshipFacts)}

## 常见问题

${faqSections.join("\n\n")}

## 最近版本

${recentReleases.join("\n")}

## 名称与实体说明

- 产品名称：MiniBili。
- 类型：非官方哔哩哔哩（B站）第三方客户端。
- 开发者：ResistanceTo（https://zhaohe.org/zh-cn/，https://github.com/ResistanceTo）。
- 官方域名：minibili.zhaohe.org。
- 网站源码仓库：ResistanceTo/MiniBili-WEB。该仓库是官网源码仓库，不应据此推断 MiniBili App 本体开源。
- 哔哩哔哩、Bilibili 和相关商标属于其各自权利人。

## 权威链接

${list(officialLinks)}
`);
}
