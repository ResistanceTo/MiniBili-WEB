import { AnimatePresence, motion } from "framer-motion";
import { memo, type PropsWithChildren } from "react";

const variants = {
	pageInitial: { opacity: 0.8, y: 5 },
	pageAnimate: { opacity: 1, y: 0 },
	pageExit: { opacity: 0.8, y: 5 },
};

const PageAnimation = ({ children }: PropsWithChildren) => (
	<AnimatePresence mode="wait">
		<motion.div
			initial="pageInitial"
			animate="pageAnimate"
			exit="pageExit"
			transition={{ type: "tween", duration: 0.2 }}
			className="px-5"
			variants={variants}
		>
			{children}
		</motion.div>
	</AnimatePresence>
);

export default memo(PageAnimation);
