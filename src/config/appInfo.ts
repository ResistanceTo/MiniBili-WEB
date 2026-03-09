import type { StoreLinks } from "./types";

export const appInfo = {
	title: "MiniBili - 免费无广的哔哩哔哩第三方客户端",
	description:
		"支持iOS、iPadOS、watchOS、macOS（tvOS、visionOS）",
	logo: {
		src: "MiniBili.png",
	},
	storeLinks: {
		ios: "https://testflight.apple.com/join/TgcHSGwb",
		watchos: "https://testflight.apple.com/join/mxsM6Jwm",
		macos: "https://testflight.apple.com/join/k9xD3Vqh",
	} as StoreLinks,
	announcement: {
		message: "每月初发布公测版本，月中或月初清理不活跃测试员。",
		type: "success" as const,
		dismissible: true,
		show: true,
	},
};
