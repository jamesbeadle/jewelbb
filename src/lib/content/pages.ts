/**
 * Editable page text. Every field here has a default (the text the site
 * shipped with); /admin → Page text stores only the fields that have been
 * changed, in the `page_content` table. Pages read their text through
 * `pageText()`, so an empty/unreachable database just means the defaults.
 *
 * Client-safe: no server imports.
 */
import { services, type Service } from '$lib/data/services';
import { site } from '$lib/data/site';

export interface ContentField {
	key: string;
	label: string;
	/** `textarea` for longer copy; a blank line starts a new paragraph. */
	type?: 'text' | 'textarea';
	help?: string;
	default: string;
}

export interface ContentPage {
	key: string;
	label: string;
	/** Public URL, for the "view page" link (null for shared blocks). */
	path: string | null;
	blurb: string;
	fields: ContentField[];
}

/** page key → field key → custom text */
export type ContentOverrides = Record<string, Record<string, string>>;

const PARAS = 'A blank line starts a new paragraph.';

function seo(title: string, description: string): ContentField[] {
	return [
		{ key: 'seo_title', label: 'Meta title', help: 'Browser tab & Google result title', default: title },
		{
			key: 'seo_description',
			label: 'Meta description',
			type: 'textarea',
			help: 'The Google snippet — aim for 150–160 characters',
			default: description
		}
	];
}

function hero(kicker: string, title: string, text: string): ContentField[] {
	return [
		{ key: 'kicker', label: 'Small heading', help: 'The gold label above the title', default: kicker },
		{ key: 'title', label: 'Page title', default: title },
		{ key: 'intro', label: 'Intro text', type: 'textarea', help: PARAS, default: text }
	];
}

