import { dbConfigured, dbSelect } from '$lib/server/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	let staffCount: number | null = null;
	let sectionCount: number | null = null;

	if (dbConfigured()) {
		try {
			const [staff, sections] = await Promise.all([
				dbSelect<{ id: string }>('team_members', 'select=id'),
				dbSelect<{ id: string }>('brochure_sections', 'select=id')
			]);
			staffCount = staff.length;
			sectionCount = sections.length;
		} catch {
			// leave counts null — dashboard shows the connection warning
		}
	}

	return { configured: dbConfigured(), staffCount, sectionCount };
};
