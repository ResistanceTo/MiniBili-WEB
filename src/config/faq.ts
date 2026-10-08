import { productFacts, releasedRequirementsText } from "./productFacts";
import type { FAQ } from "./types";

const { platforms, sponsorship, testflightMaxTesters, upcomingPlatforms } = productFacts;

export const faq: FAQ[] = [
	{
		id: "faq-install",
		question: "如何通过 TestFlight 安装 MiniBili？",
		answer: `1. 在 App Store 安装 Apple 官方的 TestFlight App。\n2. 在要安装的设备上打开官网对应的 TestFlight 链接：iPhone、iPad 与 Apple Watch 使用同一个链接，Mac 使用单独的链接。\n3. 在 TestFlight 中接受邀请并点击“安装”。Apple Watch 版内置在 iOS 版本中。\nTestFlight 测试版本有有效期，过期前请在 TestFlight 中更新到最新版本。`,
	},
	{
		id: "faq-platforms",
		question: "MiniBili 支持 iPad、Mac 和 Apple Watch 吗？",
		answer: `支持。MiniBili 已发布 ${platforms.ios.device}、${platforms.ipados.device}、${platforms.watchos.device} 和 ${platforms.macos.device} 版本，最低系统要求为 ${releasedRequirementsText}。\niPad 针对宽屏做了左右分栏布局；Apple Watch 版内置在 iOS 版本中；Mac 有单独的 TestFlight 链接。${upcomingPlatforms.tvos.device}（tvOS）版本${upcomingPlatforms.tvos.status}，${upcomingPlatforms.visionos.device}（visionOS）版本${upcomingPlatforms.visionos.status}。`,
	},
	{
		id: "faq-official-app",
		question: "MiniBili 和 B站官方 App 有什么区别？",
		answer: `MiniBili 是个人开发者维护的非官方第三方客户端，与哔哩哔哩官方无关。\n它基于 SwiftUI 原生开发，没有广告和跟踪器，也没有自己的服务器，所有请求直接发送到 B站官方 API。\n部分官方功能仍在开发或规划中，进度可以在官网的开发路线图查看。`,
	},
	{
		id: "faq-account",
		question: "需要登录 B站账号吗？账号安全吗？",
		answer: `不登录也可以浏览和播放公开视频；登录后可以使用动态、点赞投币、收藏、私信等账号功能。\n登录凭证通过 Apple 钥匙串（Keychain）加密保存在你的设备上，开发者无法获取你的账号密码。MiniBili 不收集任何个人数据，详见隐私政策。`,
	},
	{
		id: "faq-testflight-full",
		question: "TestFlight 名额满了怎么办？怎么加入 MiniBili？",
		answer: `MiniBili 通过 Apple TestFlight 分发，每个 App 最多可邀请 ${testflightMaxTesters} 名外部测试者。\n如果当前公开名额已满，可以留意社区公告（Telegram 群组），等待后续重新开放。爱发电${sponsorship.keepTestingTiers}赞助可长期保留测试资格，不受公测名额清理机制影响。`,
	},
	{
		id: "faq-sponsorship",
		question: "赞助有什么权益？为什么选择赞助？",
		answer: `本项目已上线爱发电平台。赞助成为${sponsorship.perksTier}可加入专属群组，并享受 TestFlight 快速更新；${sponsorship.keepTestingTiers}赞助长期保留测试资格，不受公测名额清理机制影响。赞助不会解锁额外 App 功能。`,
	},
	{
		id: "faq-free",
		question: "MiniBili 是免费的吗？会有内购或付费功能吗？",
		answer: `MiniBili 完全免费，价格为 ¥0。\n所有用户的功能完全一致，没有任何付费才能解锁的功能。赞助仅用于支持项目开发并保留测试名额，不影响功能。`,
	},
	{
		id: "faq-playback",
		question: "为什么有些视频无法播放？",
		answer: `视频无法播放通常由以下几类原因导致，可以逐一排查：\n1. 视频本身存在权限限制，例如充电专属或大会员专属内容。\n2. 如果安装了广告拦截程序（如 AdGuard），可能把播放链接误判为广告并拦截，需要在拦截规则中放行 mcdn.bilivideo.cn。\n3. 不登录能看，登录后看不了，这是已知的第三方接口限制。\n4. 某个清晰度无法播放时，可以尝试切换到其他清晰度。`,
	},
	{
		id: "faq-system-requirements",
		question: "MiniBili 会支持更低版本的系统吗？",
		answer: `目前没有支持更低系统版本的计划。\n已发布平台的最低系统要求为 ${releasedRequirementsText}。tvOS 版本${upcomingPlatforms.tvos.status}，同样需要 tvOS ${upcomingPlatforms.tvos.minimumVersion}；visionOS 版本${upcomingPlatforms.visionos.status}。`,
	},
	{
		id: "faq-ipa",
		question: "除了 TestFlight，还有 ipa 下载或其他分发渠道吗？",
		answer: `TestFlight 是目前唯一的加入渠道。\nMiniBili 不会上架 App Store，也不会提供 ipa 下载或任何第三方分发。`,
	},
];

