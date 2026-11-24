---
title: Security Scans in CI That Actually Get Fixed
description: Adding SAST and SCA scanning to your pipeline is the easy part.
  Here is how to turn findings into tickets, real fixes and a shorter time to
  remediation.
pubDate: 2026-11-24T15:24:13.753Z
linkedin: >-
  Adding a security scanner to a CI pipeline can take an afternoon.

  The harder question is how long a critical CVE stays open after the scanner
  finds it.


  At METRO.digital I drove the DevSecOps and software supply chain security work
  across our frontend and backend services. We added Black Duck Polaris (SAST
  and SCA) to GitHub Actions on every merge into pre-production. The risk was
  ending up with a dashboard full of red that everybody learns to ignore. So new
  findings became Jira tickets automatically, and we used AI-assisted
  remediation to fix high and critical CVEs. Mean time to remediation went down
  by 20%.


  What I'd keep from it:


  → Put findings on the board developers already work from. Only new findings
  create tickets, one ticket per CVE, routed by severity.

  → Let AI propose the fix and let the engineer decide. Every change goes
  through review and tests, and suppressing a finding doesn't count as fixing
  it.

  → Track time to remediation, not the number of findings. It covers the whole
  chain, from detection to the fix in production.


  How long does a critical CVE stay open in your team today, and which step
  slows the fix down the most?
---
Plenty of teams have some kind of security scanning in place. The harder question is how long a critical vulnerability stays open after it's found. That's the part that matters.

Adding a scanner to a pipeline can take an afternoon. Getting a team to actually fix what it finds is a different job. Without that second part you end up with a dashboard full of red that everybody learns to ignore, and a false feeling that "security is handled".

At METRO.digital I drove the DevSecOps and software supply chain security work across our frontend and backend services. We integrated Black Duck Polaris (SAST and SCA) into GitHub Actions on every pre-production merge, automated Jira ticket creation for new findings, and used AI-assisted remediation to resolve high and critical CVEs. The result was a **20% reduction in mean time to remediation**. Here is how I think about setting up something similar, and what I would pay attention to.

## First, know what you are scanning for

Two terms get mixed up a lot, so quickly:

- **SAST (Static Application Security Testing)** looks at *your* code: injection risks, unsafe deserialization, hardcoded secrets, weak crypto and similar patterns.
- **SCA (Software Composition Analysis)** looks at *other people's* code: the libraries you depend on, including the transitive ones you never chose directly, checked against known vulnerabilities (CVEs) and licenses.

In a Java/Spring Boot backend and a React frontend, SCA can easily produce the bulk of the findings. One `pom.xml` or `package.json` pulls in a whole tree of dependencies, and any of them can get a CVE published tomorrow even if you didn't change a single line. That's why supply chain security is not a one-time audit. It's a moving target.

## Scan where code actually moves

The first decision is **when** to scan. Scan too rarely and findings pile up until nobody wants to touch them. Scan on every commit of every branch and you slow everyone down and burn money on scans of code that will never ship.

We scanned on every merge into pre-production. For me that's a sensible middle ground:

- The code being scanned is the code that's about to go live, not someone's half-finished experiment.
- Feedback comes while the change is still fresh in the developer's head.
- Nothing reaches production without having been scanned at least once.

On a platform with many services this also has to be **consistent**. If every repository has its own homegrown setup, you'll spend more time maintaining the pipelines than fixing vulnerabilities. Put the scanning step in a shared, reusable workflow and keep the per-repository part as small as possible.

## Findings that live only in a dashboard don't get fixed

This is the part most setups skip. A scanner report is not work. A ticket in the backlog is.

Developers don't go and check a separate security portal every morning. They work from the board. So we automated Jira ticket creation for **new** findings. If you do the same, a few rules keep it from flooding the board:

1. **Only new findings create tickets.** When you turn scanning on for the first time you'll get an existing backlog. Handle that once, as a planned clean-up, instead of dumping hundreds of tickets on the team in one day.
2. **Don't create duplicates.** The same CVE showing up on every merge should update one ticket, not create twenty.
3. **Put the context in the ticket.** Which service, which dependency, which version fixes it, how severe. The less someone has to dig, the faster it gets picked up.
4. **Route by severity.** High and critical go into the current work. Low and medium can wait for regular maintenance. If everything is urgent, nothing is.

Sounds simple right? It is, and that's the point. The hard part is not the tooling, it's making security findings flow into the same process as every other piece of work.

## Use AI to fix, not to decide

Once findings land as tickets, someone still has to fix them. For dependency CVEs that often means a version bump. Sometimes that's trivial. Sometimes the fixed version is a major release with breaking changes, and now you are touching code in places you didn't plan to.

This is where we used AI-assisted remediation for high and critical CVEs. An AI coding assistant is genuinely good at the boring parts: finding every place an API is used, proposing the upgrade, adjusting code to a changed signature, running the build and tests again. I wrote about my early impressions of these tools in [Redefining Development](/redefining-development/), and they have improved a lot since then.

But I want to be honest about the trade-off. **The AI proposes, the engineer decides.** A few rules I'd keep:

- Every AI-generated fix goes through the normal pull request and review, like any other change.
- Your test suite is the safety net. If coverage around a dependency is weak, an upgrade is risky no matter who writes it.
- Don't let an assistant "fix" a finding by suppressing it or excluding a path from the scan. That's hiding a problem, not solving it.

Tools like Renovate help on the other side of this: keeping dependencies reasonably fresh means that when a CVE lands, the jump to the fixed version is a small one.

## Measure the thing you care about

If you only count findings, you'll be tempted to celebrate when the number goes down for the wrong reasons. The metric that tells you whether the process works is **mean time to remediation**: how long from a vulnerability being found to the fix being in production.

It's honest because it covers the whole chain: detection, ticket, prioritization, fix, review, deploy. In my view, improving it rarely comes from one tool. It comes from taking a bit of friction out of every step.

## Start small

You don't need the perfect setup on day one. As I wrote in [Pitfalls when overdesigning a system](/system-overdesign/), a complex system that works usually grows out of a simple one that worked. A version that's good enough to start with:

1. Add SAST and SCA scanning to one service's pipeline on merges to pre-production.
2. Agree on what severity blocks and what doesn't.
3. Turn new findings into tickets automatically.
4. Track how long they stay open.

Then roll it out to the other services and improve as you go.

Security scanning is not about having a scanner. It's about closing the loop between "we found it" and "it's fixed in production". Make that loop short and boring, and your team will actually keep it running.
