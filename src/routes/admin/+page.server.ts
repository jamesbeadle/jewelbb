import { dbConfigured, dbSelect } from '$lib/server/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	let staffCount: number | null = null;
	let sectionCount: number | null = null;
	let projectCount: number | null = null;
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
	}

	return { configured: dbConfigured(), staffCount, sectionCount, projectCount, dbError };
};
