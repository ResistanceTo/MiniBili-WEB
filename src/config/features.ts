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
		description: "整个app没有任何广告干扰你的体验。",
		icon: TbAdCircleOff,
	},
	{
		title: "完全免费",
		description: "现在和将来都不会向用户收取任何费用。",
		icon: TbFreeRights,
	},
];
