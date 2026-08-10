export interface Project {
	slug: string;
	name: string;
	metaTitle: string;
	metaDescription: string;
	subtitle: string;
	description: string;
	gallery: string[];
	crossLink: string;
	accessible?: boolean;
}

export const projects: Project[] = [
	{
		slug: 'twickenham',
		name: 'Twickenham',
		metaTitle: 'Twickenham Project | Jewel Bespoke Build Ltd | Accessible Living Extension & Refurbishment',
		metaDescription: 'Ground floor extension and full internal refurbishment in Twickenham, designed for accessible living with a lift, bespoke sanitaryware and refined finishes.',
		subtitle: 'Accessible Living, Ground Floor Extension and a Full Internal Refurbishment',
		description:
			'The Twickenham project by Jewel Bespoke Build Ltd features a thoughtfully designed ground floor extension and full internal refurbishment, tailored to support accessible, modern living. Our team reconfigured the layout to create a more open and practical flow throughout the home, improving both usability and comfort. Key elements include the installation of a lift to enhance accessibility between floors, alongside bespoke sanitaryware and carefully selected finishes that elevate the overall interior. The design balances functionality with understated elegance, resulting in a home that is both highly practical and refined in its finish.',
		gallery: [
			'/images/projects/twickenham/01.jpg',
			'/images/projects/twickenham/02.jpg',
			'/images/projects/twickenham/03.jpg',
			'/images/projects/twickenham/04.jpg',
			'/images/projects/twickenham/05.jpg',
			'/images/projects/twickenham/06.jpg',
			'/images/projects/twickenham/07.jpg',
			'/images/projects/twickenham/08.jpg',
			'/images/projects/twickenham/09.jpg',
		],
		crossLink: 'kingston',
		accessible: true
	},
	{
		slug: 'hamptoncourt',
		name: 'Hampton Court',
		metaTitle: 'Hampton Court Project | Jewel Bespoke Build Ltd | Period Extension & Garage Conversion',
		metaDescription: 'Period rear extension, garage conversion and full refurbishment in Hampton Court, with open-plan living, bi-fold doors and a bespoke glazed staircase.',
		subtitle: 'Period Rear Extension, Garage Conversion, Full Internal Refurbishment & External Landscaping',
		description:
			'Discover the Hampton Court project by Jewel Bespoke Build Ltd, featuring a period rear home extension, garage conversion, and full internal refurbishment that blend charm with modern style. Our expert Surrey builders created an open-plan kitchen and dining area that flows seamlessly into the living space, extending to a landscaped entertaining area through corner opening bi-fold doors. A bespoke glazed staircase with the original mahogany handrail elegantly connects the floors, merging timeless elegance with contemporary design. The garage conversion adds independent living space, highlighting our dedication to quality craftsmanship in bespoke construction.',
		gallery: [
			'/images/projects/hamptoncourt/01.jpg',
			'/images/projects/hamptoncourt/02.jpg',
			'/images/projects/hamptoncourt/03.jpg',
			'/images/projects/hamptoncourt/04.jpg',
			'/images/projects/hamptoncourt/05.jpg',
			'/images/projects/hamptoncourt/06.jpg',
		],
		crossLink: 'bromley'
	},
	{
		slug: 'ashtead',
		name: 'Ashtead',
		metaTitle: 'Ashtead Project | Jewel Bespoke Build Ltd | Two-Storey Side Extension & Modernisation',
		metaDescription: 'Two-storey side extension and full refurbishment in Ashtead with a luxurious master suite, vaulted entrance, cedar cladding and anthracite aluminium windows.',
		subtitle: 'Two storey side extension with internal reconfiguration and modernisation throughout.',
		description:
			'We\'re pleased to present the full refurbishment of this updated home in Ashtead, Surrey. Key upgrades include enlarged windows with sleek anthracite aluminum frames, allowing more natural light and adding a modern edge. A two-storey side home extension provides a luxurious master suite with an ensuite and dressing area. The ground floor features a new garage and rear study, enhancing functionality and kerb appeal. A vaulted entrance with a glass balustrade Juliet balcony creates a striking sense of space, while high-quality finishes throughout, including a new WC, elevate the interior. The exterior is unified with cedar cladding, repointed brickwork, fresh K Render, and grey windows.',
		gallery: [
			'/images/projects/ashtead/01.jpg',
			'/images/projects/ashtead/02.jpg',
			'/images/projects/ashtead/03.jpg',
			'/images/projects/ashtead/04.jpg',
			'/images/projects/ashtead/05.jpg',
			'/images/projects/ashtead/06.jpg',
		],
		crossLink: 'cranleigh'
	},
	{
		slug: 'surbiton',
		name: 'Surbiton',
		metaTitle: 'Surbiton Project | Jewel Bespoke Build Ltd | Rear Loft Extension & Refurbishment',
		metaDescription: 'Rear loft extension and full internal refurbishment in Surbiton, adding a spacious bedroom with elegant ensuite and revitalised, modern living areas.',
		subtitle: 'Rear loft extension and full internal refurbishment works',
		description:
			'The Surbiton project by Jewel Bespoke Build Ltd features a stunning rear loft extension and full internal refurbishment, designed to enhance space and functionality. Modern finishes and exceptional craftsmanship elevate the home\'s aesthetic, blending style with practicality. The loft extension provides a spacious bedroom with an elegant ensuite, while the internal refurbishment revitalises the living areas. Every detail has been carefully considered to create a comfortable and sophisticated living environment, tailored to the client\'s vision.',
		gallery: [
			'/images/projects/surbiton/01.jpg',
			'/images/projects/surbiton/02.jpg',
			'/images/projects/surbiton/03.jpg',
			'/images/projects/surbiton/04.jpg',
			'/images/projects/surbiton/05.jpg',
			'/images/projects/surbiton/06.jpg',
		],
		crossLink: 'cranleigh'
	},
	{
		slug: 'ewelleast',
		name: 'Ewell East',
		metaTitle: 'Ewell East Project | Jewel Bespoke Build Ltd | Accessible Living Double-Storey Extension',
		metaDescription: 'Double storey front extension and full refurbishment of a 5-bed Ewell East home, designed for accessible living with step-free access and open-plan spaces.',
		subtitle: 'Accessible Living, Double Storey Extension to the Front and Full House Refurbishment',
		description:
			'The Ewell East project by Jewel Bespoke Build Ltd is a stunning example of bespoke construction in Surrey. This 5 bedroom, 4 bathroom home has been thoughtfully transformed with a double storey front home extension and a full refurbishment designed for accessible living. Our expert Surrey builders have incorporated step free access and widened doorways throughout, along with a bright, open-plan kitchen and dining area that maximises natural light and flow. The double height vaulted entrance hall and winding staircase add a touch of grandeur, while premium fixtures and luxury finishes combine elegance with functionality. This project is a perfect blend of contemporary living and accessibility, showcasing the quality and craftsmanship that define Jewel Bespoke Build Ltd.',
		gallery: [
			'/images/projects/ewelleast/01.jpg',
			'/images/projects/ewelleast/02.jpg',
			'/images/projects/ewelleast/03.jpg',
			'/images/projects/ewelleast/04.jpg',
			'/images/projects/ewelleast/05.jpg',
			'/images/projects/ewelleast/06.jpg',
		],
		crossLink: 'sutton',
		accessible: true
	},
	{
		slug: 'kingston',
		name: 'Kingston',
		metaTitle: 'Kingston Project | Jewel Bespoke Build Ltd | Accessible Refurbishment & Hydrotherapy Pool',
		metaDescription: 'Full internal and external refurbishment in Kingston with accessibility adaptations, a hydrotherapy pool, herringbone flooring and Crittall-style doors.',
		subtitle: 'Full internal and external refurbishment with accessibility adaptations, hydrotherapy pool installation, and bespoke high-end finishes throughout.',
		description:
			'The Kingston project by Jewel Bespoke Build Ltd features a full-property refurbishment with a focus on accessibility and bespoke detailing. Key upgrades include bathrooms adapted to meet disability access requirements and the installation of a specialist hydrotherapy pool, blending therapeutic function with refined design. Internally, high-end finishes like herringbone flooring and bespoke Crittall-style steel doors enhance both aesthetics and durability. Externally, the transformation includes a landscaped garden, smooth resin driveway, and handcrafted oak-framed carport, combining elegance with practicality. This project exemplifies our commitment to blending accessibility with luxury in every aspect of bespoke construction.',
		gallery: [
			'/images/projects/kingston/01.jpg',
			'/images/projects/kingston/02.jpg',
			'/images/projects/kingston/03.jpg',
			'/images/projects/kingston/04.jpg',
			'/images/projects/kingston/05.jpg',
			'/images/projects/kingston/06.jpg',
			'/images/projects/kingston/07.jpg',
			'/images/projects/kingston/08.jpg',
			'/images/projects/kingston/09.jpg',
		],
		crossLink: 'cranleigh',
		accessible: true
	},
	{
		slug: 'godalming',
		name: 'Godalming',
		metaTitle: 'Godalming Project | Jewel Bespoke Build Ltd | Oak-Frame Extension & Interior Refurbishment',
		metaDescription: 'Single-storey oak-frame extension and full interior refurbishment in Godalming, with a vaulted ceiling, bespoke joinery and steel Crittall windows and doors.',
		subtitle: 'Single-story oak-frame extension and full interior refurbishment, featuring a vaulted ceiling, bespoke joinery, and high-end fit-out, including a boot room, WC, and utility space.',
		description:
			'The Godalming project by Jewel Bespoke Build Ltd showcases a stunning single-story oak-frame home extension with a vaulted ceiling, bespoke joinery, and luxurious finishes. This project includes a sophisticated boot room, WC, and utility space, highlighted by industrial chic steel Crittall windows and doors that flood the space with natural light. The design merges modern functionality with timeless elegance, reflecting quality bespoke construction.',
		gallery: [
			'/images/projects/godalming/01.jpg',
			'/images/projects/godalming/02.jpg',
			'/images/projects/godalming/03.jpg',
			'/images/projects/godalming/04.jpg',
			'/images/projects/godalming/05.jpg',
			'/images/projects/godalming/06.jpg',
		],
		crossLink: 'cheam'
	},
	{
		slug: 'cobham',
		name: 'Cobham',
		metaTitle: 'Cobham Project | Jewel Bespoke Build Ltd | Open-Plan Kitchen & Full Refurbishment',
		metaDescription: 'Full renovation in Cobham creating an open-plan kitchen and dining space with an 11-metre steel beam, wireless systems and high-end finishes throughout.',
		subtitle: 'Open-plan kitchen and dining area, full internal refurbishment, and modern wireless system integration',
		description:
			'The Cobham refurbishment by Jewel Bespoke Build Ltd showcases the expertise of Surrey\'s leading bespoke builders, transforming a divided home into a spacious, open plan living area. This full renovation features an 11-metre custom steel beam, creating an expansive kitchen and dining space equipped with state of the art wireless systems. High-end finishes and luxury upgrades throughout the kitchen, utilities, and bathrooms offer a sophisticated fusion of modern functionality and timeless elegance, highlighting our commitment to creating exceptional living spaces.',
		gallery: [
			'/images/projects/cobham/01.jpg',
			'/images/projects/cobham/02.jpg',
			'/images/projects/cobham/03.jpg',
			'/images/projects/cobham/04.jpg',
			'/images/projects/cobham/05.jpg',
			'/images/projects/cobham/06.jpg',
		],
		crossLink: 'cranleigh'
	},
	{
		slug: 'puttenham',
		name: 'Puttenham',
		metaTitle: 'Puttenham Project | Jewel Bespoke Build Ltd | Open-Plan Rear Extension & Refurbishment',
		metaDescription: 'Open-plan rear extension and full internal refurbishment in Puttenham, blending indoor and outdoor living with modern finishes and quality craftsmanship.',
		subtitle: 'Open Plan Rear extension and full internal refurbishment works.',
		description:
			'The Puttenham project by Jewel Bespoke Build Ltd features a striking open-plan rear home extension and full internal refurbishment, designed to enhance both space and functionality. The seamless flow between indoor and outdoor areas is complemented by modern finishes and high quality craftsmanship. Every detail has been carefully considered to create a stylish, contemporary living environment, balancing comfort and sophistication.',
		gallery: [
			'/images/projects/puttenham/01.jpg',
			'/images/projects/puttenham/02.jpg',
			'/images/projects/puttenham/03.jpg',
			'/images/projects/puttenham/04.jpg',
			'/images/projects/puttenham/05.jpg',
			'/images/projects/puttenham/06.jpg',
		],
		crossLink: 'cranleigh'
	},
	{
		slug: 'guildford',
		name: 'Guildford',
		metaTitle: 'Guildford Project | Jewel Bespoke Build Ltd | Rear Extension & Bespoke Joinery',
		metaDescription: 'Rear extension and ground floor refurbishment in Guildford with an open kitchen, natural stone flooring, Crittall doors and bespoke joinery throughout.',
		subtitle: 'Rear extension and refurbishment of kitchen/ utility and study which includes bespoke joinery throughout',
		description:
			'The Guildford project by Jewel Bespoke Build Ltd features a refined rear home extension and ground floor refurbishment, blending modern functionality with classic elegance. Our expert Surrey builders expanded the kitchen into an open, welcoming space, complemented by luxurious natural stone flooring. Key design features include internal and external Crittall doors that maximise natural light, along with custom joinery for tailored storage solutions. This project combines contemporary design with practical elegance, enhancing the home\'s living experience.',
		gallery: [
			'/images/projects/guildford/01.jpg',
			'/images/projects/guildford/02.jpg',
			'/images/projects/guildford/03.jpg',
			'/images/projects/guildford/04.jpg',
			'/images/projects/guildford/05.jpg',
			'/images/projects/guildford/06.jpg',
		],
		crossLink: 'ashtead'
	},
	{
		slug: 'sutton',
		name: 'Sutton',
		metaTitle: 'Sutton Project | Jewel Bespoke Build Ltd | Accessible Front & Rear Extension',
		metaDescription: 'Single storey front and rear extension and full refurbishment of a 4-bed Sutton home, with widened doorways and open-plan spaces for accessible living.',
		subtitle: 'Accessible Living, Single Storey Front and Rear Extension',
		description:
			'Explore the Sutton project by Jewel Bespoke Build Ltd, featuring accessible living solutions through a single storey front and rear home extension and a full refurbishment of a 4 bedroom house. Our skilled Surrey builders have enhanced accessibility with widened doorways and open-plan spaces that blend seamlessly with the existing structure. A customisable outhouse adds versatile space, demonstrating our commitment to comfort and inclusivity. This project exemplifies how our bespoke contractors combine practical solutions with thoughtful design in Surrey bespoke construction.',
		gallery: [
			'/images/projects/sutton/01.jpg',
			'/images/projects/sutton/02.jpg',
			'/images/projects/sutton/03.jpg',
			'/images/projects/sutton/04.jpg',
			'/images/projects/sutton/05.jpg',
			'/images/projects/sutton/06.jpg',
		],
		crossLink: 'ewelleast',
		accessible: true
	},
	{
		slug: 'cranleigh',
		name: 'Cranleigh',
		metaTitle: 'Cranleigh Project | Jewel Bespoke Build Ltd | Hand-Crafted Oak Extension & Refurbishment',
		metaDescription: 'Hand-crafted rear oak extension and full internal refurbishment in Cranleigh, with custom kitchens, oak bi-folding doors and a luxurious sunken spa.',
		subtitle: 'Hand crafted rear oak extension and full internal refurbishment works',
		description:
			'The Cranleigh project by Jewel Bespoke Build Ltd features a beautifully crafted rear oak home extension and comprehensive internal refurbishment. Our skilled Surrey builders blend traditional timber framing with modern precision, incorporating custom kitchens, refined oak finishes, and natural stone accents. Key highlights include oak bi-folding doors that open to an ambient outdoor space with a luxurious sunken spa. This exceptional Surrey construction reflects our commitment to quality craftsmanship and sophisticated design, creating a truly remarkable home.',
		gallery: [
			'/images/projects/cranleigh/01.jpg',
			'/images/projects/cranleigh/02.jpg',
			'/images/projects/cranleigh/03.jpg',
			'/images/projects/cranleigh/04.jpg',
			'/images/projects/cranleigh/05.jpg',
			'/images/projects/cranleigh/06.jpg',
		],
		crossLink: 'hamptoncourt'
	},
	{
		slug: 'cheam',
		name: 'Cheam',
		metaTitle: 'Cheam Project | Jewel Bespoke Build Ltd | Rear Extension & Smart Home Refurbishment',
		metaDescription: 'Single-storey rear extension and full refurbishment of a 4-bed, 3-bath Cheam home, with a bespoke kitchen, premium finishes and a smart home system.',
		subtitle: 'Rear extension and full house refurbishment, 4 bedrooms and 3 bathrooms',
		description:
			'The Cheam project by Jewel Bespoke Build Ltd features a full refurbishment of a four bedroom, three bathroom home, including a single-storey rear home extension that enhances both functionality and aesthetics. Our expert Surrey builders have transformed the rear of the property into modern, inviting living spaces, centered around a bespoke kitchen and utility area. With premium finishes and a state of the art smart home system for lighting, heating, and security, this project exemplifies contemporary living and highlights our commitment to quality as trusted bespoke contractors.',
		gallery: [
			'/images/projects/cheam/01.jpg',
			'/images/projects/cheam/02.jpg',
			'/images/projects/cheam/03.jpg',
			'/images/projects/cheam/04.jpg',
			'/images/projects/cheam/05.jpg',
			'/images/projects/cheam/06.jpg',
		],
		crossLink: 'guildford'
	},
	{
		slug: 'bromley',
		name: 'Bromley',
		metaTitle: 'Bromley Project | Jewel Bespoke Build Ltd | New Project Coming Soon',
		metaDescription: 'A new Jewel Bespoke Build project in Bromley. Full details and photos coming soon. Explore our other completed projects across Surrey in the meantime.',
		subtitle: 'New project — coming soon',
		description:
			'Details of this project are coming soon.',
		gallery: [],
		crossLink: 'cobham'
	}
];
