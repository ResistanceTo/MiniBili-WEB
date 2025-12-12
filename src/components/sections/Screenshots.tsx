import { type ScreenshotsProps, type MediaItem, DeviceType } from "config";
import { areImagesEqual } from "config";
import { AnimatePresence, motion } from "framer-motion";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import DeviceToggle from "../ui/DeviceToggle";

const Screenshots = ({ images }: ScreenshotsProps) => {
	const [activeDevice, setActiveDevice] = useState<DeviceType>(DeviceType.iPhone);
	const currentImages = images[activeDevice] || [];
	const isIphone = activeDevice === DeviceType.iPhone;
	const isMac = activeDevice === DeviceType.macOS;
	const isTv = activeDevice === DeviceType.tvOS;
	const [playingVideos, setPlayingVideos] = useState<Set<string>>(new Set());
	const [loadingVideos, setLoadingVideos] = useState<Set<string>>(new Set());
	const [errorVideos, setErrorVideos] = useState<Set<string>>(new Set());
	const videoRefs = useRef<Map<string, HTMLVideoElement>>(new Map());

	// 切换设备时暂停所有视频
	useEffect(() => {
		setPlayingVideos(new Set());
		videoRefs.current.forEach(video => {
			video.pause();
		});
	}, [activeDevice]);

	const handleAnimationEvent = useCallback((action: "add" | "remove") => {
		const container = document.querySelector(".screenshots-container");
		container?.classList[action]("overflow-x-auto");
	}, []);

	const normalizeMedia = useCallback((item: string | MediaItem): MediaItem => {
		if (typeof item === "string") {
			return { src: item, type: "image" };
		}
		return item;
	}, []);

	const handleVideoClick = useCallback((e: React.MouseEvent, videoSrc: string) => {
		e.stopPropagation();
		const videoElement = videoRefs.current.get(videoSrc);
		if (!videoElement) return;

		if (videoElement.paused) {
			videoElement.play().catch(() => {
				// 处理播放失败的情况（例如用户未交互）
				console.warn('Video play failed:', videoSrc);
			});
			setPlayingVideos(prev => new Set(prev).add(videoSrc));
		} else {
			videoElement.pause();
			setPlayingVideos(prev => {
				const newSet = new Set(prev);
				newSet.delete(videoSrc);
				return newSet;
			});
		}
	}, []);

	const handleVideoLoadStart = useCallback((videoSrc: string) => {
		setLoadingVideos(prev => new Set(prev).add(videoSrc));
		setErrorVideos(prev => {
			const newSet = new Set(prev);
			newSet.delete(videoSrc);
			return newSet;
		});
	}, []);

	const handleVideoCanPlay = useCallback((videoSrc: string) => {
		setLoadingVideos(prev => {
			const newSet = new Set(prev);
			newSet.delete(videoSrc);
			return newSet;
		});
	}, []);

	const handleVideoError = useCallback((videoSrc: string) => {
		setLoadingVideos(prev => {
			const newSet = new Set(prev);
			newSet.delete(videoSrc);
			return newSet;
		});
		setErrorVideos(prev => new Set(prev).add(videoSrc));
	}, []);

	const handleKeyDown = useCallback((e: React.KeyboardEvent, videoSrc: string) => {
		if (e.key === ' ' || e.key === 'Enter') {
			e.preventDefault();
			handleVideoClick(e as unknown as React.MouseEvent, videoSrc);
		}
	}, [handleVideoClick]);

	const setVideoRef = useCallback((videoSrc: string) => (element: HTMLVideoElement | null) => {
		if (element) {
			videoRefs.current.set(videoSrc, element);
		} else {
			videoRefs.current.delete(videoSrc);
		}
	}, []);

	return (
		<div id="screenshots" className="mb-16 scroll-mt-20">
			<div className="mb-6 flex items-center justify-between">
				<h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
					屏幕截图
				</h2>
				<DeviceToggle activeDevice={activeDevice} onToggle={setActiveDevice} />
			</div>
			<div className={`relative overflow-hidden min-h-[${isIphone ? "560px" : isMac ? "400px" : isTv ? "300px" : "300px"}]`}>
				<AnimatePresence mode="wait">
					<motion.div
						key={activeDevice}
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: -20 }}
						transition={{ duration: 0.3 }}
						className="screenshots-container scrollbar-thin scrollbar-track-gray-200 dark:scrollbar-track-white/5 scrollbar-thumb-gray-400 dark:scrollbar-thumb-white/10 hover:scrollbar-thumb-gray-500 dark:hover:scrollbar-thumb-white/20"
						onAnimationComplete={() => handleAnimationEvent("add")}
						onAnimationStart={() => handleAnimationEvent("remove")}
					>
						{currentImages.length === 0 ? (
							<div className="flex items-center justify-center h-[300px] w-full rounded-xl border-2 border-dashed border-gray-300 dark:border-white/10 bg-gray-50 dark:bg-white/[0.02]">
								<div className="text-center">
									<p className="text-lg font-medium text-gray-500 dark:text-gray-400">
										{activeDevice === DeviceType.tvOS ? "tvOS" : activeDevice === DeviceType.macOS ? "macOS" : "iPad"} 版本敬请期待
									</p>
								</div>
							</div>
						) : (
							<div className="flex gap-6 pb-4">
								{currentImages.map((item, index) => {
									const media = normalizeMedia(item);
									const mediaKey = media.src;
									const isPlaying = playingVideos.has(media.src);
									const isLoading = loadingVideos.has(media.src);
									const hasError = errorVideos.has(media.src);

									return (
										<motion.div
											key={mediaKey}
											initial={{ opacity: 0, y: 20 }}
											animate={{ opacity: 1, y: 0, transition: { delay: index * 0.1 } }}
											exit={{ opacity: 0, y: 20 }}
											className="relative flex-shrink-0 overflow-hidden rounded-xl group"
										>
											{media.type === "video" ? (
												<div
													className="relative cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-xl"
													onClick={(e) => handleVideoClick(e, media.src)}
													onKeyDown={(e) => handleKeyDown(e, media.src)}
													tabIndex={0}
													role="button"
													aria-label={`${isPlaying ? '暂停' : '播放'} MiniBili ${activeDevice === DeviceType.iPhone ? "iPhone" : activeDevice === DeviceType.macOS ? "macOS" : activeDevice === DeviceType.tvOS ? "tvOS" : "iPad"} 应用视频预览`}
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
														className={`rounded-xl border border-gray-300 dark:border-white/10 object-cover shadow-lg ${isIphone ? "aspect-[1170/2532] w-[260px]" : isMac ? "aspect-[1488/2266] w-[340px]" : "aspect-[16/9] w-[400px]"
															}`}
													/>
													{/* 加载指示器 */}
													{isLoading && (
														<div className="absolute inset-0 flex items-center justify-center bg-black/20">
															<div className="animate-spin rounded-full h-10 w-10 border-4 border-white/30 border-t-white"></div>
														</div>
													)}
													{/* 错误提示 */}
													{hasError && (
														<div className="absolute inset-0 flex items-center justify-center bg-black/40">
															<div className="text-white text-center px-4">
																<svg className="w-10 h-10 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
																	<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
																</svg>
																<p className="text-sm">视频加载失败</p>
															</div>
														</div>
													)}
													{/* 播放按钮 */}
													{!isPlaying && !isLoading && !hasError && (
														<div className="absolute inset-0 flex items-center justify-center pointer-events-none">
															<div className="bg-black/40 backdrop-blur-sm rounded-full p-3 group-hover:bg-black/50 transition-colors">
																<svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
																	<path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
																</svg>
															</div>
														</div>
													)}
												</div>
											) : (
												<button
													onClick={() => window.openLightbox?.(index, activeDevice)}
													className="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-xl"
													aria-label={`查看 MiniBili ${activeDevice === DeviceType.iPhone ? "iPhone" : activeDevice === DeviceType.macOS ? "macOS" : activeDevice === DeviceType.tvOS ? "tvOS" : "iPad"} 应用截图 ${index + 1}`}
												>
													<img
														src={media.src}
														alt={`MiniBili ${activeDevice === DeviceType.iPhone ? "iPhone" : activeDevice === DeviceType.macOS ? "macOS" : activeDevice === DeviceType.tvOS ? "tvOS" : "iPad"} 应用界面截图 ${index + 1} - 免费无广告的哔哩哔哩第三方客户端`}
														className={`rounded-xl border border-gray-300 dark:border-white/10 object-cover shadow-lg ${isIphone ? "aspect-[1170/2532] w-[260px]" : isMac ? "aspect-[1488/2266] w-[340px]" : "aspect-[16/9] w-[400px]"
															}`}
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
		</div>
	);
};

export default memo(Screenshots, areImagesEqual);
