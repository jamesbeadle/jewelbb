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
			return fail(401, { error: 'Incorrect username or password.' });
		}

		setSessionCookie(cookies, await createSessionToken());
		redirect(303, '/admin');
	}
};
