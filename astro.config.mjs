// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://r-dvl.ghcr.io',
	base: '/blog',
	output: 'static',
	redirects: {
		'/blog/[...slug]': '/blog/posts/[...slug]',
	},
	integrations: [mdx(), sitemap()],
});
