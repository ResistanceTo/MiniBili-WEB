import { useEffect, useState } from "react";

export const useScrollSpy = (sectionIds: string[], offset: number = 100) => {
	const [activeSection, setActiveSection] = useState<string>("");

	useEffect(() => {
		const handleScroll = () => {
			const scrollPosition = window.scrollY + offset;

			// 找到当前滚动位置对应的区块
			for (let i = sectionIds.length - 1; i >= 0; i--) {
				const section = document.getElementById(sectionIds[i]);
				if (section) {
					const sectionTop = section.offsetTop;
					if (scrollPosition >= sectionTop) {
						setActiveSection(sectionIds[i]);
						// 更新 URL 但不触发滚动
						const newUrl = `${window.location.pathname}#${sectionIds[i]}`;
						if (window.location.href !== newUrl) {
							window.history.replaceState(null, "", newUrl);
						}
						break;
					}
				}
			}

			// 如果滚动到顶部，清除锚点
			if (window.scrollY < 100) {
				setActiveSection("");
				window.history.replaceState(null, "", window.location.pathname);
			}
		};

		// 防抖处理
		let timeoutId: NodeJS.Timeout;
		const debouncedHandleScroll = () => {
			clearTimeout(timeoutId);
			timeoutId = setTimeout(handleScroll, 100);
		};

		window.addEventListener("scroll", debouncedHandleScroll, { passive: true });

		// 初始化时执行一次
		handleScroll();

		return () => {
			window.removeEventListener("scroll", debouncedHandleScroll);
			clearTimeout(timeoutId);
		};
	}, [sectionIds, offset]);

	return activeSection;
};
