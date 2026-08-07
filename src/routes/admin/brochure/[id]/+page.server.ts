import { error, fail, redirect } from '@sveltejs/kit';
import {
	dbDelete,
	dbSelect,
	dbUpdate,
	storageUpload,
	type BrochureSectionRow
} from '$lib/server/db';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const rows = await dbSelect<BrochureSectionRow>(
		'brochure_sections',
		`select=*&id=eq.${encodeURIComponent(params.id)}`
	);
	if (!rows[0]) error(404, 'Section not found');
	return { section: rows[0] };
};

export const actions: Actions = {
	save: async ({ params, request }) => {
		const form = await request.formData();
		const patch: Record<string, unknown> = {
			title: String(form.get('title') ?? '').trim(),
			subtitle: String(form.get('subtitle') ?? '').trim(),
			body: String(form.get('body') ?? ''),
			sort_order: Number(form.get('sort_order') ?? 100) || 100
		};

		if (String(form.get('remove_image') ?? '') === 'on') {
			patch.image_url = '';
		}

		const image = form.get('image');
		if (image instanceof File && image.size > 0) {
			// Vercel serverless caps request bodies at ~4.5 MB
			if (image.size > 4 * 1024 * 1024) {
				return fail(400, { error: 'Image must be under 4 MB.' });
			}
			try {
				patch.image_url = await storageUpload(image, 'brochure');
			} catch (e) {
				return fail(502, {
					error: `Image upload failed: ${e instanceof Error ? e.message : 'unknown error'}`
				});
			}
		}

		await dbUpdate('brochure_sections', params.id, patch);
		return { saved: true };
	},

	delete: async ({ params }) => {
		await dbDelete('brochure_sections', params.id);
		redirect(303, '/admin/brochure');
	}
};
