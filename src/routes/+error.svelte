<script lang="ts">
	import { page } from '$app/state';
</script>

<svelte:head>
	<title>{page.status === 404 ? 'Page not found' : 'Something went wrong'} | Jewel Bespoke Build</title>
</svelte:head>

<section class="section">
	<div class="container error-wrap">
		<span class="kicker">{page.status}</span>
		<h1>{page.status === 404 ? "We couldn't find that page" : 'Something went wrong'}</h1>
		<p class="lede">
			{page.status === 404
				? 'The page you are looking for may have been moved or no longer exists.'
				: 'Please try again in a moment.'}
		</p>
		<div class="error-actions">
			<a href="/" class="btn btn--primary">Back to the homepage</a>
			<a href="/contact" class="btn btn--outline">Contact us</a>
		</div>
	</div>
</section>

<style>
	.error-wrap {
		text-align: center;
		padding-block: 4rem;
	}

	.error-actions {
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		gap: 0.9rem;
		margin-top: 1.5rem;
	}
</style>
