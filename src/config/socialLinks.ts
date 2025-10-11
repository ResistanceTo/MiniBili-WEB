import {
	RiGithubFill,
	RiTelegram2Fill,
	RiTwitterXFill,
} from "react-icons/ri";
import type { SocialLink } from "./types";

export const socialLinks: SocialLink[] = [
	{
		url: "https://github.com/ResistanceTo",
		icon: RiGithubFill,
		label: "GitHub",
	},
	{
		url: "https://t.me/ResistanceTo",
		icon: RiTelegram2Fill,
		label: "Telegram",
	},
	// {
	// 	url: "#",
	// 	icon: RiTwitterXFill,
	// 	label: "Twitter",
	// },
];
