<script lang="ts">
	/**
	 * Crossfading photo slideshow for the homepage hero. Advances every few
	 * seconds; pauses while hovered/focused or the tab is hidden, and doesn't
	 * auto-advance at all for visitors who prefer reduced motion.
	 */
	interface Slide {
		src: string;
		alt: string;
	}

	let { slides, interval = 5500 }: { slides: Slide[]; interval?: number } = $props();

	let current = $state(0);
	let paused = $state(false);
	let reducedMotion = $state(false);

	$effect(() => {
		const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
		reducedMotion = mq.matches;
		const onChange = () => (reducedMotion = mq.matches);
		mq.addEventListener('change', onChange);
		return () => mq.removeEventListener('change', onChange);
	});

	$effect(() => {
		if (slides.length < 2 || paused || reducedMotion) return;
		const timer = setInterval(() => {
			if (!document.hidden) current = (current + 1) % slides.length;
		}, interval);
		return () => clearInterval(timer);
	});

	function go(i: number) {
		current = (i + slides.length) % slides.length;
	}
</script>

{#if slides.length === 1}
	<img class="slides__single" src={slides[0].src} alt={slides[0].alt} />
{:else}
	<div
		class="slides"
		role="region"
		aria-roledescription="carousel"
		aria-label="Recent project photos"
		onmouseenter={() => (paused = true)}
		onmouseleave={() => (paused = false)}
		onfocusin={() => (paused = true)}
		onfocusout={() => (paused = false)}
	>
		{#each slides as slide, i (slide.src + i)}
			<img
				class="slides__img"
				class:slides__img--active={i === current}
				src={slide.src}
				alt={slide.alt}
				loading={i === 0 ? 'eager' : 'lazy'}
				aria-hidden={i !== current}
			/>
		{/each}

		<button class="slides__arrow slides__arrow--prev" onclick={() => go(current - 1)} aria-label="Previous photo">‹</button>
		<button class="slides__arrow slides__arrow--next" onclick={() => go(current + 1)} aria-label="Next photo">›</button>

		<div class="slides__dots">
			{#each slides as _, i (i)}
				<button
					class="slides__dot"
					class:slides__dot--active={i === current}
					onclick={() => go(i)}
					aria-label="Show photo {i + 1} of {slides.length}"
					aria-current={i === current ? 'true' : undefined}
				></button>
			{/each}
		</div>
	</div>
{/if}

<style>
	.slides,
	.slides__single {
		width: 100%;
		aspect-ratio: 4 / 3;
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-lift);
	}

	.slides__single {
		object-fit: cover;
	}

	.slides {
		position: relative;
		overflow: hidden;
		background: var(--tint);
	}

	.slides__img {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		opacity: 0;
		transition: opacity 1s ease;
	}

	.slides__img--active {
		opacity: 1;
	}

	.slides__arrow {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		width: 40px;
		height: 40px;
		border-radius: 999px;
		border: 0;
		background: rgba(255, 255, 255, 0.85);
		color: var(--ink-900);
		font-size: 1.5rem;
		line-height: 1;
		cursor: pointer;
		opacity: 0;
		transition: opacity 0.2s ease;
	}

	.slides:hover .slides__arrow,
	.slides__arrow:focus-visible {
		opacity: 1;
	}

	.slides__arrow--prev {
		left: 0.8rem;
	}

	.slides__arrow--next {
		right: 0.8rem;
	}

	.slides__dots {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0.9rem;
		display: flex;
		justify-content: center;
		gap: 0.45rem;
	}

	.slides__dot {
		width: 9px;
		height: 9px;
		padding: 0;
		border-radius: 999px;
		border: 0;
		background: rgba(255, 255, 255, 0.6);
		box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.15);
		cursor: pointer;
		transition:
			width 0.25s ease,
			background-color 0.25s ease;
	}

	.slides__dot--active {
		width: 24px;
		background: #fff;
	}

	@media (prefers-reduced-motion: reduce) {
		.slides__img,
		.slides__dot {
			transition: none;
		}
	}

	@media (hover: none) {
		.slides__arrow {
			display: none;
		}
	}
</style>
