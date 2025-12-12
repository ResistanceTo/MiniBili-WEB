import type { IconType } from "react-icons";

export interface MediaItem {
	src: string;
	type: "image" | "video";
	poster?: string;
}

export enum DeviceType {
	iPhone = "iphone",
	iPad = "ipad",
	macOS = "macos",
	tvOS = "tvos",
}

export interface DeviceScreenshots {
	[DeviceType.iPhone]: (string | MediaItem)[];
	[DeviceType.iPad]: (string | MediaItem)[];
	[DeviceType.macOS]?: (string | MediaItem)[];
	[DeviceType.tvOS]?: (string | MediaItem)[];
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
	ios: string;
	macos?: string;
	tvos?: string;
	watchos?: string;
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

export enum AppPlatform {
	iOS = "ios",
	macOS = "macos",
	tvOS = "tvos",
	watchOS = "watchos",
}

export interface ChangelogVersion {
	version: string;
	build: number;
	date: string;
	title?: string;
	updates: ChangelogUpdates;
	platforms?: AppPlatform[];
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
	icon?: IconType;
	className?: string;
	onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
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
	activeDevice: DeviceType;
	onToggle: (device: DeviceType) => void;
}

export interface GithubCornerProps {
	href: string;
}

export interface FeaturesProps extends WithItems<Feature> { }
export interface FAQProps extends WithItems<FAQ> { }
export interface ReviewsProps extends WithItems<Review> { }
export interface SocialLinksProps extends WithItems<SocialLink> { }
export interface ChangelogProps extends WithItems<ChangelogVersion> { }
export interface RoadmapProps extends WithItems<TodoNode> { }

export type ScreenshotsProps = WithImages;
export type LightboxProps = WithImages;

export function areImagesEqual<T extends WithImages>(
	prevProps: T,
	nextProps: T,
): boolean {
	return (
		prevProps.images[DeviceType.iPhone] === nextProps.images[DeviceType.iPhone] &&
		prevProps.images[DeviceType.iPad] === nextProps.images[DeviceType.iPad] &&
		prevProps.images[DeviceType.macOS] === nextProps.images[DeviceType.macOS] &&
		prevProps.images[DeviceType.tvOS] === nextProps.images[DeviceType.tvOS]
	);
}
