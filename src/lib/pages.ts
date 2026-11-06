// Titles and descriptions for the static pages. Shared by the pages and their OG images.
export const PAGES = {
	home: {
		title: 'Adrian Marcu · Senior Fullstack Software Engineer',
		ogTitle: "Hi, I'm Adrian.",
		description:
			'Adrian Marcu, Senior Fullstack Software Engineer from Bucharest with 11+ years in Java, Spring Boot, React and GCP/AWS. Work history, education and resume.',
	},
	posts: {
		title: 'My blog · Adrian Marcu',
		ogTitle: 'My blog',
		description:
			'Posts by Adrian Marcu on software architecture, microservices, freelancing, building a SaaS and AI in software development.',
	},
	about: {
		title: 'About · Adrian Marcu',
		ogTitle: 'About me',
		description:
			'About Adrian Marcu, Senior Fullstack Software Engineer based in Bucharest, Romania: what he brings to a team, skills, and the companies he has worked with.',
	},
	contact: {
		title: 'Contact · Adrian Marcu',
		ogTitle: "Let's work together",
		description: 'Get in touch with Adrian Marcu: send a message, book an appointment or connect on LinkedIn.',
	},
} as const;

export type PageKey = keyof typeof PAGES;
