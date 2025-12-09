import { memo } from "react";
import { RiTelegram2Fill, RiGithubFill, RiMailFill } from "react-icons/ri";

interface CommunityLink {
	icon: typeof RiTelegram2Fill;
	title: string;
	description: string;
	url: string;
	primary?: boolean;
}

const communityLinks: CommunityLink[] = [
	{
		icon: RiTelegram2Fill,
		title: "Telegram 群组",
		description: "获取最新动态和技术交流",
		url: "https://t.me/MiniBiliGroup",
		primary: true,
	},
	{
		icon: RiGithubFill,
		title: "GitHub Issues",
		description: "报告问题、提出建议",
		url: "https://github.com/ResistanceTo/MiniBili-WEB/issues",
	},
	{
		icon: RiMailFill,
		title: "电子邮件",
		description: "发送邮件联系开发者",
		url: "mailto:me@zhaohe.org",
	},
];

const Community = () => {
	return (
		<div id="community" className="mb-16 scroll-mt-20">
			<h2 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
				社区和反馈
			</h2>
			<div className="grid grid-cols-1 gap-3 md:grid-cols-3">
				{communityLinks.map((link) => (
					<a
						key={link.title}
						href={link.url}
						target="_blank"
						rel="noopener noreferrer"
						className={`group flex items-center gap-3 rounded-xl border p-4 transition-all duration-300 hover:shadow-md ${
							link.primary
								? "border-blue-300 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30"
								: "border-gray-300 dark:border-white/10 bg-white dark:bg-white/[0.03] hover:bg-gray-50 dark:hover:bg-white/[0.08]"
						}`}
					>
						<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 dark:bg-white/[0.04] group-hover:scale-110 transition-transform flex-shrink-0">
							<link.icon
								className={`h-5 w-5 ${
									link.primary
										? "text-blue-600 dark:text-blue-400"
										: "text-gray-700 dark:text-white"
								} opacity-90`}
							/>
						</div>
						<div className="flex-1 min-w-0">
							<h3 className="text-base font-medium text-gray-900 dark:text-white truncate">
								{link.title}
							</h3>
							<p className="text-xs text-gray-600 dark:text-gray-400 truncate">
								{link.description}
							</p>
						</div>
					</a>
				))}
			</div>
		</div>
	);
};

export default memo(Community);
