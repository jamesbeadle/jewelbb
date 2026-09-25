import { fail } from '@sveltejs/kit';
import { siteImageLibrary, uploadedImageLibrary } from '$lib/server/brochures';
import {
	dbConfigured,
	dbDelete,
	dbInsert,
	dbSelect,
	dbUpdate,
	type HomeSlideRow
} from '$lib/server/db';
import type { Actions, PageServerLoad } from './$types';

const ORDER = 'order=sort_order.asc,created_at.asc';

export const load: PageServerLoad = async () => {
	const configured = dbConfigured();
	let slides: HomeSlideRow[] = [];
	let missing = false;
	if (configured) {
		try {
			slides = await dbSelect<HomeSlideRow>('home_slides', `select=*&${ORDER}`);
		} catch {
			missing = true;
		}
	}
	const [siteImages, uploaded] = await Promise.all([siteImageLibrary(), uploadedImageLibrary()]);
	return { slides, configured, missing, siteImages, uploaded };
};

export const actions: Actions = {
	add: async ({ request }) => {
		const form = await request.formData();
		const url = String(form.get('image_url') ?? '').trim();
		if (!url) return fail(400, { error: 'Choose a photo to add.' });
		const alt = String(form.get('alt') ?? '').trim();
		await dbInsert('home_slides', {
			image_url: url,
			alt: alt || 'Jewel Bespoke Build project photo',
			visible: true,
			sort_order: 9999
		});
		return { added: true };
	},

	saveAlt: async ({ request }) => {
		const form = await request.formData();
		const id = String(form.get('id') ?? '');
		if (!id) return fail(400, { error: 'Missing slide id.' });
		await dbUpdate('home_slides', id, { alt: String(form.get('alt') ?? '').trim() });
		return { saved: true };
	},

	/** Swap a slide with its neighbour, then renumber 10, 20, 30… */
	move: async ({ request }) => {
		const form = await request.formData();
		const id = String(form.get('id') ?? '');
		const delta = Number(form.get('delta'));
		if (delta !== -1 && delta !== 1) return fail(400, { error: 'Invalid move.' });

		const rows = await dbSelect<Pick<HomeSlideRow, 'id' | 'sort_order'>>(
			'home_slides',
			`select=id,sort_order&${ORDER}`
		);
		const index = rows.findIndex((r) => r.id === id);
		const target = index + delta;
		if (index < 0 || target < 0 || target >= rows.length) {
			return fail(400, { error: 'That photo can’t move any further.' });
		}
		[rows[index], rows[target]] = [rows[target], rows[index]];
		await Promise.all(
			rows.map((r, i) => {
				const order = (i + 1) * 10;
				return r.sort_order === order ? null : dbUpdate('home_slides', r.id, { sort_order: order });
			})
		);
		return { moved: id };
	},

	toggleVisible: async ({ request }) => {
		const form = await request.formData();
		const id = String(form.get('id') ?? '');
		if (!id) return fail(400, { error: 'Missing slide id.' });
		await dbUpdate('home_slides', id, { visible: form.get('visible') === 'true' });
		return { saved: true };
	},

	remove: async ({ request }) => {
		const form = await request.formData();
		const id = String(form.get('id') ?? '');
		if (!id) return fail(400, { error: 'Missing slide id.' });
		await dbDelete('home_slides', id);
		return { saved: true };
	}
};
