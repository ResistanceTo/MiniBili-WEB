import { type ChangelogProps, type ChangelogEntry, AppPlatform } from "config";
import type { IconType } from "react-icons";
import { memo, useMemo, useState, useEffect, useCallback, useRef } from "react";
import { FiClock, FiPackage, FiStar, FiTrendingUp, FiTool, FiMonitor, FiSmartphone, FiTv, FiWatch, FiTarget, FiHash, FiCheck } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

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
	const [toastMessage, setToastMessage] = useState<string | null>(null);
	const [activeHash, setActiveHash] = useState<string>("");
	const isProgrammaticScroll = useRef<boolean>(false);

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

	// Initial hash sync and hashchange listener
	useEffect(() => {
		const syncHash = () => {
			const rawHash = window.location.hash.replace("#", "");
			setActiveHash(rawHash);
			if (!rawHash) return;

			const targetBuild = parseInt(rawHash, 10);
			if (isNaN(targetBuild)) return;

			const targetItem = items.find((item) => item.build === targetBuild);
			if (targetItem) {
				const itemPlatforms = targetItem.platforms || [AppPlatform.iOS];
				setActivePlatform((current) => {
					if (!itemPlatforms.includes(current)) {
						return itemPlatforms[0];
					}
					return current;
				});

				isProgrammaticScroll.current = true;
				setTimeout(() => {
					const el = document.getElementById(String(targetBuild));
					if (el) {
						el.scrollIntoView({ behavior: "smooth" });
					}
					setTimeout(() => {
						isProgrammaticScroll.current = false;
					}, 800);
				}, 150);
			}
		};

		syncHash();
		window.addEventListener("hashchange", syncHash);
		return () => window.removeEventListener("hashchange", syncHash);
	}, [items]);

	// Scroll spy to update hash automatically as user scrolls down/up
	useEffect(() => {
		if (typeof window === "undefined") return;

		const elements = filteredItems
			.map(({ build }) => document.getElementById(String(build)))
			.filter((el): el is HTMLElement => el !== null);

		if (elements.length === 0) return;

		const observer = new IntersectionObserver(
			(entries) => {
				if (isProgrammaticScroll.current) return;

				const visibleEntries = entries.filter((e) => e.isIntersecting);
				if (visibleEntries.length === 0) return;

				const topMost = visibleEntries.reduce((prev, curr) => {
					const prevDist = Math.abs(prev.boundingClientRect.top - 120);
					const currDist = Math.abs(curr.boundingClientRect.top - 120);
					return currDist < prevDist ? curr : prev;
				});

				const buildId = topMost.target.id;
				if (buildId && window.location.hash !== `#${buildId}`) {
					setActiveHash(buildId);
					window.history.replaceState(null, "", `#${buildId}`);
				}
			},
			{
				rootMargin: "-100px 0px -50% 0px",
				threshold: [0, 0.2, 0.5, 0.8, 1],
			}
		);

		elements.forEach((el) => observer.observe(el));

		return () => observer.disconnect();
	}, [filteredItems]);

	const handleCopyAnchor = useCallback((e: React.MouseEvent<HTMLAnchorElement>, build: number) => {
		e.preventDefault();
		const buildStr = String(build);
		const url = `${window.location.origin}${window.location.pathname}#${buildStr}`;
		window.history.pushState(null, "", `#${buildStr}`);
		setActiveHash(buildStr);

		isProgrammaticScroll.current = true;
		const el = document.getElementById(buildStr);
		if (el) {
			el.scrollIntoView({ behavior: "smooth" });
		}
		setTimeout(() => {
			isProgrammaticScroll.current = false;
		}, 800);

		if (navigator.clipboard) {
			navigator.clipboard.writeText(url).then(() => {
				setToastMessage(`已复制 Build ${build} 锚点链接`);
				setTimeout(() => {
					setToastMessage((prev) => (prev === `已复制 Build ${build} 锚点链接` ? null : prev));
				}, 2000);
			}).catch(() => {
				setToastMessage(`Build ${build}`);
				setTimeout(() => setToastMessage(null), 2000);
			});
		}
	}, []);

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
					{filteredItems.map(({ version, build, date, title, updates }) => {
						const buildStr = String(build);
						const isTargeted = activeHash === buildStr;

						return (
							<div key={`${version}-${build}`} id={buildStr} className="relative pl-10 sm:pl-12 scroll-mt-24 sm:scroll-mt-28">
								<span className="absolute left-0 top-2 flex h-[30px] w-[30px] items-center justify-center rounded-full bg-brand/15 ring-4 ring-[rgb(var(--page-bg))] sm:h-8 sm:w-8">
									<FiPackage className="h-3.5 w-3.5 text-brand" />
								</span>

								<article className={`glass rounded-3xl p-5 transition-all duration-300 hover:-translate-y-0.5 sm:p-6 target:ring-2 target:ring-brand target:ring-offset-2 target:ring-offset-[rgb(var(--page-bg))] ${isTargeted ? "ring-2 ring-brand ring-offset-2 ring-offset-[rgb(var(--page-bg))]" : ""}`}>
									<div className="mb-4 flex flex-wrap items-center justify-between gap-2">
										<div className="flex items-center gap-2">
											<a
												href={`#${buildStr}`}
												onClick={(e) => handleCopyAnchor(e, build)}
												className="group/anchor inline-flex items-center gap-1.5 text-xl font-bold text-ink transition-colors hover:text-brand"
												title={`复制 Build ${build} 锚点链接`}
											>
												<span>{build}</span>
												<FiHash className="h-4 w-4 text-brand/60 opacity-0 transition-all duration-200 group-hover/anchor:opacity-100 group-focus-within/anchor:opacity-100 group-hover/anchor:scale-110" />
											</a>
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
						);
					})}
				</div>
			)}

			<AnimatePresence>
				{toastMessage && (
					<motion.div
						initial={{ opacity: 0, y: 20, scale: 0.95 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: 10, scale: 0.95 }}
						className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full bg-slate-900/90 px-4 py-2 text-sm text-white shadow-xl backdrop-blur-md dark:bg-slate-100/90 dark:text-slate-900"
					>
						<FiCheck className="h-4 w-4 text-emerald-400 dark:text-emerald-600" />
						<span>{toastMessage}</span>
					</motion.div>
				)}
			</AnimatePresence>
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
