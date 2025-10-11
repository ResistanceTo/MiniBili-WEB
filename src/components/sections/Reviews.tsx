import type { Review, ReviewsProps } from "config";
import { motion } from "framer-motion";
import { memo } from "react";
import RatingStars from "../ui/RatingStars";

const Reviews = ({ items }: ReviewsProps) => (
	<div className="mb-16">
		<motion.h2
			initial={{ opacity: 0, y: 10 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			className="mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
		>
			User Reviews
		</motion.h2>

		<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
			{items.map((review: Review, index: number) => (
				<motion.div
					key={`review-${review.author.replace(/\s+/g, "-")}-${index}`}
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ delay: index * 0.1 }}
					className="rounded-2xl border border-gray-300 dark:border-white/10 bg-white dark:bg-white/[0.03] p-6 shadow-sm"
				>
					<div className="mb-4 flex items-center gap-4">
						{review.avatar ? (
							<img
								src={review.avatar}
								alt={`${review.author} avatar`}
								className="h-12 w-12 rounded-full object-cover border border-gray-300 dark:border-white/10"
							/>
						) : (
							<div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-white/[0.08] text-gray-800 dark:text-white/90">
								{review.author[0]}
							</div>
						)}
						<div>
							<div className="font-medium text-gray-900 dark:text-white">
								{review.author}
							</div>
							<RatingStars rating={review.rating} />
						</div>
					</div>
					<p className="text-gray-600 dark:text-gray-400">{review.text}</p>
				</motion.div>
			))}
		</div>
	</div>
);

export default memo(Reviews);
