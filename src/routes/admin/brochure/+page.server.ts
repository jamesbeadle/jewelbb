import { redirect } from '@sveltejs/kit';
import { dbConfigured, dbInsert, dbSelect, type BrochureSectionRow } from '$lib/server/db';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	if (!dbConfigured()) return { sections: [] as BrochureSectionRow[], configured: false };
	const sections = await dbSelect<BrochureSectionRow>(
		'brochure_sections',
		'select=*&order=sort_order.asc'
	);
	return { sections, configured: true };
};

export const actions: Actions = {
	create: async () => {
		const row = await dbInsert<BrochureSectionRow>('brochure_sections', {
			title: 'New section',
			subtitle: '',
			body: '',
			image_url: '',
			sort_order: 999
		});
		redirect(303, `/admin/brochure/${row.id}`);
	}
};
