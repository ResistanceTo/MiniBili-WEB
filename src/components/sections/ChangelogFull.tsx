import { type ChangelogProps, AppPlatform } from "config";
import { memo, useState, useMemo } from "react";
import { FiClock, FiPackage, FiStar, FiTrendingUp, FiTool, FiMonitor, FiSmartphone, FiTablet, FiTv, FiWatch, FiTarget } from "react-icons/fi";
import { motion } from "framer-motion";

const getUpdateIcon = (type: "feature" | "improvement" | "bugfix") => {
	switch (type) {
		case "feature":
			return FiStar;
		case "improvement":
			return FiTrendingUp;
		case "bugfix":
			return FiTool;
	}
};

const getUpdateLabel = (type: "feature" | "improvement" | "bugfix") => {
	switch (type) {
		case "feature":
			return "新功能";
		case "improvement":
			return "优化改进";
		case "bugfix":
			return "问题修复";
	}
};

const ChangelogFull = ({ items }: ChangelogProps) => {
	const [activePlatform, setActivePlatform] = useState<AppPlatform>(AppPlatform.iOS);

	const filteredItems = useMemo(() => {
		return items.filter(item => {
			// If no platforms specified, assume it's for all (or at least iOS which is the base)
			// But for this requirement, we want to filter.
			// If item has no platforms field, we assume it is iOS (legacy items).
			const itemPlatforms = item.platforms || [AppPlatform.iOS];
			return itemPlatforms.includes(activePlatform);
		});
	}, [items, activePlatform]);

	return (
		<div className="space-y-8">
			<div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
				<h1 className="text-3xl font-bold text-gray-900 dark:text-white">
					更新日志
				</h1>

				<div className="flex items-center p-1 rounded-xl bg-gray-100 dark:bg-white/[0.05] border border-gray-200 dark:border-white/10 self-start md:self-auto overflow-x-auto overflow-y-hidden max-w-full scrollbar-hide">
					<PlatformTab
						platform={AppPlatform.iOS}
						label="iOS"
						icon={FiSmartphone}
						isActive={activePlatform === AppPlatform.iOS}
						onClick={() => setActivePlatform(AppPlatform.iOS)}
					/>
					<PlatformTab
						platform={AppPlatform.macOS}
						label="macOS"
						icon={FiMonitor}
						isActive={activePlatform === AppPlatform.macOS}
						onClick={() => setActivePlatform(AppPlatform.macOS)}
					/>
					<PlatformTab
						platform={AppPlatform.tvOS}
						label="tvOS"
						icon={FiTv}
						isActive={activePlatform === AppPlatform.tvOS}
						onClick={() => setActivePlatform(AppPlatform.tvOS)}
					/>
					<PlatformTab
						platform={AppPlatform.watchOS}
						label="watchOS"
						icon={FiWatch}
						isActive={activePlatform === AppPlatform.watchOS}
						onClick={() => setActivePlatform(AppPlatform.watchOS)}
					/>
					<PlatformTab
						platform={AppPlatform.visionOS}
						label="visionOS"
						icon={FiTarget}
						isActive={activePlatform === AppPlatform.visionOS}
						onClick={() => setActivePlatform(AppPlatform.visionOS)}
					/>
				</div>
			</div>

			<div className="space-y-4">
				{filteredItems.length === 0 ? (
					<div className="text-center py-12 text-gray-500 dark:text-gray-400">
						<p>该平台暂无更新日志</p>
					</div>
				) : (
					filteredItems.map(({ version, build, date, title, updates }) => (
						<div
							key={`${version}-${build}`}
							className="rounded-xl border border-gray-300 dark:border-white/10 bg-white dark:bg-white/[0.03] p-5 shadow-sm"
						>
							<div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200 dark:border-white/10">
								<div className="flex items-center gap-3">
									<div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 dark:bg-white/[0.04]">
										<FiPackage className="w-5 h-5 text-gray-700 dark:text-white opacity-90" />
									</div>
									<h2 className="text-lg font-semibold text-gray-900 dark:text-white">
										版本 {version} (Build {build})
									</h2>
								</div>
								<div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
									<FiClock className="w-3.5 h-3.5" />
									<span>{date}</span>
								</div>
							</div>

							{/* 版本标题/亮点 */}
							{title && (
								<div className="mb-4 p-3 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800/30">
									<p className="text-sm font-medium text-gray-900 dark:text-white">
										{title}
									</p>
								</div>
							)}

							{/* 更新内容分组 */}
							<div className="space-y-3">
								{updates.feature && updates.feature.length > 0 && (
									<div>
										<h3 className="flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-white mb-2">
											<FiStar className="w-4 h-4 text-green-600 dark:text-green-400" />
											{getUpdateLabel("feature")}
										</h3>
										<ul className="space-y-1 ml-6">
											{updates.feature.map((content, idx) => (
												<li
													key={idx}
													className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed flex items-start gap-2"
												>
													<span className="text-green-600 dark:text-green-400 mt-0.5">•</span>
													<span>{content}</span>
												</li>
											))}
										</ul>
									</div>
								)}

								{updates.improvement && updates.improvement.length > 0 && (
									<div>
										<h3 className="flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-white mb-2">
											<FiTrendingUp className="w-4 h-4 text-blue-600 dark:text-blue-400" />
											{getUpdateLabel("improvement")}
										</h3>
										<ul className="space-y-1 ml-6">
											{updates.improvement.map((content, idx) => (
												<li
													key={idx}
													className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed flex items-start gap-2"
												>
													<span className="text-blue-600 dark:text-blue-400 mt-0.5">•</span>
													<span>{content}</span>
												</li>
											))}
										</ul>
									</div>
								)}

								{updates.bugfix && updates.bugfix.length > 0 && (
									<div>
										<h3 className="flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-white mb-2">
											<FiTool className="w-4 h-4 text-orange-600 dark:text-orange-400" />
											{getUpdateLabel("bugfix")}
										</h3>
										<ul className="space-y-1 ml-6">
											{updates.bugfix.map((content, idx) => (
												<li
													key={idx}
													className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed flex items-start gap-2"
												>
													<span className="text-orange-600 dark:text-orange-400 mt-0.5">•</span>
													<span>{content}</span>
												</li>
											))}
										</ul>
									</div>
								)}
							</div>
						</div>
					))
				)}
			</div>
		</div>
	);
};

const PlatformTab = ({ platform, label, icon: Icon, isActive, onClick }: {
	platform: AppPlatform;
	label: string;
	icon: any;
	isActive: boolean;
	onClick: () => void;
}) => (
	<button
		onClick={onClick}
		className={`relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 whitespace-nowrap flex-shrink-0 ${isActive
			? "text-gray-900 dark:text-white"
			: "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
			}`}
	>
		{isActive && (
			<motion.div
				layoutId="activePlatform"
				className="absolute inset-0 rounded-lg bg-white dark:bg-white/10 shadow-sm"
				transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
			/>
		)}
		<span className="relative z-10 flex items-center gap-2">
			<Icon className="w-4 h-4" />
			{label}
		</span>
	</button>
);

export default memo(ChangelogFull);
