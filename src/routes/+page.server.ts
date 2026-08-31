import { getBadges } from '$lib/server/badges';
import { getProjects } from '$lib/server/projects';
import type { PageServerLoad } from './$types';

// Rendered per-request so project edits in /admin appear immediately.
export const prerender = false;

export const load: PageServerLoad = async () => {
	const [projects, badges] = await Promise.all([getProjects(), getBadges()]);
	return { featured: projects.filter((p) => p.gallery.length > 0).slice(0, 3), badges };
};
