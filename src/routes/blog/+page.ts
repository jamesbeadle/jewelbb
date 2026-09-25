import { posts } from '$lib/blog';
import type { PageLoad } from './$types';

// Rendered per-request so text edited in /admin → Page text appears immediately.
export const prerender = false;

export const load: PageLoad = () => {
	return {
		posts: posts.map(({ html, ...meta }) => meta)
	};
};
