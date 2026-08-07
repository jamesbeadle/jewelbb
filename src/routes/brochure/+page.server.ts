import { renderMarkdown } from '$lib/markdown';
import { services } from '$lib/data/services';
import { site } from '$lib/data/site';
import { dbConfigured, dbSelect, type BrochureSectionRow } from '$lib/server/db';
import type { PageServerLoad } from './$types';

export const prerender = false;

export interface BrochureSection {
	id: string;
	title: string;
	subtitle: string;
	html: string;
	image_url: string;
}

/** Static fallback so the brochure works before Supabase is connected. */
function fallbackSections(): BrochureSection[] {
	const servicesMd = services.map((s) => `- **${s.title}** — ${s.description}`).join('\n');
	return [
		{
			id: 'cover',
			title: site.shortName,
			subtitle: 'Bespoke construction · Surrey & the South of England',
			html: renderMarkdown(
				'**Family-run. 65+ years of combined experience.**\n\nLuxury custom homes, extensions, loft conversions and full renovations.'
			),
			image_url: ''
		},
		{
			id: 'services',
			title: 'Our services',
			subtitle: '',
			html: renderMarkdown(servicesMd),
			image_url: ''
		},
		{
			id: 'contact',
			title: "Let's talk about your project",
			subtitle: '',
			html: renderMarkdown(
				`**Call us** — ${site.phone}\n\n**Email us** — ${site.email}\n\n**Visit us** — ${site.address.line1}, ${site.address.town}, ${site.address.county}, ${site.address.postcode}`
			),
			image_url: ''
		}
	];
}

export const load: PageServerLoad = async () => {
	if (dbConfigured()) {
		try {
			const rows = await dbSelect<BrochureSectionRow>(
				'brochure_sections',
				'select=*&order=sort_order.asc'
			);
			if (rows.length > 0) {
				return {
					sections: rows.map(
						(r): BrochureSection => ({
							id: r.id,
							title: r.title,
							subtitle: r.subtitle,
							html: renderMarkdown(r.body),
							image_url: r.image_url
						})
					)
				};
			}
		} catch {
			// fall through
		}
	}
	return { sections: fallbackSections() };
};
