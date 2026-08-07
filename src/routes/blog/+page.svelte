<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import CtaBand from '$lib/components/CtaBand.svelte';
	import { formatDate } from '$lib/blog';

	let { data } = $props();
</script>

<Seo
	title="News & Insights | Jewel Bespoke Build Ltd"
	description="News, project stories and expert guidance from Jewel Bespoke Build — bespoke construction, renovations and community projects in Surrey."
/>

<section class="section page-hero">
	<div class="container">
		<span class="kicker">News &amp; insights</span>
		<h1>The Jewel journal</h1>
		<p class="lede">
			Project stories, company news and practical guidance from our team of Surrey builders.
		</p>
	</div>
</section>

<section class="section section--tint">
	<div class="container">
		<div class="grid grid--3 posts-grid">
			{#each data.posts as post (post.slug)}
				<a class="card post-card" href="/post/{post.slug}">
					<time datetime={post.date}>{formatDate(post.date)}</time>
					<h2>{post.title}</h2>
					<p>{post.description}</p>
					<span class="post-card__more">Read article →</span>
				</a>
			{/each}
		</div>
	</div>
</section>

<CtaBand />

<style>
	.page-hero {
		padding-bottom: clamp(2rem, 5vw, 3.5rem);
	}

	.posts-grid {
		gap: 1.5rem;
	}

	.post-card {
		padding: 1.8rem 1.7rem 1.5rem;
		text-decoration: none;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		transition: transform 0.18s ease, box-shadow 0.18s ease;
	}

	.post-card:hover {
		transform: translateY(-3px);
		box-shadow: var(--shadow-lift);
	}

	.post-card time {
		font-size: 0.82rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--gold-600);
	}

	.post-card h2 {
		font-size: 1.25rem;
		margin: 0;
	}

	.post-card p {
		color: var(--ink-600);
		font-size: 0.93rem;
		flex: 1;
		margin: 0;
	}

	.post-card__more {
		font-weight: 600;
		font-size: 0.9rem;
		color: var(--gold-600);
	}
</style>
