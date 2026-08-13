export const productFacts = {
	description: "MiniBili 是一款基于 SwiftUI 原生打造的哔哩哔哩第三方客户端，支持 iPhone、iPad、Apple Watch 与 Mac，完全免费、无广告、无跟踪器，App 数据仅保存在本地设备。",
	platforms: {
		ios: {
			name: "iOS",
			minimumVersion: "26.0+",
			downloadUrl: "https://testflight.apple.com/join/TgcHSGwb",
		},
		ipados: {
			name: "iPadOS",
			minimumVersion: "26.0+",
			downloadUrl: "https://testflight.apple.com/join/TgcHSGwb",
		},
		watchos: {
			name: "watchOS",
			minimumVersion: "26.0+",
			downloadUrl: "https://testflight.apple.com/join/TgcHSGwb",
		},
		macos: {
			name: "macOS",
			minimumVersion: "26.0+",
			downloadUrl: "https://testflight.apple.com/join/k9xD3Vqh",
		},
	},
} as const;
