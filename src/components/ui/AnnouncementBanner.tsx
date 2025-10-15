import { memo, useState } from "react";
import { FiAlertTriangle, FiInfo, FiCheckCircle, FiX } from "react-icons/fi";

export interface AnnouncementBannerProps {
	message: string;
	type?: "warning" | "info" | "success";
	dismissible?: boolean;
	show?: boolean;
}

const AnnouncementBanner = ({ 
	message, 
	type = "warning", 
	dismissible = true,
	show = true 
}: AnnouncementBannerProps) => {
	const [isVisible, setIsVisible] = useState(show);

	if (!isVisible || !message) return null;

	const getTypeStyles = () => {
		switch (type) {
			case "warning":
				return {
					bg: "bg-yellow-50 dark:bg-yellow-900/20",
					border: "border-yellow-200 dark:border-yellow-800/50",
					text: "text-yellow-800 dark:text-yellow-200",
					iconColor: "text-yellow-600 dark:text-yellow-400"
				};
			case "info":
				return {
					bg: "bg-blue-50 dark:bg-blue-900/20",
					border: "border-blue-200 dark:border-blue-800/50",
					text: "text-blue-800 dark:text-blue-200",
					iconColor: "text-blue-600 dark:text-blue-400"
				};
			case "success":
				return {
					bg: "bg-green-50 dark:bg-green-900/20",
					border: "border-green-200 dark:border-green-800/50",
					text: "text-green-800 dark:text-green-200",
					iconColor: "text-green-600 dark:text-green-400"
				};
			default:
				return {
					bg: "bg-yellow-50 dark:bg-yellow-900/20",
					border: "border-yellow-200 dark:border-yellow-800/50",
					text: "text-yellow-800 dark:text-yellow-200",
					iconColor: "text-yellow-600 dark:text-yellow-400"
				};
		}
	};

	const styles = getTypeStyles();

	return (
		<div className={`${styles.bg} ${styles.border} border rounded-lg p-4 mb-6 shadow-sm`}>
			<div className="flex items-start gap-3">
				<div className="flex-1">
					<p className={`${styles.text} text-sm font-medium leading-relaxed`}>
						{message}
					</p>
				</div>
				{dismissible && (
					<button
						onClick={() => setIsVisible(false)}
						className={`${styles.iconColor} hover:opacity-70 transition-opacity flex-shrink-0`}
						aria-label="关闭公告"
					>
						<FiX className="w-5 h-5" />
					</button>
				)}
			</div>
		</div>
	);
};

export default memo(AnnouncementBanner);