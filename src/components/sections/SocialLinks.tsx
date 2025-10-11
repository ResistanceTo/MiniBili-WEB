import type { SocialLink, SocialLinksProps } from "config";
import { memo } from "react";

const SocialLinks = ({ items }: SocialLinksProps) => (
	<div className="mb-8">
		<div className="relative">
			<div className="absolute inset-0 flex items-center">
				<div className="mx-auto border-t border-gray-300 dark:border-white/10" />
			</div>
			<div className="relative flex justify-center">
				<span className="bg-gray-50 dark:bg-black px-6 text-sm font-medium tracking-wider text-gray-500 dark:text-white/50 uppercase">
					Social Media
				</span>
			</div>
		</div>

		<div className="mt-6 flex justify-center gap-4">
			{items.map(({ icon: Icon, label, url }: SocialLink) => (
				<a
					key={label}
					href={url}
					target="_blank"
					rel="noopener noreferrer"
					className="group rounded-xl border border-gray-300 dark:border-white/10 bg-white dark:bg-white/[0.03] p-3 transition-all duration-200 hover:bg-gray-50 dark:hover:bg-white/[0.05] shadow-sm"
					aria-label={label}
				>
					<Icon className="h-5 w-5 text-gray-600 dark:text-gray-400 transition-colors group-hover:text-gray-800 dark:group-hover:text-white" />
				</a>
			))}
		</div>
	</div>
);

export default memo(SocialLinks);
