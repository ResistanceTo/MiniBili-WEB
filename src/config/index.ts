import { appInfo } from "./appInfo";
import { changelog } from "./changelog";
import { faq } from "./faq";
import { features } from "./features";
import { screenshots } from "./screenshots";
import { socialLinks } from "./socialLinks";
import type { AppData } from "./types";

export const siteConfig: AppData = {
	...appInfo,
	features,
	faqs: faq,
	screenshots,
	socialLinks,
	changelog,
};

// Re-export types for easier imports
export * from "./types";
