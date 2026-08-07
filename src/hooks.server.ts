import { redirect, type Handle } from '@sveltejs/kit';
import { ADMIN_COOKIE, verifySessionToken } from '$lib/server/auth';

export const handle: Handle = async ({ event, resolve }) => {
	const { pathname } = event.url;

	if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
		const token = event.cookies.get(ADMIN_COOKIE);
		const ok = await verifySessionToken(token);
		// Temporary diagnostics — visible in Vercel → Logs. Remove once login is confirmed.
		const rawCookieHeader = event.request.headers.get('cookie');
		console.log(
			`[admin-guard] path=${pathname} rawCookieHeader=${rawCookieHeader === null ? 'ABSENT' : 'present(' + rawCookieHeader.split(';').length + ')'} cookiePresent=${Boolean(token)} verified=${ok}`
		);
		if (!ok) redirect(303, `/admin/login?why=${token ? 'badtoken' : 'nocookie'}`);
	}

	return resolve(event);
};
