import { building } from '$app/environment';
import { redirect, type Handle } from '@sveltejs/kit';
import { ADMIN_COOKIE, verifySessionToken } from '$lib/server/auth';

/**
 * Headers added to every /admin response (pages, form actions, the media
 * upload API, PDF downloads):
 *  - no-store: never cached by the browser, a proxy or Vercel's CDN, so
 *    nothing private lingers after logout (or behind the Back button);
 *  - DENY: admin pages can't be framed by another site (clickjacking);
 *  - nosniff / Referrer-Policy: browsers must honour the content type and
 *    never send admin URLs to third parties;
 *  - X-Robots-Tag: keeps search engines out even if a page is linked.
 */
const ADMIN_HEADERS: Record<string, string> = {
	'Cache-Control': 'no-store',
	'X-Frame-Options': 'DENY',
	'X-Content-Type-Options': 'nosniff',
	'Referrer-Policy': 'same-origin',
	'X-Robots-Tag': 'noindex, nofollow'
};

export const handle: Handle = async ({ event, resolve }) => {
	// During prerendering the crawler follows the footer link to /admin.
	// If the guard redirects at build time, SvelteKit bakes that redirect in
	// as a permanent static response — so the guard must not run while building.
	if (building) return resolve(event);

	const { pathname } = event.url;

	// Deliberately broad: anything starting with /admin is treated as admin
	// territory, so a new route can never be forgotten by the guard.
	if (!pathname.startsWith('/admin')) return resolve(event);

	const loggedIn = await verifySessionToken(event.cookies.get(ADMIN_COOKIE));

	if (pathname === '/admin/login') {
		// Already signed in? Straight to the dashboard (POSTs still go
		// through so an expired-then-renewed login form keeps working).
		if (loggedIn && event.request.method === 'GET') redirect(303, '/admin');
	} else if (!loggedIn) {
		redirect(303, '/admin/login');
	}

	const response = await resolve(event);
	try {
		for (const [name, value] of Object.entries(ADMIN_HEADERS)) {
			response.headers.set(name, value);
		}
		return response;
	} catch {
		// Some responses carry immutable headers (e.g. one passed straight
		// through from fetch) — rebuild it rather than skip the headers.
		const headers = new Headers(response.headers);
		for (const [name, value] of Object.entries(ADMIN_HEADERS)) headers.set(name, value);
		return new Response(response.body, {
			status: response.status,
			statusText: response.statusText,
			headers
		});
	}
};
