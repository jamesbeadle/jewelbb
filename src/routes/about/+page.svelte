<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import BadgeStrip from '$lib/components/BadgeStrip.svelte';
	import CtaBand from '$lib/components/CtaBand.svelte';
	import { site } from '$lib/data/site';
	import { images } from '$lib/data/images';
	import { lines, pageText, paragraphs } from '$lib/content/pages';

	let { data } = $props();

	const team = $derived(data.team);
	const t = $derived(pageText(data.content, 'about'));
	// "Bold part — rest of the sentence", one per line
	const points = $derived(
		lines(t.approach_points).map((l) => {
			const i = l.indexOf(' — ');
			return i === -1 ? { bold: '', rest: l } : { bold: l.slice(0, i), rest: l.slice(i) };
		})
	);
</script>

<Seo title={t.seo_title} description={t.seo_description} />

<section class="section page-hero">
	<div class="container about-hero">
		<div>
			<span class="kicker">{t.kicker}</span>
			<h1>{t.title}</h1>
			{#each paragraphs(t.intro) as p, i (i)}
				<p class="lede">{p}</p>
			{/each}
		</div>
		<img class="about-hero__img" src={images.aboutTeam} alt="The Jewel Bespoke Build team" />
	</div>
</section>

<section class="section section--tint">
	<div class="container">
		<span class="kicker">{t.team_kicker}</span>
		<h2>{t.team_title}</h2>
		<p class="lede">{t.team_text}</p>
		<div class="grid grid--3 team-grid">
			{#each team as member, i (member.name + i)}
				<article class="card team-card">
					<div class="team-card__head">
						<img class="team-card__photo" src={member.photo} alt={member.name} loading="lazy" />
						<div>
							<h3>{member.name}</h3>
							<p class="team-card__role">{member.role}</p>
						</div>
					</div>
					<p class="team-card__bio">{member.bio}</p>
				</article>
			{/each}
		</div>
	</div>
</section>

<section class="section">
	<div class="container approach">
		<div>
			<span class="kicker">{t.approach_kicker}</span>
			<h2>{t.approach_title}</h2>
			{#each paragraphs(t.approach_text) as p, i (i)}
				<p>{p}</p>
			{/each}
			<div class="approach__actions">
				<a href="/contact" class="btn btn--primary">Contact us today</a>
				<a href={site.brochureUrl} class="btn btn--outline">View our brochure</a>
			</div>
		</div>
		{#if points.length}
			<ul class="card approach__points">
				{#each points as pt, i (i)}
					<li>{#if pt.bold}<strong>{pt.bold}</strong>{/if}{pt.rest}</li>
				{/each}
			</ul>
		{/if}
	</div>
</section>

<section class="section section--tint badges-section">
	<div class="container">
		<BadgeStrip />
	</div>
</section>

<CtaBand />

<style>
	.page-hero {
		padding-bottom: clamp(2rem, 5vw, 3.5rem);
	}

	.about-hero {
		display: grid;
		gap: 2.5rem;
		align-items: center;
	}

	@media (min-width: 920px) {
		.about-hero {
			grid-template-columns: 1.2fr 1fr;
			gap: 4rem;
		}
	}

	.about-hero__img {
		width: 100%;
		aspect-ratio: 4 / 3;
		object-fit: cover;
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-lift);
	}

	.team-grid {
		margin-top: 2.4rem;
	}

	.team-card {
		padding: 1.6rem 1.5rem;
	}

	.team-card__head {
		display: flex;
		align-items: center;
		gap: 0.9rem;
		margin-bottom: 0.9rem;
	}

	.team-card__head h3 {
		margin: 0;
		font-size: 1.15rem;
	}

	.team-card__photo {
		width: 64px;
		height: 64px;
		flex-shrink: 0;
		border-radius: 999px;
		object-fit: cover;
		border: 2px solid var(--gold-300);
	}

	.team-card__role {
		margin: 0;
		color: var(--gold-600);
		font-size: 0.85rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.08em;
	}

	.team-card__bio {
		margin: 0;
		color: var(--ink-600);
		font-size: 0.93rem;
	}

	.approach {
		display: grid;
		gap: 2.5rem;
		align-items: start;
	}

	@media (min-width: 900px) {
		.approach {
			grid-template-columns: 1.3fr 1fr;
		}
	}

	.approach__actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.9rem;
		margin-top: 1.4rem;
	}

	.approach__points {
		list-style: none;
		margin: 0;
		padding: 1.8rem 1.8rem;
		display: grid;
		gap: 1rem;
		color: var(--ink-600);
	}

	.approach__points strong {
		color: var(--ink-900);
	}

	.badges-section {
		padding-block: 2.8rem;
	}
</style>
