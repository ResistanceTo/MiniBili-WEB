import { type DeviceToggleProps, DeviceType } from "config";
import { motion } from "framer-motion";
import { memo, useCallback } from "react";

const DeviceToggle = ({ activeDevice, onToggle }: DeviceToggleProps) => {
	const handleIphoneClick = useCallback(() => onToggle(DeviceType.iOS), [onToggle]);
	const handleIpadClick = useCallback(() => onToggle(DeviceType.iPadOS), [onToggle]);
	const handleMacosClick = useCallback(() => onToggle(DeviceType.macOS), [onToggle]);
	const handleTvosClick = useCallback(() => onToggle(DeviceType.tvOS), [onToggle]);
	const handleWatchosClick = useCallback(() => onToggle(DeviceType.watchOS), [onToggle]);
	const handleVisionosClick = useCallback(() => onToggle(DeviceType.visionOS), [onToggle]);

	return (
		<div className="glass flex max-w-full items-center justify-start gap-1 overflow-x-auto overflow-y-hidden rounded-2xl p-1 scrollbar-hide md:justify-center">
			<DeviceButton
				key="iphone"
				isActive={activeDevice === DeviceType.iOS}
				onClick={handleIphoneClick}
				label="iPhone"
			/>
			<DeviceButton
				key="ipad"
				isActive={activeDevice === DeviceType.iPadOS}
				onClick={handleIpadClick}
				label="iPad"
			/>
			<DeviceButton
				key="macos"
				isActive={activeDevice === DeviceType.macOS}
				onClick={handleMacosClick}
				label="Mac"
			/>
			<DeviceButton
				key="tvos"
				isActive={activeDevice === DeviceType.tvOS}
				onClick={handleTvosClick}
				label="TV"
			/>
			<DeviceButton
				key="watchos"
				isActive={activeDevice === DeviceType.watchOS}
				onClick={handleWatchosClick}
				label="Watch"
			/>
			<DeviceButton
				key="visionos"
				isActive={activeDevice === DeviceType.visionOS}
				onClick={handleVisionosClick}
				label="Vision"
			/>
		</div>
	);
};

const DeviceButton = memo(({ isActive, onClick, label }: {
	isActive: boolean;
	onClick: () => void;
	label: string;
}) => (
	<motion.button
		type="button"
		onClick={onClick}
		aria-pressed={isActive}
		className={`relative flex-shrink-0 whitespace-nowrap rounded-xl px-4 py-1.5 text-sm font-medium transition-colors ${isActive
			? "text-white"
			: "text-ink-muted hover:text-ink"
			}`}
		whileTap={{ scale: 0.95 }}
	>
		{isActive && (
			<motion.div
				layoutId="activeDevice"
				className="absolute inset-0 rounded-xl bg-brand shadow-[0_4px_14px_-4px_rgba(251,114,153,0.6)]"
				transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
			/>
		)}
		<span className="relative z-10">{label}</span>
	</motion.button>
));

DeviceButton.displayName = "DeviceButton";

export default memo(DeviceToggle);
