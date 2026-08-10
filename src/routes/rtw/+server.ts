import html from '$lib/rtw/jewel-rtw-portal.html?raw';
import type { RequestHandler } from './$types';

/**
 * Jewel Group Right to Work Portal — internal compliance tool.
 *
 * The HTML file in $lib/rtw is Jeremy Ferendinos' self-contained tool,
 * served as-is. Do NOT edit the HTML (wording, date logic, GOV.UK links,
 * register column order) without Jeremy's sign-off — see the handover note.
 *
 * Site addition (v1.1): on "Generate register entry" the page also POSTs
 * the entries to /rtw/submit, which stores them for /admin/rtw. Jeremy's
 * wording, logic and copy/print flow are otherwise untouched.
 *
 * Deliberately unlinked: not in the header/footer nav, not in sitemap.xml,
 * and marked noindex (meta tag in the file + X-Robots-Tag header here).
 */

// Served by the function (not prerendered) so the Content-Type and
// X-Robots-Tag headers are guaranteed on the response.
export const prerender = false;

export const GET: RequestHandler = () =>
	new Response(html, {
		headers: {
			'Content-Type': 'text/html; charset=utf-8',
			'X-Robots-Tag': 'noindex, nofollow',
			'Cache-Control': 'public, max-age=300'
		}
	});
