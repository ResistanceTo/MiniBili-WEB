import type { FAQ } from "./types";

export const faq: FAQ[] = [
	{
		question: "TestFlight 名额问题？",
		answer: `由于 TestFlight 官方限制测试名额上限为 10000 人。为防止名额被恶意占用并精确清理长期未活跃用户，公测链接采取 【滚动发布】 机制（约一个月发布一个新公测版）。新版本发布时会清理旧版本的不活跃用户。如果当前名额已满，请留意社区公告，等待下一轮滚动更新。`,
	},
    {
        question: "赞助权益？",
		answer: "本项目已上线【爱发电】平台。赞助成为【股东】即可加入专属群组，享受 TestFlight 快速更新权益（即新功能开发完成后立即推送）。此外，大杯、超大杯及股东均【长期保留测试资格】，不受公测名额清理机制的影响。"
    },
	{
		question: "一些视频无法播放？",
		answer: "可能原因如下： 1.充电专属或者会员专属等视频； 2.如果你安装了adg这种广告拦截程序，可能把播放链接当成广告拦截了；（mcdn.bilivideo.cn 放行） 3. 不登陆能看，登陆后看不了 https://github.com/xiaye13579/BBLL/issues/1566； 4.某个清晰度无法播放，可以尝试切换清晰度。",
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
