import { building } from '$app/environment';
import { redirect, type Handle } from '@sveltejs/kit';
import { ADMIN_COOKIE, verifySessionToken } from '$lib/server/auth';

export const handle: Handle = async ({ event, resolve }) => {
	// During prerendering the crawler follows the footer link to /admin.
	// If the guard redirects at build time, SvelteKit bakes that redirect in
	// as a permanent static response — so the guard must not run while building.
	if (building) return resolve(event);

	const { pathname } = event.url;

	if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
		const ok = await verifySessionToken(event.cookies.get(ADMIN_COOKIE));
		if (!ok) redirect(303, '/admin/login');
	}

	return resolve(event);
};