export const contentPages: ContentPage[] = [
	{
		key: 'home',
		label: 'Homepage',
		path: '/',
		blurb: 'Hero, section headings and intros',
		fields: [
			...seo(
				'Jewel Bespoke Build | Loft Conversions, Home Extensions & Renovations in Surrey',
				site.description
			),
			{ key: 'hero_kicker', label: 'Hero — small heading', default: 'Family-run · Surrey · 65+ years of experience' },
			{ key: 'hero_title', label: 'Hero — title', default: 'Welcome to Jewel Bespoke Build' },
			{
				key: 'hero_text',
				label: 'Hero — text',
				type: 'textarea',
				default:
					'A family run construction company in Surrey, proudly serving clients across the South of England — specialising in high quality loft conversions, tailored home extensions, and comprehensive home renovations.'
			},
			{ key: 'services_kicker', label: 'Services — small heading', default: 'What we do' },
			{ key: 'services_title', label: 'Services — title', default: 'Our services' },
			{
				key: 'services_text',
				label: 'Services — intro',
				type: 'textarea',
				default:
					'From new builds to loft conversions, every project is delivered with meticulous care, craftsmanship, and attention to detail.'
			},
			{ key: 'projects_kicker', label: 'Projects — small heading', default: 'Recent projects' },
			{ key: 'projects_title', label: 'Projects — title', default: 'Built around the way you live' },
			{ key: 'testimonial_kicker', label: 'Testimonial — small heading', default: 'What clients say' },
			{
				key: 'testimonial_title',
				label: 'Testimonial — title',
				default: 'Trusted by homeowners and architects alike'
			},
			{
				key: 'testimonial_text',
				label: 'Testimonial — intro',
				type: 'textarea',
				default:
					'We build long-term relationships through transparency, clear communication and quality that speaks for itself.'
			}
		]
	},
	{
		key: 'about',
		label: 'About',
		path: '/about',
		blurb: 'Our story, team intro and approach',
		fields: [
			...seo(
				'About Jewel Bespoke Build Ltd | House Renovations, Loft Conversions & Home Extensions',
				'Founded by Surrey natives Les and Nigel Reilly, Jewel Bespoke Build is a family-run construction company with over 65 years of experience serving the South of England.'
			),
			...hero(
				'Our story',
				'About Jewel Bespoke Build Ltd',
				'Welcome to Jewel Bespoke Build Ltd, a family-run construction company in Surrey with over 65 years of experience, proudly serving the South of England. Founded by Surrey natives Les and Nigel Reilly, we are a trusted bespoke building company specialising in luxury, custom homes that reflect your unique taste and lifestyle.\n\nAs experts in home renovations, home extensions, and loft conversions in Surrey, our dedicated team — including in-house Project Managers and personal Site Managers — delivers every project with meticulous care, craftsmanship, and attention to detail.'
			),
			{ key: 'team_kicker', label: 'Team — small heading', default: 'The people behind the projects' },
			{ key: 'team_title', label: 'Team — title', default: 'Our team' },
			{
				key: 'team_text',
				label: 'Team — intro',
				type: 'textarea',
				help: 'Team members themselves are edited under Staff.',
				default:
					'We are more than just a group of professionals — we are a family-run bespoke building company united by a shared passion for craftsmanship, innovation, and client satisfaction. We see every project as an opportunity to create something truly unique, tailored to the specific vision and lifestyle of our clients.'
			},
			{ key: 'approach_kicker', label: 'Approach — small heading', default: 'How we work' },
			{ key: 'approach_title', label: 'Approach — title', default: 'Our approach' },
			{
				key: 'approach_text',
				label: 'Approach — text',
				type: 'textarea',
				help: PARAS,
				default:
					'At Jewel Bespoke Build Ltd, a leading construction company in Surrey, we deliver exceptional quality across all projects — from loft conversions and home extensions to full home renovations. Using advanced project management software and clear weekly updates, our experienced project and site managers ensure transparency, precision, and top-tier craftsmanship.\n\nAs a trusted bespoke building company, we expertly manage budgets, timelines, and challenges to deliver on time and within budget. Contact us today to work with dedicated bespoke contractors in Surrey committed to bringing your vision to life.'
			},
			{
				key: 'approach_points',
				label: 'Approach — key points',
				type: 'textarea',
				help: 'One point per line. Text before " — " is shown in bold.',
				default:
					'Weekly updates — clear communication through every stage of the build.\nIn-house project managers — one accountable team from start to finish.\nTransparent budgets — helpful cost information throughout the process.\nHealth & safety first — standards consistently maintained on every site.'
			}
		]
	},
	{
		key: 'services',
		label: 'Services',
		path: '/services',
		blurb: 'Intro plus the title and description of each service',
		fields: [
			...seo(
				'Building & Bespoke Construction Services | Jewel Bespoke Build Ltd in Surrey',
				'New build homes, full house refurbishments, extensions, loft conversions, basement conversions and accessible living — bespoke construction services in Surrey.'
			),
			...hero(
				'What we do',
				'Our services',
				"Discover the comprehensive services offered by Jewel Bespoke Build Ltd, your trusted bespoke contractors in Surrey. Whether you're looking for modern living spaces, luxury finishes, or innovative home improvements, we provide personalised solutions that enhance your living experience."
			),
			...services.flatMap((s, i): ContentField[] => [
				{ key: `svc_${s.slug}_title`, label: `Service ${i + 1} — title`, default: s.title },
				{
					key: `svc_${s.slug}_desc`,
					label: `Service ${i + 1} — description`,
					type: 'textarea',
					help: 'Also shown (shortened) on the homepage.',
					default: s.description
				}
			])
		]
	},
	{
		key: 'portfolio',
		label: 'Portfolio',
		path: '/portfolio',
		blurb: 'The header above the project grid',
		fields: [
			...seo(
				'Our Portfolio | Jewel Bespoke Build Ltd | Custom Builds & Home Renovations in Surrey',
				'Explore recently completed projects by Jewel Bespoke Build — loft conversions, home extensions, accessible living and full renovations across Surrey and the South of England.'
			),
			...hero(
				'Our work',
				'Our portfolio',
				'Explore the portfolio of Jewel Bespoke Build Ltd, a trusted bespoke building company in Surrey. Discover exceptional craftsmanship and innovative design in our recently completed projects. Each build showcases the quality and care we bring to every project — turning your vision into reality.'
			),
			{ key: 'filter_all', label: 'Filter button — all', default: 'All projects' },
			{ key: 'filter_accessible', label: 'Filter button — accessible', default: 'Accessible living' }
		]
	},
	{
		key: 'ourcommunity',
		label: 'Our community',
		path: '/ourcommunity',
		blurb: 'Intro and the three commitment cards',
		fields: [
			...seo(
				'Our Commitment to Community | Jewel Bespoke Build Ltd | Builders in Surrey',
				'From sponsoring Epsom & Ewell Colts FC to planting 100 trees per project with Ecologi, Jewel Bespoke Build is committed to making a difference locally and globally.'
			),
			...hero(
				'Beyond the build',
				'Our commitment to community',
				'As bespoke builders based in Epsom and Ewell, Jewel Bespoke Build Ltd is dedicated to making a difference locally and globally. From sustainable practices to community initiatives, we work to foster connections, create opportunities, and drive meaningful change.'
			),
			{ key: 'card1_title', label: 'Card 1 — title', default: 'Sponsorship of EEFC' },
			{
				key: 'card1_text',
				label: 'Card 1 — text',
				type: 'textarea',
				default:
					'Jewel Bespoke Build Ltd is honoured to sponsor Epsom & Ewell Colts FC, a cornerstone of our community with over 1,100 players across 80 teams.'
			},
			{ key: 'card2_title', label: 'Card 2 — title', default: 'Charitable causes' },
			{
				key: 'card2_text',
				label: 'Card 2 — text',
				type: 'textarea',
				default:
					'We believe in giving back to our community. Alongside our commitment to sustainability, we proudly support various charitable initiatives that make a meaningful difference.'
			},
			{ key: 'card3_title', label: 'Card 3 — title', default: 'Ecologi' },
			{
				key: 'card3_text',
				label: 'Card 3 — text',
				type: 'textarea',
				default:
					'We are committed to sustainability, partnering with Ecologi to plant 100 trees for every project — helping to offset our carbon footprint.'
			}
		]
	},
	{
		key: 'contact',
		label: 'Contact',
		path: '/contact',
		blurb: 'Intro and form heading',
		fields: [
			...seo(
				'Contact Jewel Bespoke Build Ltd | Building Contractors & Bespoke Builders in Surrey',
				'Request a free quote from Jewel Bespoke Build — bespoke construction, extensions, loft conversions and renovations in Surrey. Call 0208 109 1015 or send us a message.'
			),
			...hero(
				"Let's talk about your project",
				'Contact Jewel Bespoke Build Ltd',
				"Whether you're interested in a custom home extension, full refurbishment, or unique home design, our team is ready to help."
			),
			{ key: 'form_title', label: 'Form heading', default: 'Request a free quote' },
			{ key: 'details_title', label: 'Contact details heading', default: 'Contact details' }
		]
	},
	{
		key: 'blog',
		label: 'News',
		path: '/blog',
		blurb: 'The header above the list of posts',
		fields: [
			...seo(
				'News & Insights | Jewel Bespoke Build Ltd',
				'News, project stories and expert guidance from Jewel Bespoke Build — bespoke construction, renovations and community projects in Surrey.'
			),
			...hero(
				'News & insights',
				'The Jewel journal',
				'Project stories, company news and practical guidance from our team of Surrey builders.'
			)
		]
	},
	{
		key: 'shared',
		label: 'Call-to-action band',
		path: null,
		blurb: 'The “Build your ideal home…” box at the bottom of most pages',
		fields: [
			{
				key: 'cta_title',
				label: 'Title',
				default: 'Build your ideal home that matches your vision and lifestyle.'
			},
			{
				key: 'cta_text',
				label: 'Text',
				type: 'textarea',
				default:
					'Let us turn your dream into a reality. Tell us about your project and we will be in touch.'
			}
		]
	}
];

