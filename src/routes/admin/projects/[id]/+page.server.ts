import { error, fail, redirect } from '@sveltejs/kit';
import {
	dbDelete,
	dbSelect,
	dbUpdate,
	storageUpload,
	type ProjectRow
} from '$lib/server/db';
import type { Actions, PageServerLoad } from './$types';

/** Top-level routes that a project slug must not shadow. */
const RESERVED_SLUGS = new Set([
	'about', 'services', 'portfolio', 'ourcommunity', 'blog', 'brochure',
	'contact', 'privacy-policy', 'terms-and-conditions', 'post', 'admin',
	'api', 'sitemap.xml', 'images'
]);

function slugify(value: string): string {
	return value
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');
}

async function getProject(id: string): Promise<ProjectRow> {
	const rows = await dbSelect<ProjectRow>(
		'projects',
		`select=*&id=eq.${encodeURIComponent(id)}`
	);
	if (!rows[0]) error(404, 'Project not found');
	return rows[0];
}

export const load: PageServerLoad = async ({ params }) => {
	const project = await getProject(params.id);
	const others = await dbSelect<Pick<ProjectRow, 'slug' | 'name'>>(
		'projects',
		'select=slug,name&order=sort_order.asc'
	);
	return { project, others: others.filter((o) => o.slug !== project.slug) };
};

export const actions: Actions = {
	save: async ({ params, request }) => {
		const form = await request.formData();

		const name = String(form.get('name') ?? '').trim();
		if (!name) return fail(400, { error: 'Name is required.' });

		const slug = slugify(String(form.get('slug') ?? '') || name);
		if (!slug) return fail(400, { error: 'Slug is required.' });
		if (RESERVED_SLUGS.has(slug)) {
			return fail(400, { error: `“${slug}” is a reserved page name — pick another slug.` });
		}

		const patch: Record<string, unknown> = {
			name,
			slug,
			meta_title: String(form.get('meta_title') ?? '').trim(),
			meta_description: String(form.get('meta_description') ?? '').trim(),
			subtitle: String(form.get('subtitle') ?? '').trim(),
			description: String(form.get('description') ?? '').trim(),
			cross_link: String(form.get('cross_link') ?? '').trim(),
			accessible: form.get('accessible') === 'on',
			sort_order: Number(form.get('sort_order') ?? 100) || 100
		};

		try {
			await dbUpdate('projects', params.id, patch);
		} catch (e) {
			const msg = e instanceof Error ? e.message : '';
			if (msg.includes('duplicate') || msg.includes('23505')) {
				return fail(400, { error: `The slug “${slug}” is already used by another project.` });
			}
			throw e;
		}
		return { saved: true };
	},

	addPhotos: async ({ params, request }) => {
		const form = await request.formData();
		const files = form.getAll('photos').filter((f): f is File => f instanceof File && f.size > 0);
		if (files.length === 0) return fail(400, { error: 'Choose at least one photo to upload.' });

		// Vercel serverless caps request bodies at ~4.5 MB — keep a margin.
		const total = files.reduce((sum, f) => sum + f.size, 0);
		if (total > 4 * 1024 * 1024) {
			return fail(400, { error: 'Photos must be under 4 MB per upload — add them in smaller batches.' });
		}

		const project = await getProject(params.id);
		const gallery = [...(project.gallery ?? [])];
		try {
			for (const file of files) {
				gallery.push(await storageUpload(file, `projects/${project.slug}`));
			}
		} catch (e) {
			return fail(502, {
				error: `Photo upload failed: ${e instanceof Error ? e.message : 'unknown error'}`
			});
		}
		await dbUpdate('projects', params.id, { gallery });
		return { saved: true };
	},

	removePhoto: async ({ params, request }) => {
		const form = await request.formData();
		const index = Number(form.get('index'));
		const project = await getProject(params.id);
		const gallery = [...(project.gallery ?? [])];
		if (!Number.isInteger(index) || index < 0 || index >= gallery.length) {
			return fail(400, { error: 'Invalid photo.' });
		}
		gallery.splice(index, 1);
		await dbUpdate('projects', params.id, { gallery });
		return { saved: true };
	},

	movePhoto: async ({ params, request }) => {
		const form = await request.formData();
		const index = Number(form.get('index'));
		const delta = Number(form.get('delta'));
		const project = await getProject(params.id);
		const gallery = [...(project.gallery ?? [])];
		const target = index + delta;
		if (
			!Number.isInteger(index) || !Number.isInteger(target) ||
			index < 0 || index >= gallery.length || target < 0 || target >= gallery.length
		) {
			return fail(400, { error: 'Invalid photo move.' });
		}
		[gallery[index], gallery[target]] = [gallery[target], gallery[index]];
		await dbUpdate('projects', params.id, { gallery });
		return { saved: true };
	},

	delete: async ({ params }) => {
		await dbDelete('projects', params.id);
		redirect(303, '/admin/projects');
	}
};
