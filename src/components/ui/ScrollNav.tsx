import { memo } from "react";
import { useScrollSpy } from "../../hooks/useScrollSpy";
import { motion, AnimatePresence } from "framer-motion";
import { FiImage, FiStar, FiClock, FiHelpCircle, FiMessageCircle } from "react-icons/fi";

interface NavSection {
	id: string;
	label: string;
	icon: React.ComponentType<{ className?: string }>;
}

const sections: NavSection[] = [
	{ id: "screenshots", label: "截图", icon: FiImage },
	{ id: "features", label: "特点", icon: FiStar },
	{ id: "changelog", label: "更新", icon: FiClock },
	{ id: "faq", label: "FAQ", icon: FiHelpCircle },
	{ id: "community", label: "社区", icon: FiMessageCircle },
];

const ScrollNav = () => {
	const activeSection = useScrollSpy(sections.map(s => s.id), 150);

	const scrollToSection = (sectionId: string) => {
		const element = document.getElementById(sectionId);
		if (element) {
			const offset = 80; // 偏移量，避免被遮挡
			const elementPosition = element.offsetTop - offset;
			window.scrollTo({
				top: elementPosition,
				behavior: "smooth",
			});
		}
	};

	return (
		<AnimatePresence>
			<motion.nav
				initial={{ opacity: 0, x: 20 }}
				animate={{ opacity: 1, x: 0 }}
				exit={{ opacity: 0, x: 20 }}
				className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden lg:block"
			>
				<div className="flex flex-col gap-2 p-2 rounded-2xl bg-white/80 dark:bg-black/50 backdrop-blur-md border border-neutral-200/50 dark:border-white/10 shadow-lg">
					{sections.map(({ id, label, icon: Icon }) => {
						const isActive = activeSection === id;
						return (
							<button
								key={id}
								onClick={() => scrollToSection(id)}
								className={`group relative flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-200 ${
									isActive
										? "bg-neutral-900 dark:bg-white text-white dark:text-black"
										: "hover:bg-neutral-100 dark:hover:bg-white/10"
								}`}
								aria-label={`跳转到${label}`}
								title={label}
							>
								<Icon
									className={`w-4 h-4 transition-colors ${
										isActive
											? "text-white dark:text-black"
											: "text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white"
									}`}
								/>
								<span
									className={`text-xs font-medium whitespace-nowrap transition-colors ${
										isActive
											? "text-white dark:text-black"
											: "text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white"
									}`}
								>
									{label}
								</span>
								{isActive && (
									<motion.div
										layoutId="activeSection"
										className="absolute inset-0 rounded-xl bg-neutral-900 dark:bg-white -z-10"
										transition={{ type: "spring", stiffness: 380, damping: 30 }}
									/>
								)}
							</button>
						);
					})}
				</div>
			</motion.nav>
		</AnimatePresence>
	);
};

export default memo(ScrollNav);
