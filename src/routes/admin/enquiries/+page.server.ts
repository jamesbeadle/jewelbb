import { fail } from '@sveltejs/kit';
import { dbConfigured, dbCount, dbDelete, dbSelect, dbUpdate, type EnquiryRow } from '$lib/server/db';
import type { Actions, PageServerLoad } from './$types';

const PAGE_SIZE = 20;

export const load: PageServerLoad = async ({ url }) => {
	const view = url.searchParams.get('view') === 'archived' ? 'archived' : 'inbox';
	const requested = Number(url.searchParams.get('page'));
	let page = Number.isInteger(requested) && requested > 0 ? requested : 1;

	if (!dbConfigured()) {
		return {
			configured: false,
			view,
			rows: [] as EnquiryRow[],
			page: 1,
			totalPages: 1,
			total: 0,
			newCount: 0,
			archivedCount: 0,
			dbError: null as string | null
		};
	}

	let rows: EnquiryRow[] = [];
	let total = 0;
	let newCount = 0;
	let archivedCount = 0;
	let dbError: string | null = null;

	try {
		const filter = view === 'archived' ? 'status=eq.archived' : 'status=neq.archived';
		[total, newCount, archivedCount] = await Promise.all([
			dbCount('enquiries', filter),
			dbCount('enquiries', 'status=eq.new'),
			dbCount('enquiries', 'status=eq.archived')
		]);
		const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
		if (page > totalPages) page = totalPages;
		rows = await dbSelect<EnquiryRow>(
			'enquiries',
			`select=*&${filter}&order=created_at.desc&limit=${PAGE_SIZE}&offset=${(page - 1) * PAGE_SIZE}`
		);
	} catch (e) {
		dbError = (e instanceof Error ? e.message : 'Unknown error').slice(0, 400);
	}

	return {
		configured: true,
		view,
		rows,
		page,
		totalPages: Math.max(1, Math.ceil(total / PAGE_SIZE)),
		total,
		newCount,
		archivedCount,
		dbError
	};
};

function id(data: FormData): string | null {
	const v = data.get('id');
	return typeof v === 'string' && v ? v : null;
}

export const actions: Actions = {
	markRead: async ({ request }) => {
		const enquiryId = id(await request.formData());
		if (!enquiryId) return fail(400, { error: 'Missing enquiry id.' });
		await dbUpdate('enquiries', enquiryId, { status: 'read' });
		return { ok: true };
	},
	markUnread: async ({ request }) => {
		const enquiryId = id(await request.formData());
		if (!enquiryId) return fail(400, { error: 'Missing enquiry id.' });
		await dbUpdate('enquiries', enquiryId, { status: 'new' });
		return { ok: true };
	},
	archive: async ({ request }) => {
		const enquiryId = id(await request.formData());
		if (!enquiryId) return fail(400, { error: 'Missing enquiry id.' });
		await dbUpdate('enquiries', enquiryId, { status: 'archived' });
		return { ok: true };
	},
	restore: async ({ request }) => {
		const enquiryId = id(await request.formData());
		if (!enquiryId) return fail(400, { error: 'Missing enquiry id.' });
		await dbUpdate('enquiries', enquiryId, { status: 'read' });
		return { ok: true };
	},
	remove: async ({ request }) => {
		const enquiryId = id(await request.formData());
		if (!enquiryId) return fail(400, { error: 'Missing enquiry id.' });
		await dbDelete('enquiries', enquiryId);
		return { ok: true };
	}
};
