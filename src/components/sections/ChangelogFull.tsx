import { type ChangelogProps, type ChangelogEntry, AppPlatform } from "config";
import type { IconType } from "react-icons";
import { memo, useMemo, useState } from "react";
import { FiClock, FiPackage, FiStar, FiTrendingUp, FiTool, FiMonitor, FiSmartphone, FiTv, FiWatch, FiTarget } from "react-icons/fi";
import { motion } from "framer-motion";

type UpdateType = "feature" | "improvement" | "bugfix";

const getUpdateLabel = (type: UpdateType) => {
	switch (type) {
		case "feature":
			return "新功能";
		case "improvement":
			return "优化改进";
		case "bugfix":
			return "问题修复";
	}
};

const UPDATE_GROUPS: { key: UpdateType; icon: IconType; color: string; dot: string }[] = [
	{ key: "feature", icon: FiStar, color: "text-emerald-500", dot: "bg-emerald-500" },
	{ key: "improvement", icon: FiTrendingUp, color: "text-sky-500", dot: "bg-sky-500" },
	{ key: "bugfix", icon: FiTool, color: "text-amber-500", dot: "bg-amber-500" },
];

const PLATFORM_TABS: { platform: AppPlatform; label: string; icon: IconType }[] = [
	{ platform: AppPlatform.iOS, label: "iOS", icon: FiSmartphone },
	{ platform: AppPlatform.macOS, label: "macOS", icon: FiMonitor },
	{ platform: AppPlatform.tvOS, label: "tvOS", icon: FiTv },
	{ platform: AppPlatform.watchOS, label: "watchOS", icon: FiWatch },
	{ platform: AppPlatform.visionOS, label: "visionOS", icon: FiTarget },
];

const renderChangelogItem = (item: string | ChangelogEntry, idx: number) => {
	const text = typeof item === "string" ? item : item.text;
	const images = typeof item === "string" ? undefined : item.images;

	return (
		<div key={idx} className="space-y-2">
			<span>{text}</span>
			{images && images.length > 0 && (
				<div className="mt-2 grid grid-cols-2 gap-2">
					{images.map((imgPath, imgIdx) => (
						<img
							key={imgIdx}
							src={imgPath}
							alt={`${text} - ${imgIdx + 1}`}
							loading="lazy"
							className="cursor-pointer rounded-xl ring-1 ring-hairline/10 transition-opacity hover:opacity-90"
							onClick={() => window.open(imgPath, "_blank", "noopener,noreferrer")}
						/>
					))}
				</div>
			)}
		</div>
	);
};

