import type { FAQ } from "./types";

export const faq: FAQ[] = [
	{
		question: "iPad兼容？",
		answer: "主要面向平台是iPhone，iPad会使用拉伸的方式展示，可能部分内容不那么优雅",
	},
	{
		question: "是否考虑支持iOS17以下的系统",
		answer: "不会，许多新特性只有iOS17才提供。",
	},
	{
		question: "有建议、问题或bug提到哪里？",
		answer: "GitHub issue 和 TestFlight 的反馈是当下推荐的渠道。",
	},
];
