<script lang="ts">
	import { page } from '$app/state';
	import { pageText, type ContentOverrides } from '$lib/content/pages';

	interface Props {
		title?: string;
		text?: string;
	}

	let props: Props = $props();

	// Defaults come from /admin → Page text → Call-to-action band.
	const shared = $derived(pageText(page.data.content as ContentOverrides | undefined, 'shared'));
	const title = $derived(props.title ?? shared.cta_title);
	const text = $derived(props.text ?? shared.cta_text);
</script>

<section class="section cta">
	<div class="container">
		<div class="card cta__inner">
			<div>
				<h2>{title}</h2>
				<p class="lede">{text}</p>
			</div>
			<div class="cta__actions">
				<a href="/contact" class="btn btn--primary">Request a free quote</a>
				<a href="/portfolio" class="btn btn--outline">View our work</a>
			</div>
		</div>
	</div>
</section>

<style>
	.cta {
		padding-block: clamp(2.5rem, 6vw, 4.5rem);
	}

	.cta__inner {
		display: grid;
		gap: 2rem;
		align-items: center;
		padding: clamp(2rem, 5vw, 3.2rem);
		border-top: 4px solid var(--orange-500);
	}

	@media (min-width: 860px) {
		.cta__inner {
			grid-template-columns: 1.6fr 1fr;
		}

		.cta__actions {
			justify-self: end;
		}
	}

	.cta__inner h2 {
		margin-bottom: 0.5rem;
	}

	.cta__inner .lede {
		margin-bottom: 0;
	}

	.cta__actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.9rem;
	}
</style>
