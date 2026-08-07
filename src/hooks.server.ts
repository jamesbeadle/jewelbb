import { redirect, type Handle } from '@sveltejs/kit';
import { ADMIN_COOKIE, verifySessionToken } from '$lib/server/auth';

export const handle: Handle = async ({ event, resolve }) => {
	const { pathname } = event.url;

	if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
		const ok = await verifySessionToken(event.cookies.get(ADMIN_COOKIE));
		if (!ok) redirect(303, '/admin/login');
	}

	return resolve(event);
};
