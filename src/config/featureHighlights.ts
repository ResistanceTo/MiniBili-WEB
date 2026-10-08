import type { IconType } from "react-icons";
import { FiCompass, FiDownload, FiHeart, FiPlayCircle, FiSliders, FiSmartphone } from "react-icons/fi";

export interface FeatureGroup {
	title: string;
	icon: IconType;
	items: string[];
}

// 首页「功能一览」、结构化数据 featureList 与 llms-full.txt 共用；只写已发布的功能
export const featureHighlights: FeatureGroup[] = [
	{
		title: "播放",
		icon: FiPlayCircle,
		items: [
			"弹幕播放与发送",
			"长按倍速、画中画",
			"字幕与杜比视界",
			"分 P、合集连播",
			"灵动岛与锁屏播放控制",
			"听视频：锁屏切歌、定时关闭",
			"集成空降助手",
		],
	},
	{
		title: "内容",
		icon: FiCompass,
		items: [
			"首页推荐、热门与分区",
			"动态（视频、图文）",
			"番剧、电影与直播",
			"多类型搜索（视频、专栏等）",
			"UP 主空间与投稿列表",
		],
	},
	{
		title: "互动",
		icon: FiHeart,
		items: [
			"点赞、投币、收藏、分享",
			"关注 UP 主、稍后再看",
			"评论、楼中楼回复",
			"私信：表情、卡片、撤回",
		],
	},
	{
		title: "下载与图片",
		icon: FiDownload,
		items: [
			"视频缓存，支持 4K / HDR / 8K",
			"下载任务队列与恢复",
			"评论、动态图片查看原图与下载",
		],
	},
	{
		title: "个性化",
		icon: FiSliders,
		items: [
			"自定义主题色与液态玻璃样式",
			"浅色、深色模式分别设置壁纸",
			"订阅主题包",
			"单列 / 双列视频卡片",
			"简体中文、繁体中文、English",
		],
	},
	{
		title: "账号与多端",
		icon: FiSmartphone,
		items: [
			"短信验证码登录、扫码登录",
			"观看记录与播放进度同步到 B站",
			"隐身模式（不同步观看记录）",
			"iPhone、iPad、Mac、Apple Watch 登录状态同步",
			"iPad 宽屏分栏、Safari 扩展",
		],
	},
];

// 英文页面使用，分组与中文版一一对应
export const featureHighlightsEn: FeatureGroup[] = [
	{
		title: "Playback",
		icon: FiPlayCircle,
		items: [
			"Danmaku (bullet comments): watch and send",
			"Hold to speed up, Picture in Picture",
			"Subtitles and Dolby Vision",
			"Multi-part videos and collections autoplay",
			"Dynamic Island and Lock Screen controls",
			"Audio-only mode with sleep timer",
			"Built-in SponsorBlock-style segment skipping (空降助手)",
		],
	},
	{
		title: "Browse",
		icon: FiCompass,
		items: [
			"Recommended, trending and category feeds",
			"Following feed (videos and posts)",
			"Anime, movies and live streams",
			"Search across videos, articles and more",
			"Creator profiles and uploads",
		],
	},
	{
		title: "Interact",
		icon: FiHeart,
		items: [
			"Like, coin, favorite and share",
			"Follow creators, Watch Later",
			"Comments and threaded replies",
			"Direct messages with stickers, cards and unsend",
		],
	},
	{
		title: "Downloads & images",
		icon: FiDownload,
		items: [
			"Offline video cache, up to 4K / HDR / 8K",
			"Download queue with resume",
			"View and save original images from comments and posts",
		],
	},
	{
		title: "Personalize",
		icon: FiSliders,
		items: [
			"Custom accent color and Liquid Glass styles",
			"Separate wallpapers for light and dark mode",
			"Subscribe to theme packs",
			"Single or two-column video cards",
			"English, Simplified and Traditional Chinese",
		],
	},
	{
		title: "Account & devices",
		icon: FiSmartphone,
		items: [
			"Sign in with SMS code or QR code",
			"Watch history and progress sync with Bilibili",
			"Incognito mode (don't sync history)",
			"Sign-in sync across iPhone, iPad, Mac and Apple Watch",
			"Split layout on iPad, Safari extension",
		],
	},
];
