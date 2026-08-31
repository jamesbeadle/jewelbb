/**
 * Badges loader: Supabase when configured (so edits in /admin/badges appear
 * immediately), otherwise the static list in $lib/data/images — the same
 * pattern the portfolio uses for projects.
 *
 * Once the `badges` table exists it is the single source of truth (so hiding
 * or deleting every badge really removes the strip); the static fallback is
 * only used when the table is missing or Supabase is unreachable.
 */
import { badgeList as staticBadges } from '$lib/data/images';
import { dbConfigured, dbSelect, type BadgeRow } from '$lib/server/db';

export interface Badge {
	src: string;
	alt: string;
}

export async function getBadges(): Promise<Badge[]> {
	if (dbConfigured()) {
		try {
			const rows = await dbSelect<BadgeRow>(
				'badges',
				'select=*&visible=eq.true&order=sort_order.asc'
			);
			return rows.map((r) => ({ src: r.image_url, alt: r.label }));
		} catch {
			// table missing (schema.sql not re-run yet) or DB unreachable —
			// fall through to the static fallback
		}
	}
	return [...staticBadges];
}
