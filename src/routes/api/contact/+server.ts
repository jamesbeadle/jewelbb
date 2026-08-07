import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import type { RequestHandler } from './$types';

export const prerender = false;

interface ContactPayload {
	firstName?: string;
	lastName?: string;
	email?: string;
	phone?: string;
	message?: string;
	company?: string; // honeypot
}

const esc = (s: string) =>
	s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

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
	const honeypot = (payload.company ?? '').trim();

	// Bots fill the hidden field — pretend success and drop it.
	if (honeypot) return json({ ok: true });

	if (!firstName || !lastName || !message) {
		return json({ error: 'Please fill in your name and a message.' }, { status: 400 });
	}
	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
		return json({ error: 'Please provide a valid email address.' }, { status: 400 });
	}

	const apiKey = env.RESEND_API_KEY;
	if (!apiKey) {
		return json(
			{ error: 'The contact form is not configured yet. Please email us directly.' },
			{ status: 503 }
		);
	}

	const to = env.CONTACT_TO_EMAIL ?? 'sales@jewelbb.co.uk';
	const from = env.CONTACT_FROM_EMAIL ?? 'onboarding@resend.dev';

	const html = `
		<h2>New website enquiry</h2>
		<p><strong>Name:</strong> ${esc(firstName)} ${esc(lastName)}</p>
		<p><strong>Email:</strong> ${esc(email)}</p>
		<p><strong>Phone:</strong> ${esc(phone) || '—'}</p>
		<p><strong>Message:</strong></p>
		<p>${esc(message).replace(/\n/g, '<br />')}</p>
	`;

	const res = await fetch('https://api.resend.com/emails', {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${apiKey}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			from: `Jewel Website <${from}>`,
			to: [to],
			reply_to: email,
			subject: `Website enquiry from ${firstName} ${lastName}`,
			html
		})
	});

	if (!res.ok) {
		console.error('Resend error', res.status, await res.text().catch(() => ''));
		return json(
			{ error: 'We could not send your message right now. Please try again or email us directly.' },
			{ status: 502 }
		);
	}

	return json({ ok: true });
};
