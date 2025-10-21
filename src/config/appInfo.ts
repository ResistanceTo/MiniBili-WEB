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
		message: "已经恢复TF，点击下方链接可直接加入",
		type: "success" as const,
		dismissible: true,
		show: true,
	},
};
