import { fail } from '@sveltejs/kit';
import {
	checkCredentials,
	createSessionToken,
	credentialsConfigured,
	setSessionCookie
} from '$lib/server/auth';
import { MAX_FAILURES, loginLockState, recordLoginAttempt } from '$lib/server/login-attempts';
import type { Actions, PageServerLoad } from './$types';

/** Pause after a wrong guess — makes online brute force slow and cheap for us. */
const FAILED_LOGIN_DELAY_MS = 1000;

export const load: PageServerLoad = () => {
	return { configured: credentialsConfigured() };
};

export const actions: Actions = {
	default: async ({ request, cookies, getClientAddress }) => {
		const form = await request.formData();
		const username = String(form.get('username') ?? '').slice(0, 200);
		const password = String(form.get('password') ?? '').slice(0, 1000);

		// On Vercel this is the x-forwarded-for header, which Vercel sets itself
		// (clients can't spoof it). Keep only the first hop, in case a proxy
		// ever appends to it, and never fail the login over a missing value.
		let ip = 'unknown';
		try {
			ip = (getClientAddress() ?? '').split(',')[0].trim() || 'unknown';
		} catch {
			// Not available in every runtime; the limit then applies to 'unknown' as a group.
		}

		const lock = await loginLockState(ip);
		if (lock.locked) {
			console.warn(`Admin login refused for ${ip}: locked out after ${MAX_FAILURES} failed attempts`);
			return fail(429, {
				error: `Too many failed attempts. Please try again in ${lock.retryAfterMinutes} minute${lock.retryAfterMinutes === 1 ? '' : 's'}.`
			});
		}

		const ok = await checkCredentials(username, password);
		await recordLoginAttempt(ip, username, ok);

		if (!ok) {
			console.warn(`Admin login failed for ${ip}`);
			await new Promise((r) => setTimeout(r, FAILED_LOGIN_DELAY_MS));
			return fail(401, { error: 'Incorrect username or password.' });
		}

		setSessionCookie(cookies, await createSessionToken());
		// Return 200 (not a redirect) so the Set-Cookie header rides on a normal
		// page response — the client then navigates to /admin itself.
		return { success: true };
	}
};
