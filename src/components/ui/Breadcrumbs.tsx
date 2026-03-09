import type { BreadcrumbsProps } from "config";
import { memo } from "react";
import { FiChevronRight, FiHome } from "react-icons/fi";

const Breadcrumbs = ({ items }: BreadcrumbsProps) => (
	<nav aria-label="面包屑导航" className="mb-8 flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
		<a href="/" className="p-2 -ml-2 transition-colors hover:text-gray-800 dark:hover:text-white" aria-label="返回首页">
			<FiHome className="w-4 h-4" />
		</a>
		{items.map(({ label, href }) => (
			<div key={label} className="flex items-center space-x-2">
				<FiChevronRight className="w-4 h-4 text-gray-400 dark:text-gray-600" />
				{href ? (
					<a href={href} className="hover:text-gray-800 dark:hover:text-white transition-colors">
						{label}
					</a>
				) : (
					<span aria-current="page" className="text-gray-900 dark:text-white">{label}</span>
				)}
			</div>
		))}
	</nav>
);

export default memo(Breadcrumbs);
