/**
 * Saved page-text overrides from Supabase (`page_content`). Fails soft to
 * an empty object, so the site always renders with the default copy in
 * $lib/content/pages when the table is missing or Supabase is down.
 */
import type { ContentOverrides } from '$lib/content/pages';
import { dbConfigured, dbSelect, type PageContentRow } from '$lib/server/db';

export async function getContentOverrides(): Promise<ContentOverrides> {
	if (!dbConfigured()) return {};
	try {
		const rows = await dbSelect<PageContentRow>('page_content', 'select=page,content');
		const out: ContentOverrides = {};
		for (const r of rows) {
			if (r.content && typeof r.content === 'object') out[r.page] = r.content;
		}
		return out;
	} catch {
		return {};
	}
}
