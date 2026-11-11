---
title: "App Engine to Cloud Run: Untangle the Bundled Services First"
description: Migrating a legacy App Engine app to Cloud Run is mostly about
  replacing Memcache, task queues, storage and Datastore APIs. Here is the order
  I'd follow.
pubDate: 2026-11-11T09:02:02.842Z
linkedin: >-
  "Just containerize it and deploy it to Cloud Run."

  That is how a legacy App Engine migration often gets planned, and it is rarely
  that simple.


  At A2X I refactored a significant part of an application so it could move from
  Google App Engine to Cloud Run. Putting the app in a container was the easy
  part. The hard part was everything it relied on that only exists inside App
  Engine: Memcache for sessions, Task Queues, the old Datastore API and the App
  Engine file storage libraries.


  So we replaced them one by one: sessions to Redis, files to Cloud Storage,
  entities to a newer Datastore API, and App Engine tasks to Cloud Tasks on
  Cloud Run. The result was around 30% better performance and about 15% lower
  operational costs.


  What I'd tell a team starting this:


  → List every bundled service the app uses. That list is your real migration
  plan.

  → Put each one behind your own interface and replace it while still on App
  Engine, one release at a time.

  → Move the hosting last. By then it really is close to just a container.


  If your team has an old App Engine app waiting for this kind of move, happy to
  compare notes. Send me a message.
---
"Just put it in a container and deploy it to Cloud Run." That is how an App Engine to Cloud Run migration often sounds when someone first proposes it. Sounds simple right? Well, not quite.

At A2X I worked on exactly this kind of migration: refactoring a significant part of an application that had grown up on Google App Engine so it could run on Google Cloud Run. Packaging an app in a container is the easy bit. The real work is everything the application quietly depends on that **only exists inside App Engine**.

In the end it paid off: about 30% better performance and around 15% lower operational costs. But it wasn't one big switch. The work broke down into several separate migrations, and doing it as a series of small, boring, safe steps is the approach I'd recommend to anyone facing the same job.

## Why "just containerize it" doesn't work

Legacy App Engine apps lean on the **bundled services**: Memcache, Task Queues, the App Engine Datastore API, and the App Engine libraries for file storage. They are convenient because they are built into the runtime. You don't configure them, you just call them.

That convenience is the trap. A Cloud Run container is a plain HTTP server. There is no App Engine runtime around it, so none of those APIs are available. If your code calls them directly from a hundred places, your "lift and shift" turns into a rewrite.

So the first thing I would do on any migration like this is make a list of every bundled service the app uses, and where. That list is your real migration plan.

## Step 1: Put the bundled services behind your own interfaces

Before replacing anything, I'd wrap each service in an interface that the business code depends on instead of the App Engine API. A cache interface, a task scheduler interface, a file store interface.

This is the same idea as hexagonal architecture, which I used when building a search API at ING: the business logic talks to ports, and the infrastructure plugs in as adapters. Here it means you can swap Memcache for Redis without touching the code that uses the cache.

It also means you can do the migration **while still running on App Engine**. Every replacement can go to production and prove itself before you change where the app is hosted. That's the part that makes the whole thing low risk.

## Step 2: Replace the services one at a time

These are the replacements we made at A2X, with what I'd watch out for in each.

### Memcache to Redis

Session management was on Google Memcache. We moved it to Redis, which **reduced latency by about 25%** and made sessions more reliable.

A tip for this one: be honest about what lives in your cache. Memcache on App Engine is easy to treat as "free storage that sometimes forgets things", and over the years some data can end up there that nobody would put in a cache on purpose. When you move to Redis, decide explicitly what is a cache entry (can be lost) and what is state (cannot).

### App Engine file storage to Cloud Storage

File storage went from the App Engine libraries to Google Cloud Storage through the standard client library. Storage access times went down by about 20%, but the bigger win was that it removed one more App Engine dependency and **streamlined the Cloud Run migration**.

Changes like this one are worth doing early. They are low risk, easy to test, and every one you finish makes the final move smaller.

### Datastore: move to the newer API

I also led the migration of the application entities to a newer Datastore API, which improved data read and write performance by about 50%. Don't underestimate this step. Entities tend to be used everywhere, and older code often relies on small behaviours of the old API that nobody wrote down. Good integration tests around your most important entities pay for themselves here.

### Task Queues to Cloud Tasks

This was the heart of the migration: a significant part of the application ran as App Engine tasks, and we refactored them to run on Cloud Run with Cloud Tasks.

The biggest change in thinking is that with Cloud Tasks, a task is simply an **HTTP request** to an endpoint of your service. In Java, creating one looks roughly like this:

```java
try (CloudTasksClient client = CloudTasksClient.create()) {
    String queue = QueueName.of(projectId, location, "report-queue").toString();

    Task task = Task.newBuilder()
        .setHttpRequest(HttpRequest.newBuilder()
            .setUrl(serviceUrl + "/tasks/generate-report")
            .setHttpMethod(HttpMethod.POST)
            .putHeaders("Content-Type", "application/json")
            .setBody(ByteString.copyFromUtf8(payloadJson))
            .setOidcToken(OidcToken.newBuilder()
                .setServiceAccountEmail(invokerServiceAccount)))
        .build();

    client.createTask(queue, task);
}
```

A few things to get right when you do this:

- **Make the task handlers idempotent.** Cloud Tasks retries failed requests, so the same task can run more than once. Design for it instead of hoping it won't happen.
- **Secure the endpoints.** On App Engine, task handlers were often protected by the platform. On Cloud Run, use an OIDC token with a dedicated service account (as in the snippet above) and don't allow unauthenticated calls.
- **Watch your timeouts.** Long-running tasks need the request timeout on the Cloud Run service and the dispatch deadline on the task to be set with that work in mind.
- **Configure the queues on purpose.** Retry settings and rate limits are now your decisions. Copy the old behaviour first, then tune.

## Step 3: Only now, move the hosting

Once the bundled services are gone, moving to Cloud Run really is close to "put it in a container and deploy it". The app is just a stateless HTTP service talking to managed services through normal client libraries.

At this point you can also start to enjoy what Cloud Run gives you: plain containers, the same image locally and in production, and scaling based on requests.

## What I would tell a team starting this today

- **The platform move is the last step, not the first.** Most of the work is replacing dependencies, and you can do it on the old platform.
- **Small steps beat a big-bang cutover.** Each replacement is a normal release you can verify and roll back. This is Gall's law again, which I wrote about in [Pitfalls when overdesigning a system](/system-overdesign/): a complex system that works evolves from a simple system that worked.
- **Measure before and after.** Latency, cost and error rates for each step. It's how you know a change helped, and it's how you explain the value of the migration to the business.
- **Don't add features in the middle of it.** A migration is tempting to combine with "while we're at it" improvements. Keep them separate, or you won't know which change broke what.

Migrations like this rarely get much attention, but they are some of the most valuable work a team can do: faster, cheaper and easier to run, with no new feature for users to notice. If you're looking at an old App Engine app and wondering where to start, start with the list of bundled services. That list will tell you how big the job really is.
