import { siteConfig } from "config";
import { memo } from "react";
import { FiClock, FiFileText, FiShield, FiMap } from "react-icons/fi";
import ThemeToggle from "../ui/ThemeToggle";

const Footer = () => {
	return (
		<footer className="py-8 border-t border-neutral-200/30 dark:border-neutral-800/30 bg-neutral-50/50 dark:bg-black/50 backdrop-blur-sm transition-all duration-300">
			<div className="container mx-auto px-4">
				<div className="flex flex-col gap-8">
					<div className="flex flex-col md:flex-row justify-between items-start gap-6">
						<div className="flex flex-col gap-3 max-w-lg">
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-2">
									<img src="/favicon-512.png" alt="Logo" className="w-6 h-6 rounded-md shadow-sm" />
									<span className="font-semibold text-neutral-800 dark:text-white">
										{siteConfig.title}
									</span>
								</div>
								<div className="block md:hidden">
									<ThemeToggle />
								</div>
							</div>
							<p className="text-sm text-neutral-600 dark:text-neutral-400">
								{siteConfig.description}
							</p>
						</div>
						<div className="hidden md:block">
							<div className="text-xs uppercase font-semibold text-neutral-500 tracking-wide mb-3">
								Theme
							</div>
							<ThemeToggle />
						</div>
					</div>

					<div className="flex flex-col-reverse md:flex-row justify-between items-center gap-6">
						<div className="flex flex-col md:flex-row items-center gap-6">
							<div className="flex items-center gap-3">
								{siteConfig.socialLinks.map((link) => (
									<a
										key={link.label}
										href={link.url}
										target="_blank"
										rel="noopener noreferrer"
										className="flex items-center justify-center w-9 h-9 rounded-lg bg-neutral-100 dark:bg-white/5 hover:bg-neutral-200 dark:hover:bg-white/10 transition-colors border border-neutral-200/50 dark:border-white/5"
										aria-label={link.label}
										title={link.label}
									>
										<link.icon className="w-4 h-4 text-neutral-600 dark:text-neutral-300" />
									</a>
								))}
							</div>
							<div className="text-sm text-neutral-500 dark:text-neutral-400">
								&copy; {new Date().getFullYear()} MiniBili. All rights reserved.
							</div>
						</div>

						<div className="flex items-center gap-6">
							{[
								{ href: "/privacy", icon: FiShield, text: "隐私" },
								{ href: "/terms", icon: FiFileText, text: "条款" },
								{ href: "/changelog", icon: FiClock, text: "日志" },
								{ href: "/roadmap", icon: FiMap, text: "路线" },
							].map(({ href, icon: Icon, text }) => (
								<a
									key={text}
									href={href}
									className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-white transition-colors text-sm"
								>
									<Icon className="w-4 h-4" />
									<span>{text}</span>
								</a>
							))}
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default memo(Footer);
