import { redirect } from '@sveltejs/kit';
import { dbConfigured, dbInsert, dbSelect, type ProjectRow } from '$lib/server/db';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	if (!dbConfigured()) return { projects: [] as ProjectRow[], configured: false };
	const projects = await dbSelect<ProjectRow>('projects', 'select=*&order=sort_order.asc');
	return { projects, configured: true };
};

export const actions: Actions = {
	create: async () => {
		const suffix = Math.random().toString(36).slice(2, 7);
		const row = await dbInsert<ProjectRow>('projects', {
			slug: `new-project-${suffix}`,
			name: 'New project',
			meta_title: '',
			meta_description: '',
			subtitle: '',
			description: '',
			gallery: [],
			cross_link: '',
			accessible: false,
			sort_order: 999
		});
		redirect(303, `/admin/projects/${row.id}`);
	}
};
