import type { IconType } from "react-icons";

export interface DeviceScreenshots {
	iphone: string[];
	ipad: string[];
}

export interface Feature {
	title: string;
	description: string;
	icon: IconType;
}

export interface FAQ {
	question: string;
	answer: string;
}

export interface StoreLinks {
	apple: string;
}

export interface SocialLink {
	url: string;
	icon: IconType;
	label: string;
}

export interface AppLogo {
	src: string;
}

export interface Announcement {
	message: string;
	type?: "warning" | "info" | "success";
	dismissible?: boolean;
	show?: boolean;
}

export interface Review {
	author: string;
	rating: number;
	text: string;
	avatar?: string;
}

export interface ChangelogUpdates {
	feature?: string[];
	improvement?: string[];
	bugfix?: string[];
}

export interface ChangelogVersion {
	version: string;
	build: number;
	date: string;
	title?: string;
	updates: ChangelogUpdates;
}

// 状态枚举：0=已完成, 1=开发中, 2=计划中, 3=Bug修复
export enum TodoStatus {
	Completed = 0,
	InProgress = 1,
	Planned = 2,
	Bug = 3,
}

export interface TodoItem {
	title: string;
	status?: TodoStatus;
	children?: TodoNode[];
}

export type TodoNode = TodoItem;

export interface AppData {
	title: string;
	description: string;
	screenshots: DeviceScreenshots;
	features: Feature[];
	faqs: FAQ[];
	storeLinks: StoreLinks;
	socialLinks: SocialLink[];
	logo: AppLogo;
	changelog?: ChangelogVersion[];
	announcement?: Announcement;
}

export interface WithImages {
	images: DeviceScreenshots;
}

export interface WithItems<T> {
	items: T[];
}

export interface StoreButtonProps {
	href: string;
	label: string;
	storeName: string;
}

export interface AppHeroProps {
	title: string;
	description: string;
	storeLinks: StoreLinks;
	logo: AppLogo;
}

export interface BreadcrumbsProps {
	items: {
		label: string;
		href?: string;
	}[];
}

export interface DeviceToggleProps {
	activeDevice: "iphone" | "ipad";
	onToggle: (device: "iphone" | "ipad") => void;
}

export interface GithubCornerProps {
	href: string;
}

export interface FeaturesProps extends WithItems<Feature> {}
export interface FAQProps extends WithItems<FAQ> {}
export interface ReviewsProps extends WithItems<Review> {}
export interface SocialLinksProps extends WithItems<SocialLink> {}
export interface ChangelogProps extends WithItems<ChangelogVersion> {}
export interface RoadmapProps extends WithItems<TodoNode> {}

export type ScreenshotsProps = WithImages;
export type LightboxProps = WithImages;

export function areImagesEqual<T extends WithImages>(
	prevProps: T,
	nextProps: T,
): boolean {
	return (
		prevProps.images.iphone === nextProps.images.iphone &&
		prevProps.images.ipad === nextProps.images.ipad
	);
}
