import { error } from '@sveltejs/kit';
import { projects } from '$lib/data/projects';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () =>
	projects.map((p) => ({ area: p.slug }));

export const load: PageLoad = ({ params }) => {
	const project = projects.find((p) => p.slug === params.area);
	if (!project) error(404, 'Project not found');

	const crossLinked = projects.find((p) => p.slug === project.crossLink);
	return { project, crossLinked };
};
