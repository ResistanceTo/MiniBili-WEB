import type { ChangelogVersion } from "./types";

export const changelog: ChangelogVersion[] = [
	{
		version: "1.0",
		build: 5,
		date: "2025-10-14",
		updates: {
			bugfix: [
				"全屏播放状态异常",
				"视频播放进度条意外重置",
			],
			improvement: [
				"优化了一点弹幕问题",
			],
			feature: [
				"支持长按视频2倍速播放"
			]
		},
	},
	{
		version: "1.0",
		build: 4,
		date: "2025-10-13",
		updates: {
			bugfix: [
				"某些视频播放没有声音",
			],
			feature: [
				"可以在视频详情页点赞"
			]
		},
	},
	{
		version: "1.0",
		build: 3,
		date: "2025-10-12",
		updates: {
			bugfix: [
				"搜索页无法加载视频封面",
				"搜索页返回热门页的逻辑错误",
			],
			improvement: [
				"添加日志记录"
			]
		},
	},
	{
		version: "1.0",
		build: 2,
		date: "2025-10-12",
		title: "🎉 MiniBili 正式发布！感谢大家的支持与期待！",
		updates: {
			feature: [
				"首次发布 - 支持视频播放、搜索、动态、历史记录等核心功能",
				"完美适配 iPhone",
				"深色模式支持，自动跟随系统设置",
			],
		},
	},
];
