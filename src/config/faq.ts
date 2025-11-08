import type { FAQ } from "./types";

export const faq: FAQ[] = [
	{
		question: "是否考虑支持iOS17以下的系统？",
		answer: "不会，许多新特性只有iOS17以上才提供。开发者本人已经iOS26了，原本准备只支持iOS26来着。",
	},
	{
		question: "有ipa或者其他渠道分发吗？",
		answer: "TestFlight 是目前唯一渠道，不会上架 App Store，也不会提供 ipa 下载。",
	},
	{
		question: "iPad版本优化问题？",
		answer: "由于开发者没有iPad设备，几乎不会花费精力去做大屏幕适配。",
	},
	{
		question: "TestFlight 名额已满？",
		answer: "我会不定期清理不活跃测试员，关注群消息。",
	},
	{
		question: "Apple TV等其他平台？",
		answer: "未来有计划扩展到Apple TV、Apple Watch、Apple Vision Pro（不一定，开坑弃坑已经常态了），没提到的平台就一定不会。现在的主要精力会放在iPhone版本上，等iPhone几乎所有功能完成后，会首先做Apple TV平台。",
	},
];
