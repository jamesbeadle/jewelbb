/**
 * Homepage hero slideshow: Supabase `home_slides` when configured (edited in
 * /admin/slideshow), otherwise the single static hero photo. Same pattern as
 * badges — once the table exists it is the source of truth, and the static
 * photo is only used when it's missing, unreachable or every slide is hidden.
 */
import { images } from '$lib/data/images';
import { dbConfigured, dbSelect, type HomeSlideRow } from '$lib/server/db';

export interface Slide {
	src: string;
	alt: string;
}

const FALLBACK: Slide = {
	src: images.homeHero,
	alt: 'Recently completed Jewel Bespoke Build project'
};

export async function getSlides(): Promise<Slide[]> {
	if (dbConfigured()) {
		try {
			const rows = await dbSelect<HomeSlideRow>(
				'home_slides',
				'select=*&visible=eq.true&order=sort_order.asc,created_at.asc'
			);
			const slides = rows
				.filter((r) => r.image_url)
				.map((r) => ({ src: r.image_url, alt: r.alt || FALLBACK.alt }));
			if (slides.length > 0) return slides;
		} catch {
			// table missing (migration not run yet) or DB unreachable
		}
	}
	return [FALLBACK];
}