const ChangelogFull = ({ items }: ChangelogProps) => {
	const [activePlatform, setActivePlatform] = useState<AppPlatform>(AppPlatform.iOS);

	const filteredItems = useMemo(() => {
		return items.filter((item) => {
			const itemPlatforms = item.platforms || [AppPlatform.iOS];
			return itemPlatforms.includes(activePlatform);
		});
	}, [items, activePlatform]);

	const stats = useMemo(() => {
		let feature = 0, improvement = 0, bugfix = 0;
		filteredItems.forEach(({ updates }) => {
			feature += updates.feature?.length ?? 0;
			improvement += updates.improvement?.length ?? 0;
			bugfix += updates.bugfix?.length ?? 0;
		});
		return { versions: filteredItems.length, feature, improvement, bugfix };
	}, [filteredItems]);

	return (
		<div className="space-y-8">
			<div className="text-center">
				<p className="mb-2 text-sm font-semibold tracking-[0.15em] text-brand">持续进化</p>
				<h1 className="text-4xl font-bold tracking-tight text-ink sm:text-5xl">更新日志</h1>
			</div>

			<div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
				{[
					{ label: "个版本", value: stats.versions, color: "text-ink" },
					{ label: "项新功能", value: stats.feature, color: "text-emerald-500" },
					{ label: "项优化", value: stats.improvement, color: "text-sky-500" },
					{ label: "项修复", value: stats.bugfix, color: "text-amber-500" },
				].map(({ label, value, color }) => (
					<div key={label} className="glass rounded-2xl px-4 py-3 text-center">
						<div className={`text-2xl font-bold ${color}`}>{value}</div>
						<div className="text-xs text-ink-subtle">{label}</div>
					</div>
				))}
			</div>

			<div className="flex justify-center">
				<div className="glass flex max-w-full items-center gap-1 overflow-x-auto overflow-y-hidden rounded-2xl p-1 scrollbar-hide">
					{PLATFORM_TABS.map(({ platform, label, icon }) => (
						<PlatformTab
							key={platform}
							label={label}
							icon={icon}
							isActive={activePlatform === platform}
							onClick={() => setActivePlatform(platform)}
						/>
					))}
				</div>
			</div>

			{filteredItems.length === 0 ? (
				<div className="glass rounded-3xl py-16 text-center text-ink-muted">
					<p>该平台暂无更新日志</p>
				</div>
			) : (
				<div className="relative space-y-5 before:absolute before:left-[14px] before:top-3 before:h-[calc(100%-2rem)] before:w-px before:bg-hairline/15 sm:before:left-[15px]">
					{filteredItems.map(({ version, build, date, title, updates }) => (
						<div key={`${version}-${build}`} className="relative pl-10 sm:pl-12">
							<span className="absolute left-0 top-2 flex h-[30px] w-[30px] items-center justify-center rounded-full bg-brand/15 ring-4 ring-[rgb(var(--page-bg))] sm:h-8 sm:w-8">
								<FiPackage className="h-3.5 w-3.5 text-brand" />
							</span>

							<article className="glass rounded-3xl p-5 transition-transform duration-300 hover:-translate-y-0.5 sm:p-6">
								<div className="mb-4 flex flex-wrap items-center justify-between gap-2">
									<div className="flex items-baseline gap-2">
										<span className="text-xl font-bold text-ink">{build}</span>
										<span className="rounded-full bg-hairline/[0.06] px-2.5 py-0.5 text-xs font-medium text-ink-muted">{version}</span>
									</div>
									<div className="flex items-center gap-1.5 text-xs text-ink-subtle">
										<FiClock className="h-3.5 w-3.5" />
										<span>{date}</span>
									</div>
								</div>

								{title && (
									<div className="mb-4 rounded-2xl border border-brand/20 bg-brand/[0.06] px-3.5 py-2.5">
										<p className="text-sm font-medium leading-relaxed text-ink">{title}</p>
									</div>
								)}

								<div className="space-y-4">
									{UPDATE_GROUPS.map(({ key, icon: Icon, color, dot }) =>
										updates[key] && updates[key]!.length > 0 ? (
											<div key={key}>
												<h3 className={`mb-2 flex items-center gap-2 text-sm font-semibold ${color}`}>
													<Icon className="h-4 w-4" />
													{getUpdateLabel(key)}
												</h3>
												<ul className="ml-1 space-y-2.5">
													{updates[key]!.map((content, idx) => (
														<li key={idx} className="flex items-start gap-2.5 text-sm leading-relaxed text-ink-muted">
															<span className={`mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full ${dot}`} />
															<div className="flex-1">{renderChangelogItem(content, idx)}</div>
														</li>
													))}
												</ul>
											</div>
										) : null
									)}
								</div>
							</article>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

const PlatformTab = ({ label, icon: Icon, isActive, onClick }: {
	label: string;
	icon: IconType;
	isActive: boolean;
	onClick: () => void;
}) => (
	<button
		type="button"
		onClick={onClick}
		aria-pressed={isActive}
		className={`relative flex flex-shrink-0 items-center gap-2 whitespace-nowrap rounded-xl px-4 py-2 text-sm font-medium transition-colors ${isActive ? "text-white" : "text-ink-muted hover:text-ink"}`}
	>
		{isActive && (
			<motion.div
				layoutId="activePlatform"
				className="absolute inset-0 rounded-xl bg-brand shadow-[0_4px_14px_-4px_rgba(251,114,153,0.6)]"
				transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
			/>
		)}
		<span className="relative z-10 flex items-center gap-2">
			<Icon className="h-4 w-4" />
			{label}
		</span>
	</button>
);

export default memo(ChangelogFull);