export function getContentPage(key: string): ContentPage | undefined {
	return contentPages.find((p) => p.key === key);
}

/** Defaults for a page, with any saved overrides applied. */
export function pageText(
	overrides: ContentOverrides | undefined,
	key: string
): Record<string, string> {
	const page = getContentPage(key);
	const saved = overrides?.[key] ?? {};
	const out: Record<string, string> = {};
	for (const f of page?.fields ?? []) {
		out[f.key] = typeof saved[f.key] === 'string' ? saved[f.key] : f.default;
	}
	return out;
}

/** The service list with any edited titles/descriptions applied. */
export function servicesWithText(overrides: ContentOverrides | undefined): Service[] {
	const t = pageText(overrides, 'services');
	return services.map((s) => ({
		...s,
		title: t[`svc_${s.slug}_title`] || s.title,
		description: t[`svc_${s.slug}_desc`] || s.description
	}));
}

/** Split textarea copy into paragraphs on blank lines. */
export function paragraphs(text: string): string[] {
	return text
		.split(/\n\s*\n/)
		.map((p) => p.trim())
		.filter(Boolean);
}

/** Non-empty lines of a textarea (for bullet lists). */
export function lines(text: string): string[] {
	return text
		.split('\n')
		.map((l) => l.trim())
		.filter(Boolean);
}
