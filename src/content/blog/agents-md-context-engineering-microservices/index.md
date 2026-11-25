---
title: "AGENTS.md: Context Engineering for AI Agents in Microservices"
description: AI coding agents are only as good as the context you give them. How
  a simple AGENTS.md file in every repository makes them useful on a
  microservice platform.
pubDate: 2026-11-17T13:56:55.741Z
linkedin: >-
  On a platform of 25 microservices, an AI coding agent can write code that
  compiles and is still wrong for your system.

  Wrong test command, an ignored team convention, or a "fix" in a service it
  should never touch.


  On my current project those services run on Google Cloud Run. I was the first
  engineer on the team to introduce agentic coding workflows there, using GitHub
  Copilot CLI. The model was rarely the problem. The agent simply didn't know
  what the team knew, and every repository had its own conventions.


  So I added an AGENTS.md file to every repository. It's a short Markdown file
  the agent loads automatically: what the service owns, the exact build and test
  commands, the conventions we enforce in code review, and what it must not
  touch. The team adopted it, and cross-service work got noticeably faster.


  What I took from it:

  → Exact build and test commands let the agent check its own work

  → Keep the file short and true, and change it in the same PR as the code

  → The same structure in every repository is where the real gain is


  If you use AI agents across many repositories, where do you keep the context
  they need?
---
Back in 2023 I wrote about trying out GitHub Copilot in [Redefining Development](/redefining-development/). My conclusion then was that it worked best when writing new features, but with existing features or more complex business requirements it still struggled a bit.

The tools have come a long way since then. But that struggle has not completely gone away, and I think most engineers who tried an AI agent on a real codebase know the feeling. The agent writes code that compiles, looks reasonable, and is still wrong for *your* system. It uses the wrong test command, ignores a convention the whole team follows, or "fixes" something in a service it should never touch.

On my current project I work on a platform of 25 microservices running on Google Cloud Run. I was the first engineer on the team to introduce agentic coding workflows there, using GitHub Copilot CLI and **AGENTS.md files across all repositories**. The approach was adopted team-wide and made cross-service work noticeably faster. This post is about why that small file matters so much and what I think belongs in it.

## The problem is context, not the model

When an agent gets something wrong in a mature codebase, the first reaction is usually to blame the model. Most of the time the real issue is simpler: **the agent doesn't know what you know**.

You know that this service is the only one allowed to write to a certain table. You know the build needs a specific profile. You know the team agreed on a certain way of handling errors in REST controllers. None of that is obvious from reading a few files, and an agent usually starts a task having read only a few files.

I wrote in my [microservices post](/another-perspective-on-microservices/) that mapping the entire flow of data in my head was where I "cursed my days", and that documentation is never perfect. Microservices make the context problem worse. Every repository is a small world with its own conventions, and the knowledge of how they connect usually lives in people's heads.

That is exactly what **context engineering** is about: deliberately deciding what information the agent sees, instead of hoping it figures it out.

## What AGENTS.md is

AGENTS.md is a plain Markdown file placed at the root of a repository, written for AI coding agents instead of humans. Think of it as a README for the agent. It's an open convention, and a growing number of tools read it automatically when they work in a repository, GitHub Copilot among them.

There is nothing magic about it. It's just text. The value comes from the fact that **tools that support it load it automatically**, so the agent starts every task with the basics of your project already in mind, instead of rediscovering them (or guessing) every time.

## What I would put in it

A good AGENTS.md answers the questions a new senior engineer would ask in their first week. Here is a short, made-up example of the shape I find useful for a Spring Boot service:

```markdown
# Order Service

## Purpose
Owns orders and their lifecycle. Other services read orders only through this service's REST API.

## Build and test
- Build: `./mvnw clean verify`
- Unit tests only: `./mvnw test`
- Run locally: `./mvnw spring-boot:run -Dspring-boot.run.profiles=local`

## Conventions
- Java 21, Spring Boot. Constructor injection only.
- Controllers stay thin; business logic lives in the service layer.
- Every new endpoint needs an integration test.

## Boundaries
- Do not change the public API contract without updating the OpenAPI spec.
- Do not edit generated code under `target/` or `generated/`.
```

The exact content will differ per project, but the sections are almost always the same:

- **Purpose.** One or two sentences on what the service owns. This is where you stop the agent from putting logic in the wrong place.
- **Build and test commands.** The exact commands. This alone removes a lot of failed attempts, because the agent can verify its own work.
- **Conventions.** The rules your team actually enforces in code review. If a reviewer would reject it, write it down.
- **Boundaries.** What the agent must not touch: generated code, public contracts, shared configuration.
- **How this service connects to others.** Which services call it and which it calls. On a microservice platform this is the part humans also benefit from the most.

## Keep it short and keep it true

The temptation is to write everything down. Don't. I wrote a whole post about the [pitfalls of overdesigning a system](/system-overdesign/), and the same idea applies here. An AGENTS.md that tries to cover every case becomes long, contradictory and quickly outdated, and the agent will follow the outdated parts just as faithfully as the correct ones.

A few rules that help:

1. **Start small.** Purpose, commands and three to five conventions. Add more only when you see the agent make the same mistake twice.
2. **Write instructions, not essays.** Short, imperative sentences. "Use constructor injection" beats a paragraph about dependency injection philosophy.
3. **Treat it like code.** It lives in the repository, it changes through pull requests, and it gets reviewed. If a convention changes, the file changes in the same PR.
4. **Be specific.** "Write good tests" tells the agent nothing. "Every new endpoint needs an integration test" does.

## Why one file per repository matters on a platform

On a single repository, a missing AGENTS.md is an annoyance. On a platform with dozens of services, it's the difference between an agent that can help with cross-service work and one that can't.

When a feature touches three services, the agent (and the engineer driving it) needs to understand three sets of conventions quickly. If every repository has the same kind of file with the same sections, moving between services stops being a context switch for the agent and becomes much less of one for the engineer too. **Consistency across repositories is where the real gain is.**

There is also a nice side effect. The things you write for the agent are often the same things new team members need in their first weeks. Documentation is never perfect, but a file that a tool reads on every task, and that visibly causes mistakes when it's wrong, gets noticed and fixed much sooner than a wiki page nobody opens.

## The trade-offs

This is not a silver bullet, so let's be honest about the limits.

- **It does not replace review.** The agent still makes mistakes, and you still own every line that gets merged.
- **It needs maintenance.** A stale AGENTS.md is worse than none, because the agent treats it as the truth.
- **It won't fix a confusing codebase.** If the architecture is hard to explain in a page, the file will show that. That's useful information too.

## Where to start

If your team is experimenting with AI agents and the results feel inconsistent, don't start by switching tools or models. Pick one repository, write a short AGENTS.md with the purpose, commands, conventions and boundaries, and use it for a week. Then fix it every time the agent gets something wrong.

Once it works for one service, roll the same structure out to the rest. That is the step where agentic workflows stop being a personal productivity trick and start helping the whole team.
