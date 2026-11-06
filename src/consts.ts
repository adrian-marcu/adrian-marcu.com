// Site-wide facts. Everything about Adrian here is taken from the 2026 resume
// (public/Adrian-Marcu-Resume-2026.pdf); do not add claims that aren't in it.

export const SITE_URL = 'https://adrian-marcu.com';
export const SITE_TITLE = 'Adrian Marcu';
export const SITE_DESCRIPTION =
	'Adrian Marcu, Senior Fullstack Software Engineer with 11+ years in Java, Spring Boot, React and GCP/AWS. Writing on architecture, freelancing and building products.';

// The home page introduction: the wording of the original site, updated with the 2026 resume facts.
export const INTRO =
	'Senior Fullstack Software Engineer with 11+ years of expertise in Java, Spring Boot, React and cloud technologies (GCP, AWS), delivering scalable, high-performance solutions for startups and enterprises.';

export const PROFILE = {
	name: 'Adrian Marcu',
	jobTitle: 'Senior Full-Stack Engineer',
	location: 'Bucharest, Romania',
	email: 'marcadi10@gmail.com',
	resume: '/Adrian-Marcu-Resume-2026.pdf',
	summary:
		'Senior Full-Stack Engineer, 11+ years. Java, Spring Boot, React, GCP/AWS. Currently on a 25-microservice Google Cloud Run platform at METRO.digital where I introduced agentic AI workflows across the engineering team; before that, fintech, banking and payments engineering for A2X, ING, Mastercard and NETS.',
};

export const SOCIAL_LINKS = {
	linkedin: 'https://linkedin.com/in/adrianmarcu-tech',
	github: 'https://github.com/adrian-marcu',
	booking:
		'https://calendar.google.com/calendar/appointments/schedules/AcZssZ2ZGN-5lZU8L0Mff1MyHqT7sv4M6jFdlRtvAXAdFQUXJXJDH7A2m1rsNRIX6m1N4DFbVzk6UuUl?gv=true',
};

// Companies and clients named in the resume, in reverse-chronological order.
export const WORKED_WITH = [
	'METRO.digital',
	'A2X',
	'ING',
	'Mastercard',
	'NETS',
	'Credit Suisse',
	'Pay360',
	'Endava',
];

export const SKILLS = [
	{
		group: 'Top skills',
		items: ['Spring Boot', 'React.js', 'AI-Assisted Software Development', 'API/Microservices Design', 'Java'],
	},
	{
		group: 'AI and security',
		items: [
			'Claude Code',
			'GitHub Copilot',
			'Context Engineering',
			'Agentic AI Development',
			'Prompt Engineering',
			'Threat & Vulnerability Management',
			'Software Supply Chain Security',
			'DevSecOps',
		],
	},
	{
		group: 'Cloud and DevOps',
		items: [
			'GCP (Cloud Run, App Engine)',
			'AWS (ECS Fargate, Lambda, CloudFront)',
			'Terraform',
			'Docker',
			'GitHub Actions',
		],
	},
	{
		group: 'Frameworks and languages',
		items: ['Java 21', 'Spring', 'React', 'TypeScript', 'Vue.js', 'Python'],
	},
];

export const EDUCATION = [
	{
		degree: "Master's degree, Advanced Software Services",
		school: 'University POLITEHNICA of Bucharest',
		years: '2016 – 2018',
		note: 'Grade: 10',
	},
	{
		degree: 'Bachelor of Applied Science (B.A.Sc.), Computer Science',
		school: 'University POLITEHNICA of Bucharest',
		years: '2012 – 2016',
	},
];
