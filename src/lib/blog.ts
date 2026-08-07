import { parseFrontmatter, renderMarkdown } from '$lib/markdown';

export interface PostMeta {
	slug: string;
	title: string;
	date: string; // ISO yyyy-mm-dd
	author: string;
	description: string;
}

export interface Post extends PostMeta {
	html: string;
}

const files = import.meta.glob('/src/lib/posts/*.md', {
	query: '?raw',
	import: 'default',
	eager: true
}) as Record<string, string>;

function slugFromPath(path: string): string {
	return path.split('/').pop()!.replace(/\.md$/, '');
}

const all: Post[] = Object.entries(files).map(([path, raw]) => {
	const { data, body } = parseFrontmatter(raw);
	const slug = data.slug || slugFromPath(path);
	return {
		slug,
		title: data.title ?? slug,
		date: data.date ?? '1970-01-01',
		author: data.author ?? 'Jewel Bespoke Build',
		description: data.description ?? '',
		html: renderMarkdown(body)
	};
});

all.sort((a, b) => (a.date < b.date ? 1 : -1));

export const posts: Post[] = all;

export function getPost(slug: string): Post | undefined {
	return posts.find((p) => p.slug === slug);
}

export function formatDate(iso: string): string {
	const d = new Date(`${iso}T00:00:00Z`);
	return d.toLocaleDateString('en-GB', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		timeZone: 'UTC'
	});
}
