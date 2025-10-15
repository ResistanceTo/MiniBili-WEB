import {
	RiGithubFill,
	RiTelegram2Fill,
	RiHomeSmileFill,
} from "react-icons/ri";
import type { SocialLink } from "./types";

export const socialLinks: SocialLink[] = [
	{
		url: "https://github.com/ResistanceTo",
		icon: RiGithubFill,
		label: "GitHub",
	},
	{
		url: "https://t.me/MiniBiliGroup",
		icon: RiTelegram2Fill,
		label: "Telegram",
	},
	{
		url: "https://zhaohe.org/zh-cn/",
		icon: RiHomeSmileFill,
		label: "Homepage",
	},
];
