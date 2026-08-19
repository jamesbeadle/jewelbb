<script lang="ts">
	import '../app.css';
	import { page } from '$app/state';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import CookieBanner from '$lib/components/CookieBanner.svelte';

	let { children } = $props();

	// The brochure print route is captured by the PDF generator and must be
	// a bare document — no site chrome around the A4 pages.
	const bare = $derived(page.url.pathname.startsWith('/brochure/print'));
</script>

{#if bare}
	{@render children()}
{:else}
	<div class="shell">
		<Header />
		<main>
			{@render children()}
		</main>
		<Footer />
		<CookieBanner />
	</div>
{/if}

<style>
	.shell {
		min-height: 100dvh;
		display: flex;
		flex-direction: column;
	}

	main {
		flex: 1;
	}
</style>
