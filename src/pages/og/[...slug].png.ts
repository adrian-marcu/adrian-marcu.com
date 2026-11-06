import { readFile } from 'node:fs/promises';
import type { APIRoute, GetStaticPaths } from 'astro';
import satori from 'satori';
import sharp from 'sharp';
import { PAGES } from '../../lib/pages';
import { getPosts } from '../../lib/posts';

// Open Graph images (1200x630), rendered once at build time: /og/<slug>.png

type Card = { eyebrow: string; title: string };

export const getStaticPaths = (async () => {
	const pages = Object.entries(PAGES).map(([key, page]) => ({
		params: { slug: key },
		props: { eyebrow: 'adrian-marcu.com', title: page.ogTitle },
	}));
	const posts = (await getPosts()).map((post) => ({
		params: { slug: `posts/${post.id}` },
		props: { eyebrow: 'My blog', title: post.data.title },
	}));
	return [...pages, ...posts];
}) satisfies GetStaticPaths;

const files = [
	'@fontsource/geist-sans/files/geist-sans-latin-400-normal.woff',
	'@fontsource/geist-sans/files/geist-sans-latin-600-normal.woff',
	'@fontsource/source-serif-4/files/source-serif-4-latin-700-normal.woff',
];
const fonts = Promise.all(files.map((file) => readFile(`node_modules/${file}`)));

const h = (type: string, style: Record<string, unknown>, children?: unknown) => ({
	type,
	props: { style, children },
});

export const GET: APIRoute = async ({ props }) => {
	const { eyebrow, title } = props as Card;
	const [sans, sansBold, serif] = await fonts;
	const titleSize = title.length > 70 ? 56 : title.length > 40 ? 66 : 84;

	const svg = await satori(
		h(
			'div',
			{
				// Explicit size: with '100%' Satori adds the padding on top and pushes the footer off-canvas.
				width: 1200,
				height: 630,
				boxSizing: 'border-box',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
				padding: '64px 80px',
				background: '#05070f',
				color: '#f3f4f6',
				fontFamily: 'Geist',
			},
			[
				h('div', { display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontSize: 28, color: '#9ca3af' }, [
					h('div', { color: '#f3f4f6', fontWeight: 600 }, 'Adrian Marcu'),
					h('div', {}, eyebrow),
				]),
				h(
					'div',
					{ fontFamily: 'Source Serif', fontWeight: 700, fontSize: titleSize, lineHeight: 1.1, letterSpacing: -1, maxWidth: 1040 },
					title,
				),
				h('div', { fontSize: 26, color: '#9ca3af' }, 'Senior Fullstack Software Engineer · Java · Spring Boot · React · GCP/AWS'),
			],
		) as never,
		{
			width: 1200,
			height: 630,
			fonts: [
				{ name: 'Geist', data: sans, weight: 400, style: 'normal' },
				{ name: 'Geist', data: sansBold, weight: 600, style: 'normal' },
				{ name: 'Source Serif', data: serif, weight: 700, style: 'normal' },
			],
		},
	);

	const png = await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();
	return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
