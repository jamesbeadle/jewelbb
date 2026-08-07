import { error, fail, redirect } from '@sveltejs/kit';
import {
	dbDelete,
	dbSelect,
	dbUpdate,
	storageUpload,
	type TeamMemberRow
} from '$lib/server/db';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const rows = await dbSelect<TeamMemberRow>(
		'team_members',
		`select=*&id=eq.${encodeURIComponent(params.id)}`
	);
	if (!rows[0]) error(404, 'Team member not found');
	return { member: rows[0] };
};

export const actions: Actions = {
	save: async ({ params, request }) => {
		const form = await request.formData();
		const patch: Record<string, unknown> = {
			name: String(form.get('name') ?? '').trim(),
			role: String(form.get('role') ?? '').trim(),
			bio: String(form.get('bio') ?? '').trim(),
			sort_order: Number(form.get('sort_order') ?? 100) || 100
		};

		if (!patch.name) return fail(400, { error: 'Name is required.' });

		const photo = form.get('photo');
		if (photo instanceof File && photo.size > 0) {
			// Vercel serverless caps request bodies at ~4.5 MB
			if (photo.size > 4 * 1024 * 1024) {
				return fail(400, { error: 'Photo must be under 4 MB.' });
			}
			try {
				patch.photo_url = await storageUpload(photo, 'team');
			} catch (e) {
				return fail(502, {
					error: `Photo upload failed: ${e instanceof Error ? e.message : 'unknown error'}`
				});
			}
		}

		await dbUpdate('team_members', params.id, patch);
		return { saved: true };
	},

	delete: async ({ params }) => {
		await dbDelete('team_members', params.id);
		redirect(303, '/admin/staff');
	}
};
