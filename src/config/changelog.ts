import type { ChangelogVersion } from "./types";

export const changelog: ChangelogVersion[] = [
	{
		version: "1.0",
		build: 14,
		date: "2025-10-20",
		updates: {
			improvement: [
				"MiniBili的观看记录可以同步到官方",
				"重新整理设置界面，去掉占位不能用的设置项",
			],
			feature: [
				"支持设置为隐身模式（不同步观看记录）",
				"支持获取视频合集",
			],
			bugfix: [
				"修复夜间模式个人资料卡片背景色异常问题",
			]
		},
	},
	{
		version: "1.0",
		build: 13,
		date: "2025-10-19",
		updates: {
			feature: [
				"可以查看UP主空间（投稿、动态）",
			],
			bugfix: [
				"修复视频页关注按钮颜色异常问题",
			]
		},
	},
	{
		version: "1.0",
		build: 12,
		date: "2025-10-18",
		updates: {
			improvement: [
				"iPhone和iPad均支持二维码登录",
			]
		},
	},
	{
		version: "1.0",
		build: 11,
		date: "2025-10-17",
		updates: {
			improvement: [
				"支持全球手机号登录",
				"优化首页掉帧问题（未完善）",
			],
			feature: [
				"现在可以关注、取关up",
				"添加黑暗模式的Logo",
				"显示更多缓存管理项",
			]
		},
	},
	{
		version: "1.0",
		build: 10,
		date: "2025-10-16",
		updates: {
			improvement: [
				"个人信息页UI优化",
				"视频详情页UI优化",
			],
			feature: [
				"自定义双列模式下，卡片显示的信息",
				"画中画模式",
				"视频是竖屏，全屏自动竖屏；视频是横屏，全屏自动横屏，此功能在手机设定方向锁定时依旧生效",
			]
		},
	},
	{
		version: "1.0",
		build: 7,
		date: "2025-10-15",
		updates: {
			bugfix: [
				"全屏幕下长按无法2倍速",
				"搜索结果页无法正确显示UP主头像",
			],
			improvement: [
				"部分数据添加缓存",
			],
			feature: [
				"在系统锁定方向的状态下，点击视频全屏，自动横屏播放",
				"可以设置视频列表是单列还是双列",
				"主题设置",
				"视频缓存（游客模式也可以）",
				"缓存视频管理",
			]
		},
	},
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
