import { memo } from "react";
import { FiStar } from "react-icons/fi";

type Size = "sm" | "md" | "lg";
const sizeClasses: Record<Size, string> = {
	sm: "h-3 w-3",
	md: "h-4 w-4",
	lg: "h-5 w-5"
};

const RatingStars = ({ rating, max = 5, size = "md" }: { rating: number; max?: number; size?: Size }) => (
	<div className="flex items-center gap-1">
		{Array.from({ length: max }).map((_, i) => (
			<FiStar
				key={`star-${i}-${max}`}
				className={`${sizeClasses[size]} ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-white/30"}`}
			/>
		))}
	</div>
);

export default memo(RatingStars);
