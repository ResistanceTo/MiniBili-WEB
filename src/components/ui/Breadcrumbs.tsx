import type { BreadcrumbsProps } from "config";
import { memo } from "react";
import { FiChevronRight, FiHome } from "react-icons/fi";

const Breadcrumbs = ({ items }: BreadcrumbsProps) => (
	<nav className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-8">
		<a href="/" className="hover:text-gray-800 dark:hover:text-white transition-colors p-2 -ml-2">
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
					<span className="text-gray-900 dark:text-white">{label}</span>
				)}
			</div>
		))}
	</nav>
);

export default memo(Breadcrumbs);
