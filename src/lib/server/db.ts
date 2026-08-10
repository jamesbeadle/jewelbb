/**
 * Minimal Supabase client (PostgREST + Storage over fetch — no dependencies).
 * Server-side only: uses the service role key, which bypasses RLS.
 */
import { env } from '$env/dynamic/private';

export interface TeamMemberRow {
	id: string;
	name: string;
	role: string;
	bio: string;
	photo_url: string;
	sort_order: number;
}

export interface ProjectRow {
	id: string;
	slug: string;
	name: string;
	meta_title: string;
	meta_description: string;
	subtitle: string;
	description: string;
	gallery: string[];
	cross_link: string;
	accessible: boolean;
	sort_order: number;
}

export interface RtwSubmissionRow {
	id: string;
	group_id: string;
	entity: string;
	full_name: string;
	trade: string;
	engagement_type: string;
	start_date: string | null;
	check_method: string;
	document_seen: string;
	check_date: string | null;
	checked_by: string;
	outcome: string;
	permission_expiry: string | null;
	followup_due: string | null;
	evidence_ref: string;
	notes: string;
	created_at: string;
}

export interface BrochureSectionRow {
	id: string;
	title: string;
	subtitle: string;
	body: string;
	image_url: string;
	sort_order: number;
}

// Trimmed to survive stray whitespace/newlines from dashboard copy-paste;
// trailing slash on the URL is also tolerated.
function baseUrl(): string {
	return (env.SUPABASE_URL ?? '').trim().replace(/\/+$/, '');
}

function serviceKey(): string {
	return (env.SUPABASE_SERVICE_ROLE_KEY ?? '').trim();
}

export function dbConfigured(): boolean {
	return Boolean(baseUrl() && serviceKey());
}

function headers(extra: Record<string, string> = {}): Record<string, string> {
	const key = serviceKey();
	return {
		apikey: key,
		Authorization: `Bearer ${key}`,
		...extra
	};
}

function restUrl(path: string): string {
	return `${baseUrl()}/rest/v1/${path}`;
}

async function check(res: Response, what: string): Promise<Response> {
	if (!res.ok) {
		const text = await res.text().catch(() => '');
		throw new Error(`Supabase ${what} failed (${res.status}): ${text.slice(0, 300)}`);
	}
	return res;
}

export async function dbSelect<T>(table: string, query = ''): Promise<T[]> {
	const res = await fetch(restUrl(`${table}?${query}`), { headers: headers() });
	await check(res, `select ${table}`);
	return res.json();
}

/** Exact row count for a table (optionally filtered by a PostgREST query). */
export async function dbCount(table: string, query = ''): Promise<number> {
	const qs = `${query ? query + '&' : ''}select=id&limit=1`;
	const res = await fetch(restUrl(`${table}?${qs}`), {
		method: 'HEAD',
		headers: headers({ Prefer: 'count=exact' })
	});
	await check(res, `count ${table}`);
	const total = Number((res.headers.get('content-range') ?? '').split('/')[1]);
	return Number.isFinite(total) ? total : 0;
}

export async function dbInsert<T>(table: string, row: Record<string, unknown>): Promise<T> {
	const res = await fetch(restUrl(table), {
		method: 'POST',
		headers: headers({ 'Content-Type': 'application/json', Prefer: 'return=representation' }),
		body: JSON.stringify(row)
	});
	await check(res, `insert ${table}`);
	const rows = (await res.json()) as T[];
	return rows[0];
}

export async function dbUpdate(
	table: string,
	id: string,
	patch: Record<string, unknown>
): Promise<void> {
	const res = await fetch(restUrl(`${table}?id=eq.${encodeURIComponent(id)}`), {
		method: 'PATCH',
		headers: headers({ 'Content-Type': 'application/json' }),
		body: JSON.stringify(patch)
	});
	await check(res, `update ${table}`);
}

export async function dbDelete(table: string, id: string): Promise<void> {
	const res = await fetch(restUrl(`${table}?id=eq.${encodeURIComponent(id)}`), {
		method: 'DELETE',
		headers: headers()
	});
	await check(res, `delete ${table}`);
}

/** Upload a file to the public 'media' bucket; returns its public URL. */
export async function storageUpload(file: File, folder: string): Promise<string> {
	const ext = (file.name.split('.').pop() || 'jpg').toLowerCase().replace(/[^a-z0-9]/g, '');
	const path = `${folder}/${crypto.randomUUID()}.${ext}`;
	const res = await fetch(`${baseUrl()}/storage/v1/object/media/${path}`, {
		method: 'POST',
		headers: headers({ 'Content-Type': file.type || 'application/octet-stream' }),
		body: await file.arrayBuffer()
	});
	await check(res, 'storage upload');
	return `${baseUrl()}/storage/v1/object/public/media/${path}`;
}
