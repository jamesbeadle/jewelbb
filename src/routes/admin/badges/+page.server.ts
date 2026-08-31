import { fail } from '@sveltejs/kit';
import {
	dbConfigured,
	dbDelete,
	dbInsert,
	dbSelect,
	dbUpdate,
	storageUpload,
	type BadgeRow
} from '$lib/server/db';
import type { Actions, PageServerLoad } from './$types';

// Vercel serverless caps request bodies at ~4.5 MB
const MAX_IMAGE = 4 * 1024 * 1024;

export const load: PageServerLoad = async () => {
	if (!dbConfigured()) return { badges: [] as BadgeRow[], configured: false, missing: false };
	try {
		const badges = await dbSelect<BadgeRow>('badges', 'select=*&order=sort_order.asc');
		return { badges, configured: true, missing: false };
	} catch {
		// The badges table doesn't exist yet — schema.sql needs re-running.
		return { badges: [] as BadgeRow[], configured: true, missing: true };
	}
};

async function uploadBadgeImage(
	form: FormData
): Promise<{ url?: string; error?: string } | null> {
	const image = form.get('image');
	if (!(image instanceof File) || image.size === 0) return null;
	if (image.size > MAX_IMAGE) return { error: 'Image must be under 4 MB.' };
	try {
		return { url: await storageUpload(image, 'badges') };
	} catch (e) {
		return {
			error: `Image upload failed: ${e instanceof Error ? e.message : 'unknown error'}`
		};
	}
}

export const actions: Actions = {
	create: async ({ request }) => {
		const form = await request.formData();
		const label = String(form.get('label') ?? '').trim();
		if (!label) return fail(400, { error: 'Give the badge a name (used as the alt text).' });

		const upload = await uploadBadgeImage(form);
		if (!upload) return fail(400, { error: 'Choose a logo image to upload.' });
		if (upload.error) return fail(502, { error: upload.error });

		await dbInsert('badges', {
			label,
			image_url: upload.url,
			visible: true,
			sort_order: 999
		});
		return { saved: true };
	},

	save: async ({ request }) => {
		const form = await request.formData();
		const id = String(form.get('id') ?? '');
		if (!id) return fail(400, { error: 'Missing badge id.' });

		const label = String(form.get('label') ?? '').trim();
		if (!label) return fail(400, { error: 'The badge name (alt text) is required.' });

		const patch: Record<string, unknown> = {
			label,
			sort_order: Number(form.get('sort_order') ?? 100) || 100,
			visible: form.get('visible') === 'on'
		};

		const upload = await uploadBadgeImage(form);
		if (upload?.error) return fail(502, { error: upload.error });
		if (upload?.url) patch.image_url = upload.url;

		await dbUpdate('badges', id, patch);
		return { saved: true };
	},

	delete: async ({ request }) => {
		const form = await request.formData();
		const id = String(form.get('id') ?? '');
		if (!id) return fail(400, { error: 'Missing badge id.' });
		await dbDelete('badges', id);
		return { saved: true };
	}
};
