import { fail } from '@sveltejs/kit';
import {
	checkCredentials,
	createSessionToken,
	credentialsConfigured,
	setSessionCookie
} from '$lib/server/auth';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = ({ url }) => {
	return {
		configured: credentialsConfigured(),
		// Temporary diagnostics set by the /admin guard redirect
		why: url.searchParams.get('why')
	};
};

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const form = await request.formData();
		const username = String(form.get('username') ?? '');
		const password = String(form.get('password') ?? '');

		if (!checkCredentials(username, password)) {
			// Temporary diagnostics — visible in Vercel → Logs. Remove once login is confirmed.
			console.log(
				`[admin-login] FAILED user="${username}" configured=${credentialsConfigured()}`
			);
			return fail(401, { error: 'Incorrect username or password.' });
		}

		console.log('[admin-login] OK — setting session cookie');
		setSessionCookie(cookies, await createSessionToken());
		// Return 200 (not a redirect) so the Set-Cookie header rides on a normal
		// page response — the client then navigates to /admin itself.
		return { success: true };
	}
};
