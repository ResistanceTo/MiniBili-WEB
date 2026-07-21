/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	darkMode: ["selector", '[class~="dark"]'],
	theme: {
		extend: {
			screens: {
				light: { raw: "(prefers-color-scheme: light)" },
			},
			colors: {
				// B站粉品牌强调色，克制使用（主 CTA / 强调标签 / 链接 hover）
				brand: {
					DEFAULT: "#FB7299",
					50: "#FFF1F5",
					100: "#FFE4EC",
					200: "#FEC7D8",
					300: "#FD9EBB",
					400: "#FB7299",
					500: "#F14D7E",
					600: "#DB2F66",
					700: "#B71F51",
					800: "#901A42",
					900: "#761A3A",
				},
				// 语义化令牌，映射到 CSS 变量（亮/暗自动切换）
				surface: "rgb(var(--surface) / <alpha-value>)",
				"surface-muted": "rgb(var(--surface-muted) / <alpha-value>)",
				ink: "rgb(var(--ink) / <alpha-value>)",
				"ink-muted": "rgb(var(--ink-muted) / <alpha-value>)",
				"ink-subtle": "rgb(var(--ink-subtle) / <alpha-value>)",
				hairline: "rgb(var(--hairline) / <alpha-value>)",
			},
			borderRadius: {
				"4xl": "2rem",
			},
			boxShadow: {
				glass: "0 8px 32px -8px rgb(var(--glass-shadow) / 0.24)",
				"glass-lg": "0 24px 64px -16px rgb(var(--glass-shadow) / 0.32)",
			},
			keyframes: {
				"fade-up": {
					"0%": { opacity: "0", transform: "translateY(16px)" },
					"100%": { opacity: "1", transform: "translateY(0)" },
				},
				float: {
					"0%, 100%": { transform: "translateY(0)" },
					"50%": { transform: "translateY(-8px)" },
				},
				"aurora-drift": {
					"0%, 100%": { transform: "translate3d(0, 0, 0) scale(1)" },
					"50%": { transform: "translate3d(3%, -4%, 0) scale(1.08)" },
				},
			},
			animation: {
				"fade-up": "fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) both",
				float: "float 6s ease-in-out infinite",
				"aurora-drift": "aurora-drift 18s ease-in-out infinite",
			},
		},
	},
	plugins: [
		require("@tailwindcss/typography"),
		require("tailwind-scrollbar-hide"),
		({ addVariant }) => {
			addVariant("light", ".light &");
		},
	],
};
