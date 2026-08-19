<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import BrochureDoc from '$lib/components/brochure/BrochureDoc.svelte';

	let { data } = $props();

	// A4 pages are 210mm wide (~794 CSS px); scale them to fit the viewport.
	const PAGE_W = 794;
	const PAGE_H = 1123;
	let wrapWidth = $state(0);
	const scale = $derived(wrapWidth > 0 ? Math.min(1, wrapWidth / PAGE_W) : 1);
	const pageCount = $derived(data.doc.pages.length);
</script>

<Seo
	title="Our Brochure | Jewel Bespoke Build Ltd"
	description="The Jewel Bespoke Build brochure — who we are, our services, selected projects, and how to start your own."
/>

<div class="toolbar">
	<div class="container toolbar__inner">
		<p>The Jewel Bespoke Build brochure — {pageCount} pages.</p>
		<a class="btn btn--primary" href="/brochure/pdf" data-sveltekit-preload-data="off">
			Download PDF
		</a>
	</div>
</div>

<div class="viewer" bind:clientWidth={wrapWidth}>
	<div
		class="viewer__scaler"
		style="transform: scale({scale}); height: {pageCount * (PAGE_H + 24) * scale}px;"
	>
		<BrochureDoc pages={data.doc.pages} />
	</div>
</div>

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

	.viewer {
		max-width: 850px;
		margin-inline: auto;
		padding: 2rem 1rem 3.5rem;
	}

	.viewer__scaler {
		transform-origin: top left;
	}

	.viewer :global(.bpage) {
		margin-bottom: 24px;
		box-shadow: 0 8px 30px rgba(35, 31, 32, 0.16);
	}
</style>
