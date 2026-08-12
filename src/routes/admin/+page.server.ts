import { dbConfigured, dbCount, dbSelect, type EnquiryRow } from '$lib/server/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	let staffCount: number | null = null;
	let sectionCount: number | null = null;
	let projectCount: number | null = null;
	let rtwCount: number | null = null;
	let enquiryCount: number | null = null;
	let newEnquiryCount = 0;
	let recentEnquiries: EnquiryRow[] = [];
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
		// Separate tries: these tables may not exist yet if schema.sql
		// hasn't been re-run — don't let that break the tiles above.
		try {
			rtwCount = await dbCount('rtw_submissions');
		} catch {
			rtwCount = null;
		}
		try {
			[enquiryCount, newEnquiryCount] = await Promise.all([
				dbCount('enquiries', 'status=neq.archived'),
				dbCount('enquiries', 'status=eq.new')
			]);
			recentEnquiries = await dbSelect<EnquiryRow>(
				'enquiries',
				'select=*&status=neq.archived&order=created_at.desc&limit=4'
			);
		} catch {
			enquiryCount = null;
		}
	}

	return {
		configured: dbConfigured(),
		staffCount,
		sectionCount,
		projectCount,
		rtwCount,
		enquiryCount,
		newEnquiryCount,
		recentEnquiries,
		dbError
	};
};
