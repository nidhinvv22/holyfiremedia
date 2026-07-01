// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: 'https://holyfiremedia.in/',
  adapter: vercel(),
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [sitemap({
    filter: (page) => !page.includes('/api/'),
    serialize: (item) => {
      // Set lastmod to current build date for all pages
      item.lastmod = new Date().toISOString();

      // Set priority based on page importance
      if (item.url === 'https://holyfiremedia.in/') {
        item.changefreq = 'weekly';
        item.priority = 1.0;
      } else if (item.url.includes('/karaoke/') && !item.url.endsWith('/karaoke/')) {
        // Individual karaoke pages are high-value (downloadable content)
        item.changefreq = 'monthly';
        item.priority = 0.9;
      } else if (item.url.includes('/lyrics/') && !item.url.endsWith('/lyrics/')) {
        item.changefreq = 'monthly';
        item.priority = 0.9;
      } else if (item.url.includes('/prayers/') || item.url.includes('/artists/')) {
        item.changefreq = 'monthly';
        item.priority = 0.8;
      } else if (item.url.includes('/karaoke/') || item.url.includes('/lyrics/') || item.url.includes('/songs/')) {
        // Index/listing pages
        item.changefreq = 'weekly';
        item.priority = 0.7;
      } else {
        item.changefreq = 'monthly';
        item.priority = 0.5;
      }

      return item;
    },
  })]
});