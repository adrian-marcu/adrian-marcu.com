import { getCollection } from 'astro:content';

type Role = Awaited<ReturnType<typeof getCollection<'work'>>>[number]['data'];

export type Company = {
	// Anchor id on the home page's Work timeline, e.g. "work-metro-digital".
	id: string;
	company: string;
	url?: string;
	logo?: Role['logo'];
	clients: string[];
	// Newest role first.
	roles: Role[];
};

const slug = (name: string) =>
	name
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-|-$/g, '');

// Roles grouped by company, newest first. Consecutive roles at the same company share one entry (e.g. the two ING positions).
export async function getCompanies(): Promise<Company[]> {
	const roles = (await getCollection('work')).sort((a, b) => a.data.order - b.data.order);
	const companies: Company[] = [];
	for (const { data } of roles) {
		const last = companies.at(-1);
		if (last?.company === data.company) {
			last.roles.push(data);
			last.clients.push(...data.clients);
		} else {
			companies.push({
				id: `work-${slug(data.company)}`,
				company: data.company,
				url: data.url,
				logo: data.logo,
				clients: [...data.clients],
				roles: [data],
			});
		}
	}
	return companies;
}

// "Oct 2016 – May 2019" for the whole time at a company.
export const span = (c: Company) => `${c.roles.at(-1)!.start} – ${c.roles[0].end}`;

// A neutral monogram stands in for a logo: the short name if there is one ("ING", "A2X"), else the initial.
export const monogram = (name: string) => {
	const first = name.split(/[\s.]/)[0];
	return first.length <= 3 ? first.toUpperCase() : first[0].toUpperCase();
};
