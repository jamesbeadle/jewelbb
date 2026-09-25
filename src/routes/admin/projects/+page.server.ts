import { fail, redirect } from '@sveltejs/kit';
import { dbConfigured, dbInsert, dbSelect, dbUpdate, type ProjectRow } from '$lib/server/db';
import { PROJECT_ORDER } from '$lib/server/projects';
import type { Actions, PageServerLoad } from './$types';

const MISSING_VISIBLE =
	'Hiding projects needs a one-off database update — run supabase/2026-09-25-page-content.sql in the Supabase SQL editor.';

export const load: PageServerLoad = async () => {
	if (!dbConfigured()) return { projects: [] as ProjectRow[], configured: false };
	const projects = await dbSelect<ProjectRow>('projects', `select=*&${PROJECT_ORDER}`);
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
	},

	/** Swap a project with its neighbour, then renumber 10, 20, 30… */
	move: async ({ request }) => {
		const form = await request.formData();
		const id = String(form.get('id') ?? '');
		const delta = Number(form.get('delta'));
		if (delta !== -1 && delta !== 1) return fail(400, { error: 'Invalid move.' });

		const rows = await dbSelect<Pick<ProjectRow, 'id' | 'sort_order'>>(
			'projects',
			`select=id,sort_order,name&${PROJECT_ORDER}`
		);
		const index = rows.findIndex((r) => r.id === id);
		const target = index + delta;
		if (index < 0 || target < 0 || target >= rows.length) {
			return fail(400, { error: 'That project can’t move any further.' });
		}
		[rows[index], rows[target]] = [rows[target], rows[index]];

		await Promise.all(
			rows.map((r, i) => {
				const order = (i + 1) * 10;
				return r.sort_order === order
					? null
					: dbUpdate('projects', r.id, { sort_order: order });
			})
		);
		return { moved: id };
	},

	toggleVisible: async ({ request }) => {
		const form = await request.formData();
		const id = String(form.get('id') ?? '');
		if (!id) return fail(400, { error: 'Missing project id.' });
		const visible = form.get('visible') === 'true';
		try {
			await dbUpdate('projects', id, { visible });
		} catch (e) {
			const msg = e instanceof Error ? e.message : '';
			if (msg.includes('visible')) return fail(400, { error: MISSING_VISIBLE });
			throw e;
		}
		return { saved: true };
	}
};
