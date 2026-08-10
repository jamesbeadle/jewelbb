import { dbConfigured, dbCount, dbSelect, type RtwSubmissionRow } from '$lib/server/db';
import type { PageServerLoad } from './$types';

const PAGE_SIZE = 20;

export const load: PageServerLoad = async ({ url }) => {
	const requested = Number(url.searchParams.get('page'));
	let page = Number.isInteger(requested) && requested > 0 ? requested : 1;

	if (!dbConfigured()) {
		return { configured: false, rows: [] as RtwSubmissionRow[], page: 1, totalPages: 1, total: 0, pageSize: PAGE_SIZE, dbError: null as string | null };
	}

	let rows: RtwSubmissionRow[] = [];
	let total = 0;
	let dbError: string | null = null;
	try {
		total = await dbCount('rtw_submissions');
		const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
		if (page > totalPages) page = totalPages;
		rows = await dbSelect<RtwSubmissionRow>(
			'rtw_submissions',
			`select=*&order=created_at.desc&limit=${PAGE_SIZE}&offset=${(page - 1) * PAGE_SIZE}`
		);
	} catch (e) {
		dbError = (e instanceof Error ? e.message : 'Unknown error').slice(0, 400);
	}

	return {
		configured: true,
		rows,
		page,
		totalPages: Math.max(1, Math.ceil(total / PAGE_SIZE)),
		total,
		pageSize: PAGE_SIZE,
		dbError
	};
};
