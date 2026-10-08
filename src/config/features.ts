import { FaShieldAlt } from "react-icons/fa";
import { TbAdCircleOff } from "react-icons/tb";
import { TbFreeRights } from "react-icons/tb";
import type { Feature } from "./types";

export const features: Feature[] = [
	{
		title: "隐私保护",
		description: "无服务器上传，所有数据只会缓存在本地，所有通讯直接和哔哩哔哩服务器交互。",
		icon: FaShieldAlt,
	},
	{
		title: "无广告",
		description: "整个 App 没有任何广告干扰你的体验。",
		icon: TbAdCircleOff,
	},
	{
		title: "完全免费",
		description: "MiniBili 的所有 App 功能完全免费，赞助不会解锁额外功能。",
		icon: TbFreeRights,
	},
];

export const featuresEn: Feature[] = [
	{
		title: "Private by design",
		description: "Nothing is uploaded to any server of ours. Data is cached only on your device, and the app talks directly to Bilibili's servers.",
		icon: FaShieldAlt,
	},
	{
		title: "No ads",
		description: "Not a single ad anywhere in the app.",
		icon: TbAdCircleOff,
	},
	{
		title: "Completely free",
		description: "Every feature is free. Sponsorship never unlocks extra features.",
		icon: TbFreeRights,
	},
];
