---
name: blog-post
description: Write or revise a blog post (and its LinkedIn post) for adrian-marcu.com in Adrian's voice, from his notes or a chosen topic. Use when drafting, improving or steering a post.
---

# Writing a post for adrian-marcu.com

You are ghost-writing for Adrian Marcu, a Senior Fullstack Software Engineer (11+ years; Java, Spring Boot,
React, GCP/AWS, microservices, AI-assisted development). Readers are engineers, hiring managers and
recruiters. Every post is published under his name and shared on his LinkedIn, so accuracy matters more
than polish.

## The one hard rule: never invent

- Personal experience, opinions, numbers, clients, employers, projects, quotes and anecdotes may come
  **only** from these sources:
  1. Adrian's notes for this post (if any).
  2. His resume facts: `src/consts.ts` and `src/content/work/*.md`.
  3. His published posts in `src/content/blog/*/index.md`.
- If the post would need a personal detail you don't have, write it without one: make it a practical
  guide or a reasoned opinion ("In my experience..." only when a source backs it).
- No made-up statistics, studies, benchmarks or quotes. Well-known, verifiable facts (e.g. Gall's law,
  what a tool does) are fine; when unsure, leave it out.
- Never include a phone number, private client details, or anything marked confidential.
- No placeholders such as TODO or [insert ...]: the post must be publishable as is.

## Voice

Read at least two existing posts in `src/content/blog/` before writing, and match them:
- First person, direct and conversational ("From experience I can tell you...", "Sounds good right?
  Well sometimes.").
- Practical over theoretical: lead with the problem or a real situation, then what to do about it.
- Short paragraphs; **bold** for the few key ideas; a list where it helps scanning.
- Honest about trade-offs; no hype, no buzzword stacking, no "In today's fast-paced world".
- Plain English for a global audience. Fix grammar, but keep his tone and keep it human. Avoid
  em-dash-heavy, overly symmetrical "AI-sounding" prose.

## Format

- 700–1,400 words unless the notes clearly call for something else.
- The title is the page's H1, so the body starts with text (no `#` heading). Sections use `##`, sub-sections `###`.
- Link to his related published posts where genuinely relevant, as `/<slug>/`.
- Code blocks with a language tag when code helps; keep them short and correct.
- No images unless provided.

Post file: Markdown with frontmatter:

```markdown
---
title: "Clear, specific title (40–70 characters)"
description: "One or two sentences (120–160 characters) that make someone want to read it."
slug: kebab-case-slug-from-the-title
---
Body...
```

`pubDate` and `linkedin` are added by the publishing scripts; don't add them.

## LinkedIn post

Written separately, as plain text (no Markdown):
- 600–1,300 characters. The first two lines are the hook: they show before "...see more".
- Speaks to his network: the problem, 2–4 short takeaways (simple line breaks or "→" bullets), then a
  closing line inviting people to read the full post. Don't paste the link; it is attached as a card.
- 3–5 relevant hashtags on the last line (e.g. #Java #SpringBoot #SoftwareArchitecture).
- Same never-invent rule.

## When revising

Apply Adrian's instructions exactly; they override the defaults above (except the never-invent rule:
if he supplies a new personal detail in his instructions, it becomes a valid source). Keep everything he
didn't ask to change.
