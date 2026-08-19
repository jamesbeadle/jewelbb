/**
 * Brochure data access — CRUD over the `brochures` and `brochure_pages`
 * tables, plus helpers used by the admin builder (duplicating, reordering,
 * prefilling project pages from the portfolio, the media library).
 */
import {
	dbConfigured,
	dbDelete,
	dbInsert,
	dbSelect,
	dbUpdate,
	dbUpdateWhere,
	storageList,
	type BrochurePageRow,
	type BrochureRow
} from '$lib/server/db';
import { getProjects } from '$lib/server/projects';
import { templateMap, type TemplateId } from '$lib/brochure/templates';
import { defaultBrochurePages } from '$lib/brochure/defaults';
import { team } from '$lib/data/team';
import { images, badgeList } from '$lib/data/images';
import type { Project } from '$lib/data/projects';

export type { BrochureRow, BrochurePageRow };

export interface BrochureDoc {
	brochure: BrochureRow;
	pages: BrochurePageRow[];
}

/* ---- Reads ---------------------------------------------------------- */

export async function listBrochures(): Promise<(BrochureRow & { page_count: number })[]> {
	const [brochures, pages] = await Promise.all([
		dbSelect<BrochureRow>('brochures', 'select=*&order=updated_at.desc'),
		dbSelect<{ brochure_id: string }>('brochure_pages', 'select=brochure_id')
	]);
	const counts = new Map<string, number>();
	for (const p of pages) counts.set(p.brochure_id, (counts.get(p.brochure_id) ?? 0) + 1);
	return brochures.map((b) => ({ ...b, page_count: counts.get(b.id) ?? 0 }));
}

export async function getBrochure(id: string): Promise<BrochureDoc | null> {
	const rows = await dbSelect<BrochureRow>(
		'brochures',
		`select=*&id=eq.${encodeURIComponent(id)}`
	);
	if (!rows[0]) return null;
	const pages = await dbSelect<BrochurePageRow>(
		'brochure_pages',
		`select=*&brochure_id=eq.${encodeURIComponent(id)}&order=sort_order.asc,created_at.asc`
	);
	return { brochure: rows[0], pages };
}

/** The brochure shown to the public. Falls back to the built-in default. */
export async function getActiveBrochure(): Promise<BrochureDoc | null> {
	if (!dbConfigured()) return null;
	try {
		const rows = await dbSelect<BrochureRow>('brochures', 'select=*&status=eq.active&limit=1');
		if (!rows[0]) return null;
		const pages = await dbSelect<BrochurePageRow>(
			'brochure_pages',
			`select=*&brochure_id=eq.${encodeURIComponent(rows[0].id)}&order=sort_order.asc,created_at.asc`
		);
		return { brochure: rows[0], pages };
	} catch {
		return null;
	}
}

/** Built-in default (2026 design) rendered when nothing is active yet. */
export function fallbackBrochure(): BrochureDoc {
	const now = new Date().toISOString();
	return {
		brochure: {
			id: 'default',
			title: 'Jewel Bespoke Build — Brochure',
			status: 'active',
			created_at: now,
			updated_at: now
		},
		pages: defaultBrochurePages().map((p, i) => ({
			id: `default-${i}`,
			brochure_id: 'default',
			template: p.template,
			content: p.content,
			sort_order: (i + 1) * 10,
			created_at: now
		}))
	};
}

/* ---- Writes --------------------------------------------------------- */

export async function createBrochure(
	title: string,
	seed: 'blank' | 'template'
): Promise<BrochureRow> {
	const brochure = await dbInsert<BrochureRow>('brochures', { title, status: 'draft' });
	if (seed === 'template') {
		const pages = defaultBrochurePages();
		for (let i = 0; i < pages.length; i++) {
			await dbInsert('brochure_pages', {
				brochure_id: brochure.id,
				template: pages[i].template,
				content: pages[i].content,
				sort_order: (i + 1) * 10
			});
		}
	}
	return brochure;
}

export async function duplicateBrochure(id: string): Promise<BrochureRow | null> {
	const doc = await getBrochure(id);
	if (!doc) return null;
	const copy = await dbInsert<BrochureRow>('brochures', {
		title: `${doc.brochure.title} (copy)`,
		status: 'draft'
	});
	for (const p of doc.pages) {
		await dbInsert('brochure_pages', {
			brochure_id: copy.id,
			template: p.template,
			content: p.content,
			sort_order: p.sort_order
		});
	}
	return copy;
}

export async function touchBrochure(id: string): Promise<void> {
	await dbUpdate('brochures', id, { updated_at: new Date().toISOString() });
}

/** Make this brochure the live one (demotes any other active brochure). */
export async function setActiveBrochure(id: string): Promise<void> {
	await dbUpdateWhere('brochures', 'status=eq.active', { status: 'draft' });
	await dbUpdate('brochures', id, { status: 'active', updated_at: new Date().toISOString() });
}

export async function setDraftBrochure(id: string): Promise<void> {
	await dbUpdate('brochures', id, { status: 'draft', updated_at: new Date().toISOString() });
}

export async function deleteBrochure(id: string): Promise<void> {
	await dbDelete('brochures', id); // pages cascade
}

