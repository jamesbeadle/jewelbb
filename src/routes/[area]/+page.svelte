<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import Gallery from '$lib/components/Gallery.svelte';
	import CtaBand from '$lib/components/CtaBand.svelte';

	let { data } = $props();

	const project = $derived(data.project);
	const crossLinked = $derived(data.crossLinked);
</script>

<Seo
	title={project.metaTitle}
	description={project.metaDescription}
	image={project.gallery[0]}
/>

<section class="section page-hero">
	<div class="container">
		<nav class="crumbs" aria-label="Breadcrumb">
			<a href="/portfolio">Portfolio</a>
			<span aria-hidden="true">/</span>
			<span aria-current="page">{project.name}</span>
		</nav>
		<h1>{project.name}</h1>
		<p class="subtitle">‘{project.subtitle}’</p>
		{#if project.accessible}
			<span class="tag">Accessible living project</span>
		{/if}
		<p class="lede">{project.description}</p>
	</div>
</section>

{#if project.gallery.length > 0}
	<section class="section section--tint">
		<div class="container">
			<Gallery images={project.gallery} altPrefix="{project.name} project photo" />
		</div>
	</section>
{/if}

{#if crossLinked}
	<section class="section">
		<div class="container">
			<div class="card next">
				<div>
					<span class="kicker">Like what you see?</span>
					<h2>View our {crossLinked.accessible && project.accessible ? 'other accessible living project' : 'other project'} in {crossLinked.name}</h2>
				</div>
				<a href="/{crossLinked.slug}" class="btn btn--outline">Visit the {crossLinked.name} project</a>
			</div>
		</div>
	</section>
{/if}

<CtaBand />

<style>
	.page-hero {
		padding-bottom: clamp(2rem, 5vw, 3.5rem);
	}

	.crumbs {
		display: flex;
		gap: 0.6rem;
		font-size: 0.9rem;
		margin-bottom: 1.2rem;
		color: var(--ink-400);
	}

	.crumbs a {
		color: var(--ink-600);
	}

	.subtitle {
		font-family: var(--font-display);
		font-size: 1.3rem;
		color: var(--gold-600);
		margin-bottom: 0.8rem;
	}

	.tag {
		display: inline-block;
		margin-bottom: 1rem;
		font-size: 0.78rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--gold-600);
		background: var(--orange-100);
		border-radius: 999px;
		padding: 0.3rem 0.8rem;
	}

	.next {
		display: grid;
		gap: 1.5rem;
		align-items: center;
		padding: 2.2rem 2.4rem;
	}

	@media (min-width: 820px) {
		.next {
			grid-template-columns: 1fr auto;
		}
	}

	.next h2 {
		margin-bottom: 0;
	}
</style>
