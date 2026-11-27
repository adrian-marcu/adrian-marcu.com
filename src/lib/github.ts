import { SOCIAL_LINKS } from '../consts';

export type Day = { date: string; count: number; level: number };
export type Contributions = { total: number; weeks: Day[][] };

const user = new URL(SOCIAL_LINKS.github).pathname.slice(1);

/**
 * The past year of GitHub contributions, read at build time from the public calendar on the profile page.
 * It includes private (e.g. work) contributions as plain counts, exactly as anyone sees them on GitHub.
 * The daily rebuild keeps it current. If GitHub can't be reached or changes its markup, this returns
 * null and the section is left out rather than failing the build.
 */
export async function getContributions(): Promise<Contributions | null> {
	try {
		const res = await fetch(`https://github.com/users/${user}/contributions`, {
			headers: { 'User-Agent': 'personal-site-build' },
		});
		if (!res.ok) throw new Error(`HTTP ${res.status}`);
		const html = await res.text();

		// Each day is a <td data-date data-level id>; its count is in the <tool-tip for={id}> label.
		const labels = new Map<string, string>();
		for (const m of html.matchAll(/<tool-tip[^>]*\bfor="([^"]+)"[^>]*>([^<]*)/g)) labels.set(m[1], m[2]);
		const days: Day[] = [];
		for (const m of html.matchAll(/<td\b[^>]*>/g)) {
			const tag = m[0];
			const date = tag.match(/data-date="([^"]+)"/)?.[1];
			const id = tag.match(/\bid="([^"]+)"/)?.[1];
			const level = tag.match(/data-level="(\d)"/)?.[1];
			if (!date || !id || !level) continue;
			const count = Number(labels.get(id)?.match(/^(\d+)/)?.[1] ?? 0);
			days.push({ date, count, level: Number(level) });
		}
		if (days.length < 300) throw new Error(`only ${days.length} days found`);
		days.sort((a, b) => a.date.localeCompare(b.date));

		// Columns are weeks starting on Sunday, as on GitHub.
		const weeks: Day[][] = [];
		for (const day of days) {
			if (!weeks.length || new Date(`${day.date}T00:00:00Z`).getUTCDay() === 0) weeks.push([]);
			weeks.at(-1)!.push(day);
		}
		return { total: days.reduce((sum, d) => sum + d.count, 0), weeks };
	} catch (err) {
		console.warn(`[github] contributions skipped: ${(err as Error).message}`);
		return null;
	}
}
