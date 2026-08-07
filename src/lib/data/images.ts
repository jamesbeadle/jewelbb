/**
 * Central image registry.
 *
 * The logo is served from the repo (/static/images/). Photography is still
 * served from the existing Wix CDN so the rebuild is pixel-ready before
 * assets are migrated. To move an image into the repo, download it to
 * /static/images/... and change the URL here — nothing else needs to touch it.
 */
const wix = (id: string) => `https://static.wixstatic.com/media/${id}`;

export const images = {
	logo: '/images/logo.svg',
	// NOTE: the old Wix homepage hero was a video; its poster frame is blank,
	// so the hero uses the homepage portfolio photo instead.
	homeHero: wix('d5755f_f1db7367a51e4983b3246f8cd4278bf4~mv2.jpg'),
	homeSecondary: wix('d5755f_25390dcf479f4fbb9aa7ef76431c0792~mv2.jpg'),
	aboutTeam: wix('d5755f_2fe2c9583c9a42839e9a3fb61409567f~mv2.jpg'),
	badges: {
		consideratConstructors: wix('d5755f_8f8457131b5b40baa86c9eec1c4d83ca~mv2.png'),
		safeContractor: wix('d5755f_13d24e380f004781a3616ce3c5b65ecb~mv2.png'),
		houzz: wix('d5755f_f05e8ce6df6044fd817b02163e275425~mv2.png'),
		buildertrend: wix('d5755f_3fa47d100ad44ed6bc4e93855fe980db~mv2.png'),
		eeColts: wix('d5755f_a09978c8eff740b09cdc11ee23af74b8~mv2.jpg')
	}
} as const;

export const badgeList = [
	{ src: images.badges.consideratConstructors, alt: 'Considerate Constructors Scheme accreditation' },
	{ src: images.badges.safeContractor, alt: 'SafeContractor accreditation' },
	{ src: images.badges.houzz, alt: 'Best of Houzz 2021 — Service' },
	{ src: images.badges.buildertrend, alt: 'Buildertrend construction management software' },
	{ src: images.badges.eeColts, alt: 'Official sponsor of Epsom & Ewell Colts FC' }
];
