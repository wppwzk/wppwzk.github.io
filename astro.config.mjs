import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://username.github.io', // Placeholder, user will update
  base: '/my-blog', // Assuming typical GitHub Pages repo name, user might need to change
  integrations: [
    mdx(),
    // sitemap(),
    tailwind({
      applyBaseStyles: false, // We will import our own base styles for full control
    }),
    react(),
  ],
  markdown: {
    shikiConfig: {
      theme: 'dracula',
      wrap: true,
    },
  },
});
