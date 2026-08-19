/**
 * Admin PDF download — works for drafts too. The admin session guards this
 * route (hooks.server.ts); a short-lived print token lets the headless
 * browser open the draft's print page without a cookie.
 */
import { error } from '@sveltejs/kit';
import { createPrintToken } from '$lib/server/auth';
import { getBrochure } from '$lib/server/brochures';
import { pdfFilename, renderBrochurePdf } from '$lib/server/pdf';
import type { RequestHandler } from './$types';

export const config = { maxDuration: 60 };

export const GET: RequestHandler = async ({ params, url }) => {
	const doc = await getBrochure(params.id);
	if (!doc) error(404, 'Brochure not found');

	const token = await createPrintToken(params.id);
	try {
		const pdf = await renderBrochurePdf(
			`${url.origin}/brochure/print/${params.id}?token=${encodeURIComponent(token)}`
		);
		return new Response(new Uint8Array(pdf), {
			headers: {
				'Content-Type': 'application/pdf',
				'Content-Disposition': `attachment; filename="${pdfFilename(doc.brochure.title)}"`
			}
		});
	} catch (e) {
		console.error('Brochure PDF generation failed:', e);
		error(500, 'PDF generation failed — please try again.');
	}
};
