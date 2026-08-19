<script lang="ts">
	import { page } from '$app/state';

	let { data, children } = $props();

	const onLogin = $derived(page.url.pathname === '/admin/login');

	const links = [
		{ label: 'Enquiries', href: '/admin/enquiries' },
		{ label: 'Projects', href: '/admin/projects' },
		{ label: 'Staff', href: '/admin/staff' },
		{ label: 'Brochures', href: '/admin/brochure' },
		{ label: 'RTW checks', href: '/admin/rtw' }
	];

	function isActive(href: string): boolean {
		return page.url.pathname.startsWith(href);
	}
</script>

<svelte:head>
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

<div class="admin" class:admin--login={onLogin}>
	{#if !onLogin}
		<nav class="admin__nav">
			<div class="container admin__nav-inner">
				<a href="/admin" class="admin__brand">
					<span class="admin__brand-mark" aria-hidden="true"></span>
					<span class="admin__brand-text">Jewel <em>Admin</em></span>
				</a>
				<ul class="admin__links">
					{#each links as link (link.href)}
						<li>
							<a href={link.href} aria-current={isActive(link.href) ? 'page' : undefined}>
								{link.label}
								{#if link.href === '/admin/enquiries' && data.newEnquiries > 0}
									<span class="admin__badge">{data.newEnquiries}</span>
								{/if}
							</a>
						</li>
					{/each}
				</ul>
				<div class="admin__side">
					<a class="admin__view" href="/" target="_blank" rel="noopener">View site ↗</a>
					<form method="POST" action="/admin/logout">
						<button class="admin__logout">Log out</button>
					</form>
				</div>
			</div>
		</nav>
	{/if}
	<div class="container admin__body">
		{@render children()}
	</div>
</div>

<style>
	.admin {
		min-height: 100vh;
		background:
			radial-gradient(60rem 20rem at 110% -5rem, rgba(193, 154, 82, 0.07), transparent 60%),
			#f8f7f5;
	}

	.admin--login {
		background: #fff;
		min-height: 60vh;
	}

	.admin__nav {
		background: linear-gradient(180deg, #2b2627, var(--ink-900));
		color: #fff;
		border-bottom: 3px solid var(--orange-500);
		position: sticky;
		top: 0;
		z-index: 50;
		box-shadow: 0 4px 18px rgba(35, 31, 32, 0.18);
	}

	.admin__nav-inner {
		display: flex;
		align-items: center;
		gap: 1.8rem;
		padding-block: 0.7rem;
		flex-wrap: wrap;
	}

	.admin__brand {
		display: inline-flex;
		align-items: center;
		gap: 0.6rem;
		color: #fff;
		text-decoration: none;
		font-family: var(--font-display);
		font-weight: 600;
		font-size: 1.02rem;
		margin-right: auto;
	}

	.admin__brand-mark {
		width: 11px;
		height: 11px;
		background: var(--gold-500);
		transform: rotate(45deg);
		border-radius: 2px;
		box-shadow: 0 0 0 3px rgba(193, 154, 82, 0.25);
	}

	.admin__brand-text em {
		font-style: normal;
		color: var(--gold-300);
		font-weight: 400;
	}

	.admin__links {
		display: flex;
		gap: 0.2rem;
		list-style: none;
		margin: 0;
		padding: 0;
		flex-wrap: wrap;
	}

	.admin__links a {
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
		color: #d8d5d3;
		text-decoration: none;
		font-size: 0.93rem;
		padding: 0.42rem 0.85rem;
		border-radius: 999px;
		transition:
			background-color 0.15s ease,
			color 0.15s ease;
	}

	.admin__links a:hover {
		color: #fff;
		background: rgba(255, 255, 255, 0.09);
	}

	.admin__links a[aria-current='page'] {
		color: #fff;
		background: rgba(245, 130, 32, 0.18);
		box-shadow: inset 0 0 0 1px rgba(245, 130, 32, 0.45);
	}

	.admin__badge {
		background: var(--orange-500);
		color: #fff;
		font-size: 0.7rem;
		font-weight: 600;
		border-radius: 999px;
		padding: 0.05rem 0.45rem;
		line-height: 1.5;
	}

	.admin__side {
		display: flex;
		align-items: center;
		gap: 0.9rem;
	}

	.admin__view {
		color: #d8d5d3;
		text-decoration: none;
		font-size: 0.88rem;
	}

	.admin__view:hover {
		color: var(--gold-300);
	}

	.admin__logout {
		font: inherit;
		font-size: 0.85rem;
		background: none;
		border: 1px solid rgba(255, 255, 255, 0.35);
		color: #fff;
		border-radius: 999px;
		padding: 0.32rem 0.95rem;
		cursor: pointer;
		transition:
			background-color 0.15s ease,
			border-color 0.15s ease;
	}

	.admin__logout:hover {
		background: rgba(255, 255, 255, 0.12);
		border-color: rgba(255, 255, 255, 0.6);
	}

	.admin__body {
		padding-block: 2.2rem 3.5rem;
	}

	@media (max-width: 900px) {
		.admin__nav-inner {
			gap: 0.8rem;
		}

		.admin__links {
			order: 3;
			width: 100%;
			padding-bottom: 0.3rem;
		}
	}
</style>
