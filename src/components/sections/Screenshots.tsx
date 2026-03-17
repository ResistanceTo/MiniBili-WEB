import { type ScreenshotsProps, type MediaItem, DeviceType } from "config";
import { areImagesEqual } from "config";
import { AnimatePresence, motion } from "framer-motion";
import {
	type KeyboardEvent,
	type MouseEvent,
	memo,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";
import DeviceToggle from "../ui/DeviceToggle";

const getDeviceLabel = (device: DeviceType) => {
	switch (device) {
		case DeviceType.macOS:
			return "Mac";
		case DeviceType.tvOS:
			return "Apple TV";
		case DeviceType.watchOS:
			return "Apple Watch";
		case DeviceType.visionOS:
			return "Vision Pro";
		case DeviceType.iPadOS:
			return "iPad";
		case DeviceType.iOS:
		default:
			return "iPhone";
	}
};

const getMediaClassNames = (device: DeviceType) => {
	switch (device) {
		case DeviceType.macOS:
			return "aspect-[2580/1676] w-[460px]";
		case DeviceType.watchOS:
			return "aspect-[396/484] w-[220px]";
		case DeviceType.tvOS:
			return "aspect-[16/9] w-[400px]";
		case DeviceType.iPadOS:
			return "aspect-[1640/2360] w-[260px]";
		case DeviceType.iOS:
		default:
			return "aspect-[1170/2532] w-[260px]";
	}
};

const normalizeMedia = (item: string | MediaItem): MediaItem => {
	if (typeof item === "string") {
		return { src: item, type: "image" };
	}
	return item;
};

const Screenshots = ({ images }: ScreenshotsProps) => {
	const [activeDevice, setActiveDevice] = useState<DeviceType>(DeviceType.iOS);
	const [playingVideos, setPlayingVideos] = useState<Set<string>>(new Set());
	const [loadingVideos, setLoadingVideos] = useState<Set<string>>(new Set());
	const [errorVideos, setErrorVideos] = useState<Set<string>>(new Set());
	const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
	const currentImages = images[activeDevice] || [];
	const galleryVideoRefs = useRef<Map<string, HTMLVideoElement>>(new Map());
	const lightboxVideoRef = useRef<HTMLVideoElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const deviceLabel = getDeviceLabel(activeDevice);
	const mediaClassNames = getMediaClassNames(activeDevice);
	const containerMinHeightClass =
		activeDevice === DeviceType.iOS
			? "min-h-[560px]"
			: activeDevice === DeviceType.macOS
				? "min-h-[260px]"
				: "min-h-[300px]";
	const currentLightboxItem =
		lightboxIndex === null ? null : normalizeMedia(currentImages[lightboxIndex]);

	useEffect(() => {
		setPlayingVideos(new Set());
		setLightboxIndex(null);
		galleryVideoRefs.current.forEach((video) => {
			video.pause();
		});
	}, [activeDevice]);

	useEffect(() => {
		if (lightboxVideoRef.current && !lightboxVideoRef.current.paused) {
			lightboxVideoRef.current.pause();
			lightboxVideoRef.current.currentTime = 0;
		}
	}, [currentLightboxItem?.src]);

	useEffect(() => {
		if (lightboxIndex === null) {
			document.documentElement.style.overflow = "";
			document.body.style.overflow = "";
			return;
		}

		document.documentElement.style.overflow = "hidden";
		document.body.style.overflow = "hidden";

		return () => {
			document.documentElement.style.overflow = "";
			document.body.style.overflow = "";
		};
	}, [lightboxIndex]);

	const handleAnimationEvent = useCallback((action: "add" | "remove") => {
		containerRef.current?.classList[action]("overflow-x-auto");
	}, []);

	const handleVideoClick = useCallback((event: MouseEvent, videoSrc: string) => {
		event.stopPropagation();
		const videoElement = galleryVideoRefs.current.get(videoSrc);
		if (!videoElement) return;

		if (videoElement.paused) {
			videoElement.play().catch(() => {
				console.warn("Video play failed:", videoSrc);
			});
			setPlayingVideos((prev) => new Set(prev).add(videoSrc));
			return;
		}

		videoElement.pause();
		setPlayingVideos((prev) => {
			const next = new Set(prev);
			next.delete(videoSrc);
			return next;
		});
	}, []);

	const handleVideoLoadStart = useCallback((videoSrc: string) => {
		setLoadingVideos((prev) => new Set(prev).add(videoSrc));
		setErrorVideos((prev) => {
			const next = new Set(prev);
			next.delete(videoSrc);
			return next;
		});
	}, []);

	const handleVideoCanPlay = useCallback((videoSrc: string) => {
		setLoadingVideos((prev) => {
			const next = new Set(prev);
			next.delete(videoSrc);
			return next;
		});
	}, []);

	const handleVideoError = useCallback((videoSrc: string) => {
		setLoadingVideos((prev) => {
			const next = new Set(prev);
			next.delete(videoSrc);
			return next;
		});
		setErrorVideos((prev) => new Set(prev).add(videoSrc));
	}, []);

	const handleVideoKeyDown = useCallback((event: KeyboardEvent, videoSrc: string) => {
		if (event.key === " " || event.key === "Enter") {
			event.preventDefault();
			handleVideoClick(event as unknown as MouseEvent, videoSrc);
		}
	}, [handleVideoClick]);

	const setVideoRef = useCallback((videoSrc: string) => (element: HTMLVideoElement | null) => {
		if (element) {
			galleryVideoRefs.current.set(videoSrc, element);
			return;
		}

		galleryVideoRefs.current.delete(videoSrc);
	}, []);

	const closeLightbox = useCallback(() => {
		setLightboxIndex(null);
	}, []);

	const showPrevious = useCallback(() => {
		if (currentImages.length === 0) return;
		setLightboxIndex((prev) => {
			if (prev === null) return prev;
			return (prev - 1 + currentImages.length) % currentImages.length;
		});
	}, [currentImages.length]);

	const showNext = useCallback(() => {
		if (currentImages.length === 0) return;
		setLightboxIndex((prev) => {
			if (prev === null) return prev;
			return (prev + 1) % currentImages.length;
		});
	}, [currentImages.length]);

	useEffect(() => {
		if (lightboxIndex === null) return;

		const onKeyDown = (event: globalThis.KeyboardEvent) => {
			if (event.key === "Escape") closeLightbox();
			if (event.key === "ArrowLeft") showPrevious();
			if (event.key === "ArrowRight") showNext();
		};

		document.addEventListener("keydown", onKeyDown);
		return () => document.removeEventListener("keydown", onKeyDown);
	}, [closeLightbox, lightboxIndex, showNext, showPrevious]);

	return (
		<div id="screenshots" className="mb-16 scroll-mt-20">
			<div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center md:gap-0">
				<h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
					屏幕截图
				</h2>
				<DeviceToggle activeDevice={activeDevice} onToggle={setActiveDevice} />
			</div>
			<div className={`relative overflow-hidden ${containerMinHeightClass}`}>
				<AnimatePresence mode="wait">
					<motion.div
						ref={containerRef}
						key={activeDevice}
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: -20 }}
						transition={{ duration: 0.3 }}
						className="screenshots-container scrollbar-thin scrollbar-track-gray-200 scrollbar-thumb-gray-400 hover:scrollbar-thumb-gray-500 dark:scrollbar-track-white/5 dark:scrollbar-thumb-white/10 dark:hover:scrollbar-thumb-white/20"
						onAnimationComplete={() => handleAnimationEvent("add")}
						onAnimationStart={() => handleAnimationEvent("remove")}
					>
						{currentImages.length === 0 ? (
							<div className="flex h-[300px] w-full items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 dark:border-white/10 dark:bg-white/[0.02]">
								<div className="text-center">
									<p className="text-lg font-medium text-gray-500 dark:text-gray-400">
										{deviceLabel} 版本敬请期待
									</p>
								</div>
							</div>
						) : (
							<div className="flex gap-6 pb-4">
								{currentImages.map((item, index) => {
									const media = normalizeMedia(item);
									const isPlaying = playingVideos.has(media.src);
									const isLoading = loadingVideos.has(media.src);
									const hasError = errorVideos.has(media.src);

									return (
										<motion.div
											key={media.src}
											initial={{ opacity: 0, y: 20 }}
											animate={{ opacity: 1, y: 0, transition: { delay: Math.min(index * 0.05, 0.3) } }}
											exit={{ opacity: 0, y: 20 }}
											className="group relative flex-shrink-0 overflow-hidden rounded-xl"
										>
											{media.type === "video" ? (
												<div
													className="relative cursor-pointer rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
													onClick={(event) => handleVideoClick(event, media.src)}
													onKeyDown={(event) => handleVideoKeyDown(event, media.src)}
													tabIndex={0}
													role="button"
													aria-label={`${isPlaying ? "暂停" : "播放"} MiniBili ${deviceLabel} 应用视频预览`}
												>
													<video
														ref={setVideoRef(media.src)}
														src={media.src}
														poster={media.poster}
														preload="metadata"
														muted
														playsInline
														loop
														onLoadStart={() => handleVideoLoadStart(media.src)}
														onCanPlay={() => handleVideoCanPlay(media.src)}
														onError={() => handleVideoError(media.src)}
														className={`rounded-xl border border-gray-300 object-cover shadow-lg dark:border-white/10 ${mediaClassNames}`}
													/>
													{isLoading && (
														<div className="absolute inset-0 flex items-center justify-center bg-black/20">
															<div className="h-10 w-10 animate-spin rounded-full border-4 border-white/30 border-t-white"></div>
														</div>
													)}
													{hasError && (
														<div className="absolute inset-0 flex items-center justify-center bg-black/40">
															<div className="px-4 text-center text-white">
																<svg className="mx-auto mb-2 h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
																	<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
																</svg>
																<p className="text-sm">视频加载失败</p>
															</div>
														</div>
													)}
													{!isPlaying && !isLoading && !hasError && (
														<div className="pointer-events-none absolute inset-0 flex items-center justify-center">
															<div className="rounded-full bg-black/40 p-3 backdrop-blur-sm transition-colors group-hover:bg-black/50">
																<svg className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
																	<path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
																</svg>
															</div>
														</div>
													)}
												</div>
											) : (
												<button
													type="button"
													onClick={() => setLightboxIndex(index)}
													className="rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
													aria-label={`查看 MiniBili ${deviceLabel} 应用截图 ${index + 1}`}
												>
													<img
														src={media.src}
														alt={`MiniBili ${deviceLabel} 应用界面截图 ${index + 1} - 免费无广告的哔哩哔哩第三方客户端`}
														className={`rounded-xl border border-gray-300 object-cover shadow-lg dark:border-white/10 ${mediaClassNames}`}
														loading="lazy"
													/>
												</button>
											)}
										</motion.div>
									);
								})}
							</div>
						)}
					</motion.div>
				</AnimatePresence>
			</div>

			<AnimatePresence>
				{lightboxIndex !== null && currentLightboxItem && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						role="dialog"
						aria-modal="true"
						aria-label={`MiniBili ${deviceLabel} 截图预览，第 ${(lightboxIndex ?? 0) + 1} 张，共 ${currentImages.length} 张`}
						className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-md dark:bg-black/70"
						onClick={closeLightbox}
					>
						<button
							type="button"
							onClick={closeLightbox}
							className="absolute right-4 top-4 rounded-full border border-gray-200/50 bg-white/80 p-3 text-gray-800 shadow-lg backdrop-blur-sm transition-colors hover:bg-white/90 hover:text-gray-900 dark:border-white/10 dark:bg-black/60 dark:text-white/90 dark:hover:bg-black/80 dark:hover:text-white"
							aria-label="关闭预览"
						>
							<svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
								<line x1="18" y1="6" x2="6" y2="18" />
								<line x1="6" y1="6" x2="18" y2="18" />
							</svg>
						</button>

						<button
							type="button"
							onClick={(event) => {
								event.stopPropagation();
								showPrevious();
							}}
							className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border border-gray-200/50 bg-white/80 p-3 text-gray-800 shadow-lg backdrop-blur-sm transition-colors hover:bg-white/90 hover:text-gray-900 dark:border-white/10 dark:bg-black/60 dark:text-white/90 dark:hover:bg-black/80 dark:hover:text-white"
							aria-label="上一张"
						>
							<svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
								<polyline points="15 18 9 12 15 6" />
							</svg>
						</button>

						{currentLightboxItem.type === "video" ? (
							<video
								ref={lightboxVideoRef}
								key={currentLightboxItem.src}
								src={currentLightboxItem.src}
								poster={currentLightboxItem.poster}
								preload="metadata"
								controls
								playsInline
								loop
								autoPlay
								muted
								className="max-h-[90vh] max-w-[90vw] rounded-xl object-contain shadow-2xl"
								onClick={(event) => event.stopPropagation()}
							/>
						) : (
							<img
								key={currentLightboxItem.src}
								src={currentLightboxItem.src}
								alt={`MiniBili ${deviceLabel} 应用界面大图 ${lightboxIndex + 1} - 免费无广告的哔哩哔哩第三方客户端`}
								className="max-h-[90vh] max-w-[90vw] rounded-xl object-contain shadow-2xl"
								onClick={(event) => event.stopPropagation()}
							/>
						)}

						<button
							type="button"
							onClick={(event) => {
								event.stopPropagation();
								showNext();
							}}
							className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-gray-200/50 bg-white/80 p-3 text-gray-800 shadow-lg backdrop-blur-sm transition-colors hover:bg-white/90 hover:text-gray-900 dark:border-white/10 dark:bg-black/60 dark:text-white/90 dark:hover:bg-black/80 dark:hover:text-white"
							aria-label="下一张"
						>
							<svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
								<polyline points="9 18 15 12 9 6" />
							</svg>
						</button>

						<div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
							{currentImages.map((item, index) => {
								const media = normalizeMedia(item);
								return (
									<button
										type="button"
										key={media.src}
										onClick={(event) => {
											event.stopPropagation();
											setLightboxIndex(index);
										}}
										className={`h-2 w-2 rounded-full transition-colors ${
											index === lightboxIndex
												? "bg-gray-800 dark:bg-white"
												: "bg-gray-500 hover:bg-gray-700 dark:bg-white/60 dark:hover:bg-white/80"
										}`}
										aria-label={`跳转到${media.type === "video" ? "视频" : "图片"} ${index + 1}`}
									/>
								);
							})}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default memo(Screenshots, areImagesEqual);
