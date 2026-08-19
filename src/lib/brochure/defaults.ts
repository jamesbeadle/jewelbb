/**
 * The default brochure — a faithful recreation of the designed 2026 print
 * brochure. Used two ways:
 *
 *  1. As the seed when an admin clicks "New brochure → Start from the 2026
 *     layout" (every page is then fully editable).
 *  2. As the fallback shown at /brochure before Supabase is connected or
 *     while no brochure has been made active.
 */
import { site } from '$lib/data/site';
import { team } from '$lib/data/team';
import { images } from '$lib/data/images';
import type { TemplateId } from './templates';

export interface DefaultPage {
	template: TemplateId;
	content: Record<string, unknown>;
}

const contactLine = `jewelbb.co.uk | ${site.phone} | ${site.email}`;

export function defaultBrochurePages(): DefaultPage[] {
	return [
		{
			template: 'cover',
			content: {
				image: '/images/projects/guildford/06.jpg',
				title: 'Crafting Distinction',
				subtitle: 'Luxury Residential Construction | South of England',
				contact: contactLine
			}
		},
		{
			template: 'intro',
			content: {
				kicker: 'OUR PHILOSOPHY',
				title: 'Where Vision Meets Craft',
				body: [
					'Jewel Bespoke Build is a family-established construction house dedicated to the creation of extraordinary residential spaces across the South of England.',
					'Founded by Les and Nigel Reilly, our practice brings together architectural sensibility, meticulous project management, and an unwavering commitment to craft. Every project we undertake is a collaboration — a dialogue between our expertise and your aspirations.',
					'We work alongside leading architects, interior designers, and discerning homeowners to deliver new builds, comprehensive refurbishments, extensions, and specialist accessible living solutions of the highest calibre.',
					'Our approach is defined by transparency, precision, and a relentless pursuit of quality. From initial consultation through to handover and beyond, we invest in the relationship as much as the build — because exceptional homes are built on trust.'
				].join('\n\n')
			}
		},
		{
			template: 'team',
			content: {
				kicker: 'OUR TEAM',
				title: 'Get to Know Us',
				members: team.slice(0, 8).map((m) => ({ name: m.name, role: m.role, photo: m.photo })),
				accreditations: [
					images.badges.consideratConstructors,
					images.badges.buildertrend,
					images.badges.safeContractor,
					images.badges.houzz,
					images.badges.eeColts
				]
			}
		},
		{
			template: 'services',
			content: {
				kicker: 'OUR EXPERTISE',
				title: 'A Complete Service',
				items: [
					{
						title: 'New Build Homes',
						body: 'From concept to completion — bespoke residences designed around your life. We manage every stage of the construction journey, from initial planning and procurement through to final handover, delivering homes of exceptional quality and enduring value.'
					},
					{
						title: 'Full Refurbishments',
						body: 'Comprehensive transformation of existing properties. We reimagine interiors and exteriors while respecting the architectural heritage that makes each home unique, bringing contemporary standards of luxury and energy efficiency to established homes.'
					},
					{
						title: 'Extensions',
						body: 'Seamless additions that enhance both living space and property value. Rear, side, and wraparound extensions are designed to complement the existing architecture, creating light-filled rooms that feel like a natural part of the original home.'
					},
					{
						title: 'Loft & Basement Conversions',
						body: 'Unlocking hidden potential within your home. From light-filled loft suites with vaulted ceilings to basement entertainment spaces, wine rooms, and home cinemas — we specialise in maximising every square foot.'
					},
					{
						title: 'Accessible Living',
						body: 'Specialist adaptations that combine therapeutic function with elegant design. Hydrotherapy pools, through-floor lifts, wet rooms, and bespoke bathrooms — accessibility without compromise on aesthetics, designed with occupational therapists.'
					},
					{
						title: 'Project Management',
						body: 'Every Jewel build is managed through BuilderTrend, our industry-leading construction platform. You receive real-time updates, daily photo diaries, weekly progress reports, and full cost transparency from day one.'
					}
				]
			}
		},
		{
			template: 'project-intro',
			content: {
				kicker: 'GUILDFORD, SURREY',
				title: 'The Guildford Residence',
				subtitle: 'Rear Extension and Comprehensive Ground-Floor Renovation with Bespoke Joinery',
				image: '/images/projects/guildford/01.jpg'
			}
		},
		{
			template: 'project-detail',
			content: {
				kicker: 'REFURBISHMENT & EXTENSION',
				title: 'The Guildford Residence',
				image: '/images/projects/guildford/03.jpg',
				body: [
					'A distinguished project combining period character with contemporary luxury, set within landscaped grounds in one of Surrey’s most desirable locations.',
					'The interiors are defined by Crittall-style glazing, bespoke joinery, and natural stone flooring that flows through light-filled principal rooms. The kitchen features a hand-painted island with brushed brass hardware, while full-height windows dissolve the boundary between living space and garden.',
					'A revitalising atmosphere strikes a balance between modern design and elegant functionality, enhanced by custom storage solutions and external Crittall doors that optimise natural light throughout.'
				].join('\n\n'),
				features: [
					'Crittall-style glazing throughout',
					'Hand-painted kitchen with island',
					'Custom joinery and storage solutions',
					'Natural stone flooring',
					'Landscaped gardens with box hedging'
				],
				value: '£130,000',
				duration: '4 Months'
			}
		},
		{
			template: 'project-gallery',
			content: {
				kicker: 'GALLERY',
				title: 'The Guildford Residence — Project Gallery',
				images: [
					'/images/projects/guildford/01.jpg',
					'/images/projects/guildford/02.jpg',
					'/images/projects/guildford/03.jpg',
					'/images/projects/guildford/04.jpg',
					'/images/projects/guildford/05.jpg',
					'/images/projects/guildford/06.jpg'
				]
			}
		},
		{
			template: 'project-intro',
			content: {
				kicker: 'CHEAM, SURREY',
				title: 'The Cheam Residence',
				subtitle: 'Rear Extension and Full House Refurbishment — Four Bedrooms, Three Bathrooms',
				image: '/images/projects/cheam/01.jpg'
			}
		},
		{
			template: 'project-detail',
			content: {
				kicker: 'REFURBISHMENT & EXTENSION',
				title: 'The Cheam Residence',
				image: '/images/projects/cheam/03.jpg',
				body: [
					'A comprehensive refurbishment of a four-bedroom, three-bathroom home, complemented by a single-storey rear expansion that transforms both functionality and aesthetics.',
					'The rear of the property has been reimagined with modern, inviting living spaces centred on a custom kitchen and utility room. Premium finishes and a cutting-edge smart home system for lighting, heating, and security represent the very best of modern residential construction.',
					'Every detail has been considered to deliver a home that balances contemporary sophistication with lasting comfort.'
				].join('\n\n'),
				features: [
					'Single-storey rear extension',
					'Custom kitchen with utility room',
					'Smart home integration',
					'Premium finish throughout',
					'Three luxury bathrooms'
				],
				value: '£280,000',
				duration: '6 Months'
			}
		},
		{
			template: 'project-gallery',
			content: {
				kicker: 'GALLERY',
				title: 'The Cheam Residence — Project Gallery',
				images: [
					'/images/projects/cheam/01.jpg',
					'/images/projects/cheam/02.jpg',
					'/images/projects/cheam/03.jpg',
					'/images/projects/cheam/04.jpg',
					'/images/projects/cheam/05.jpg',
					'/images/projects/cheam/06.jpg'
				]
			}
		},
		{
			template: 'project-intro',
			content: {
				kicker: 'KINGSTON UPON THAMES, SURREY',
				title: 'The Kingston Residence',
				subtitle: 'Full Internal and External Refurbishment with Bespoke Finishes',
				image: '/images/projects/kingston/01.jpg'
			}
		},
		{
			template: 'project-detail',
			content: {
				kicker: 'ACCESSIBLE LIVING',
				title: 'The Kingston Residence',
				image: '/images/projects/kingston/04.jpg',
				body: [
					'A landmark accessible living project that demonstrates therapeutic function and architectural elegance need not be mutually exclusive.',
					'Key adaptations include bespoke bathrooms for enhanced mobility and a hydrotherapy pool that blends therapeutic function with elegant design. High-end finishes such as herringbone flooring and Crittall-style steel doors elevate the interior.',
					'The landscaped garden, resin driveway, and oak-framed carport enhance the home’s external charm. Every detail has been carefully considered to create a refined, accessible living environment tailored to the client’s vision.'
				].join('\n\n'),
				features: [
					'Hydrotherapy pool',
					'Bespoke accessible bathrooms',
					'Herringbone flooring',
					'Crittall-style steel doors',
					'Oak-framed carport',
					'Landscaped garden and resin driveway'
				],
				value: '£800,000',
				duration: '12 Months'
			}
		},
		{
			template: 'project-gallery',
			content: {
				kicker: 'GALLERY',
				title: 'The Kingston Residence — Project Gallery',
				images: [
					'/images/projects/kingston/01.jpg',
					'/images/projects/kingston/02.jpg',
					'/images/projects/kingston/03.jpg',
					'/images/projects/kingston/04.jpg',
					'/images/projects/kingston/05.jpg',
					'/images/projects/kingston/06.jpg'
				]
			}
		},
		{
			template: 'process',
			content: {
				kicker: 'OUR PROCESS',
				title: 'Built on Transparency',
				lede: 'Every Jewel project is managed through BuilderTrend, our industry-leading construction management platform. This ensures complete visibility at every stage — from planning through to completion and aftercare.',
				steps: [
					{
						title: 'Consultation & Design',
						body: 'We begin with a thorough understanding of your brief, working alongside your architect or recommending from our trusted network. Every detail is considered before ground is broken.'
					},
					{
						title: 'Pre-Construction',
						body: 'Detailed programming, procurement planning, and neighbour liaison. We establish clear timelines, milestones, and communication protocols tailored to your preferences.'
					},
					{
						title: 'Construction',
						body: 'Daily photo diaries, weekly progress reports, and real-time updates via your personal BuilderTrend portal. Your dedicated project manager is your single point of contact.'
					},
					{
						title: 'Quality Assurance',
						body: 'Rigorous inspection protocols at every phase. Our site managers maintain the highest standards of workmanship, health and safety, and neighbourly consideration.'
					},
					{
						title: 'Handover & Aftercare',
						body: 'A comprehensive handover process followed by our dedicated aftercare programme. Scheduled maintenance, a personal contact, and continuous care — because completion is just the beginning.'
					}
				]
			}
		},
		{
			template: 'testimonials',
			content: {
				kicker: 'CLIENT TESTIMONIALS',
				title: 'In Their Words',
				quotes: [
					{
						quote:
							'We have worked with Jewel Bespoke Build for several years on residential projects and have always found them responsive and timely. Their project management ensures organised workforce coordination, controlled costs, and effective communication.',
						author: 'Malcolm V Leliott'
					},
					{
						quote:
							'Les and Nigel Reilly are the father and son driving force behind their Jewel construction companies. Their commitment to excellence and unwavering dedication to delivering top-notch results have earned them an impeccable reputation.',
						author: 'Lady Jacqueline Smith Maxwell'
					},
					{
						quote:
							'Nigel and his team recently undertook work on our new home, both internally and externally. They were a pleasure to deal with and meticulously thorough. A trustworthy, reliable, and professional company.',
						author: 'Mr. Sullivan'
					},
					{
						quote:
							'All work was executed to a very high standard. I was most impressed by the speed with which any queries were answered and a solution proposed. I was very happy with the results.',
						author: 'Mrs. Carson'
					},
					{
						quote:
							'I can thoroughly recommend Jewel and the experienced team on any project you may have in mind. I was very happy with the management of the project and the way unforeseen issues were overcome.',
						author: 'Mr. Prior'
					},
					{
						quote:
							'It is a pleasure to express how remarkable the work Jewel has completed on our property. We have nothing but accolades for Jewel, as they have proven to be extremely dependable.',
						author: 'Lord Ian McColl'
					},
					{
						quote: 'Excellent standard of work, exceeded expectations. Job done thoroughly and well.',
						author: 'Suzie'
					},
					{
						quote:
							'We have worked in partnership with Jewel for the past 4 years as our main Club Partner and kit sponsor. Jewel have been wonderful supporters of the club.',
						author: 'Julian Clogg, Epsom & Ewell Colts'
					}
				]
			}
		},
		{
			template: 'back-cover',
			content: {
				title: 'Let’s Build Something Exceptional',
				phone: site.phone,
				email: site.email,
				web: 'www.jewelbb.co.uk',
				address: `${site.address.line1}, ${site.address.town}, ${site.address.county} ${site.address.postcode}`,
				services_line:
					'New Build Homes · Full Refurbishments · Extensions · Loft Conversions · Basement Conversions · Accessible Living',
				accreditations_line:
					'Considerate Constructors Scheme | SafeContractor Approved | Best of Houzz Service'
			}
		}
	];
}
