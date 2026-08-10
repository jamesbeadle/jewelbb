import { getProjects } from '$lib/server/projects';
import type { PageServerLoad } from './$types';

// Rendered per-request so project edits in /admin appear immediately.
export const prerender = false;

export const load: PageServerLoad = async () => {
	const projects = await getProjects();
	return { projects };
};
