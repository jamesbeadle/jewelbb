import { getProjects } from '$lib/server/projects';
import type { PageServerLoad } from './$types';

// Rendered per-request so project edits in /admin appear immediately.
export const prerender = false;

export const load: PageServerLoad = async () => {
	const projects = await getProjects();
	return { featured: projects.filter((p) => p.gallery.length > 0).slice(0, 3) };
};
