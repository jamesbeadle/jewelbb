import { error, fail } from '@sveltejs/kit';
import { getContentPage } from '$lib/content/pages';
import {
	dbConfigured,
	dbDeleteWhere,
	dbSelect,
	dbUpsert,
	type PageContentRow
} from '$lib/server/db';
import type { Actions, PageServerLoad } from './$types';

const MISSING =
	'Page text needs a one-off database update — run supabase/2026-09-25-page-content.sql in the Supabase SQL editor.';

function pageOr404(key: string) {
	const page = getContentPage(key);
	if (!page) error(404, 'Page not found');
	return page;
}

export const load: PageServerLoad = async ({ params }) => {
	const page = pageOr404(params.page);
	let saved: Record<string, string> = {};
	let missing = false;
	if (dbConfigured()) {
		try {
			const rows = await dbSelect<PageContentRow>(
				'page_content',
				`select=content&page=eq.${encodeURIComponent(page.key)}`
			);
			saved = rows[0]?.content ?? {};
		} catch {
			missing = true;
		}
	}
	return { page, saved, configured: dbConfigured(), missing };
};

export const actions: Actions = {
	save: async ({ params, request }) => {
		const page = pageOr404(params.page);
		if (!dbConfigured()) return fail(400, { error: 'Supabase is not connected.' });
		const form = await request.formData();

		// Store only what differs from the default, so untouched fields keep
		// following the site's built-in copy.
		const content: Record<string, string> = {};
		for (const f of page.fields) {
			const raw = form.get(f.key);
			if (typeof raw !== 'string') continue;
			const value = raw.replace(/\r\n/g, '\n').trim();
			if (value !== f.default.trim()) content[f.key] = value;
		}

		try {
			if (Object.keys(content).length === 0) {
				await dbDeleteWhere('page_content', `page=eq.${encodeURIComponent(page.key)}`);
			} else {
				await dbUpsert(
					'page_content',
					{ page: page.key, content, updated_at: new Date().toISOString() },
					'page'
				);
			}
		} catch {
			return fail(500, { error: MISSING });
		}
		return { saved: true };
	},

	reset: async ({ params }) => {
		const page = pageOr404(params.page);
		if (!dbConfigured()) return fail(400, { error: 'Supabase is not connected.' });
		try {
			await dbDeleteWhere('page_content', `page=eq.${encodeURIComponent(page.key)}`);
		} catch {
			return fail(500, { error: MISSING });
		}
		return { reset: true };
	}
};
