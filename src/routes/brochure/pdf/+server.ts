/**
 * Public PDF of the active brochure — the "Download brochure" button.
 */
import { error } from '@sveltejs/kit';
import { getActiveBrochure } from '$lib/server/brochures';
import { pdfFilename, renderBrochurePdf } from '$lib/server/pdf';
import type { RequestHandler } from './$types';

export const prerender = false;

// Vercel: PDF rendering needs more than the default 10s.
export const config = { maxDuration: 60 };

export const GET: RequestHandler = async ({ url }) => {
	const active = await getActiveBrochure();
	const id = active?.brochure.id ?? 'default';
	const title = active?.brochure.title ?? 'Jewel Bespoke Build — Brochure';

	try {
		const pdf = await renderBrochurePdf(`${url.origin}/brochure/print/${id}`);
		return new Response(new Uint8Array(pdf), {
			headers: {
				'Content-Type': 'application/pdf',
				'Content-Disposition': `attachment; filename="${pdfFilename(title)}"`,
				'Cache-Control': 'public, max-age=300'
			}
		});
	} catch (e) {
		console.error('Brochure PDF generation failed:', e);
		error(500, 'PDF generation failed — please try again.');
	}
};
