export interface Service {
	title: string;
	slug: string;
	description: string;
	icon: string;
}

export const services: Service[] = [
	{
		title: 'New Build Homes',
		slug: 'new-build-homes',
		description:
			"Build your dream home with Jewel Bespoke Build Ltd's bespoke new build services. Our expert Surrey builders customise every detail to your needs and budget, creating a unique residence you'll be proud to call home.",
		icon: 'home'
	},
	{
		title: 'Full House Refurbishments',
		slug: 'full-house-refurbishments',
		description:
			"Transform your home with Jewel Bespoke Build Ltd's full house refurbishment services. Our skilled Surrey builders manage every detail, from structural work to final finishes, ensuring timely delivery within budget and to the highest standards.",
		icon: 'refresh'
	},
	{
		title: 'Extensions',
		slug: 'extensions',
		description:
			'Jewel Bespoke Build Ltd delivers high-quality home extensions tailored to your vision and budget. Our skilled Surrey builders ensure flawless results through meticulous attention to detail and close collaboration.',
		icon: 'expand'
	},
	{
		title: 'Loft Conversions',
		slug: 'loft-conversions',
		description:
			'Transform your loft into a stunning, functional space with our expert team. Tailored to your lifestyle and budget, we ensure a seamless, stress-free conversion.',
		icon: 'roof'
	},
	{
		title: 'Basement Conversions',
		slug: 'basement-conversions',
		description:
			"Create a functional space with Jewel Bespoke Build Ltd. From design to final fit-out, our expert Surrey builders ensure every detail meets the highest standards. Whether it's a new living area, home gym, or wine cellar, we bring your vision to life with quality craftsmanship and innovative design.",
		icon: 'layers'
	},
	{
		title: 'Accessible Living',
		slug: 'accessible-living',
		description:
			'At Jewel Bespoke Build Ltd, we pride ourselves on creating accessible living solutions that enhance quality of life. Our bespoke home builds are tailored to your unique needs, in collaboration with architects and occupational therapists, ensuring comfort and functionality in every project.',
		icon: 'heart'
	}
];
