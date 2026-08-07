<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import BadgeStrip from '$lib/components/BadgeStrip.svelte';
	import CtaBand from '$lib/components/CtaBand.svelte';
	import { site } from '$lib/data/site';
	import { team } from '$lib/data/team';
	import { images } from '$lib/data/images';
</script>

<Seo
	title="About Jewel Bespoke Build Ltd | House Renovations, Loft Conversions & Home Extensions"
	description="Founded by Surrey natives Les and Nigel Reilly, Jewel Bespoke Build is a family-run construction company with over 65 years of experience serving the South of England."
/>

<section class="section page-hero">
	<div class="container about-hero">
		<div>
			<span class="kicker">Our story</span>
			<h1>About Jewel Bespoke Build Ltd</h1>
			<p class="lede">
				Welcome to Jewel Bespoke Build Ltd, a family-run construction company in Surrey with over
				65 years of experience, proudly serving the South of England. Founded by Surrey natives
				Les and Nigel Reilly, we are a trusted bespoke building company specialising in luxury,
				custom homes that reflect your unique taste and lifestyle.
			</p>
			<p class="lede">
				As experts in home renovations, home extensions, and loft conversions in Surrey, our
				dedicated team — including in-house Project Managers and personal Site Managers —
				delivers every project with meticulous care, craftsmanship, and attention to detail.
			</p>
		</div>
		<img class="about-hero__img" src={images.aboutTeam} alt="The Jewel Bespoke Build team" />
	</div>
</section>

<section class="section section--tint">
	<div class="container">
		<span class="kicker">The people behind the projects</span>
		<h2>Our team</h2>
		<p class="lede">
			We are more than just a group of professionals — we are a family-run bespoke building company
			united by a shared passion for craftsmanship, innovation, and client satisfaction. We see
			every project as an opportunity to create something truly unique, tailored to the specific
			vision and lifestyle of our clients.
		</p>
		<div class="grid grid--3 team-grid">
			{#each team as member (member.name)}
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
			<span class="kicker">How we work</span>
			<h2>Our approach</h2>
			<p>
				At Jewel Bespoke Build Ltd, a leading construction company in Surrey, we deliver
				exceptional quality across all projects — from loft conversions and home extensions to
				full home renovations. Using advanced project management software and clear weekly
				updates, our experienced project and site managers ensure transparency, precision, and
				top-tier craftsmanship.
			</p>
			<p>
				As a trusted bespoke building company, we expertly manage budgets, timelines, and
				challenges to deliver on time and within budget. Contact us today to work with dedicated
				bespoke contractors in Surrey committed to bringing your vision to life.
			</p>
			<div class="approach__actions">
				<a href="/contact" class="btn btn--primary">Contact us today</a>
				<a href={site.brochureUrl} class="btn btn--outline" target="_blank" rel="noopener noreferrer">
					Download our brochure
				</a>
			</div>
		</div>
		<ul class="card approach__points">
			<li><strong>Weekly updates</strong> — clear communication through every stage of the build.</li>
			<li><strong>In-house project managers</strong> — one accountable team from start to finish.</li>
			<li><strong>Transparent budgets</strong> — helpful cost information throughout the process.</li>
			<li><strong>Health &amp; safety first</strong> — standards consistently maintained on every site.</li>
		</ul>
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
