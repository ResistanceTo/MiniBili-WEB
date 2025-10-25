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
		question: "视频播放用的什么清晰度？",
		answer: "720P和1080P两种，不可手选，更高画质在开发中。",
	},
	{
		question: "iPad版本优化问题？",
		answer: "由于开发者没有iPad设备，所以会在iPhone版本几乎所有功能完成后，才会开始iPad版本的优化工作。",
	},
	{
		question: "TestFlight 失效或测试员名额已满？",
		answer: "全部版本失效我会在官网和交流群里通知大家，等待修复即可，已经安装的用户不会受到影响。测试员名额满了会不定期清理不活跃测试员。",
	},
];
