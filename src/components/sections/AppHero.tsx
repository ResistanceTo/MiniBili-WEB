import type { AppHeroProps, StoreLinks } from "config";
import { memo, useState, useRef, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";

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
				<TestFlightButton storeLinks={storeLinks} />
				<SponsorButton />
			</div>
		</div>
	</div>
);

interface TestFlightButtonProps {
	storeLinks: StoreLinks;
}

const TestFlightButton = memo(({ storeLinks }: TestFlightButtonProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	// 获取可用的平台列表
	const platforms = [
		{ key: 'ios', name: 'iOS', version: '26.0+', url: storeLinks.ios },
		{ key: 'macos', name: 'macOS', version: '15.0+', url: storeLinks.macos },
		{ key: 'watchos', name: 'watchOS', version: '11.0+', url: storeLinks.watchos },
		{ key: 'tvos', name: 'tvOS', version: '18.0+', url: storeLinks.tvos },
		{ key: 'visionOS', name: 'visionOS', version: '2.0+', url: storeLinks.visionOS },
	].filter(p => p.url);

	// 点击外部关闭下拉菜单
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	return (
		<div className="relative" ref={dropdownRef}>
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="group flex items-center gap-3 rounded-xl border border-gray-300 dark:border-white/10 bg-white dark:bg-white/[0.04] pl-3 pr-3 py-3 transition-all duration-300 hover:bg-gray-50 dark:hover:bg-white/[0.08] hover:border-gray-400 dark:hover:border-white/20 shadow-md hover:shadow-lg"
			>
				<img src="/TestFlight.png" alt="MiniBili TestFlight" className="w-10 h-10 rounded-lg" />
				<div className="flex flex-col items-start">
					<div className="text-xs text-gray-500 dark:text-gray-400">Download from</div>
					<div className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-1">
						TestFlight
						<FiChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
					</div>
				</div>
			</button>

			{isOpen && (
				<div className="absolute top-full left-0 mt-2 w-52 rounded-xl border border-gray-300 dark:border-white/10 bg-white dark:bg-neutral-900 shadow-xl overflow-hidden z-50">
					{platforms.map((platform) => (
						<a
							key={platform.key}
							href={platform.url}
							target="_blank"
							rel="noopener noreferrer"
							onClick={() => setIsOpen(false)}
							className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 dark:hover:bg-white/[0.08] transition-colors border-b border-gray-200 dark:border-white/5 last:border-b-0"
						>
							<span className="text-sm font-medium text-gray-900 dark:text-white">{platform.name}</span>
							<span className="text-xs text-gray-500 dark:text-gray-400">({platform.version})</span>
						</a>
					))}
				</div>
			)}
		</div>
	);
});

TestFlightButton.displayName = "TestFlightButton";

const SponsorButton = memo(() => (
	<a
		href="https://afdian.com/a/ResistanceTo"
		target="_blank"
		rel="noopener noreferrer"
		className="group flex items-center gap-3 rounded-xl border border-gray-300 dark:border-white/10 bg-white dark:bg-white/[0.04] pl-3 pr-5 py-3 transition-all duration-300 hover:bg-gray-50 dark:hover:bg-white/[0.08] hover:border-gray-400 dark:hover:border-white/20 shadow-md hover:shadow-lg"
	>
		<img src="/toubi.svg" alt="Sponsor" className="w-10 h-10" />
		<div className="flex flex-col items-start">
			<div className="text-xs text-gray-500 dark:text-gray-400">Support on</div>
			<div className="text-base font-bold text-gray-900 dark:text-white">
				爱发电
			</div>
		</div>
	</a>
));

SponsorButton.displayName = "SponsorButton";

export default memo(AppHero);
