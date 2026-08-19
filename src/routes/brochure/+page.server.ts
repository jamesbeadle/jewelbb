import { fallbackBrochure, getActiveBrochure } from '$lib/server/brochures';
import type { PageServerLoad } from './$types';

export const prerender = false;

/**
 * The public brochure page shows the ACTIVE brochure built in /admin/brochure.
 * Before Supabase is connected (or before any brochure is made active) it
 * falls back to the built-in default so the page always works.
 */
export const load: PageServerLoad = async () => {
	const active = await getActiveBrochure();
	return { doc: active ?? fallbackBrochure() };
};
