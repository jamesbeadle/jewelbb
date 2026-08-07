<script lang="ts">
	import { nav, site } from '$lib/data/site';
	import { images } from '$lib/data/images';

	const year = new Date().getFullYear();

	const socials = [
		{ label: 'Instagram', href: site.social.instagram },
		{ label: 'Facebook', href: site.social.facebook },
		{ label: 'LinkedIn', href: site.social.linkedin },
		{ label: 'Houzz', href: site.social.houzz }
	];
</script>

<footer class="footer">
	<div class="container footer__grid">
		<div>
			<img src={images.logo} alt="Jewel Bespoke Build Ltd" class="footer__logo" />
			<p class="footer__blurb">
				Family-run bespoke building company in Surrey with over 65 years of experience, serving
				clients across the South of England.
			</p>
		</div>

		<nav aria-label="Footer navigation">
			<h3 class="footer__title">Explore</h3>
			<ul class="footer__list">
				{#each nav as item (item.href)}
					<li><a href={item.href}>{item.label}</a></li>
				{/each}
				<li><a href="/contact">Contact us</a></li>
			</ul>
		</nav>

		<div>
			<h3 class="footer__title">Get in touch</h3>
			<ul class="footer__list">
				<li><a href={site.phoneHref}>{site.phone}</a></li>
				<li><a href="mailto:{site.email}">{site.email}</a></li>
				<li>
					{site.address.line1}, {site.address.town},<br />
					{site.address.county}, {site.address.postcode}
				</li>
			</ul>
		</div>

		<div>
			<h3 class="footer__title">Follow us</h3>
			<ul class="footer__list">
				{#each socials as s (s.href)}
					<li><a href={s.href} target="_blank" rel="noopener noreferrer">{s.label}</a></li>
				{/each}
			</ul>
			<a class="btn btn--outline footer__brochure" href={site.brochureUrl} target="_blank" rel="noopener noreferrer">
				Download our brochure
			</a>
		</div>
	</div>

	<div class="footer__legal">
		<div class="container footer__legal-inner">
			<p>© {year} Jewel Bespoke Build Ltd. All rights reserved.</p>
			<ul>
				<li><a href="/privacy-policy">Privacy policy</a></li>
				<li><a href="/terms-and-conditions">Terms &amp; conditions</a></li>
			</ul>
		</div>
	</div>
</footer>

<style>
	.footer {
		background: var(--tint);
		border-top: 1px solid var(--line);
		color: var(--ink-600);
		margin-top: auto;
	}

	.footer__grid {
		display: grid;
		gap: 2.5rem;
		padding-block: 3.5rem 2.5rem;
	}

	@media (min-width: 760px) {
		.footer__grid {
			grid-template-columns: 1.4fr 1fr 1fr 1fr;
		}
	}

	.footer__logo {
		height: 64px;
		width: auto;
	}

	.footer__blurb {
		margin-top: 1rem;
		font-size: 0.95rem;
		max-width: 28rem;
	}

	.footer__title {
		color: var(--ink-900);
		font-family: var(--font-display);
		font-size: 0.82rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.14em;
		margin-bottom: 1rem;
	}

	.footer__list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: 0.45rem;
		font-size: 0.95rem;
	}

	.footer__list a {
		color: var(--ink-600);
		text-decoration: none;
	}

	.footer__list a:hover {
		color: var(--orange-500);
	}

	.footer__brochure {
		margin-top: 1.2rem;
		font-size: 0.88rem;
		padding: 0.6rem 1.2rem;
	}

	.footer__legal {
		border-top: 1px solid var(--line);
		padding-block: 1.1rem;
		font-size: 0.85rem;
	}

	.footer__legal-inner {
		display: flex;
		flex-wrap: wrap;
		gap: 0.8rem 2rem;
		justify-content: space-between;
		align-items: center;
	}

	.footer__legal p {
		margin: 0;
	}

	.footer__legal ul {
		display: flex;
		gap: 1.5rem;
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.footer__legal a {
		color: var(--ink-600);
	}
</style>
