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
		message: "build34 开始仅支持iOS26.0及以上版本，此版本大幅重写，强烈推荐所有用户更新！",
		type: "success" as const,
		dismissible: true,
		show: true,
	},
};
