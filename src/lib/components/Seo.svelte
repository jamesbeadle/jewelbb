<script lang="ts">
	import { page } from '$app/state';
	import { site } from '$lib/data/site';

	interface Props {
		title: string;
		description: string;
		image?: string;
		type?: string;
		jsonLd?: Record<string, unknown> | undefined;
	}

	let { title, description, image = undefined, type = 'website', jsonLd = undefined }: Props = $props();

	const canonical = $derived(`${site.url}${page.url.pathname === '/' ? '' : page.url.pathname}`);
	const jsonLdString = $derived(
		jsonLd ? `<${'script'} type="application/ld+json">${JSON.stringify(jsonLd)}</${'script'}>` : ''
	);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonical} />
	<meta property="og:site_name" content={site.shortName} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:type" content={type} />
	<meta property="og:url" content={canonical} />
	{#if image}
		<meta property="og:image" content={image} />
		<meta name="twitter:card" content="summary_large_image" />
	{/if}
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html jsonLdString}
</svelte:head>
