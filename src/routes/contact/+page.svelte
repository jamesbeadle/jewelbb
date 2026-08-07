<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import ContactForm from '$lib/components/ContactForm.svelte';
	import TestimonialCard from '$lib/components/TestimonialCard.svelte';
	import { site } from '$lib/data/site';
	import { testimonials } from '$lib/data/testimonials';

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
		}
	};
</script>

<Seo
	title="Contact Jewel Bespoke Build Ltd | Building Contractors & Bespoke Builders in Surrey"
	description="Request a free quote from Jewel Bespoke Build — bespoke construction, extensions, loft conversions and renovations in Surrey. Call 0208 109 1015 or send us a message."
	jsonLd={jsonLd}
/>

<section class="section page-hero">
	<div class="container">
		<span class="kicker">Let's talk about your project</span>
		<h1>Contact Jewel Bespoke Build Ltd</h1>
		<p class="lede">
			Whether you're interested in a custom home extension, full refurbishment, or unique home
			design, our team is ready to help.
		</p>
	</div>
</section>

<section class="section section--tint">
	<div class="container contact-grid">
		<div class="card contact-form-card">
			<h2>Request a free quote</h2>
			<ContactForm />
		</div>

		<aside class="contact-aside">
			<div class="card contact-details">
				<h2>Contact details</h2>
				<ul>
					<li>
						<span class="contact-details__label">Call us</span>
						<a href={site.phoneHref}>{site.phone}</a>
					</li>
					<li>
						<span class="contact-details__label">Email us</span>
						<a href="mailto:{site.email}">{site.email}</a>
					</li>
					<li>
						<span class="contact-details__label">Visit us</span>
						<span>
							{site.address.line1}, {site.address.town},<br />
							{site.address.county}, {site.address.postcode}
						</span>
					</li>
				</ul>
			</div>
			<TestimonialCard testimonial={testimonials[1]} />
		</aside>
	</div>
</section>

<style>
	.page-hero {
		padding-bottom: clamp(2rem, 5vw, 3.5rem);
	}

	.contact-grid {
		display: grid;
		gap: 2rem;
		align-items: start;
	}

	@media (min-width: 960px) {
		.contact-grid {
			grid-template-columns: 1.4fr 1fr;
		}
	}

	.contact-form-card {
		padding: 2.2rem 2.2rem 2.4rem;
	}

	.contact-form-card h2 {
		margin-bottom: 1.4rem;
	}

	.contact-aside {
		display: grid;
		gap: 2rem;
	}

	.contact-details {
		padding: 2rem 2.2rem;
	}

	.contact-details ul {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: 1.1rem;
	}

	.contact-details li {
		display: grid;
		gap: 0.15rem;
	}

	.contact-details__label {
		font-size: 0.8rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--gold-600);
	}
</style>
