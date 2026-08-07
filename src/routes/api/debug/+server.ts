// TEMPORARY diagnostics endpoint — delete once admin login is confirmed working.
// Echoes back which request headers reach the app (values redacted except cookie names).
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const prerender = false;

export const GET: RequestHandler = ({ request, url }) => {
	if (url.searchParams.get('key') !== 'jbdebug') {
		return json({ error: 'missing key' }, { status: 403 });
	}

	const cookieHeader = request.headers.get('cookie');
	return json({
		cookieHeaderPresent: cookieHeader !== null,
		cookieNames: cookieHeader ? cookieHeader.split(';').map((c) => c.split('=')[0].trim()) : [],
		headerNames: [...request.headers.keys()]
	});
};
