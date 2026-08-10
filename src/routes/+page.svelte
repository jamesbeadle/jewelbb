<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import BadgeStrip from '$lib/components/BadgeStrip.svelte';
	import TestimonialCard from '$lib/components/TestimonialCard.svelte';
	import CtaBand from '$lib/components/CtaBand.svelte';
	import { site } from '$lib/data/site';
	import { images } from '$lib/data/images';
	import { services } from '$lib/data/services';
	import { testimonials } from '$lib/data/testimonials';

	let { data } = $props();

	const featured = $derived(data.featured);

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'HomeAndConstructionBusiness',
		name: site.name,
		url: site.url,
		telephone: '+44 208 109 1015',
		email: site.email,
		address: {
			'@type': 'PostalAddress',
			streetAddress: site.address.line1,
			addressLocality: site.address.town,
			addressRegion: site.address.county,
			postalCode: site.address.postcode,
			addressCountry: 'GB'
		},
		areaServed: 'South of England',
		sameAs: Object.values(site.social)
	};
</script>

<Seo
	title="Jewel Bespoke Build | Loft Conversions, Home Extensions & Renovations in Surrey"
	description={site.description}
	image={images.homeHero}
	jsonLd={jsonLd}
/>

<!-- Hero ------------------------------------------------------------------ -->
<section class="hero">
	<div class="container hero__grid">
		<div class="hero__content">
			<span class="kicker">Family-run · Surrey · 65+ years of experience</span>
			<h1>Welcome to Jewel Bespoke Build</h1>
			<p>
				A family run construction company in Surrey, proudly serving clients across the South of
				England — specialising in high quality loft conversions, tailored home extensions, and
				comprehensive home renovations.
			</p>
			<div class="hero__actions">
				<a href="/contact" class="btn btn--primary">Request a free quote</a>
				<a href="/about" class="btn btn--outline">About us</a>
			</div>
		</div>
		<img class="hero__img" src={images.homeHero} alt="Recently completed Jewel Bespoke Build project" />
	</div>
</section>

<!-- Services -------------------------------------------------------------- -->
<section class="section">
	<div class="container">
		<span class="kicker">What we do</span>
		<h2>Our services</h2>
		<p class="lede">
			From new builds to loft conversions, every project is delivered with meticulous care,
			craftsmanship, and attention to detail.
		</p>
		<div class="grid grid--3 services-grid">
			{#each services as service (service.slug)}
				<a class="card service-card" href="/services#{service.slug}">
					<h3>{service.title}</h3>
					<p>{service.description.slice(0, 110)}…</p>
					<span class="service-card__more">Learn more →</span>
				</a>
			{/each}
		</div>
	</div>
</section>

<!-- Featured projects ------------------------------------------------------ -->
<section class="section section--tint">
	<div class="container">
		<span class="kicker">Recent projects</span>
		<h2>Built around the way you live</h2>
		<div class="grid grid--3 featured-grid">
			{#each featured as project (project.slug)}
				<a class="card featured" href="/{project.slug}">
					<img src={project.gallery[0]} alt="{project.name} project" loading="lazy" />
					<div class="featured__body">
						<h3>{project.name}</h3>
						<p>{project.subtitle}</p>
					</div>
				</a>
			{/each}
		</div>
		<div class="featured-cta">
			<a href="/portfolio" class="btn btn--outline">View the full portfolio</a>
		</div>
	</div>
</section>

<!-- Testimonial ------------------------------------------------------------ -->
<section class="section">
	<div class="container testimonial-wrap">
		<div>
			<span class="kicker">What clients say</span>
			<h2>Trusted by homeowners and architects alike</h2>
			<p class="lede">
				We build long-term relationships through transparency, clear communication and quality
				that speaks for itself.
			</p>
		</div>
		<TestimonialCard testimonial={testimonials[0]} />
	</div>
</section>

<!-- Badges ----------------------------------------------------------------- -->
<section class="section section--tint badges-section">
	<div class="container">
		<BadgeStrip />
	</div>
</section>

<CtaBand />

<style>
	.hero {
		background: #fff;
		padding-block: clamp(3rem, 7vw, 5.5rem);
	}

	.hero__grid {
		display: grid;
		gap: 2.5rem;
		align-items: center;
	}

	@media (min-width: 920px) {
		.hero__grid {
			grid-template-columns: 1.05fr 1fr;
			gap: 4rem;
		}
	}

	.hero__content p {
		font-size: 1.15rem;
		color: var(--ink-600);
		margin-bottom: 1.8rem;
	}

	.hero__img {
		width: 100%;
		aspect-ratio: 4 / 3;
		object-fit: cover;
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-lift);
	}

	.hero__actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.9rem;
	}

	.services-grid {
		margin-top: 2.4rem;
	}

	.service-card {
		padding: 1.8rem 1.7rem 1.5rem;
		text-decoration: none;
		display: flex;
		flex-direction: column;
		transition: transform 0.18s ease, box-shadow 0.18s ease;
	}

	.service-card:hover {
		transform: translateY(-3px);
		box-shadow: var(--shadow-lift);
	}

	.service-card p {
		color: var(--ink-600);
		font-size: 0.95rem;
		flex: 1;
	}

	.service-card__more {
		font-weight: 600;
		font-size: 0.9rem;
		color: var(--gold-600);
	}

	.featured-grid {
		margin-top: 2.4rem;
	}

	.featured {
		text-decoration: none;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		transition: transform 0.18s ease, box-shadow 0.18s ease;
	}

	.featured:hover {
		transform: translateY(-3px);
		box-shadow: var(--shadow-lift);
	}

	.featured img {
		aspect-ratio: 3 / 2;
		width: 100%;
		object-fit: cover;
	}

	.featured__body {
		padding: 1.2rem 1.4rem 1.3rem;
	}

	.featured__body p {
		margin: 0;
		color: var(--ink-600);
		font-size: 0.92rem;
	}

	.featured-cta {
		margin-top: 2.2rem;
		text-align: center;
	}

	.testimonial-wrap {
		display: grid;
		gap: 2.5rem;
		align-items: center;
	}

	@media (min-width: 900px) {
		.testimonial-wrap {
			grid-template-columns: 1fr 1.1fr;
		}
	}

	.badges-section {
		padding-block: 2.8rem;
	}
</style>
