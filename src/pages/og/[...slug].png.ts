import { readFile } from 'node:fs/promises';
import type { APIRoute, GetStaticPaths } from 'astro';
import satori from 'satori';
import sharp from 'sharp';
import { PROFILE } from '../../consts';
import { PAGES } from '../../lib/pages';
import { getPosts } from '../../lib/posts';

// Open Graph images (1200x630), rendered once at build time: /og/<slug>.png

type Card = { eyebrow: string; title: string; profile?: boolean };

export const getStaticPaths = (async () => {
	const pages = Object.entries(PAGES).map(([key, page]) => ({
		params: { slug: key },
		props: { eyebrow: 'adrian-marcu.com', title: page.title, profile: true },
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

// The two photos from the home page stack, as data URIs for Satori.
const photo = async (file: string) =>
	`data:image/jpeg;base64,${(await sharp(file).resize(600, 750, { fit: 'cover', position: 'north' }).jpeg({ quality: 85 }).toBuffer()).toString('base64')}`;
const photos = Promise.all([photo('src/assets/photos/portrait.png'), photo('src/assets/photos/columns.jpg')]);

const h = (type: string, style: Record<string, unknown>, children?: unknown) => ({
	type,
	props: { style, children },
});

const img = (src: string, style: Record<string, unknown>) => ({ type: 'img', props: { src, style } });

// Site pages share one card: name and role beside the photo stack, made to be clicked from a recruiter's feed.
const profileCard = ([top, behind]: string[]) => {
	const photoCard = (src: string, style: Record<string, unknown>) =>
		h(
			'div',
			{
				position: 'absolute',
				display: 'flex',
				width: 300,
				height: 375,
				borderRadius: 20,
				overflow: 'hidden',
				border: '1px solid rgba(255,255,255,0.12)',
				boxShadow: '0 30px 60px rgba(0,0,0,0.6)',
				...style,
			},
			[img(src, { width: 300, height: 375, objectFit: 'cover' })],
		);
	return h(
		'div',
		{
			position: 'relative',
			width: 1200,
			height: 630,
			display: 'flex',
			background: '#05070f',
			color: '#f3f4f6',
			fontFamily: 'Geist',
		},
		[
			h('div', {
				position: 'absolute',
				left: -200,
				top: -250,
				width: 900,
				height: 900,
				display: 'flex',
				backgroundImage: 'radial-gradient(circle, rgba(143,180,255,0.18), rgba(5,7,15,0) 60%)',
			}),
			h('div', { display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '72px 0 64px 80px', width: 720 }, [
				h('div', { fontSize: 26, color: '#9ca3af' }, 'adrian-marcu.com'),
				h('div', { display: 'flex', flexDirection: 'column' }, [
					h('div', { fontFamily: 'Source Serif', fontWeight: 700, fontSize: 88, lineHeight: 1.05, letterSpacing: -1.5 }, PROFILE.name),
					h('div', { fontSize: 34, marginTop: 20 }, 'Senior Fullstack Software Engineer'),
					h('div', { fontSize: 30, marginTop: 10, color: '#8fb4ff', fontWeight: 600 }, 'Your Stack, AI-Ready'),
					h('div', { fontSize: 28, marginTop: 6, color: '#9ca3af' }, 'Java · Spring Boot · React · GCP/AWS'),
				]),
				h('div', { display: 'flex', alignItems: 'center', fontSize: 26 }, [
					h(
						'div',
						{
							display: 'flex',
							alignItems: 'center',
							padding: '10px 22px',
							borderRadius: 999,
							background: 'rgba(255,255,255,0.08)',
							border: '1px solid rgba(255,255,255,0.16)',
							fontWeight: 600,
						},
						[h('div', { width: 14, height: 14, borderRadius: 7, background: '#22c55e', marginRight: 14 }), 'Open to projects'],
					),
					h('div', { marginLeft: 20, color: '#9ca3af' }, 'Remote · EU & US'),
				]),
			]),
			h('div', { position: 'relative', display: 'flex', width: 480, height: 630 }, [
				photoCard(behind, { left: 130, top: 150, transform: 'rotate(7deg)' }),
				photoCard(top, { left: 70, top: 125 }),
			]),
		],
	);
};

export const GET: APIRoute = async ({ props }) => {
	const { eyebrow, title, profile } = props as Card;
	const [sans, sansBold, serif] = await fonts;
	const titleSize = title.length > 70 ? 56 : title.length > 40 ? 66 : 84;

	const svg = await satori(
		profile ? (profileCard(await photos) as never) : h(
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

	const png = await sharp(Buffer.from(svg)).png({ compressionLevel: 9, palette: true, quality: 100, dither: 1 }).toBuffer();
	return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
