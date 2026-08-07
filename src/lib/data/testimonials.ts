export interface Testimonial {
	quote: string;
	author: string;
	context: string;
}

export const testimonials: Testimonial[] = [
	{
		quote:
			'We have worked with Jewel Bespoke Build for several years on residential projects and have always found them to be responsive and timely in submitting tenders. They provide helpful cost information during the build process and work well alongside nominated contractors. Their project management ensures organised workforce coordination, controlled costs, and effective communication. Health and safety standards are consistently maintained. We highly recommend Jewels for their professionalism and efficiency.',
		author: 'Malcolm V Leliott',
		context: 'MVL Architects'
	},
	{
		quote:
			'All work was executed to a very high standard. I was most impressed by the speed with which any queries were answered, and a solution proposed, and also by the politeness and cleanliness of the workers who were doing difficult and dirty work in a working home. I was very happy with the results and have commissioned them to do further work.',
		author: 'Mrs. Carson',
		context: 'Kensington project'
	}
];
