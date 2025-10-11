import type { ScreenshotsProps } from "config";
import { areImagesEqual } from "config";
import { AnimatePresence, motion } from "framer-motion";
import { memo, useState } from "react";
import DeviceToggle from "../ui/DeviceToggle";

const Screenshots = ({ images }: ScreenshotsProps) => {
	const [activeDevice, setActiveDevice] = useState<"iphone" | "ipad">("iphone");
	const currentImages = images[activeDevice];
	const isIphone = activeDevice === "iphone";

	const handleAnimationEvent = (action: "add" | "remove") => {
		const container = document.querySelector(".screenshots-container");
		container?.classList[action]("overflow-x-auto");
	};

	return (
		<div className="mb-16">
			<div className="mb-6 flex items-center justify-between">
				<h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
					Screenshots
				</h2>
				<DeviceToggle activeDevice={activeDevice} onToggle={setActiveDevice} />
			</div>
			<div className={`relative overflow-hidden min-h-[${isIphone ? "400px" : "300px"}]`}>
				<AnimatePresence mode="wait">
					<motion.div
						key={activeDevice}
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: -20 }}
						transition={{ duration: 0.3 }}
						className="screenshots-container scrollbar-thin scrollbar-track-gray-200 dark:scrollbar-track-white/5 scrollbar-thumb-gray-400 dark:scrollbar-thumb-white/10 hover:scrollbar-thumb-gray-500 dark:hover:scrollbar-thumb-white/20"
						onAnimationComplete={() => handleAnimationEvent("add")}
						onAnimationStart={() => handleAnimationEvent("remove")}
					>
						<div className="flex gap-6 pb-4">
							{currentImages.map((image, index) => (
								<motion.button
									key={image}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0, transition: { delay: index * 0.1 } }}
									exit={{ opacity: 0, y: 20 }}
									onClick={() => window.openLightbox?.(index, activeDevice)}
									className="relative flex-shrink-0 overflow-hidden rounded-xl focus:outline-none"
								>
									<img
										src={image}
										alt={`Screenshot ${index + 1}`}
										className={`rounded-xl border border-gray-300 dark:border-white/10 object-cover shadow-lg ${isIphone ? "aspect-[9/16] w-[260px]" : "aspect-[4/3] w-[360px]"
											}`}
										loading="lazy"
									/>
								</motion.button>
							))}
						</div>
					</motion.div>
				</AnimatePresence>
			</div>
		</div>
	);
};

export default memo(Screenshots, areImagesEqual);
