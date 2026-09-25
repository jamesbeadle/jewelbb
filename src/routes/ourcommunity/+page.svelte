<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import CtaBand from '$lib/components/CtaBand.svelte';
	import { images } from '$lib/data/images';
	import { pageText, paragraphs } from '$lib/content/pages';

	let { data } = $props();

	const t = $derived(pageText(data.content, 'ourcommunity'));
</script>

<Seo title={t.seo_title} description={t.seo_description} />

<section class="section page-hero">
	<div class="container">
		<span class="kicker">{t.kicker}</span>
		<h1>{t.title}</h1>
		{#each paragraphs(t.intro) as p, i (i)}
			<p class="lede">{p}</p>
		{/each}
	</div>
</section>

<section class="section section--tint">
	<div class="container grid grid--3 commitments">
		<article class="card commitment">
			<img src={images.badges.eeColts} alt="Epsom & Ewell Colts FC" class="commitment__img" loading="lazy" />
			<h2>{t.card1_title}</h2>
			<p>{t.card1_text}</p>
		</article>
		<article class="card commitment">
			<span class="commitment__emoji" aria-hidden="true">🤝</span>
			<h2>{t.card2_title}</h2>
			<p>{t.card2_text}</p>
		</article>
		<article class="card commitment">
			<span class="commitment__emoji" aria-hidden="true">🌱</span>
			<h2>{t.card3_title}</h2>
			<p>{t.card3_text}</p>
		</article>
	</div>
</section>

<CtaBand />

<style>
	.page-hero {
		padding-bottom: clamp(2rem, 5vw, 3.5rem);
	}

	.commitments {
		gap: 1.5rem;
	}

	.commitment {
		padding: 2rem 1.9rem;
		text-align: left;
	}

	.commitment__img {
		height: 84px;
		width: auto;
		object-fit: contain;
		margin-bottom: 1rem;
	}

	.commitment__emoji {
		display: grid;
		place-items: center;
		width: 84px;
		height: 84px;
		font-size: 2.4rem;
		background: var(--tint);
		border-radius: 18px;
		margin-bottom: 1rem;
	}

	.commitment h2 {
		font-size: 1.35rem;
	}

	.commitment p {
		color: var(--ink-600);
		margin: 0;
	}
</style>
