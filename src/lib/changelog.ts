import {
	AppPlatform,
	type ChangelogEntry,
	type ChangelogUpdates,
	type ChangelogVersion,
} from "../config/types";

export type UpdateKind = keyof ChangelogUpdates;

export const updateGroups: { key: UpdateKind; label: string }[] = [
	{ key: "feature", label: "新功能" },
	{ key: "improvement", label: "优化改进" },
	{ key: "bugfix", label: "问题修复" },
];

export const platformOrder = [
	AppPlatform.iOS,
	AppPlatform.macOS,
	AppPlatform.watchOS,
	AppPlatform.tvOS,
	AppPlatform.visionOS,
];

export interface ChangelogRelease extends ChangelogVersion {
	// 页面内锚点：构建号首次出现时就是构建号本身（兼容旧链接），重复的构建号追加日期
	anchor: string;
	platforms: AppPlatform[];
}

export const normalizeEntry = (entry: string | ChangelogEntry) =>
	typeof entry === "string"
		? { text: entry, images: [] as string[] }
		: { text: entry.text, images: entry.images ?? [] };

export const withAnchors = (items: ChangelogVersion[]): ChangelogRelease[] => {
	const used = new Set<string>();
	return items.map((item) => {
		let anchor = String(item.build);
		if (used.has(anchor)) anchor = `${item.build}-${item.date}`;
		used.add(anchor);
		return { ...item, anchor, platforms: item.platforms ?? [AppPlatform.iOS] };
	});
};

export const countUpdates = (items: ChangelogVersion[]) =>
	items.reduce(
		(total, { updates }) => ({
			versions: total.versions + 1,
			feature: total.feature + (updates.feature?.length ?? 0),
			improvement: total.improvement + (updates.improvement?.length ?? 0),
			bugfix: total.bugfix + (updates.bugfix?.length ?? 0),
		}),
		{ versions: 0, feature: 0, improvement: 0, bugfix: 0 },
	);
