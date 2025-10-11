import type { LightboxProps } from "config";
import { areImagesEqual } from "config";
import { AnimatePresence, motion } from "framer-motion";
import { memo, useCallback, useEffect, useState } from "react";
import { FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";

declare global {
	interface Window {
		openLightbox: (index: number, device: "iphone" | "ipad") => void;
	}
}

const Lightbox = ({ images }: LightboxProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [activeDevice, setActiveDevice] = useState<"iphone" | "ipad">("iphone");
	const currentImages = images[activeDevice];

	useEffect(() => {
		window.openLightbox = (index: number, device: "iphone" | "ipad") => {
			setCurrentIndex(index);
			setActiveDevice(device);
			setIsOpen(true);
		};
		return () => {
			window.openLightbox = null as unknown as typeof window.openLightbox;
		};
	}, []);

	useEffect(() => {
		if (isOpen) {
			document.documentElement.style.overflow = 'hidden';
			document.documentElement.style.paddingRight = '0px';
		} else {
			document.documentElement.style.overflow = '';
			document.documentElement.style.paddingRight = '';
		}

		return () => {
			document.documentElement.style.overflow = '';
			document.documentElement.style.paddingRight = '';
		};
	}, [isOpen]);

	const handlePrevious = useCallback(() => {
		setCurrentIndex((prev) => (prev - 1 + currentImages.length) % currentImages.length);
	}, [currentImages.length]);

	const handleNext = useCallback(() => {
		setCurrentIndex((prev) => (prev + 1) % currentImages.length);
	}, [currentImages.length]);

	useEffect(() => {
		if (!isOpen) return;
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "ArrowLeft") handlePrevious();
			if (e.key === "ArrowRight") handleNext();
			if (e.key === "Escape") setIsOpen(false);
		};
		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [handleNext, handlePrevious, isOpen]);

	if (!isOpen) return null;

	return (
		<AnimatePresence>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 dark:bg-black/70 backdrop-blur-md"
				onClick={() => setIsOpen(false)}
			>
				<button
					type="button"
					onClick={() => setIsOpen(false)}
					className="absolute right-4 top-4 p-3 text-gray-800 hover:text-gray-900 dark:text-white/90 dark:hover:text-white transition-colors rounded-full bg-white/80 dark:bg-black/60 hover:bg-white/90 dark:hover:bg-black/80 backdrop-blur-sm border border-gray-200/50 dark:border-white/10 shadow-lg"
					aria-label="Close lightbox"
				>
					<FiX size={20} />
				</button>

				<button
					type="button"
					onClick={(e) => {
						e.stopPropagation();
						handlePrevious();
					}}
					className="absolute left-4 top-1/2 -translate-y-1/2 p-3 text-gray-800 hover:text-gray-900 dark:text-white/90 dark:hover:text-white transition-colors rounded-full bg-white/80 dark:bg-black/60 hover:bg-white/90 dark:hover:bg-black/80 backdrop-blur-sm border border-gray-200/50 dark:border-white/10 shadow-lg"
					aria-label="Previous image"
				>
					<FiChevronLeft size={20} />
				</button>

				<img
					src={currentImages[currentIndex]}
					alt={`Screenshot ${currentIndex + 1}`}
					className="max-h-[90vh] max-w-[90vw] object-contain rounded-xl shadow-2xl"
					onClick={(e) => e.stopPropagation()}
					onKeyDown={(e) => {
						if (e.key === 'Enter' || e.key === ' ') {
							e.stopPropagation();
						}
					}}
				/>

				<button
					type="button"
					onClick={(e) => {
						e.stopPropagation();
						handleNext();
					}}
					className="absolute right-4 top-1/2 -translate-y-1/2 p-3 text-gray-800 hover:text-gray-900 dark:text-white/90 dark:hover:text-white transition-colors rounded-full bg-white/80 dark:bg-black/60 hover:bg-white/90 dark:hover:bg-black/80 backdrop-blur-sm border border-gray-200/50 dark:border-white/10 shadow-lg"
					aria-label="Next image"
				>
					<FiChevronRight size={20} />
				</button>

				<div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
					{currentImages.map((image, index) => (
						<button
							type="button"
							key={image}
							onClick={(e) => {
								e.stopPropagation();
								setCurrentIndex(index);
							}}
							className={`h-2 w-2 rounded-full transition-colors ${
								index === currentIndex
									? "bg-gray-800 dark:bg-white"
									: "bg-gray-500 dark:bg-white/60 hover:bg-gray-700 dark:hover:bg-white/80"
							}`}
							aria-label={`Go to image ${index + 1}`}
						/>
					))}
				</div>
			</motion.div>
		</AnimatePresence>
	);
};

export default memo(Lightbox, areImagesEqual);
