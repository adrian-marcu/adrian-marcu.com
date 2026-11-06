// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://adrian-marcu.com',
	output: 'static',
	integrations: [
		mdx(),
		sitemap({
			// The contact form's thank-you page shouldn't be indexed.
			filter: (page) => !page.includes('/messagesent/'),
		}),
	],
	fonts: [
		{
			provider: fontProviders.local(),
			name: 'Geist',
			cssVariable: '--font-geist',
			fallbacks: ['system-ui', 'sans-serif'],
			options: {
				variants: [
					{
						src: ['./node_modules/@fontsource-variable/geist/files/geist-latin-wght-normal.woff2'],
						weight: '100 900',
						style: 'normal',
						display: 'swap',
					},
				],
			},
		},
		{
			provider: fontProviders.local(),
			name: 'Source Serif 4',
			cssVariable: '--font-source-serif',
			fallbacks: ['Georgia', 'serif'],
			options: {
				variants: [
					{
						src: ['./node_modules/@fontsource-variable/source-serif-4/files/source-serif-4-latin-wght-normal.woff2'],
						weight: '200 900',
						style: 'normal',
						display: 'swap',
					},
				],
			},
		},
	],
});
