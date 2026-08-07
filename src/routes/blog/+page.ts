import { posts } from '$lib/blog';
import type { PageLoad } from './$types';

export const load: PageLoad = () => {
	return {
		posts: posts.map(({ html, ...meta }) => meta)
	};
};
