import { productFacts, releasedRequirementsText } from "./productFacts";
import type { FAQ } from "./types";

const { platforms, sponsorship, testflightMaxTesters, upcomingPlatforms } = productFacts;

export const faq: FAQ[] = [
	{
		question: "如何通过 TestFlight 安装 MiniBili？",
		answer: `1. 在 App Store 安装 Apple 官方的 TestFlight App。\n2. 在要安装的设备上打开官网对应的 TestFlight 链接：iPhone、iPad 与 Apple Watch 使用同一个链接，Mac 使用单独的链接。\n3. 在 TestFlight 中接受邀请并点击“安装”。Apple Watch 版内置在 iOS 版本中。\nTestFlight 测试版本有有效期，过期前请在 TestFlight 中更新到最新版本。`,
	},
	{
		question: "MiniBili 支持 iPad、Mac 和 Apple Watch 吗？",
		answer: `支持。MiniBili 已发布 ${platforms.ios.device}、${platforms.ipados.device}、${platforms.watchos.device} 和 ${platforms.macos.device} 版本，最低系统要求为 ${releasedRequirementsText}。\niPad 针对宽屏做了左右分栏布局；Apple Watch 版内置在 iOS 版本中；Mac 有单独的 TestFlight 链接。${upcomingPlatforms.tvos.device}（tvOS）版本${upcomingPlatforms.tvos.status}，${upcomingPlatforms.visionos.device}（visionOS）版本${upcomingPlatforms.visionos.status}。`,
	},
	{
		question: "MiniBili 和 B站官方 App 有什么区别？",
		answer: `MiniBili 是个人开发者维护的非官方第三方客户端，与哔哩哔哩官方无关。\n它基于 SwiftUI 原生开发，没有广告和跟踪器，也没有自己的服务器，所有请求直接发送到 B站官方 API。\n部分官方功能仍在开发或规划中，进度可以在官网的开发路线图查看。`,
	},
	{
		question: "需要登录 B站账号吗？账号安全吗？",
		answer: `不登录也可以浏览和播放公开视频；登录后可以使用动态、点赞投币、收藏、私信等账号功能。\n登录凭证通过 Apple 钥匙串（Keychain）加密保存在你的设备上，开发者无法获取你的账号密码。MiniBili 不收集任何个人数据，详见隐私政策。`,
	},
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
