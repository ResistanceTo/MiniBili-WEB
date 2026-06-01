import type { StoreLinks } from "./types";

export const appInfo = {
	title: "MiniBili - 免费无广的哔哩哔哩第三方客户端",
	description:
		"支持iOS、iPadOS、watchOS、macOS（tvOS、visionOS）",
	logo: {
		src: "/MiniBili.png",
	},
	storeLinks: {
		ios: "https://testflight.apple.com/join/TgcHSGwb",
		watchos: "https://testflight.apple.com/join/mxsM6Jwm",
		macos: "https://testflight.apple.com/join/k9xD3Vqh",
	} as StoreLinks,
	announcement: {
		message: [
			"新版本构建、股东版发布、公开版延迟开放，都会由自动化服务处理，不再依赖人工分发或通知。",
			"先行版发布后，系统会自动记录版本信息。满 30 天后，同一个版本会自动开放给其他公开 TF 群组。",
			"独立的watchOS应用将不再更新，合并到iOS版本中。",
		],
		type: "success" as const,
		dismissible: true,
		show: true,
	},
};
