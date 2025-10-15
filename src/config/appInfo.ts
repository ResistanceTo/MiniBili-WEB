import type { StoreLinks } from "./types";

export const appInfo = {
	title: "MiniBili",
	description:
		"免费、无广告、无跟踪器的iOS第三方哔哩哔哩客户端。",
	logo: {
		src: "MiniBili.png",
	},
	storeLinks: {
		apple: "#",
	} as StoreLinks,
	announcement: {
		message: "⚠️⚠️⚠️ 重要通知：TF被意外下架，暂时判断是：https://developer.apple.com/forums/thread/691372 此类问题，正在解决，请关注官网通知或TF邀请链接可用性，有任何进展官网会第一时间同步",
		type: "warning" as const,
		dismissible: true,
		show: true,
	},
};
