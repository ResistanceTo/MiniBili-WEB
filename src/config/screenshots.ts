import type { DeviceScreenshots } from "./types";

export const screenshots: DeviceScreenshots = {
	iOS: [
		{
			src: "/screenshots/iphone/HomeList.mp4",
			type: "video",
		},
		// {
		// 	src: "/screenshots/iphone/VideoDetail.mp4",
		// 	type: "video",
		// },
		// {
		// 	src: "/screenshots/iphone/VideoComment.mp4",
		// 	type: "video",
		// },
		"/screenshots/iphone/home.webp",
		"/screenshots/iphone/VideoDetail_26.webp",
		"/screenshots/iphone/VideoComment.webp",
		"/screenshots/iphone/DynamicList.webp",
		"/screenshots/iphone/Category.webp",
		"/screenshots/iphone/search.webp",
		"/screenshots/iphone/settings.webp",
		"/screenshots/iphone/about.webp",
	],
	iPadOS: [
		"/screenshots/ipad/home.webp",
		"/screenshots/ipad/homeSettings.webp",
		"/screenshots/ipad/detail.webp",
		"/screenshots/ipad/video.webp",
		"/screenshots/ipad/settings.webp",
		"/screenshots/ipad/about.webp",
	],
	watchOS: [
		"/screenshots/watch/list.webp",
		"/screenshots/watch/player.webp",
		"/screenshots/watch/search.webp",
		"/screenshots/watch/mine.webp",
	],
};
