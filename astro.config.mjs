// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import compress from 'astro-compress';

// https://astro.build/config
export default defineConfig({
  site: 'https://emergentworks.org', // required for sitemap
  integrations: [react(), sitemap(), mdx(), compress()],

  vite: {
    plugins: [tailwindcss()]
  }
});