<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import CtaBand from '$lib/components/CtaBand.svelte';
	import { services } from '$lib/data/services';
</script>

<Seo
	title="Building & Bespoke Construction Services | Jewel Bespoke Build Ltd in Surrey"
	description="New build homes, full house refurbishments, extensions, loft conversions, basement conversions and accessible living — bespoke construction services in Surrey."
/>

<section class="section page-hero">
	<div class="container">
		<span class="kicker">What we do</span>
		<h1>Our services</h1>
		<p class="lede">
			Discover the comprehensive services offered by Jewel Bespoke Build Ltd, your trusted bespoke
			contractors in Surrey. Whether you're looking for modern living spaces, luxury finishes, or
			innovative home improvements, we provide personalised solutions that enhance your living
			experience.
		</p>
	</div>
</section>

<section class="section section--tint">
	<div class="container">
		<div class="grid grid--2 service-list">
			{#each services as service, i (service.slug)}
				<article class="card service" id={service.slug}>
					<span class="service__num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
					<h2>{service.title}</h2>
					<p>{service.description}</p>
					<a href="/contact" class="service__link">Discuss your {service.title.toLowerCase()} →</a>
				</article>
			{/each}
		</div>
	</div>
</section>

<CtaBand />

<style>
	.page-hero {
		padding-bottom: clamp(2rem, 5vw, 3.5rem);
	}

	.service-list {
		gap: 1.5rem;
	}

	.service {
		padding: 2rem 2rem 1.8rem;
		scroll-margin-top: 100px;
	}

	.service__num {
		font-family: var(--font-display);
		font-size: 1rem;
		color: var(--gold-500);
		letter-spacing: 0.1em;
	}

	.service h2 {
		font-size: 1.5rem;
		margin: 0.4rem 0 0.6rem;
	}

	.service p {
		color: var(--ink-600);
		margin-bottom: 1.1rem;
	}

	.service__link {
		font-weight: 600;
		font-size: 0.95rem;
		text-decoration: none;
		color: var(--gold-600);
	}

	.service__link:hover {
		text-decoration: underline;
	}
</style>
