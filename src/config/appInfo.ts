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
		message: "build19之后只支持17.2及以上系统，iPad暂无优化计划。",
		type: "success" as const,
		dismissible: true,
		show: true,
	},
};
