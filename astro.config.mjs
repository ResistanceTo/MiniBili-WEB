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
      serialize(item) {
        if (item.url === 'https://minibili.zhaohe.org/') {
          return { ...item, priority: 1.0, changefreq: 'daily' };
        }
        if (item.url.includes('/changelog')) {
          return { ...item, priority: 0.8 };
        }
        if (item.url.includes('/roadmap')) {
          return { ...item, priority: 0.6 };
        }
        return { ...item, priority: 0.5 };
      },
    }),
  ],
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'react-icons': ['react-icons/ri', 'react-icons/fa', 'react-icons/tb', 'react-icons/fi'],
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
