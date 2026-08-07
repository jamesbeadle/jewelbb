<script lang="ts">
	import { page } from '$app/state';

	let { children } = $props();

	const onLogin = $derived(page.url.pathname === '/admin/login');
</script>

<svelte:head>
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

<div class="admin">
	{#if !onLogin}
		<nav class="admin__nav">
			<div class="container admin__nav-inner">
				<a href="/admin" class="admin__brand">Jewel · Admin</a>
				<ul>
					<li><a href="/admin/staff" aria-current={page.url.pathname.startsWith('/admin/staff') ? 'page' : undefined}>Staff</a></li>
					<li><a href="/admin/brochure" aria-current={page.url.pathname.startsWith('/admin/brochure') ? 'page' : undefined}>Brochure</a></li>
					<li><a href="/" target="_blank" rel="noopener">View site ↗</a></li>
				</ul>
				<form method="POST" action="/admin/logout">
					<button class="admin__logout">Log out</button>
				</form>
			</div>
		</nav>
	{/if}
	<div class="container admin__body">
		{@render children()}
	</div>
</div>

<style>
	.admin {
		min-height: 60vh;
	}

	.admin__nav {
		background: var(--ink-900);
		color: #fff;
	}

	.admin__nav-inner {
		display: flex;
		align-items: center;
		gap: 1.6rem;
		padding-block: 0.75rem;
	}

	.admin__brand {
		color: #fff;
		text-decoration: none;
		font-family: var(--font-display);
		font-weight: 600;
		margin-right: auto;
	}

	.admin__nav ul {
		display: flex;
		gap: 1.2rem;
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.admin__nav ul a {
		color: #ddd;
		text-decoration: none;
		font-size: 0.95rem;
	}

	.admin__nav ul a:hover,
	.admin__nav ul a[aria-current='page'] {
		color: var(--orange-500);
	}

	.admin__logout {
		font: inherit;
		font-size: 0.88rem;
		background: none;
		border: 1px solid rgba(255, 255, 255, 0.4);
		color: #fff;
		border-radius: 999px;
		padding: 0.35rem 0.95rem;
		cursor: pointer;
	}

	.admin__logout:hover {
		background: rgba(255, 255, 255, 0.15);
	}

	.admin__body {
		padding-block: 2.2rem 3.5rem;
	}
</style>
