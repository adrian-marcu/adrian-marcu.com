import { getCollection } from 'astro:content';

/**
 * Published posts, newest first.
 * Drafts and posts with a future `pubDate` are left out of production builds (pages, lists,
 * RSS and therefore the sitemap); the daily scheduled deploy publishes them once their date passes.
 * `astro dev` shows everything.
 */
export async function getPosts() {
	const now = new Date();
	const posts = await getCollection(
		'blog',
		({ data }) => import.meta.env.DEV || (!data.draft && data.pubDate <= now),
	);
	return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

/** Rough reading time from the raw markdown body. */
export function readingTime(body = '') {
	const words = body.replace(/```[\s\S]*?```/g, '').split(/\s+/).filter(Boolean).length;
	return `${Math.max(1, Math.round(words / 230))} min read`;
}
