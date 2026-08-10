import { dbConfigured, dbCount, dbSelect } from '$lib/server/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	let staffCount: number | null = null;
	let sectionCount: number | null = null;
	let projectCount: number | null = null;
	let rtwCount: number | null = null;
	let dbError: string | null = null;

	if (dbConfigured()) {
		try {
			const [staff, sections, projects] = await Promise.all([
				dbSelect<{ id: string }>('team_members', 'select=id'),
				dbSelect<{ id: string }>('brochure_sections', 'select=id'),
				dbSelect<{ id: string }>('projects', 'select=id')
			]);
			staffCount = staff.length;
			sectionCount = sections.length;
			projectCount = projects.length;
		} catch (e) {
			dbError = (e instanceof Error ? e.message : 'Unknown error').slice(0, 400);
		}
		// Separate try: the rtw_submissions table may not exist yet if
		// schema.sql hasn't been re-run — don't let that break the tiles above.
		try {
			rtwCount = await dbCount('rtw_submissions');
		} catch {
			rtwCount = null;
		}
	}

	return { configured: dbConfigured(), staffCount, sectionCount, projectCount, rtwCount, dbError };
};
