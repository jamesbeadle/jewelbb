<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import CtaBand from '$lib/components/CtaBand.svelte';
	import { formatDate } from '$lib/blog';
	import { site } from '$lib/data/site';

	let { data } = $props();

	const post = $derived(data.post);

	const jsonLd = $derived({
		'@context': 'https://schema.org',
		'@type': 'BlogPosting',
		headline: post.title,
		datePublished: post.date,
		author: { '@type': 'Person', name: post.author },
		publisher: { '@type': 'Organization', name: site.name, url: site.url },
		mainEntityOfPage: `${site.url}/post/${post.slug}`
	});
</script>

<Seo title="{post.title} | Jewel Bespoke Build" description={post.description} type="article" jsonLd={jsonLd} />

<article class="section">
	<div class="container">
		<header class="post-head">
			<nav class="crumbs" aria-label="Breadcrumb">
				<a href="/blog">News</a>
				<span aria-hidden="true">/</span>
				<span aria-current="page">{post.title}</span>
			</nav>
			<h1>{post.title}</h1>
			<p class="post-head__meta">
				<time datetime={post.date}>{formatDate(post.date)}</time>
				<span aria-hidden="true">·</span>
				<span>{post.author}</span>
			</p>
		</header>

		<div class="prose">
			<!-- Post HTML is generated at build time from repo-controlled markdown -->
			<!-- eslint-disable-next-line svelte/no-at-html-tags -->
			{@html post.html}
		</div>

		<footer class="post-nav">
			{#if data.prev}
				<a class="card post-nav__link" href="/post/{data.prev.slug}">
					<span>Newer</span>
					{data.prev.title}
				</a>
			{/if}
			{#if data.next}
				<a class="card post-nav__link post-nav__link--next" href="/post/{data.next.slug}">
					<span>Older</span>
					{data.next.title}
				</a>
			{/if}
		</footer>
	</div>
</article>

<CtaBand />

<style>
	.crumbs {
		display: flex;
		gap: 0.6rem;
		font-size: 0.9rem;
		margin-bottom: 1.2rem;
		color: var(--ink-400);
	}

	.crumbs a {
		color: var(--ink-600);
	}

	.crumbs [aria-current] {
		max-width: 34ch;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.post-head {
		max-width: 44rem;
		margin-bottom: 2.2rem;
	}

	.post-head__meta {
		display: flex;
		gap: 0.6rem;
		color: var(--ink-400);
		font-size: 0.92rem;
	}

	.post-nav {
		max-width: 44rem;
		margin-top: 3rem;
		display: grid;
		gap: 1rem;
	}

	@media (min-width: 700px) {
		.post-nav {
			grid-template-columns: 1fr 1fr;
		}
	}

	.post-nav__link {
		padding: 1.1rem 1.3rem;
		text-decoration: none;
		font-weight: 600;
		color: var(--ink-900);
		display: grid;
		gap: 0.2rem;
	}

	.post-nav__link span {
		font-size: 0.78rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--gold-600);
	}
</style>
