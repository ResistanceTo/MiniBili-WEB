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
