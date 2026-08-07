<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import { images } from '$lib/data/images';

	let { data } = $props();
</script>

<Seo
	title="Our Brochure | Jewel Bespoke Build Ltd"
	description="The Jewel Bespoke Build brochure — who we are, our services, our commitment, and how to start your project."
/>

<div class="toolbar">
	<div class="container toolbar__inner">
		<p>Prefer a copy? Use your browser's print dialog to save this brochure as a PDF.</p>
		<button class="btn btn--primary" onclick={() => window.print()}>Print / save as PDF</button>
	</div>
</div>

<article class="brochure">
	{#each data.sections as section, i (section.id)}
		<section class="sheet" class:sheet--cover={i === 0}>
			{#if i === 0}
				<img class="sheet__logo" src={images.logo} alt="Jewel Bespoke Build Ltd" />
			{/if}
			<h2>{section.title}</h2>
			{#if section.subtitle}
				<p class="sheet__subtitle">{section.subtitle}</p>
			{/if}
			{#if section.image_url}
				<img class="sheet__image" src={section.image_url} alt="" loading="lazy" />
			{/if}
			<div class="sheet__body">
				<!-- Rendered at build/request time from admin-controlled markdown -->
				<!-- eslint-disable-next-line svelte/no-at-html-tags -->
				{@html section.html}
			</div>
		</section>
	{/each}
</article>

<style>
	.toolbar {
		background: var(--tint);
		border-bottom: 1px solid var(--line);
	}

	.toolbar__inner {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		flex-wrap: wrap;
		padding-block: 0.9rem;
	}

	.toolbar p {
		margin: 0;
		color: var(--ink-600);
		font-size: 0.95rem;
	}

	.brochure {
		max-width: 800px;
		margin-inline: auto;
		padding: 2.5rem 1.25rem 4rem;
	}

	.sheet {
		background: #fff;
		border: 1px solid var(--line);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-soft);
		padding: clamp(2rem, 5vw, 3.2rem);
		margin-bottom: 1.6rem;
	}

	.sheet--cover {
		text-align: center;
		border-top: 5px solid var(--orange-500);
	}

	.sheet__logo {
		height: 84px;
		width: auto;
		margin: 0 auto 1.6rem;
	}

	.sheet h2 {
		margin-bottom: 0.3rem;
	}

	.sheet__subtitle {
		color: var(--gold-600);
		font-family: var(--font-display);
		font-size: 1.05rem;
		margin-bottom: 1.2rem;
	}

	.sheet__image {
		width: 100%;
		max-height: 340px;
		object-fit: cover;
		border-radius: var(--radius);
		margin-bottom: 1.4rem;
	}

	.sheet__body :global(li) {
		margin-bottom: 0.5em;
	}

	.sheet__body :global(blockquote) {
		border-left: 3px solid var(--gold-500);
		margin: 1.2em 0;
		padding-left: 1em;
		color: var(--ink-600);
	}

	@media print {
		.toolbar {
			display: none;
		}

		/* Hide site chrome around the brochure */
		:global(header),
		:global(footer) {
			display: none !important;
		}

		.brochure {
			padding: 0;
			max-width: none;
		}

		.sheet {
			border: 0;
			box-shadow: none;
			border-radius: 0;
			page-break-after: always;
			margin: 0;
		}
	}
</style>
