import type { StoreLinks } from "./types";

export const appInfo = {
	title: "MiniBili - 免费无广的哔哩哔哩第三方客户端",
	description:
		"支持iOS、iPadOS、watchOS（macOS、tvOS、visionOS）",
	logo: {
		src: "MiniBili.png",
	},
	storeLinks: {
		ios: "https://testflight.apple.com/join/TgcHSGwb",
		watchos: "https://testflight.apple.com/join/mxsM6Jwm",
	} as StoreLinks,
	announcement: {
		message: "⚠️ TestFlight 公开邀请链接暂时关闭，详情请查看下方的FAQ部分。",
		type: "warning" as const,
		dismissible: true,
		show: true,
	},
};
