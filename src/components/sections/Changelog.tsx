import type { ChangelogProps } from "config";
import { memo } from "react";
import { FiClock, FiPackage, FiStar, FiTrendingUp, FiTool } from "react-icons/fi";

const Changelog = ({ items }: ChangelogProps) => {
	// 只显示最新的 3 个版本
	const recentVersions = items.slice(0, 3);

	return (
		<div id="changelog" className="mb-16 scroll-mt-20">
			<div className="flex items-center justify-between mb-6">
				<h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
					最新更新
				</h2>
				<a
					href="/changelog"
					className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
				>
					查看全部 →
				</a>
			</div>
			<div className="space-y-3">
				{recentVersions.map(({ version, build, date, title, updates }) => (
					<div
						key={`${version}-${build}`}
						className="rounded-xl border border-gray-300 dark:border-white/10 bg-white dark:bg-white/[0.03] p-4 shadow-sm hover:shadow-md transition-shadow"
					>
						<div className="flex items-center justify-between mb-3">
							<div className="flex items-center gap-2.5">
								<div className="flex items-center justify-center w-9 h-9 rounded-lg bg-gray-100 dark:bg-white/[0.04]">
									<FiPackage className="w-4.5 h-4.5 text-gray-700 dark:text-white opacity-90" />
								</div>
								<h3 className="text-base font-medium text-gray-900 dark:text-white">
									版本 {version} (Build {build})
								</h3>
							</div>
							<div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
								<FiClock className="w-3 h-3" />
								<span>{date}</span>
							</div>
						</div>
						{title && (
							<div className="mb-3 ml-[42px] p-2.5 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/30">
								<p className="text-xs font-medium text-blue-900 dark:text-blue-300">
									{title}
								</p>
							</div>
						)}
						<ul className="space-y-1.5 ml-[42px]">
							{updates.feature?.map((content, idx) => (
								<li key={`feature-${idx}`} className="flex items-start gap-2 text-sm">
									<FiStar className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-green-600 dark:text-green-400" />
									<span className="text-gray-600 dark:text-gray-400 leading-relaxed">
										{content}
									</span>
								</li>
							))}
							{updates.improvement?.map((content, idx) => (
								<li key={`improvement-${idx}`} className="flex items-start gap-2 text-sm">
									<FiTrendingUp className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-blue-600 dark:text-blue-400" />
									<span className="text-gray-600 dark:text-gray-400 leading-relaxed">
										{content}
									</span>
								</li>
							))}
							{updates.bugfix?.map((content, idx) => (
								<li key={`bugfix-${idx}`} className="flex items-start gap-2 text-sm">
									<FiTool className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-orange-600 dark:text-orange-400" />
									<span className="text-gray-600 dark:text-gray-400 leading-relaxed">
										{content}
									</span>
								</li>
							))}
						</ul>
					</div>
				))}
			</div>
		</div>
	);
};

export default memo(Changelog);
