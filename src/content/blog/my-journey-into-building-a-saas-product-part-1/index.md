---
title: "My Journey into Building a SaaS Product: A Wild Ride"
description: "Explore the journey of building a SaaS product with insights on choosing the right tech stack, navigating AWS, setting up CI/CD pipelines, and automating infrastructure with Terraform. A startup founder’s guide packed with lessons from real-world challenges."
pubDate: 2024-12-25T17:11:21+03:00
heroImage: ./Myjourney.webp
---
I took a leap into the crazy world of building SaaS products, and I have to say—it’s been a wild ride. Along the way, I’ve learned a lot about the tech stacks popular among startups, and I wanted to share my thoughts and experiences.

---

## Starting the Startup Journey

So, what do you do when you have a solid technical background, gained from working in big companies, and decide to start your own startup? You start by **choosing the right tech stack for your product**.

But here’s the twist: How do you choose a tech stack when you don’t even know what to build in the first place?

### The Research Rabbit Hole 🕳️

The first logical step is to research the most popular tech stacks among startups and figure out which one fits your needs. And this is where the gates of hell open.

Oh. My. God.  
I’ve never seen so many opinions on what tech stack to use. Everyone seems to have their own take—and somehow, they’re all right.

I dove into blog posts, forums, and Reddit threads, only to end up more confused than when I started. So, I decided to take a step back and look at the bigger picture:

---

## Popular Tech Stacks Among Startups

The two most popular ones stood out:

1. **MERN Stack**: MongoDB, Express, React, Node.js
2. **MEAN Stack**: MongoDB, Express, Angular, Node.js

Both looked solid, but there was a problem—I was a backend developer with zero frontend experience.

---

## Building with What I Know

Having spent years mastering the **Java ecosystem**, I decided to stick to what I knew. I remembered the golden rule:
> “Start with what you know and build from there.”

### Step 1: Java Microservice
I started with a Java microservice, which gave me an executable JAR file. But how do you run that? I loved the idea of microservices and decided to use **Docker** for containerization.

### Step 2: Deploying on the Cloud
With a Java microservice running in a Docker container, the next question was: How do I deploy it? I decided to go with **AWS**. I was familiar with Google Cloud Platform and Microsoft Azure from previous jobs, and I knew their flaws a little too well.

AWS seemed like a great place to start. But then came the second circle of hell...

---

## The AWS Dilemma

AWS has so many services that I didn’t even know where to start. I spent **two months** just reading about AWS services, trying to figure out how they worked together, and scouring Reddit like a madman.

Working in big corporations had planted this question in my head:
> “What if I need to scale? What if I get so many users that my system can’t handle it? What if I go viral and my system crashes?”

Spoiler: This is the **worst** way to think about your startup. But I went with it anyway.

After tons of research, I knew I wanted something Kubernetes-like but simpler. I chose **AWS ECS (Elastic Container Service)** because it was easier to set up, and I could use **Fargate** to run my containers.

---

## Adding CI/CD to the Mix

Okay, so now I had a Java microservice running in a Docker container, deployed on AWS ECS Fargate. The next challenge was setting up a **CI/CD pipeline**.

### Step 3: Setting Up CI/CD
I had no prior experience in DevOps or SRE, and the sheer number of tools available made my head spin. I eventually chose **GitHub Actions** because:

1. It was free (important for a startup).
2. It integrated seamlessly with GitHub, where my code was hosted.

At first, I manually created services in AWS by clicking through the UI—a total nightmare. I knew I needed to automate this process, but I had no clue where to start.

---

## Automating Infrastructure with Terraform

I started reading about **Infrastructure as Code (IaC)** and asked friends for advice. The consensus? Use **Terraform**.

Terraform was relatively easy to learn and had extensive online resources. But let me tell you—trying to understand its syntax while already overwhelmed with everything else felt like a nightmare.

Just when I thought I was drowning, something truly magical happened to the world, and life would never be the same again!

---

**To be continued...**







