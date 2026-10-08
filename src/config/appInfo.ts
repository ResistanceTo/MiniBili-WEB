import type { StoreLinks } from "./types";
import { productFacts } from "./productFacts";

export const appInfo = {
	title: "MiniBili - 免费无广告的 B站第三方客户端 | iPhone、iPad、Mac、Apple Watch",
	description: productFacts.description,
	logo: {
		src: "/MiniBili.png",
	},
	storeLinks: {
		ios: productFacts.platforms.ios.downloadUrl,
		macos: productFacts.platforms.macos.downloadUrl,
	} as StoreLinks,
	announcement: {
		// 公告显示在首页 Hero 下方。单条可写成 { text, expires: "YYYY-MM-DD" }，过期后构建时自动隐藏
		message: [
			"新版本构建、股东版发布与公开版开放已全面自动化，不再人工通知：先行版发布满 30 天后，会自动开放给公开 TestFlight 群组。",
			"Apple Watch 版已合并到 iOS 版本中，独立的 watchOS 入口不再更新。",
		],
		type: "success" as const,
		dismissible: true,
		show: true,
	},
};
