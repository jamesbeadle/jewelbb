<script lang="ts">
	import type { Testimonial } from '$lib/data/testimonials';

	let { testimonial }: { testimonial: Testimonial } = $props();
</script>

<figure class="card quote">
	<div class="quote__mark" aria-hidden="true">“</div>
	<blockquote>{testimonial.quote}</blockquote>
	<figcaption>
		<strong>{testimonial.author}</strong>
		<span>{testimonial.context}</span>
	</figcaption>
</figure>

<style>
	.quote {
		padding: 2.2rem 2.4rem 2rem;
		position: relative;
	}

	.quote__mark {
		font-family: var(--font-display);
		font-size: 4rem;
		line-height: 1;
		color: var(--gold-500);
		margin-bottom: 0.4rem;
	}

	blockquote {
		margin: 0 0 1.4rem;
		font-size: 1.05rem;
		color: var(--ink-600);
	}

	figcaption {
		display: flex;
		flex-direction: column;
		gap: 0.1rem;
	}

	figcaption strong {
		color: var(--ink-900);
	}

	figcaption span {
		font-size: 0.9rem;
		color: var(--ink-400);
	}
</style>
