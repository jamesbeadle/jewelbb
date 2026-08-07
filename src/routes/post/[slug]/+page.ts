import { error } from '@sveltejs/kit';
import { getPost, posts } from '$lib/blog';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () => posts.map((p) => ({ slug: p.slug }));

export const load: PageLoad = ({ params }) => {
	const post = getPost(params.slug);
	if (!post) error(404, 'Post not found');

	const index = posts.findIndex((p) => p.slug === post.slug);
	const next = posts[index + 1] ?? null;
	const prev = posts[index - 1] ?? null;

	return { post, next, prev };
};
