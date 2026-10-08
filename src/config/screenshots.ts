import { DeviceType, type DeviceScreenshots } from "./types";

// 每张截图的说明同时用作 alt 文本，中英文页面各取所需
export const screenshots: DeviceScreenshots = {
	[DeviceType.iOS]: [
		{ src: "/screenshots/iphone/home_new.webp", zh: "首页推荐", en: "Home feed" },
		{ src: "/screenshots/iphone/VideoDetail1.webp", zh: "视频详情与弹幕", en: "Video page with danmaku" },
		{ src: "/screenshots/iphone/VideoComment1.webp", zh: "评论区", en: "Comments" },
		{ src: "/screenshots/iphone/DynamicList_new.webp", zh: "动态", en: "Following feed" },
		{ src: "/screenshots/iphone/Category_new.webp", zh: "分区", en: "Categories" },
		{ src: "/screenshots/iphone/search_new.webp", zh: "搜索", en: "Search" },
		{ src: "/screenshots/iphone/UP1.webp", zh: "UP 主空间", en: "Creator profile" },
		{ src: "/screenshots/iphone/Settings1.webp", zh: "设置", en: "Settings" },
		{ src: "/screenshots/iphone/about.webp", zh: "关于", en: "About" },
	],
	[DeviceType.iPadOS]: [
		{ src: "/screenshots/ipad/home.webp", zh: "首页", en: "Home" },
		{ src: "/screenshots/ipad/homeSettings.webp", zh: "首页设置", en: "Home settings" },
		{ src: "/screenshots/ipad/detail.webp", zh: "视频详情", en: "Video details" },
		{ src: "/screenshots/ipad/video.webp", zh: "视频播放", en: "Video playback" },
		{ src: "/screenshots/ipad/settings.webp", zh: "设置", en: "Settings" },
		{ src: "/screenshots/ipad/about.webp", zh: "关于", en: "About" },
	],
	[DeviceType.macOS]: [
		{ src: "/screenshots/mac/mac.webp", zh: "Mac 主界面", en: "Main window on Mac" },
	],
	[DeviceType.watchOS]: [
		{ src: "/screenshots/watch/list.webp", zh: "视频列表", en: "Video list" },
		{ src: "/screenshots/watch/player.webp", zh: "播放", en: "Player" },
		{ src: "/screenshots/watch/search.webp", zh: "搜索", en: "Search" },
		{ src: "/screenshots/watch/mine.webp", zh: "我的", en: "Profile" },
	],
	[DeviceType.tvOS]: [
		{ src: "/screenshots/tv/list.webp", zh: "视频列表", en: "Video list" },
		{ src: "/screenshots/tv/video.webp", zh: "视频播放", en: "Video playback" },
	],
};
