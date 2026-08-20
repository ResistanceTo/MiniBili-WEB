import type { StoreLinks } from "./types";
import { productFacts } from "./productFacts";

export const appInfo = {
	title: "MiniBili - 免费无广的哔哩哔哩第三方客户端",
	description: productFacts.description,
	logo: {
		src: "/MiniBili.png",
	},
	storeLinks: {
		ios: productFacts.platforms.ios.downloadUrl,
		macos: productFacts.platforms.macos.downloadUrl,
	} as StoreLinks,
	announcement: {
		message: [
			"新版本构建、股东版发布、公开版延迟开放，都会由自动化服务处理，不再依赖人工分发或通知。",
			"先行版发布后，系统会自动记录版本信息。满 30 天后，同一个版本会自动开放给其他公开 TF 群组。",
			"独立的watchOS应用将不再更新，合并到iOS版本中。",
			"iOS 27.0 beta 6 播放崩溃的问题，已经在 180 版本解决，请直接升级到此版本。",
		],
		type: "success" as const,
		dismissible: true,
		show: true,
	},
};
