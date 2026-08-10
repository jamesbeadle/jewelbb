/**
 * Projects loader: Supabase when configured (so edits in /admin appear
 * immediately), otherwise the static data in $lib/data/projects — the same
 * pattern the About page uses for team members.
 */
import { projects as staticProjects, type Project } from '$lib/data/projects';
import { dbConfigured, dbSelect, type ProjectRow } from '$lib/server/db';

export function rowToProject(r: ProjectRow): Project {
	return {
		slug: r.slug,
		name: r.name,
		metaTitle: r.meta_title,
		metaDescription: r.meta_description,
		subtitle: r.subtitle,
		description: r.description,
		gallery: Array.isArray(r.gallery) ? r.gallery : [],
		crossLink: r.cross_link,
		accessible: r.accessible || undefined
	};
}

export async function getProjects(): Promise<Project[]> {
	if (dbConfigured()) {
		try {
			const rows = await dbSelect<ProjectRow>('projects', 'select=*&order=sort_order.asc');
			if (rows.length > 0) return rows.map(rowToProject);
		} catch {
			// fall through to the static fallback
		}
	}
	return staticProjects;
}
