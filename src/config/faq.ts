import type { FAQ } from "./types";

export const faq: FAQ[] = [
	{
		question: "TestFlight 名额问题？",
		answer: `由于 TestFlight 官方限制测试名额上限为 10000 人。为了让更多用户能够参与体验，我们会定期释放长期未活跃的测试员。如果名额已满，请留意我们的官网公告或社区消息，我们将不定期开放新一轮测试。`,
	},
	{
		question: "一些视频无法播放？",
		answer: "可能原因如下： 1.充电专属或者会员专属等视频； 2.如果你安装了adg这种广告拦截程序，可能把播放链接当成广告拦截了； 3. 不登陆能看，登陆后看不了 https://github.com/xiaye13579/BBLL/issues/1566； 4.某个清晰度无法播放，可以尝试切换清晰度。",
	},
	{
		question: "是否考虑支持低版本系统？",
		answer: "不会考虑。",
	},
	{
		question: "有ipa或者其他渠道分发吗？",
		answer: "TestFlight 是目前唯一加入渠道，不会上架 App Store，也不会提供 ipa 下载。",
	},
	{
		question: "iPad版本优化问题？",
		answer: "由于开发者没有iPad设备，所以不会花费精力去做适配。",
	},
];
