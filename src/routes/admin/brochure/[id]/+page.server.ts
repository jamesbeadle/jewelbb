import { error, redirect } from '@sveltejs/kit';
import {
	addPage,
	addProjectPages,
	deleteBrochure,
	deletePage,
	duplicatePage,
	getBrochure,
	movePage,
	setActiveBrochure,
	setDraftBrochure
} from '$lib/server/brochures';
import { getProjects } from '$lib/server/projects';
import { dbUpdate } from '$lib/server/db';
import type { TemplateId } from '$lib/brochure/templates';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const doc = await getBrochure(params.id);
	if (!doc) error(404, 'Brochure not found');
	const projects = await getProjects();
	return { doc, projects: projects.map((p) => ({ slug: p.slug, name: p.name })) };
};

export const actions: Actions = {
	rename: async ({ params, request }) => {
		const form = await request.formData();
		const title = String(form.get('title') ?? '').trim();
		if (title) {
			await dbUpdate('brochures', params.id, { title, updated_at: new Date().toISOString() });
		}
		return { saved: true };
	},

	activate: async ({ params }) => {
		await setActiveBrochure(params.id);
	},

	deactivate: async ({ params }) => {
		await setDraftBrochure(params.id);
	},

	delete: async ({ params }) => {
		await deleteBrochure(params.id);
		redirect(303, '/admin/brochure');
	},

	addPage: async ({ params, request }) => {
		const form = await request.formData();
		const template = String(form.get('template') ?? 'freeform') as TemplateId;
		const page = await addPage(params.id, template);
		redirect(303, `/admin/brochure/${params.id}/page/${page.id}`);
	},

	addProject: async ({ params, request }) => {
		const form = await request.formData();
		const slug = String(form.get('project') ?? '');
		await addProjectPages(params.id, slug || undefined);
	},

	movePage: async ({ params, request }) => {
		const form = await request.formData();
		await movePage(
			params.id,
			String(form.get('page_id') ?? ''),
			String(form.get('direction')) === 'up' ? 'up' : 'down'
		);
	},

	duplicatePage: async ({ params, request }) => {
		const form = await request.formData();
		await duplicatePage(params.id, String(form.get('page_id') ?? ''));
	},

	deletePage: async ({ params, request }) => {
		const form = await request.formData();
		await deletePage(params.id, String(form.get('page_id') ?? ''));
	}
};
