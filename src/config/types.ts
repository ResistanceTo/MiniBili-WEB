import type { IconType } from "react-icons";

export enum DeviceType {
	iOS = "iOS",
	iPadOS = "iPadOS",
	macOS = "macOS",
	tvOS = "tvOS",
	watchOS = "watchOS",
	visionOS = "visionOS",
}

export interface Screenshot {
	src: string;
	// 截图说明（用作 alt 文本）
	zh: string;
	en: string;
}

export type DeviceScreenshots = Partial<Record<DeviceType, Screenshot[]>>;

export interface Feature {
	title: string;
	description: string;
	icon: IconType;
}

export interface FAQ {
	// 页面锚点，例如 faq-install
	id?: string;
	question: string;
	answer: string;
}

export interface StoreLinks {
	ios: string;
	macos?: string;
	tvos?: string;
	watchos?: string;
	visionOS?: string;
}

export interface AppLogo {
	src: string;
}

export type AnnouncementMessage = string | { text: string; expires?: string };

export interface Announcement {
	message: AnnouncementMessage | AnnouncementMessage[];
	type?: "warning" | "info" | "success";
	dismissible?: boolean;
	show?: boolean;
}

export interface ChangelogEntry {
	text: string;
	images?: string[];
}

export interface ChangelogUpdates {
	feature?: (string | ChangelogEntry)[];
	improvement?: (string | ChangelogEntry)[];
	bugfix?: (string | ChangelogEntry)[];
}

export enum AppPlatform {
	iOS = "iOS",
	macOS = "macOS",
	tvOS = "tvOS",
	watchOS = "watchOS",
	visionOS = "visionOS",
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
	logo: AppLogo;
	changelog?: ChangelogVersion[];
	announcement?: Announcement;
}

export interface WithItems<T> {
	items: T[];
}

export interface BreadcrumbsProps {
	items: {
		label: string;
		href?: string;
	}[];
}

export interface FeaturesProps extends WithItems<Feature> { }
export interface FAQProps extends WithItems<FAQ> { }
export interface ChangelogProps extends WithItems<ChangelogVersion> { }
