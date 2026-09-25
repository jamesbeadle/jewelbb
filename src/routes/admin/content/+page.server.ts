import { contentPages } from '$lib/content/pages';
import { dbConfigured, dbSelect, type PageContentRow } from '$lib/server/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	let edited: Record<string, number> = {};
	let missing = false;
	if (dbConfigured()) {
		try {
			const rows = await dbSelect<PageContentRow>('page_content', 'select=page,content');
			edited = Object.fromEntries(rows.map((r) => [r.page, Object.keys(r.content ?? {}).length]));
		} catch {
			missing = true;
		}
	}
	return {
		configured: dbConfigured(),
		missing,
		pages: contentPages.map((p) => ({
			key: p.key,
			label: p.label,
			path: p.path,
			blurb: p.blurb,
			fieldCount: p.fields.length,
			edited: edited[p.key] ?? 0
		}))
	};
};
