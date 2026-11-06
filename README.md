# adrian-marcu.com

Source for [adrian-marcu.com](https://adrian-marcu.com), built with [Astro](https://astro.build).

## Commands

| Command           | Action                                     |
| :---------------- | :----------------------------------------- |
| `npm install`     | Install dependencies                       |
| `npm run dev`     | Start the dev server at `localhost:4321`   |
| `npm run build`   | Build the site to `./dist/`                |
| `npm run preview` | Preview the production build locally       |

## Writing a post

Create a folder in `src/content/blog/` — its name becomes the URL (`src/content/blog/my-post/` → `/my-post/`):

```md
---
title: "My post"
description: "One-line summary for SEO and social cards."
pubDate: 2026-11-06
heroImage: ./cover.webp   # optional, image lives next to index.md
draft: true               # optional, hidden from production builds
---
```

Posts with `draft: true` or a `pubDate` in the future are excluded from production builds (pages, lists,
RSS, sitemap). A daily scheduled deploy publishes future-dated posts once their date passes.

## Work, education and resume

Each role from the resume is a file in `src/content/work/` (`order: 1` is the most recent), shown in the
Work tab on the home page; roles at the same company are grouped. Education, skills, links and the intro
live in `src/consts.ts`. The resume download is `public/Adrian-Marcu-Resume-2026.pdf`.

## Home page photos

The hero photos are a draggable stack. Put a photo in `src/assets/photos/` and add it to the `photos` list in
`src/components/PhotoStack.astro` (with alt text); the first one is on top when the page loads.

## Checks

```sh
npm run build && npx astro check
```

## Deployment

Every push to `main` builds the site and deploys it to GitHub Pages via `.github/workflows/deploy.yml`.
`public/CNAME` keeps the custom domain `adrian-marcu.com`.
