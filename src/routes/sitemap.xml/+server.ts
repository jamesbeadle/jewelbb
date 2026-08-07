import { site } from '$lib/data/site';
import { projects } from '$lib/data/projects';
import { posts } from '$lib/blog';
import type { RequestHandler } from './$types';

export const prerender = true;

const staticPaths = [
	'',
	'/about',
	'/services',
	'/portfolio',
	'/ourcommunity',
	'/blog',
	'/contact',
	'/privacy-policy',
	'/terms-and-conditions'
];

export const GET: RequestHandler = () => {
	const urls = [
		...staticPaths,
		...projects.map((p) => `/${p.slug}`),
		...posts.map((p) => `/post/${p.slug}`)
	];

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `\t<url><loc>${site.url}${u}</loc></url>`).join('\n')}
</urlset>`;

	return new Response(body, {
		headers: { 'Content-Type': 'application/xml' }
	});
};