// 英文页面使用的 FAQ，锚点与中文版一致
export const faqEn: FAQ[] = [
	{
		id: "faq-install",
		question: "How do I install MiniBili with TestFlight?",
		answer: `1. Install Apple's TestFlight app from the App Store.\n2. Open the TestFlight link on the device you want to use: iPhone, iPad and Apple Watch share one link, and Mac has its own.\n3. Accept the invitation in TestFlight and tap “Install”. The Apple Watch app ships inside the iOS app.\nTestFlight builds expire after a while, so keep MiniBili updated from TestFlight.`,
	},
	{
		id: "faq-platforms",
		question: "Does MiniBili work on iPad, Mac and Apple Watch?",
		answer: `Yes. MiniBili is available for ${platforms.ios.device}, ${platforms.ipados.device}, ${platforms.watchos.device} and ${platforms.macos.device}, and requires ${releasedRequirementsText.replaceAll("、", ", ")}.\nOn iPad it uses a split layout on large screens; the Apple Watch app ships inside the iOS app; Mac has its own TestFlight link. An ${upcomingPlatforms.tvos.device} (tvOS) version is in development and an ${upcomingPlatforms.visionos.device} (visionOS) version is planned.`,
	},
	{
		id: "faq-free",
		question: "Is MiniBili free?",
		answer: `Yes. MiniBili is completely free with no in-app purchases, and every user gets the same features. Sponsorship only supports development and keeps your TestFlight seat; it never unlocks extra features.`,
	},
	{
		id: "faq-official-app",
		question: "How is MiniBili different from the official Bilibili app?",
		answer: `MiniBili is an unofficial third-party client maintained by an independent developer and is not affiliated with Bilibili.\nIt is built natively with SwiftUI, has no ads or trackers, and runs no servers of its own: every request goes straight to Bilibili's official API.\nSome official features are still in development; see the roadmap for progress.`,
	},
	{
		id: "faq-account",
		question: "Do I need a Bilibili account? Is my account safe?",
		answer: `You can browse and play public videos without signing in. Signing in unlocks account features such as the following feed, likes, coins, favorites and direct messages.\nYour login credentials are encrypted in the Apple Keychain on your device, and the developer cannot access your password. MiniBili does not collect any personal data; see the privacy policy for details.`,
	},
	{
		id: "faq-language",
		question: "Is MiniBili available in English?",
		answer: `Yes. The app interface is available in English, Simplified Chinese and Traditional Chinese. Videos, comments and other content come from Bilibili and are shown as published.`,
	},
	{
		id: "faq-testflight-full",
		question: "What if the TestFlight beta is full?",
		answer: `Apple TestFlight allows up to ${testflightMaxTesters} external testers per app. When public seats are full, watch the Telegram group for announcements about new openings.\nAfdian sponsors at the ${sponsorship.keepTestingTiers} tiers keep their TestFlight access and are not affected by seat clean-ups.`,
	},
	{
		id: "faq-playback",
		question: "Why won't some videos play?",
		answer: `Common causes:\n1. The video is restricted, for example to paid supporters or Bilibili premium members.\n2. An ad blocker (such as AdGuard) blocks the video host; allow mcdn.bilivideo.cn.\n3. Some videos play when signed out but not when signed in, due to a known third-party API limitation.\n4. A particular quality level is unavailable; try another one.`,
	},
	{
		id: "faq-ipa",
		question: "Is MiniBili on the App Store or available as an IPA?",
		answer: `No. TestFlight is the only way to get MiniBili. It will not be published on the App Store, and no IPA or third-party distribution is provided.`,
	},
];
