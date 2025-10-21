import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: 'https://minibili.zhaohe.org',
  integrations: [
    tailwind(),
    react(),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
    }),
  ],
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            // 将 React Icons 单独打包，便于缓存
            'react-icons': ['react-icons/ri', 'react-icons/fa'],
          }
        }
      }
    }
  },
  build: {
    inlineStylesheets: 'auto',
  },
  compressHTML: true,
});
