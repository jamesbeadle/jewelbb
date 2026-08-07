<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import CtaBand from '$lib/components/CtaBand.svelte';
	import { images } from '$lib/data/images';
</script>

<Seo
	title="Our Commitment to Community | Jewel Bespoke Build Ltd | Builders in Surrey"
	description="From sponsoring Epsom & Ewell Colts FC to planting 100 trees per project with Ecologi, Jewel Bespoke Build is committed to making a difference locally and globally."
/>

<section class="section page-hero">
	<div class="container">
		<span class="kicker">Beyond the build</span>
		<h1>Our commitment to community</h1>
		<p class="lede">
			As bespoke builders based in Epsom and Ewell, Jewel Bespoke Build Ltd is dedicated to making
			a difference locally and globally. From sustainable practices to community initiatives, we
			work to foster connections, create opportunities, and drive meaningful change.
		</p>
	</div>
</section>

<section class="section section--tint">
	<div class="container grid grid--3 commitments">
		<article class="card commitment">
			<img src={images.badges.eeColts} alt="Epsom & Ewell Colts FC" class="commitment__img" loading="lazy" />
			<h2>Sponsorship of EEFC</h2>
			<p>
				Jewel Bespoke Build Ltd is honoured to sponsor Epsom &amp; Ewell Colts FC, a cornerstone
				of our community with over 1,100 players across 80 teams.
			</p>
		</article>
		<article class="card commitment">
			<span class="commitment__emoji" aria-hidden="true">🤝</span>
			<h2>Charitable causes</h2>
			<p>
				We believe in giving back to our community. Alongside our commitment to sustainability, we
				proudly support various charitable initiatives that make a meaningful difference.
			</p>
		</article>
		<article class="card commitment">
			<span class="commitment__emoji" aria-hidden="true">🌱</span>
			<h2>Ecologi</h2>
			<p>
				We are committed to sustainability, partnering with Ecologi to plant 100 trees for every
				project — helping to offset our carbon footprint.
			</p>
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
