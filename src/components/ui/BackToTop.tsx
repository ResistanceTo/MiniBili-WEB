import { AnimatePresence, motion } from "framer-motion";
import { memo, useEffect, useState } from "react";
import { FiChevronUp } from "react-icons/fi";

const BackToTop = () => {
	const [isVisible, setIsVisible] = useState(false);

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	useEffect(() => {
		let timeoutId: number;

		const handleScroll = () => {
			if (timeoutId) return;

			timeoutId = window.setTimeout(() => {
				setIsVisible(window.scrollY > 300);
				timeoutId = 0;
			}, 100);
		};

		window.addEventListener("scroll", handleScroll);
		handleScroll();

		return () => {
			window.removeEventListener("scroll", handleScroll);
			if (timeoutId) window.clearTimeout(timeoutId);
		};
	}, []);

	return (
		<AnimatePresence>
			{isVisible && (
				<motion.button
					initial={{ opacity: 0, scale: 0.8 }}
					animate={{ opacity: 1, scale: 1 }}
					exit={{ opacity: 0, scale: 0.8 }}
					transition={{ duration: 0.2 }}
					onClick={scrollToTop}
					className="fixed bottom-8 right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-gray-300 dark:border-white/10 bg-white/90 dark:bg-black/80 text-gray-800 dark:text-white shadow-lg backdrop-blur-sm transition-colors hover:bg-white dark:hover:bg-white/10"
					aria-label="Back to top"
				>
					<FiChevronUp size={24} />
				</motion.button>
			)}
		</AnimatePresence>
	);
};

export default memo(BackToTop);
