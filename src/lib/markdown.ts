import { marked } from 'marked';

export interface Frontmatter {
	[key: string]: string;
}

/** Minimal YAML frontmatter parser (string values only — all we need). */
export function parseFrontmatter(raw: string): { data: Frontmatter; body: string } {
	const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(raw);
	if (!match) return { data: {}, body: raw };

	const data: Frontmatter = {};
	for (const line of match[1].split(/\r?\n/)) {
		const idx = line.indexOf(':');
		if (idx === -1) continue;
		const key = line.slice(0, idx).trim();
		let value = line.slice(idx + 1).trim();
		if (
			(value.startsWith('"') && value.endsWith('"')) ||
			(value.startsWith("'") && value.endsWith("'"))
		) {
			value = value.slice(1, -1);
		}
		if (key) data[key] = value;
	}
	return { data, body: raw.slice(match[0].length) };
}

export function renderMarkdown(md: string): string {
	return marked.parse(md, { async: false }) as string;
}
