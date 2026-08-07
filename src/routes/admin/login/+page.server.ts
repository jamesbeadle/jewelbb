import { fail, redirect } from '@sveltejs/kit';
import {
	checkCredentials,
	createSessionToken,
	credentialsConfigured,
	setSessionCookie
} from '$lib/server/auth';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = () => {
	return { configured: credentialsConfigured() };
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

		console.log('[admin-login] OK — setting session cookie and redirecting');
		setSessionCookie(cookies, await createSessionToken());
		redirect(303, '/admin');
	}
};
