import { getContentOverrides } from '$lib/server/content';
import type { LayoutServerLoad } from './$types';

/**
 * Page text edited in /admin → Page text. Loaded once for the whole site;
 * pages merge it with their defaults via pageText() in $lib/content/pages.
 */
export const load: LayoutServerLoad = async () => {
	return { content: await getContentOverrides() };
};
