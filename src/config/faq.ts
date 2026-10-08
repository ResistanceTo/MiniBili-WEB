import { productFacts, releasedRequirementsText } from "./productFacts";
import type { FAQ } from "./types";

const { sponsorship, testflightMaxTesters, upcomingPlatforms } = productFacts;

export const faq: FAQ[] = [
	{
		question: "TestFlight 名额满了怎么办？怎么加入 MiniBili？",
		answer: `MiniBili 通过 Apple TestFlight 分发，每个 App 最多可邀请 ${testflightMaxTesters} 名外部测试者。\n如果当前公开名额已满，可以留意社区公告（Telegram 群组），等待后续重新开放。爱发电${sponsorship.keepTestingTiers}赞助可长期保留测试资格，不受公测名额清理机制影响。`,
	},
	{
		question: "赞助有什么权益？为什么选择赞助？",
		answer: `本项目已上线爱发电平台。赞助成为${sponsorship.perksTier}可加入专属群组，并享受 TestFlight 快速更新；${sponsorship.keepTestingTiers}赞助长期保留测试资格，不受公测名额清理机制影响。赞助不会解锁额外 App 功能。`,
	},
	{
		question: "MiniBili 是免费的吗？会有内购或付费功能吗？",
		answer: `MiniBili 完全免费，价格为 ¥0。\n所有用户的功能完全一致，没有任何付费才能解锁的功能。赞助仅用于支持项目开发并保留测试名额，不影响功能。`,
	},
	{
		question: "为什么有些视频无法播放？",
		answer: `视频无法播放通常由以下几类原因导致，可以逐一排查：\n1. 视频本身存在权限限制，例如充电专属或大会员专属内容。\n2. 如果安装了广告拦截程序（如 AdGuard），可能把播放链接误判为广告并拦截，需要在拦截规则中放行 mcdn.bilivideo.cn。\n3. 不登录能看，登录后看不了，这是已知的第三方接口限制。\n4. 某个清晰度无法播放时，可以尝试切换到其他清晰度。`,
	},
	{
		question: "MiniBili 会支持更低版本的系统吗？",
		answer: `目前没有支持更低系统版本的计划。\n已发布平台的最低系统要求为 ${releasedRequirementsText}。tvOS 版本${upcomingPlatforms.tvos.status}，同样需要 tvOS ${upcomingPlatforms.tvos.minimumVersion}；visionOS 版本${upcomingPlatforms.visionos.status}。`,
	},
	{
		question: "除了 TestFlight，还有 ipa 下载或其他分发渠道吗？",
		answer: `TestFlight 是目前唯一的加入渠道。\nMiniBili 不会上架 App Store，也不会提供 ipa 下载或任何第三方分发。`,
	},
];
