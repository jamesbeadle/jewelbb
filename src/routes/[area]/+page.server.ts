import { error } from '@sveltejs/kit';
import { getProjects } from '$lib/server/projects';
import type { PageServerLoad } from './$types';

// Rendered per-request so project edits in /admin appear immediately.
export const prerender = false;

export const load: PageServerLoad = async ({ params }) => {
	const projects = await getProjects();
	const project = projects.find((p) => p.slug === params.area);
	if (!project) error(404, 'Project not found');

	const crossLinked = projects.find((p) => p.slug === project.crossLink);
	return { project, crossLinked };
};
