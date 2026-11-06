import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	// Each post is a folder in `src/content/blog/` holding its `index.md` and images.
	// The folder name becomes the post URL, e.g. `freelancing/` -> /freelancing/.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			// Transform string to Date object. A future date schedules the post (see lib/posts.ts).
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.optional(image()),
			heroAlt: z.string().optional(),
			draft: z.boolean().default(false),
		}),
});

// One entry per role on the resume, rendered as the Experience section of the About page.
const work = defineCollection({
	loader: glob({ base: './src/content/work', pattern: '**/*.md' }),
	schema: ({ image }) =>
		z.object({
			// Company logo, shown in the timeline circle. Without one, a monogram is shown instead.
			logo: image().optional(),
			company: z.string(),
			role: z.string(),
			employment: z.string(),
			location: z.string(),
			start: z.string(),
			end: z.string(),
			url: z.url().optional(),
			project: z.string().optional(),
			intro: z.string().optional(),
			highlights: z.array(z.string()).default([]),
			skills: z.array(z.string()).default([]),
			order: z.number(),
		}),
});

export const collections = { blog, work };
