import { json } from '@sveltejs/kit';
import { dbConfigured, dbInsert } from '$lib/server/db';
import type { RequestHandler } from './$types';

/**
 * Receives a completed RTW check from the portal at /rtw (one entry per
 * engaging company) and stores it in Supabase for /admin/rtw. The portal
 * still offers copy-paste and print as before — this runs alongside them,
 * so a failed save never blocks a check.
 */

export const prerender = false;

const MAX_ENTRIES = 10;

function str(v: unknown, max: number): string {
	return typeof v === 'string' ? v.trim().slice(0, max) : '';
}

/** Accepts YYYY-MM-DD only; anything else becomes null. */
function isoDate(v: unknown): string | null {
	return typeof v === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(v.trim()) ? v.trim() : null;
}

export const POST: RequestHandler = async ({ request }) => {
	if (!dbConfigured()) {
		return json({ error: 'Register log is not configured on the server.' }, { status: 503 });
	}

	let body: unknown;
	try {
		body = await request.json();
	} catch {
		return json({ error: 'Invalid request.' }, { status: 400 });
	}

	const entries = (body as { entries?: unknown })?.entries;
	if (!Array.isArray(entries) || entries.length === 0 || entries.length > MAX_ENTRIES) {
		return json({ error: 'Invalid request.' }, { status: 400 });
	}

	const groupId = crypto.randomUUID();
	const rows = [];
	for (const e of entries) {
		const row = {
			group_id: groupId,
			entity: str((e as Record<string, unknown>).entity, 20),
			full_name: str((e as Record<string, unknown>).full_name, 200),
			trade: str((e as Record<string, unknown>).trade, 200),
			engagement_type: str((e as Record<string, unknown>).engagement_type, 100),
			start_date: isoDate((e as Record<string, unknown>).start_date),
			check_method: str((e as Record<string, unknown>).check_method, 100),
			document_seen: str((e as Record<string, unknown>).document_seen, 300),
			check_date: isoDate((e as Record<string, unknown>).check_date),
			checked_by: str((e as Record<string, unknown>).checked_by, 200),
			outcome: str((e as Record<string, unknown>).outcome, 50),
			permission_expiry: isoDate((e as Record<string, unknown>).permission_expiry),
			followup_due: isoDate((e as Record<string, unknown>).followup_due),
			evidence_ref: str((e as Record<string, unknown>).evidence_ref, 300),
			notes: str((e as Record<string, unknown>).notes, 1000)
		};
		if (!row.entity || !row.full_name || !row.engagement_type) {
			return json({ error: 'Invalid request.' }, { status: 400 });
		}
		rows.push(row);
	}

	try {
		for (const row of rows) await dbInsert('rtw_submissions', row);
	} catch {
		return json({ error: 'Could not save to the register log.' }, { status: 502 });
	}

	return json({ saved: rows.length });
};
