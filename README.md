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

## Deployment

Every push to `main` builds the site and deploys it to GitHub Pages via `.github/workflows/deploy.yml`.
`public/CNAME` keeps the custom domain `adrian-marcu.com`.
