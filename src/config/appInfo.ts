import type { StoreLinks } from "./types";

export const appInfo = {
	title: "MiniBili - 免费无广的iOS哔哩哔哩第三方客户端",
	description:
		"免费、无广告、无跟踪器的iOS第三方哔哩哔哩客户端。",
	logo: {
		src: "MiniBili.png",
	},
	storeLinks: {
		apple: "https://testflight.apple.com/join/TgcHSGwb",
	} as StoreLinks,
	announcement: {
		message: "⚠️ TestFlight 公开邀请链接暂时关闭，详情请查看下方的FAQ部分。",
		type: "warning" as const,
		dismissible: true,
		show: true,
	},
};
