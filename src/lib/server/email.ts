/**
 * Minimal Resend email client (REST over fetch — no dependencies).
 * Server-side only: uses the Resend API key from private env.
 *
 * Env:
 *   RESEND_API_KEY     — Resend API key (domain jewelbb.co.uk must be verified)
 *   CONTACT_FROM_EMAIL — verified sender, e.g. website@jewelbb.co.uk
 *   CONTACT_TO_EMAIL   — where enquiry notifications go, e.g. sales@jewelbb.co.uk
 */
import { env } from '$env/dynamic/private';

function apiKey(): string {
	return (env.RESEND_API_KEY ?? '').trim();
}

function fromEmail(): string {
	return (env.CONTACT_FROM_EMAIL ?? '').trim();
}

function toEmail(): string {
	return (env.CONTACT_TO_EMAIL ?? '').trim();
}

export function emailConfigured(): boolean {
	return Boolean(apiKey() && fromEmail() && toEmail());
}

function escapeHtml(value: string): string {
	return value
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&#39;');
}

export interface EnquiryEmail {
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	message: string;
}

/**
 * Sends the enquiry notification to CONTACT_TO_EMAIL via Resend.
 * Throws on failure — callers decide whether that is fatal (for the
 * contact endpoint it is not: the enquiry is already saved in the DB).
 */
export async function sendEnquiryEmail(enquiry: EnquiryEmail): Promise<void> {
	const name = `${enquiry.firstName} ${enquiry.lastName}`.trim();
	const lines = [
		`Name: ${name}`,
		`Email: ${enquiry.email}`,
		`Phone: ${enquiry.phone || '—'}`,
		'',
		'Message:',
		enquiry.message
	];

	const html = `
		<h2 style="margin:0 0 16px;font-family:Georgia,serif;">New website enquiry</h2>
		<table style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px;">
			<tr><td style="padding:4px 12px 4px 0;color:#666;">Name</td><td style="padding:4px 0;"><strong>${escapeHtml(name)}</strong></td></tr>
			<tr><td style="padding:4px 12px 4px 0;color:#666;">Email</td><td style="padding:4px 0;"><a href="mailto:${escapeHtml(enquiry.email)}">${escapeHtml(enquiry.email)}</a></td></tr>
			<tr><td style="padding:4px 12px 4px 0;color:#666;">Phone</td><td style="padding:4px 0;">${escapeHtml(enquiry.phone || '—')}</td></tr>
		</table>
		<p style="font-family:Arial,sans-serif;font-size:14px;white-space:pre-wrap;border-left:3px solid #E87722;padding-left:12px;margin:16px 0;">${escapeHtml(enquiry.message)}</p>
		<p style="font-family:Arial,sans-serif;font-size:12px;color:#999;">Sent from the jewelbb.co.uk contact form. Reply to this email to respond to ${escapeHtml(enquiry.firstName)} directly.</p>
	`;

	const res = await fetch('https://api.resend.com/emails', {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${apiKey()}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			from: `JewelBB Website <${fromEmail()}>`,
			to: [toEmail()],
			reply_to: enquiry.email,
			subject: `New enquiry from ${name}`,
			text: lines.join('\n'),
			html
		})
	});

	if (!res.ok) {
		const body = await res.text().catch(() => '');
		throw new Error(`Resend API error ${res.status}: ${body.slice(0, 300)}`);
	}
}
