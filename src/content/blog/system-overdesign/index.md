---
title: "Pitfalls when overdesigning a system"
description: "A blog about the pitfalls of overdesigning a system"
pubDate: 2023-03-12T14:16:53+02:00
heroImage: ./complex-system.webp
---
From experience I can tell you that I've seen this pattern many times. I was getting too excited when starting a new project and I would think of alot of side features rather than doing the minimum viable solution. It's almost like when you get distracted doing all the side quests first in a video game and in the end you can't find the motivation to do the very thing that got you interested in the first place.

I was thinking of complex security, filters, validators, permissions, low level design, code style, CI/CD pipelines, documentation and the list can continue. As you can see I was not focusing on the actual value that the system would provide. The core functionality. The **Minimum Viable Offer**.

As you can see the solution of this is to take a step back. Cut the excitement, collect yourself and **think clearly**.

"*A complex system that works is invariably found to have evolved from a simple system that worked*" according to John Gall's law, which bears his name.
This idea is relevant to software engineering, especially when it comes to designing and prototyping intricate systems.

![Gall's Law](./gallslaw.webp "Gall's Law")

It can be tempting to try to address every issue and foresee every requirement when designing a complicated system.
This strategy, though, might result in overengineering and a system that is difficult to comprehend and maintain.

Simple systems are more likely to function and develop over time, as Gall's Law serves as a reminder.
Therefore, software engineers should start with a **minimally viable solution** and **gradually** add complexity as needed when prototyping and designing complex systems. 

For example in software engineering nowadays, when designing a microservice system, it is important to keep in mind the **principle of simplicity**. A complex system that is difficult to understand and maintain is likely to cause problems in the long run. By keeping the design of the system simple, software engineers can ensure that it is more likely to work and be able to evolve over time. The best method for creating systems that function is to start by creating simple systems that pass the environment's current selection tests, then gradually improve them. 

This enables a more gradual and **evolutionary approach**, which reduces the likelihood of creating a system that is difficult to comprehend and maintain.

When beginning to design a complex system, another trap to watch out for is trying to foresee all potential future needs and requirements.
This might result in a system that is overengineered and unusable due to its complexity.
It is preferable to concentrate on the needs and requirements of the **present** and then **iteratively enhance** and **evolve** the system over time. 

Google's Waymo self-driving car project, which was in its early stages of development, provides one illustration of how complex systems cannot be prototyped without first being subjected to environmental testing.
Without performing adequate environmental testing, Google concentrated its early efforts on creating the algorithms and sensors for the self-driving car.

When the car was tested on actual roads, this caused a number of problems.
For instance, the car's sensors had trouble spotting certain things, like bicycles, and the navigation system had trouble navigating in certain weather conditions, like snow or heavy rain.
These problems weren't identified until the car was tested on actual roads, which added time and money to the development process. 

![Google Waymo car](./gc.webp "Google Waymo car")

The 2013 introduction of the healthcare.gov website serves as another example of how complicated systems shouldn't be prototypically tested before being put into use.
A group of contractors created the website as a component of the Affordable Care Act, often known as Obamacare.

When the website first went up, it had a number of technical problems, including slow page loads, error warnings, and trouble setting up user accounts.
These problems were brought on by inadequate testing and a lack of collaboration among the numerous website contractors. 



Gall's Law serves as a reminder that straightforward systems are more likely to function properly and develop over time.
When developing and creating complex systems, software developers should keep this idea in mind to avoid pitfalls like trying to fix every issue at once and to foresee all potential demands and requirements.
Instead, they ought to concentrate on the demands and needs of the moment before iteratively developing and improving the system through time. 



