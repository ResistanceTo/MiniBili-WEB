import type { FAQProps } from "config";
import { motion } from "framer-motion";
import { memo } from "react";

const FAQ = ({ items }: FAQProps) => (
	<div id="faq" className="mb-16 scroll-mt-20">
		<motion.h2
			initial={{ opacity: 0, y: 10 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			className="mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
		>
			FAQ
		</motion.h2>
		<div className="space-y-4">
			{items.map((item, index) => (
				<motion.div
					key={item.question}
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ delay: index * 0.1 }}
					className="overflow-hidden rounded-xl border border-gray-300 dark:border-white/10 bg-white dark:bg-white/[0.03] shadow-sm"
				>
					<details className="group">
						<summary className="flex cursor-pointer items-center justify-between p-6">
							<h3 className="pr-6 font-medium text-gray-900 dark:text-white">
								{item.question}
							</h3>
							<svg
								className="h-5 w-5 flex-shrink-0 transition-transform group-open:rotate-180 text-gray-600 dark:text-gray-400"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								aria-label="Toggle answer visibility"
								role="img"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M19 9l-7 7-7-7"
								/>
							</svg>
						</summary>
						<div className="border-t border-gray-200 dark:border-white/5 px-6 pb-6 pt-6">
							<p className="text-gray-600 dark:text-gray-400">{item.answer}</p>
						</div>
					</details>
				</motion.div>
			))}
		</div>
	</div>
);

export default memo(FAQ);
