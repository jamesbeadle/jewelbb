<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import CtaBand from '$lib/components/CtaBand.svelte';
	import { projects } from '$lib/data/projects';

	const live = projects.filter((p) => p.gallery.length > 0);

	let filter: 'all' | 'accessible' = $state('all');

	const shown = $derived(filter === 'all' ? live : live.filter((p) => p.accessible));
</script>

<Seo
	title="Our Portfolio | Jewel Bespoke Build Ltd | Custom Builds & Home Renovations in Surrey"
	description="Explore recently completed projects by Jewel Bespoke Build — loft conversions, home extensions, accessible living and full renovations across Surrey and the South of England."
/>

<section class="section page-hero">
	<div class="container">
		<span class="kicker">Our work</span>
		<h1>Our portfolio</h1>
		<p class="lede">
			Explore the portfolio of Jewel Bespoke Build Ltd, a trusted bespoke building company in
			Surrey. Discover exceptional craftsmanship and innovative design in our recently completed
			projects. Each build showcases the quality and care we bring to every project — turning your
			vision into reality.
		</p>
		<div class="filters" role="group" aria-label="Filter projects">
			<button
				class="filters__btn"
				class:filters__btn--active={filter === 'all'}
				onclick={() => (filter = 'all')}>All projects</button
			>
			<button
				class="filters__btn"
				class:filters__btn--active={filter === 'accessible'}
				onclick={() => (filter = 'accessible')}>Accessible living</button
			>
		</div>
	</div>
</section>

<section class="section section--tint">
	<div class="container">
		<div class="grid grid--3 portfolio-grid">
			{#each shown as project (project.slug)}
				<a class="card project" href="/{project.slug}">
					<img src={project.gallery[0]} alt="{project.name} project" loading="lazy" />
					<div class="project__body">
						<h2>{project.name}</h2>
						<p>{project.subtitle}</p>
						{#if project.accessible}
							<span class="project__tag">Accessible living</span>
						{/if}
					</div>
				</a>
			{/each}
		</div>
	</div>
</section>

<CtaBand />

<style>
	.page-hero {
		padding-bottom: clamp(2rem, 5vw, 3.5rem);
	}

	.filters {
		display: flex;
		gap: 0.6rem;
		margin-top: 1.6rem;
	}

	.filters__btn {
		font: inherit;
		font-weight: 600;
		font-size: 0.92rem;
		padding: 0.5rem 1.1rem;
		border-radius: 999px;
		border: 1.5px solid var(--line);
		background: #fff;
		color: var(--ink-600);
		cursor: pointer;
	}

	.filters__btn--active {
		border-color: var(--ink-900);
		background: var(--ink-900);
		color: #fff;
	}

	.portfolio-grid {
		gap: 1.5rem;
	}

	.project {
		text-decoration: none;
		overflow: hidden;
		transition: transform 0.18s ease, box-shadow 0.18s ease;
	}

	.project:hover {
		transform: translateY(-3px);
		box-shadow: var(--shadow-lift);
	}

	.project img {
		aspect-ratio: 3 / 2;
		width: 100%;
		object-fit: cover;
	}

	.project__body {
		padding: 1.2rem 1.4rem 1.4rem;
	}

	.project__body h2 {
		font-size: 1.3rem;
		margin-bottom: 0.3rem;
	}

	.project__body p {
		margin: 0;
		color: var(--ink-600);
		font-size: 0.92rem;
	}

	.project__tag {
		display: inline-block;
		margin-top: 0.7rem;
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--gold-600);
		background: var(--orange-100);
		border-radius: 999px;
		padding: 0.25rem 0.7rem;
	}
</style>
