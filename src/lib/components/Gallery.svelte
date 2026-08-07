<script lang="ts">
	interface Props {
		images: string[];
		altPrefix?: string;
	}

	let { images, altPrefix = 'Project photo' }: Props = $props();

	let lightboxIndex: number | null = $state(null);

	function open(i: number) {
		lightboxIndex = i;
	}

	function closeLightbox() {
		lightboxIndex = null;
	}

	function step(delta: number) {
		if (lightboxIndex === null) return;
		lightboxIndex = (lightboxIndex + delta + images.length) % images.length;
	}

	function onKeydown(e: KeyboardEvent) {
		if (lightboxIndex === null) return;
		if (e.key === 'Escape') closeLightbox();
		if (e.key === 'ArrowRight') step(1);
		if (e.key === 'ArrowLeft') step(-1);
	}
</script>

<svelte:window onkeydown={onKeydown} />

<div class="gallery">
	{#each images as src, i (src)}
		<button class="gallery__item" onclick={() => open(i)} aria-label="Enlarge {altPrefix} {i + 1}">
			<img {src} alt="{altPrefix} {i + 1}" loading={i < 3 ? 'eager' : 'lazy'} />
		</button>
	{/each}
</div>

{#if lightboxIndex !== null}
	<div
		class="lightbox"
		role="dialog"
		aria-modal="true"
		aria-label="Image viewer"
		tabindex="-1"
		onclick={(e) => {
			if (e.target === e.currentTarget) closeLightbox();
		}}
	>
		<img src={images[lightboxIndex]} alt="{altPrefix} {lightboxIndex + 1} (enlarged)" />
		<button class="lightbox__close" onclick={closeLightbox} aria-label="Close image viewer">×</button>
		{#if images.length > 1}
			<button class="lightbox__nav lightbox__nav--prev" onclick={() => step(-1)} aria-label="Previous image">‹</button>
			<button class="lightbox__nav lightbox__nav--next" onclick={() => step(1)} aria-label="Next image">›</button>
		{/if}
	</div>
{/if}

<style>
	.gallery {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
		gap: 0.9rem;
	}

	.gallery__item {
		padding: 0;
		border: 0;
		background: none;
		cursor: zoom-in;
		border-radius: var(--radius);
		overflow: hidden;
		aspect-ratio: 4 / 3;
	}

	.gallery__item img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.35s ease;
	}

	.gallery__item:hover img {
		transform: scale(1.04);
	}

	.lightbox {
		position: fixed;
		inset: 0;
		z-index: 100;
		background: rgba(13, 20, 30, 0.92);
		display: grid;
		place-items: center;
		padding: 3rem 1rem;
	}

	.lightbox img {
		max-width: min(1100px, 94vw);
		max-height: 84vh;
		object-fit: contain;
		border-radius: var(--radius);
	}

	.lightbox__close,
	.lightbox__nav {
		position: fixed;
		background: rgba(255, 255, 255, 0.12);
		color: #fff;
		border: 0;
		border-radius: 999px;
		width: 46px;
		height: 46px;
		font-size: 1.6rem;
		line-height: 1;
		cursor: pointer;
		display: grid;
		place-items: center;
	}

	.lightbox__close:hover,
	.lightbox__nav:hover {
		background: rgba(255, 255, 255, 0.25);
	}

	.lightbox__close {
		top: 1rem;
		right: 1rem;
	}

	.lightbox__nav {
		top: 50%;
		transform: translateY(-50%);
	}

	.lightbox__nav--prev {
		left: 1rem;
	}

	.lightbox__nav--next {
		right: 1rem;
	}
</style>
