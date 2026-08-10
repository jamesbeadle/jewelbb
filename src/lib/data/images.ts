/**
 * Central image registry.
 *
 * All images are served from the repo (/static/images/). To swap an image,
 * replace the file in /static/images/... or change the path here — nothing
 * else needs to touch it. Photos uploaded through /admin live in Supabase
 * Storage instead and are referenced by their full URL.
 */
export const images = {
	logo: '/images/logo.svg',
	// NOTE: the old Wix homepage hero was a video; its poster frame is blank,
	// so the hero uses the homepage portfolio photo instead.
	homeHero: '/images/site/home-hero.jpg',
	homeSecondary: '/images/site/home-secondary.jpg',
	aboutTeam: '/images/site/about-team.jpg',
	badges: {
		consideratConstructors: '/images/badges/considerate-constructors.png',
		safeContractor: '/images/badges/safecontractor.png',
		houzz: '/images/badges/houzz.png',
		buildertrend: '/images/badges/buildertrend.png',
		eeColts: '/images/badges/ee-colts.jpg'
	}
} as const;

export const badgeList = [
	{ src: images.badges.consideratConstructors, alt: 'Considerate Constructors Scheme accreditation' },
	{ src: images.badges.safeContractor, alt: 'SafeContractor accreditation' },
	{ src: images.badges.houzz, alt: 'Best of Houzz 2021 — Service' },
	{ src: images.badges.buildertrend, alt: 'Buildertrend construction management software' },
	{ src: images.badges.eeColts, alt: 'Official sponsor of Epsom & Ewell Colts FC' }
];
