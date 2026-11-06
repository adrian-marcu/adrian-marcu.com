---
title: "My Journey into Building a SaaS Product: A Wild Ride 2"
description: "Join me on my SaaS-building adventure! From picking the perfect tech stack to mastering AWS, CI/CD pipelines, Terraform automation, and Stripe payments—this startup founder’s guide spills all the real-world lessons from my chaotic journey."
pubDate: 2025-03-12T17:54:22+03:00
heroImage: ./saas-development-backend-tech-overload-2025-wildride2.webp
---
## Ever Wondered What Happens When a Backend Dev Builds a SaaS from Scratch?

Buckle up, folks—because I’m about to take you on the *second leg* of my wild ride building a SaaS product from the ground up. If you missed [Part 1](/my-journey-into-building-a-saas-product-part-1/), I was knee-deep in Java microservices, Docker, AWS chaos, and Terraform wizardry. Now? I’ve got a CI/CD pipeline humming, but the frontend’s staring me down like a dragon I’ve never fought before. Spoiler: It’s messy, it’s fun, and I’ve got battle scars to prove it. Let’s dive into my SaaS development journey, packed with tech stack tips, AWS hacks, and startup lessons you won’t find in a textbook.

---

### Picking Up Where We Left Off

So, I had my CI/CD pipeline sorted with GitHub Actions—code pushed, app deployed to AWS, boom! It felt like magic. I could finally focus on building features instead of wrestling with manual deployments. For the backend, I was golden: Java, Spring Boot, AWS ECS Fargate—all in my comfort zone. But then I hit the wall every backend dev dreads: *the frontend*.

I barely knew a div from a span. Sure, I’d tinkered with JSP pages and poked at Angular once or twice, but building a slick SaaS frontend? That’s a whole different beast. Time to level up.

---

### The Frontend Framework Face-Off

I dove headfirst into researching the hottest frontend frameworks for SaaS development: React, Angular, Vue.js, Svelte—you name it. Reddit threads? Check. Blog posts? Check. Endless debates about SSR (server-side rendering) vs. SSG (static site generation)? Oh, I was drowning in them. Everyone’s got an opinion, and they’re all yelling it from the rooftops.

Then there’s **Next.js**, the golden child of fast SaaS development. Vercel’s marketing team hyped it up like it’s the answer to world hunger—free tier hosting, seamless scaling, the works. Tempting, right? But here’s the catch: I didn’t want to get locked into Vercel’s ecosystem. Scaling up could mean shelling out big bucks, and I like keeping my options open. Could I deploy Next.js on AWS instead? Sure, but it’s not optimized for it—more hassle than I signed up for.

After a week of research (and a few too many coffees), I landed on **React with Vite**. Why? React’s the granddaddy of frontend frameworks—open-source, massive community, and beginner-friendly. Vite? Lightning-fast builds and a dev experience that doesn’t make me want to pull my hair out. Sold.

---

### Building the Frontend: From Zero to Hero

I fired up a new React project with Vite and got to work. Here’s the stack I rolled with:
- **React Router** for smooth navigation.
- **Tailwind CSS** for styling (because who has time to write CSS from scratch?).
- **Redux** for state management—keeps things sane as the app grows.

For hosting, I went with **Amazon S3** to store my static files—cheap, simple, and reliable. Then I slapped a **CloudFront** distribution on top to serve it globally, making my SaaS app snappy for users worldwide. No backend server pre-rendering pages here—I wanted a fully static site to cut costs and complexity. SEO? I’d deal with that later. Right now, I just needed something that *worked*.

---

### Authentication: DIY or Bust

Every SaaS needs login and signup, right? I flirted with **AWS Cognito**—it’s slick and integrates with AWS like a dream—but I didn’t want to pay for an external service just yet. So, I built my own auth system with **JWT (JSON Web Tokens)**. Simple login and registration pages with React and Tailwind CSS, plus some basic validation to keep the bots at bay.

On the backend, I used **Spring Boot** and **Spring Security** to lock it down. JWT let me create roles (admin vs. regular users) and control permissions like a pro. Tested it—logged in, registered, saw role-based content. Nailed it.

Oh, and email? I hooked up **AWS SES** for registration and login emails. Sandbox mode meant I could only send to myself at first (ugh, verification hoops), but it worked. Locally, I used [MailDev](https://github.com/maildev/maildev) to preview emails—seriously, a lifesaver for testing.

Then I thought, “Why not add Google OAuth?” Users love logging in with Google, and it’s one less password to remember. I skipped third-party libraries, hit up Google’s API directly, and after a few hours of swearing at the docs, it clicked. Bonus: my UI scaled nicely on mobile and desktop, thanks to some premium **Tailwind CSS templates** I snagged. Worth every penny.

---

### Payments: Stripe to the Rescue

Next up: payments. This was a no-brainer—**Stripe** all the way. Why? It’s the go-to for SaaS companies, with a killer API, easy subscription management, and top-notch security. I set up a test account, created some fake products, and wired up a webhook to handle events. Debugging was a pain—Stripe events don’t always fire in order, and I learned that the hard way—but I got it dialed in.

---

### The SaaS Core: Where the Magic Happens

Now, the real meat of the SaaS—what’s the actual service? I spent *ages* researching what users want, nailing down the must-have features for my target audience. This part’s too juicy for one post—I’ll spill the details in Part 3. Trust me, it’s worth the wait.

---

### SEO in 2025: AI to the Rescue

Post-build, I tackled **SEO** to boost my Google ranking. Tools like **Google Search Console** and **Google Analytics** became my best friends. I added meta tags and a sitemap—basic stuff to get crawled. SEO’s a beast, with agencies promising the moon, but here’s the 2025 twist: AI’s got your back. I fed my code to an LLM in my IDE, and it optimized my site faster than I could say “first page.” With a solid product and marketing, SEO’s less of a headache now.

---

### My First Product—and the Real Challenge

I had it—a working SaaS product! The easy part was done. The hard part? Getting users. Friends and family tested it (thanks, guys), but I needed more eyes, more feedback. That’s a saga for another day—I’m still figuring out how to grow this thing. Stay tuned for Part 3, where I’ll dish on user acquisition, challenges, and more startup lessons.

Cheers,  
Adrian