import { json } from '@sveltejs/kit';
import { dbConfigured, dbInsert } from '$lib/server/db';
import type { RequestHandler } from './$types';

export const prerender = false;

interface ContactPayload {
	firstName?: string;
	lastName?: string;
	email?: string;
	phone?: string;
	message?: string;
	xtrafld?: string; // honeypot (meaningless name so browser autofill ignores it)
	company?: string; // legacy honeypot name — still honoured for cached pages
}

export const POST: RequestHandler = async ({ request }) => {
	let payload: ContactPayload;
	try {
		payload = await request.json();
	} catch {
		return json({ error: 'Invalid request.' }, { status: 400 });
	}

	const firstName = (payload.firstName ?? '').trim().slice(0, 100);
	const lastName = (payload.lastName ?? '').trim().slice(0, 100);
	const email = (payload.email ?? '').trim().slice(0, 200);
	const phone = (payload.phone ?? '').trim().slice(0, 50);
	const message = (payload.message ?? '').trim().slice(0, 5000);
	const honeypot = `${payload.xtrafld ?? ''}${payload.company ?? ''}`.trim();

	// Bots fill the hidden field — pretend success and drop it.
	// Logged so a false positive is visible in the Vercel function logs.
	if (honeypot) {
		console.warn('Contact honeypot triggered — submission dropped (not saved).');
		return json({ ok: true });
	}

	if (!firstName || !lastName || !message) {
		return json({ error: 'Please fill in your name and a message.' }, { status: 400 });
	}
	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
		return json({ error: 'Please provide a valid email address.' }, { status: 400 });
	}

	if (!dbConfigured()) {
		return json(
			{ error: 'The contact form is not configured yet. Please email us directly.' },
			{ status: 503 }
		);
	}

	try {
		await dbInsert('enquiries', {
			first_name: firstName,
			last_name: lastName,
			email,
			phone,
			message,
			status: 'new'
		});
	} catch (e) {
		console.error('Enquiry insert failed', e instanceof Error ? e.message : e);
		return json(
			{ error: 'We could not send your message right now. Please try again or email us directly.' },
			{ status: 502 }
		);
	}

	return json({ ok: true });
};
