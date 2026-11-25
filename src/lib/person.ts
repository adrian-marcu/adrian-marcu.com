import { getImage } from 'astro:assets';
import avatar from '../assets/photos/portrait.png';
import { EDUCATION, PROFILE, SITE_URL, SKILLS, SOCIAL_LINKS } from '../consts';

// A small JPEG for structured data; referencing the source PNG would ship the full 700 KB original.
const photo = await getImage({ src: avatar, width: 600, format: 'jpg' });

// schema.org Person, shared by the home and about pages.
export const person = {
	'@context': 'https://schema.org',
	'@type': 'Person',
	'@id': `${SITE_URL}/#person`,
	name: PROFILE.name,
	jobTitle: PROFILE.jobTitle,
	description: PROFILE.summary,
	url: `${SITE_URL}/`,
	image: new URL(photo.src, SITE_URL).href,
	email: `mailto:${PROFILE.email}`,
	address: { '@type': 'PostalAddress', addressLocality: 'Bucharest', addressCountry: 'RO' },
	alumniOf: { '@type': 'CollegeOrUniversity', name: EDUCATION[0].school },
	knowsAbout: SKILLS.flatMap((group) => group.items),
	sameAs: [SOCIAL_LINKS.linkedin, SOCIAL_LINKS.github],
};
