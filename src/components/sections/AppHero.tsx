import type { AppHeroProps, StoreButtonProps } from "config";
import { memo } from "react";
import { FaApple } from "react-icons/fa";

const AppHero = ({ title, description, storeLinks, logo }: AppHeroProps) => (
	<div className="mb-16 flex flex-col items-center md:items-start md:flex-row gap-8">
		<div className="flex-shrink-0 md:self-center">
			<div className="rounded-2xl border border-gray-200/50 dark:border-white/10 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-white/[0.02] dark:to-white/[0.05] p-4 w-[192px] h-[192px] flex items-center justify-center shadow-sm">
				<img
					src={logo.src}
					alt="MiniBili 应用图标 - 免费无广告的 iOS 哔哩哔哩第三方客户端"
					className="w-full h-full rounded-2xl object-contain"
					fetchPriority="high"
					decoding="async"
				/>
			</div>
		</div>

		<div className="flex flex-1 flex-col justify-between text-center md:text-left">
			<div>
				<h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">{title}</h1>
				<p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-6 max-w-2xl mx-auto md:mx-0">{description}</p>
			</div>

			<div className="flex flex-wrap gap-3 justify-center md:justify-start">
				<StoreButton href={storeLinks.ios} label="Download" storeName="iOS" />
				{storeLinks.macos && (
					<StoreButton href={storeLinks.macos} label="Download" storeName="macOS" />
				)}
				{storeLinks.tvos && (
					<StoreButton href={storeLinks.tvos} label="Download" storeName="tvOS" />
				)}
			</div>
		</div>
	</div>
);

const StoreButton = memo(({ href, label, storeName, onClick }: StoreButtonProps) => {
	const Icon = FaApple;

	return (
		<a
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			onClick={onClick}
			className="group flex items-center gap-2.5 rounded-xl border border-gray-300 dark:border-white/10 bg-white dark:bg-white/[0.04] px-4 py-2.5 transition-all duration-300 hover:bg-gray-50 dark:hover:bg-white/[0.08] hover:border-gray-400 dark:hover:border-white/20 shadow-sm"
		>
			<div className="flex items-center justify-center w-6 h-6">
				<Icon className={`text-gray-600 dark:text-gray-300 transition-transform duration-300 group-hover:scale-110 group-hover:text-gray-800 dark:group-hover:text-white w-5 h-5`} />
			</div>
			<span className="text-left">
				<div className="text-[10px] font-medium text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors leading-tight">{label}</div>
				<div className="text-xs font-bold tracking-wide text-gray-900 dark:text-white/90 group-hover:text-gray-900 dark:group-hover:text-white transition-colors leading-tight">{storeName}</div>
			</span>
		</a>
	);
});

StoreButton.displayName = "StoreButton";

export default memo(AppHero);
