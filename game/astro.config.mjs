// @ts-check
import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';

// Deployed to GitHub Pages: https://mihaigociu.github.io/way-across-the-sea/
// (the base path must match the repo name)
export default defineConfig({
  site: 'https://mihaigociu.github.io',
  base: '/way-across-the-sea',
  integrations: [svelte()],
  devToolbar: { enabled: false },
});
