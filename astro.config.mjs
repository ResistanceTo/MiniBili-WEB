import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import { generateResponsiveImages } from "./scripts/images.mjs";
import { changelog } from "./src/config/changelog";

// 最新一次版本更新的日期，作为首页与更新日志页的 lastmod
const latestReleaseDate = changelog[0].date;

export default defineConfig({
  site: 'https://minibili.zhaohe.org',
  prefetch: true,
  integrations: [
    {
      // dev / build 前为截图生成多尺寸 WebP（public/_img）
      name: "minibili-responsive-images",
      hooks: {
        "astro:config:setup": async ({ logger }) => {
          await generateResponsiveImages({ log: (message) => logger.info(message) });
        },
      },
    },
    tailwind(),
    react(),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      serialize(item) {
        if (item.url === 'https://minibili.zhaohe.org/') {
          return { ...item, priority: 1.0, changefreq: 'daily', lastmod: latestReleaseDate };
        }
        if (item.url === 'https://minibili.zhaohe.org/en/') {
          return { ...item, priority: 0.9, lastmod: latestReleaseDate };
        }
        if (item.url.includes('/changelog')) {
          return { ...item, priority: 0.8, lastmod: latestReleaseDate };
        }
        if (item.url.includes('/roadmap')) {
          return { ...item, priority: 0.6 };
        }
        return { ...item, priority: 0.5 };
      },
    }),
  ],
  build: {
    inlineStylesheets: 'auto',
  },
  compressHTML: true,
});
