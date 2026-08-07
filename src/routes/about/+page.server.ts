import { team as staticTeam, type TeamMember } from '$lib/data/team';
import { dbConfigured, dbSelect, type TeamMemberRow } from '$lib/server/db';
import type { PageServerLoad } from './$types';

// Rendered per-request so staff edits in /admin appear immediately.
export const prerender = false;

export const load: PageServerLoad = async () => {
	if (dbConfigured()) {
		try {
			const rows = await dbSelect<TeamMemberRow>(
				'team_members',
				'select=*&order=sort_order.asc'
			);
			if (rows.length > 0) {
				const team: TeamMember[] = rows.map((r) => ({
					name: r.name,
					role: r.role,
					bio: r.bio,
					photo: r.photo_url
				}));
				return { team };
			}
		} catch {
			// fall through to the static fallback
		}
	}
	return { team: staticTeam };
};
