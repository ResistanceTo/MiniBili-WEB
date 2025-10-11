import { appInfo } from "./appInfo";
import { faq } from "./faq";
import { features } from "./features";
import { reviews } from "./reviews";
import { screenshots } from "./screenshots";
import { socialLinks } from "./socialLinks";
import type { AppData } from "./types";

export const siteConfig: AppData = {
	...appInfo,
	features,
	faqs: faq,
	screenshots,
	socialLinks,
	reviews,
};

// Re-export types for easier imports
export * from "./types";
