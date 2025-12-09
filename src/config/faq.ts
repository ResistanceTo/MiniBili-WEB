import type { FAQ } from "./types";

export const faq: FAQ[] = [
	{
		question: "为什么 TestFlight 邀请链接关闭了？",
		answer: `TestFlight 有 10000 人的测试员上限。根据苹果官方说明：
已删除的测试员仍会占用名额，直到他们安装的构建版本过期（最长 90 天）;
即使手动将构建版本设为过期，这些测试员也仍计入人数上限;
很多用户安装后只打开一次甚至不打开就删除，但名额无法立即释放。
为了更合理地分配有限的测试员名额，我们暂时关闭了公开邀请链接，后续会采用更好的分配方式。
关注群或公告获取最新信息。`,
	},
	{
		question: "一些视频无法播放？",
		answer: "可能原因如下： 1.充电专属或者会员专属等视频； 2.规则拦截，比如你安装了adg这种广告拦截服务； 3. 不登陆能看，登陆后看不了 https://github.com/xiaye13579/BBLL/issues/1566； 4.某个清晰度无法播放，可以尝试切换清晰度。",
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
