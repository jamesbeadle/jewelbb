<script lang="ts">
	import { page } from '$app/state';
	import { nav } from '$lib/data/site';
	import { images } from '$lib/data/images';

	let open = $state(false);

	const close = () => (open = false);

	const isActive = (href: string) =>
		href === '/' ? page.url.pathname === '/' : page.url.pathname.startsWith(href);
</script>

<header class="header">
	<div class="container header__inner">
		<a href="/" class="header__brand" onclick={close}>
			<img src={images.logo} alt="Jewel Bespoke Build Ltd" class="header__logo" />
		</a>

		<nav class="header__nav" class:header__nav--open={open} aria-label="Main navigation">
			<ul>
				{#each nav as item (item.href)}
					<li>
						<a
							href={item.href}
							aria-current={isActive(item.href) ? 'page' : undefined}
							onclick={close}>{item.label}</a
						>
					</li>
				{/each}
			</ul>
			<a href="/contact" class="btn btn--primary header__cta-mobile" onclick={close}>
				Request a free quote
			</a>
		</nav>

		<a href="/contact" class="btn btn--primary header__cta">Request a free quote</a>

		<button
			class="header__burger"
			aria-expanded={open}
			aria-controls="main-nav"
			aria-label={open ? 'Close menu' : 'Open menu'}
			onclick={() => (open = !open)}
		>
			<span></span><span></span><span></span>
		</button>
	</div>
</header>

<style>
	.header {
		position: sticky;
		top: 0;
		z-index: 50;
		background: #fff;
		border-bottom: 1px solid var(--line);
	}

	.header__inner {
		display: flex;
		align-items: center;
		gap: 1.5rem;
		padding-block: 0.7rem;
	}

	.header__brand {
		margin-right: auto;
		display: inline-flex;
	}

	.header__logo {
		height: 48px;
		width: auto;
		object-fit: contain;
	}

	.header__nav ul {
		display: flex;
		gap: 1.4rem;
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.header__nav a {
		text-decoration: none;
		font-weight: 500;
		font-size: 0.98rem;
		color: var(--ink-900);
		padding-block: 0.3rem;
		border-bottom: 2px solid transparent;
	}

	.header__nav a:hover {
		color: var(--orange-500);
	}

	.header__nav a[aria-current='page'] {
		border-bottom-color: var(--orange-500);
		color: var(--ink-900);
	}

	.header__cta-mobile {
		display: none;
	}

	.header__burger {
		display: none;
		flex-direction: column;
		justify-content: center;
		gap: 5px;
		width: 44px;
		height: 44px;
		padding: 10px;
		background: none;
		border: 0;
		cursor: pointer;
	}

	.header__burger span {
		display: block;
		height: 2px;
		width: 100%;
		background: var(--ink-900);
		transition: transform 0.2s ease, opacity 0.2s ease;
	}

	@media (max-width: 980px) {
		.header__cta {
			display: none;
		}

		.header__burger {
			display: flex;
		}

		.header__nav {
			position: fixed;
			inset: 69px 0 auto 0;
			background: #fff;
			border-bottom: 1px solid var(--line);
			padding: 1.2rem 1.5rem 1.6rem;
			transform: translateY(-115%);
			transition: transform 0.25s ease;
			box-shadow: var(--shadow-lift);
		}

		.header__nav--open {
			transform: translateY(0);
		}

		.header__nav ul {
			flex-direction: column;
			gap: 0.4rem;
			margin-bottom: 1rem;
		}

		.header__nav a {
			display: block;
			padding: 0.55rem 0;
			font-size: 1.05rem;
		}

		.header__cta-mobile {
			display: inline-flex;
		}
	}
</style>
