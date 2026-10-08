// 官网、FAQ、结构化数据与 llms.txt 共用的产品事实，修改时只改这里
export const productFacts = {
	name: "MiniBili",
	description: "MiniBili 是一款免费、无广告、无跟踪器的 B站（哔哩哔哩）第三方客户端，基于 SwiftUI 原生打造，支持 iPhone、iPad、Apple Watch 与 Mac，App 数据仅保存在本地设备。",
	// 已发布平台
	platforms: {
		ios: {
			name: "iOS",
			device: "iPhone",
			minimumVersion: "26.0+",
			downloadUrl: "https://testflight.apple.com/join/TgcHSGwb",
		},
		ipados: {
			name: "iPadOS",
			device: "iPad",
			minimumVersion: "26.0+",
			downloadUrl: "https://testflight.apple.com/join/TgcHSGwb",
		},
		watchos: {
			name: "watchOS",
			device: "Apple Watch",
			minimumVersion: "26.0+",
			downloadUrl: "https://testflight.apple.com/join/TgcHSGwb",
		},
		macos: {
			name: "macOS",
			device: "Mac",
			minimumVersion: "26.0+",
			downloadUrl: "https://testflight.apple.com/join/k9xD3Vqh",
		},
	},
	// 尚未发布的平台
	upcomingPlatforms: {
		tvos: {
			name: "tvOS",
			device: "Apple TV",
			minimumVersion: "26.0+",
			status: "开发中",
		},
		visionos: {
			name: "visionOS",
			device: "Apple Vision Pro",
			minimumVersion: "1.0+",
			status: "规划中",
		},
	},
	sponsorship: {
		url: "https://afdian.com/a/ResistanceTo",
		// 长期保留 TestFlight 测试资格、不受公测名额清理影响的档位
		keepTestingTiers: "“股东”及旧版“大杯”、“超大杯”",
		// 专属群组与 TestFlight 快速更新
		perksTier: "“股东”",
	},
	testflightMaxTesters: "10,000",
	telegramUrl: "https://t.me/MiniBiliGroup",
} as const;

const releasedPlatforms = Object.values(productFacts.platforms);
const upcomingPlatforms = Object.values(productFacts.upcomingPlatforms);

// 例如 "iOS 26.0+、iPadOS 26.0+、watchOS 26.0+、macOS 26.0+"
export const releasedRequirementsText = releasedPlatforms
	.map((platform) => `${platform.name} ${platform.minimumVersion}`)
	.join("、");

// 例如 "iOS、iPadOS、watchOS、macOS（tvOS 开发中、visionOS 规划中）"
export const platformSummaryText = `${releasedPlatforms.map((platform) => platform.name).join("、")}（${upcomingPlatforms
	.map((platform) => `${platform.name} ${platform.status}`)
	.join("、")}）`;
