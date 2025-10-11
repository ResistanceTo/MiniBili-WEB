import { FiBox, FiStar, FiZap } from "react-icons/fi";
import type { Feature } from "./types";

export const features: Feature[] = [
	{
		title: "Main Feature",
		description: "Describe your main feature here. What makes it special?",
		icon: FiStar,
	},
	{
		title: "Another Feature",
		description: "What else can your app do? Tell users about it here.",
		icon: FiZap,
	},
	{
		title: "One More Feature",
		description: "Add another key feature of your application here.",
		icon: FiBox,
	},
];