/* ---- Pages ----------------------------------------------------------- */

function nextSortOrder(pages: BrochurePageRow[]): number {
	return pages.length ? Math.max(...pages.map((p) => p.sort_order)) + 10 : 10;
}

export async function addPage(
	brochureId: string,
	template: TemplateId,
	content?: Record<string, unknown>
): Promise<BrochurePageRow> {
	const doc = await getBrochure(brochureId);
	const t = templateMap[template];
	const page = await dbInsert<BrochurePageRow>('brochure_pages', {
		brochure_id: brochureId,
		template,
		content: content ?? t?.blank ?? {},
		sort_order: doc ? nextSortOrder(doc.pages) : 10
	});
	await touchBrochure(brochureId);
	return page;
}

/**
 * Add the classic three-page project spread (opener → detail → gallery),
 * optionally prefilled from a portfolio project so the admin starts from
 * real data and edits from there.
 */
export async function addProjectPages(brochureId: string, projectSlug?: string): Promise<void> {
	let project: Project | undefined;
	if (projectSlug) {
		project = (await getProjects()).find((p) => p.slug === projectSlug);
	}
	const name = project ? `The ${project.name} Residence` : '';
	const gallery = project?.gallery ?? [];
	const paragraphs = project
		? project.description
				.split(/(?<=\.)\s+(?=[A-Z])/g)
				.reduce<string[]>((acc, s) => {
					// Reflow the single description paragraph into 2–3 chunks.
					const last = acc[acc.length - 1];
					if (last !== undefined && last.length < 220) acc[acc.length - 1] = `${last} ${s}`;
					else acc.push(s);
					return acc;
				}, [])
				.join('\n\n')
		: '';

	await addPage(brochureId, 'project-intro', {
		kicker: project ? `${project.name.toUpperCase()}, SURREY` : '',
		title: name,
		subtitle: project?.subtitle ?? '',
		image: gallery[0] ?? ''
	});
	await addPage(brochureId, 'project-detail', {
		kicker: project?.accessible ? 'ACCESSIBLE LIVING' : 'REFURBISHMENT & EXTENSION',
		title: name,
		image: gallery[2] ?? gallery[0] ?? '',
		body: paragraphs,
		features: [],
		value: '',
		duration: ''
	});
	await addPage(brochureId, 'project-gallery', {
		kicker: 'GALLERY',
		title: name ? `${name} — Project Gallery` : '',
		images: gallery.slice(0, 6)
	});
}

export async function updatePage(
	brochureId: string,
	pageId: string,
	content: Record<string, unknown>
): Promise<void> {
	await dbUpdate('brochure_pages', pageId, { content });
	await touchBrochure(brochureId);
}

export async function deletePage(brochureId: string, pageId: string): Promise<void> {
	await dbDelete('brochure_pages', pageId);
	await touchBrochure(brochureId);
}

export async function duplicatePage(brochureId: string, pageId: string): Promise<void> {
	const doc = await getBrochure(brochureId);
	const page = doc?.pages.find((p) => p.id === pageId);
	if (!doc || !page) return;
	await dbInsert('brochure_pages', {
		brochure_id: brochureId,
		template: page.template,
		content: page.content,
		sort_order: page.sort_order + 1
	});
	await touchBrochure(brochureId);
}

/** Move a page one step up or down by swapping sort orders. */
export async function movePage(
	brochureId: string,
	pageId: string,
	direction: 'up' | 'down'
): Promise<void> {
	const doc = await getBrochure(brochureId);
	if (!doc) return;
	const idx = doc.pages.findIndex((p) => p.id === pageId);
	const swapWith = direction === 'up' ? idx - 1 : idx + 1;
	if (idx === -1 || swapWith < 0 || swapWith >= doc.pages.length) return;
	// Renumber the whole list so swaps stay stable even with duplicate orders.
	const order = doc.pages.map((p) => p.id);
	[order[idx], order[swapWith]] = [order[swapWith], order[idx]];
	for (let i = 0; i < order.length; i++) {
		await dbUpdate('brochure_pages', order[i], { sort_order: (i + 1) * 10 });
	}
	await touchBrochure(brochureId);
}

/* ---- Media library --------------------------------------------------- */

export interface MediaGroup {
	label: string;
	images: string[];
}

/** Every image the site already ships with, grouped for the picker. */
export async function siteImageLibrary(): Promise<MediaGroup[]> {
	const projects = await getProjects();
	const groups: MediaGroup[] = projects.map((p) => ({
		label: `Project — ${p.name}`,
		images: p.gallery
	}));
	groups.unshift({
		label: 'Site & general',
		images: [images.homeHero, images.homeSecondary, images.aboutTeam, images.logo]
	});
	groups.push({ label: 'Team', images: team.map((m) => m.photo) });
	groups.push({ label: 'Accreditations', images: badgeList.map((b) => b.src) });
	return groups;
}

/** Photos previously uploaded through the brochure builder. */
export async function uploadedImageLibrary(): Promise<string[]> {
	if (!dbConfigured()) return [];
	try {
		const files = await storageList('brochure');
		return files.map((f) => f.publicUrl);
	} catch {
		return [];
	}
}
