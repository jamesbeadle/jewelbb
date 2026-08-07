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
			'https://static.wixstatic.com/media/2f83b8_b9f41998cfba4f368e9b870d0e90d0e7~mv2.jpg',
			'https://static.wixstatic.com/media/2f83b8_2ad8f822d9104a1fb5872fe598df98dd~mv2.jpg',
			'https://static.wixstatic.com/media/2f83b8_b1acb1945cfc443bac29e585cb310f67~mv2.jpg',
			'https://static.wixstatic.com/media/2f83b8_0574db1bb7634cffa37499a09acfda27~mv2.jpg',
			'https://static.wixstatic.com/media/2f83b8_fd1660b4d6864d5ebeb55ce9ed1d75fe~mv2.jpg',
			'https://static.wixstatic.com/media/2f83b8_69b7a32b48cd49e2a8ed7db33e0175cb~mv2.jpg',
			'https://static.wixstatic.com/media/2f83b8_155e2083b9e9457d90f24a40322b8edd~mv2.jpg',
			'https://static.wixstatic.com/media/2f83b8_5b94873a6d734c89b5509bd5e9210cd5~mv2.jpg',
			'https://static.wixstatic.com/media/2f83b8_7eb87a7dcdd44a508dd8d4902a0507d4~mv2.jpg',
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
			'https://static.wixstatic.com/media/2f83b8_0f2cdd3641b44406971ea56df9538e94~mv2.png',
			'https://static.wixstatic.com/media/d5755f_7f5c12bef3eb4bfc90ed9c33cce5407f~mv2.png',
			'https://static.wixstatic.com/media/d5755f_76e6d254fa574168a4aaa3c5cc24117e~mv2.png',
			'https://static.wixstatic.com/media/d5755f_6a6f46c95c354fe2b7e890c256747edb~mv2.png',
			'https://static.wixstatic.com/media/d5755f_50bb742b6eec4847a0437a74d2f3212a~mv2.png',
			'https://static.wixstatic.com/media/d5755f_f90301642725494aa5a4a6bc43de4a90~mv2.png',
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
			'https://static.wixstatic.com/media/d5755f_277cb1cac5a241b98e3f4c367c65b1c7~mv2.jpg',
			'https://static.wixstatic.com/media/d5755f_4f1a679251d1424ead23e7364ab2ddd1~mv2.jpg',
			'https://static.wixstatic.com/media/d5755f_392a4fd7008942cf8820e75907baa472~mv2.jpg',
			'https://static.wixstatic.com/media/d5755f_092fe36946494f7681d5cabe66d547c0~mv2.jpg',
			'https://static.wixstatic.com/media/d5755f_ae56209dd5974bf7ae73d5d212e3e39d~mv2.jpg',
			'https://static.wixstatic.com/media/d5755f_f1ad16202d8b483ab2eed468698c109e~mv2.jpg',
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
			'https://static.wixstatic.com/media/d5755f_f2f3199d2fc5470f8ac2112d4a9baf39~mv2.jpg',
			'https://static.wixstatic.com/media/d5755f_d66baf5b7ca94e44b267f07626c5ecdf~mv2.jpg',
			'https://static.wixstatic.com/media/d5755f_d5d566c09f6c4657a538d616c348cfcc~mv2.jpg',
			'https://static.wixstatic.com/media/d5755f_d169bf3859094de58bf97c4d25ac6bfd~mv2.jpg',
			'https://static.wixstatic.com/media/2f83b8_b2678f4b166f429ba5b02d0f2b2b4c62~mv2.jpg',
			'https://static.wixstatic.com/media/2f83b8_0fcf2d83b2d942efab3035a52b611289~mv2.jpg',
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
			'https://static.wixstatic.com/media/d5755f_dcbf8217ed264b0f90fb757ebce702f0~mv2.jpg',
			'https://static.wixstatic.com/media/d5755f_f4a96d53870f4c378e41b97824465e14~mv2.jpg',
			'https://static.wixstatic.com/media/d5755f_3e74b0ad734b473d859e5f6a0616b7ca~mv2.jpg',
			'https://static.wixstatic.com/media/d5755f_dc81233b5b3744c7b9706e24892514ad~mv2.jpg',
			'https://static.wixstatic.com/media/d5755f_2ed12d3ef5fb4970a24d26d9bdc23f05~mv2.jpg',
			'https://static.wixstatic.com/media/d5755f_2eaa4df1c1224d1a8967ebc5017f10b1~mv2.jpg',
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
			'https://static.wixstatic.com/media/d5755f_639da4d8fa0d4e0095b4562372d7ea1c~mv2.jpg',
			'https://static.wixstatic.com/media/d5755f_683f37d8089b41c1b6c1a5c56b6211dc~mv2.jpg',
			'https://static.wixstatic.com/media/d5755f_05e3c2eb14e94ea395941b03881eb994~mv2.jpg',
			'https://static.wixstatic.com/media/d5755f_75abddae21d94f8eb391e2f22ddbf5eb~mv2.jpg',
			'https://static.wixstatic.com/media/d5755f_541f9a0a93a44f9981efb8960e806841~mv2.jpg',
			'https://static.wixstatic.com/media/d5755f_9e88f7c8d74e4c2e8e693e3eb110bcaa~mv2.jpg',
			'https://static.wixstatic.com/media/d5755f_54d0170a21464836bab6c3eb63245e8a~mv2.jpg',
			'https://static.wixstatic.com/media/d5755f_a14e339063f9420e9bf755ff3d308b60~mv2.jpg',
			'https://static.wixstatic.com/media/d5755f_24cf64289403414b858eeb304eea1391~mv2.jpg',
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
			'https://static.wixstatic.com/media/d5755f_6a517d81f30e482794897a81a7b8e93c~mv2.jpg',
			'https://static.wixstatic.com/media/d5755f_262e139a43264fbca0222d20e3f76d58~mv2.jpg',
			'https://static.wixstatic.com/media/d5755f_8ac44c235404465ebb22353685f9b09d~mv2.jpg',
			'https://static.wixstatic.com/media/d5755f_9e1c01bb639746fb9cd97cbf1098b05c~mv2.jpg',
			'https://static.wixstatic.com/media/d5755f_8f7e34993465466189172c9a2948b3fd~mv2.jpg',
			'https://static.wixstatic.com/media/d5755f_ae0543168c824a46853f3a7c1af10726~mv2.jpg',
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
			'https://static.wixstatic.com/media/d5755f_18f3c025a30a49fb9319e7b0a94386b8~mv2.png',
			'https://static.wixstatic.com/media/d5755f_47ba3cda15084d708f86165595b070c2~mv2.png',
			'https://static.wixstatic.com/media/d5755f_2f14d25be9c348ab8e52b2b479c88b13~mv2.png',
			'https://static.wixstatic.com/media/d5755f_3c98cec2c0334e88bbae2c9c84f4993d~mv2.png',
			'https://static.wixstatic.com/media/d5755f_832b92849fe04c7a922faa1e5d47b7e3~mv2.png',
			'https://static.wixstatic.com/media/d5755f_d4b0463a7035448a9c518e98bfeac309~mv2.png',
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
			'https://static.wixstatic.com/media/d5755f_f5ccd25b7b9c4da98bd3e5848a72638d~mv2.jpg',
			'https://static.wixstatic.com/media/d5755f_635c4ad8a9fb471095962a345c97b6b7~mv2.jpg',
			'https://static.wixstatic.com/media/d5755f_1f2c240e9eba4cc095c8d32bcd74f10e~mv2.jpg',
			'https://static.wixstatic.com/media/d5755f_15f45b48908e49efbfb9c2ee458d0bf9~mv2.png',
			'https://static.wixstatic.com/media/d5755f_c9f37045c0fe40ff80734fb9c4bced00~mv2.png',
			'https://static.wixstatic.com/media/2f83b8_c2f0f183b240404eb00cc62169b25cf3~mv2.jpg',
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
			'https://static.wixstatic.com/media/d5755f_0225899802bf4c33a2670466072b4c5f~mv2.jpg',
			'https://static.wixstatic.com/media/d5755f_2fe2c9583c9a42839e9a3fb61409567f~mv2.jpg',
			'https://static.wixstatic.com/media/d5755f_9b9196a9576a4169a37f8727fde8808b~mv2.jpg',
			'https://static.wixstatic.com/media/d5755f_53c5f14f03ac49d8839e077fd23c3501~mv2.jpg',
			'https://static.wixstatic.com/media/d5755f_e7f07b804c1a4a20b01f0e201ee5d81e~mv2.jpg',
			'https://static.wixstatic.com/media/d5755f_e9b0726330284ff7a9b5205fa4129e28~mv2.jpg',
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
			'https://static.wixstatic.com/media/d5755f_1a63387b8b2543b2afcb46b1673e8b45~mv2.jpeg',
			'https://static.wixstatic.com/media/d5755f_7e84f891c4c74222b19201583b7a91d3~mv2.jpg',
			'https://static.wixstatic.com/media/d5755f_65fc583e5831459ea9543a9750391af2~mv2.jpg',
			'https://static.wixstatic.com/media/d5755f_5e470775613544e9b88e7f2f99961582~mv2.jpg',
			'https://static.wixstatic.com/media/d5755f_c1d8e834831f4b5aab7bb1e4b1f39aa6~mv2.jpg',
			'https://static.wixstatic.com/media/d5755f_ce0a7467c52248d69ca590232ecb8862~mv2.jpg',
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
			'https://static.wixstatic.com/media/d5755f_8fb0f2357e0a43549c1631b2169e593a~mv2.png',
			'https://static.wixstatic.com/media/d5755f_e21e1d36dfa24fcaaaadfbcc7ea003eb~mv2.png',
			'https://static.wixstatic.com/media/d5755f_426fd2086f6d4598ac2358a6b135e85a~mv2.png',
			'https://static.wixstatic.com/media/d5755f_98bc7bc48e49479ab0cdc5aeee90ba69~mv2.png',
			'https://static.wixstatic.com/media/d5755f_1fbf04ecb15b4d41b33cd5df32db8455~mv2.jpg',
			'https://static.wixstatic.com/media/d5755f_618e618d2dc64c15959d76d4c86bc03e~mv2.jpg',
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
			'https://static.wixstatic.com/media/d5755f_0483575212d14d3896a8d555e263e4a1~mv2.jpg',
			'https://static.wixstatic.com/media/d5755f_f1db7367a51e4983b3246f8cd4278bf4~mv2.jpg',
			'https://static.wixstatic.com/media/d5755f_6bf95cadb6914d67898315940a82d471~mv2.jpg',
			'https://static.wixstatic.com/media/d5755f_28bb829485164f5d962b7fb3e51f51aa~mv2.jpg',
			'https://static.wixstatic.com/media/d5755f_f5f1d1013dc74b898019405a964ee611~mv2.jpg',
			'https://static.wixstatic.com/media/d5755f_7fc7d0202a564cc7963b3d497594b9aa~mv2.jpg',
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
