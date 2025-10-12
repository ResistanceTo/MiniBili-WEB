import type { ChangelogProps } from "config";
import { memo } from "react";
import { FiClock, FiPackage, FiStar, FiTrendingUp, FiTool } from "react-icons/fi";

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

const getUpdateColor = (type: "feature" | "improvement" | "bugfix") => {
	switch (type) {
		case "feature":
			return "text-green-600 dark:text-green-400";
		case "improvement":
			return "text-blue-600 dark:text-blue-400";
		case "bugfix":
			return "text-orange-600 dark:text-orange-400";
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

	return (
		<div className="space-y-8">
			<div>
				<h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
					更新日志
				</h1>
			</div>

			<div className="space-y-6">
				{items.map(({ version, build, date, title, updates }) => (
						<div
							key={`${version}-${build}`}
							className="rounded-2xl border border-gray-300 dark:border-white/10 bg-white dark:bg-white/[0.03] p-6 shadow-sm"
						>
							{/* 版本头部 */}
							<div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200 dark:border-white/10">
								<div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gray-100 dark:bg-white/[0.04]">
									<FiPackage className="w-6 h-6 text-gray-700 dark:text-white opacity-90" />
								</div>
								<div className="flex-1">
									<h2 className="text-xl font-semibold text-gray-900 dark:text-white">
										版本 {version} (Build {build})
									</h2>
									<div className="flex items-center gap-2 mt-1 text-sm text-gray-500 dark:text-gray-400">
										<FiClock className="w-4 h-4" />
										<span>{date}</span>
									</div>
								</div>
							</div>

							{/* 版本标题/亮点 */}
							{title && (
								<div className="mb-5 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800/30">
									<p className="text-base font-medium text-gray-900 dark:text-white">
										{title}
									</p>
								</div>
							)}

							{/* 更新内容分组 */}
							<div className="space-y-5">
								{updates.feature && updates.feature.length > 0 && (
									<div>
										<h3 className="flex items-center gap-2 text-base font-medium text-gray-900 dark:text-white mb-3">
											<FiStar className="w-5 h-5 text-green-600 dark:text-green-400" />
											{getUpdateLabel("feature")}
										</h3>
										<ul className="space-y-2 ml-7">
											{updates.feature.map((content, idx) => (
												<li
													key={idx}
													className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed flex items-center gap-2"
												>
													<span className="text-green-600 dark:text-green-400">•</span>
													<span>{content}</span>
												</li>
											))}
										</ul>
									</div>
								)}

								{updates.improvement && updates.improvement.length > 0 && (
									<div>
										<h3 className="flex items-center gap-2 text-base font-medium text-gray-900 dark:text-white mb-3">
											<FiTrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
											{getUpdateLabel("improvement")}
										</h3>
										<ul className="space-y-2 ml-7">
											{updates.improvement.map((content, idx) => (
												<li
													key={idx}
													className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed flex items-center gap-2"
												>
													<span className="text-blue-600 dark:text-blue-400">•</span>
													<span>{content}</span>
												</li>
											))}
										</ul>
									</div>
								)}

								{updates.bugfix && updates.bugfix.length > 0 && (
									<div>
										<h3 className="flex items-center gap-2 text-base font-medium text-gray-900 dark:text-white mb-3">
											<FiTool className="w-5 h-5 text-orange-600 dark:text-orange-400" />
											{getUpdateLabel("bugfix")}
										</h3>
										<ul className="space-y-2 ml-7">
											{updates.bugfix.map((content, idx) => (
												<li
													key={idx}
													className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed flex items-center gap-2"
												>
													<span className="text-orange-600 dark:text-orange-400">•</span>
													<span>{content}</span>
												</li>
											))}
										</ul>
									</div>
								)}
							</div>
						</div>
					))}
			</div>
		</div>
	);
};

export default memo(ChangelogFull);
