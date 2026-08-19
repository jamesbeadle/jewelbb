<script lang="ts">
	let { data } = $props();

	const today = new Date().toLocaleDateString('en-GB', {
		weekday: 'long',
		day: 'numeric',
		month: 'long',
		timeZone: 'Europe/London'
	});

	function when(iso: string): string {
		const d = new Date(iso);
		const days = Math.floor((Date.now() - d.getTime()) / 86_400_000);
		if (days === 0) return 'Today';
		if (days === 1) return 'Yesterday';
		return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', timeZone: 'Europe/London' });
	}

	const sections = $derived([
		{
			href: '/admin/projects',
			title: 'Projects',
			count: data.projectCount,
			unit: 'portfolio projects',
			blurb: 'Pages, descriptions and photo galleries',
			icon: 'M3 21V8l9-5 9 5v13h-6v-7h-6v7H3z'
		},
		{
			href: '/admin/staff',
			title: 'Staff',
			count: data.staffCount,
			unit: 'team members',
			blurb: 'Names, roles, bios and photos',
			icon: 'M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4zm0 2c-4 0-8 2-8 5v2h16v-2c0-3-4-5-8-5z'
		},
		{
			href: '/admin/brochure',
			title: 'Brochures',
			count: data.sectionCount,
			unit: 'brochures',
			blurb: 'Build print-quality brochures, download as PDF',
			icon: 'M5 3h14a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm3 5h8v2H8V8zm0 4h8v2H8v-2z'
		},
		{
			href: '/admin/rtw',
			title: 'RTW checks',
			count: data.rtwCount,
			unit: 'logged submissions',
			blurb: 'Right to Work checks completed at /rtw',
			icon: 'M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5l-8-3zm-1 13-3-3 1.4-1.4L11 12.2l4.6-4.6L17 9l-6 6z'
		}
	]);
</script>

<svelte:head>
	<title>Admin | Jewel Bespoke Build</title>
</svelte:head>

<header class="dash-head">
	<div>
		<h1>Dashboard</h1>
		<p class="dash-head__date">{today}</p>
	</div>
	<a class="btn btn--outline dash-head__site" href="/" target="_blank" rel="noopener">View live site ↗</a>
</header>

{#if !data.configured}
	<p class="warn">
		Supabase is not connected yet. Set <code>SUPABASE_URL</code> and
		<code>SUPABASE_SERVICE_ROLE_KEY</code> environment variables (see README), run
		<code>supabase/schema.sql</code> in the Supabase SQL editor, then restart the site.
	</p>
{:else if data.staffCount === null}
	<p class="warn">
		Supabase is configured but unreachable — check the keys, and that
		<code>supabase/schema.sql</code> has been run.
		{#if data.dbError}
			<br /><code class="warn__detail">{data.dbError}</code>
		{/if}
	</p>
{/if}

<a class="card hero" href="/admin/enquiries" class:hero--alert={data.newEnquiryCount > 0}>
	<div class="hero__icon" aria-hidden="true">
		<svg viewBox="0 0 24 24"><path d="M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm8 7L4.5 7h15L12 12zm0 2.3L21 8v10H3V8l9 6.3z" /></svg>
	</div>
	<div class="hero__text">
		<h2>
			Enquiries
			{#if data.newEnquiryCount > 0}
				<span class="hero__badge">{data.newEnquiryCount} new</span>
			{/if}
		</h2>
		<p>
			{#if data.enquiryCount === null}
				Quote requests from the website land here — run the updated <code>schema.sql</code> to
				switch this on.
			{:else if data.newEnquiryCount > 0}
				You have {data.newEnquiryCount} unread quote request{data.newEnquiryCount === 1 ? '' : 's'}
				waiting for a reply.
			{:else if data.enquiryCount === 0}
				No enquiries yet — new quote requests from the contact form will appear here instantly.
			{:else}
				All caught up — {data.enquiryCount} enquir{data.enquiryCount === 1 ? 'y' : 'ies'} in the
				inbox, nothing unread.
			{/if}
		</p>
	</div>
	<span class="hero__cta">Open inbox →</span>
</a>

{#if data.recentEnquiries.length > 0}
	<ul class="recent">
		{#each data.recentEnquiries as r (r.id)}
			<li>
				<a class="recent__row" href="/admin/enquiries">
					<span class="recent__dot" class:recent__dot--new={r.status === 'new'} aria-hidden="true"
					></span>
					<span class="recent__name">{r.first_name} {r.last_name}</span>
					<span class="recent__preview">{r.message}</span>
					<span class="recent__date">{when(r.created_at)}</span>
				</a>
			</li>
		{/each}
	</ul>
{/if}

<h2 class="section-label">Site content</h2>

<div class="tiles">
	{#each sections as s (s.href)}
		<a class="card tile" href={s.href}>
			<span class="tile__icon" aria-hidden="true">
				<svg viewBox="0 0 24 24"><path d={s.icon} /></svg>
			</span>
			<span class="tile__body">
				<span class="tile__title">{s.title}</span>
				<span class="tile__count">
					<strong>{s.count === null ? '—' : s.count}</strong>
					{s.unit}
				</span>
				<span class="tile__blurb">{s.blurb}</span>
			</span>
			<span class="tile__arrow" aria-hidden="true">→</span>
		</a>
	{/each}
</div>

<style>
	.dash-head {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		gap: 1rem;
		flex-wrap: wrap;
		margin-bottom: 1.6rem;
	}

	.dash-head h1 {
		margin-bottom: 0.1rem;
	}

	.dash-head__date {
		color: var(--ink-400);
		margin: 0;
	}

	.dash-head__site {
		padding: 0.5rem 1.2rem;
		font-size: 0.88rem;
	}

	.warn {
		background: #fdf6ec;
		border: 1px solid #f0dfc0;
		border-radius: var(--radius);
		padding: 0.9rem 1.1rem;
		color: var(--ink-600);
		max-width: 46rem;
		margin-bottom: 1.4rem;
	}

	.warn__detail {
		display: inline-block;
		margin-top: 0.5rem;
		font-size: 0.82rem;
		word-break: break-word;
		color: #8a5a2a;
	}

	/* Enquiries hero card ------------------------------------------------ */
	.hero {
		display: flex;
		align-items: center;
		gap: 1.4rem;
		padding: 1.5rem 1.8rem;
		text-decoration: none;
		max-width: 56rem;
		transition:
			transform 0.15s ease,
			box-shadow 0.15s ease;
	}

	.hero:hover {
		transform: translateY(-2px);
		box-shadow: var(--shadow-lift);
	}

	.hero--alert {
		border-color: var(--gold-300);
		background: linear-gradient(120deg, #fff 55%, var(--orange-100));
	}

	.hero__icon {
		flex-shrink: 0;
		width: 54px;
		height: 54px;
		border-radius: 14px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		background: var(--ink-900);
	}

	.hero--alert .hero__icon {
		background: var(--orange-500);
	}

	.hero__icon svg {
		width: 26px;
		height: 26px;
		fill: #fff;
	}

	.hero__text {
		margin-right: auto;
	}

	.hero__text h2 {
		font-size: 1.3rem;
		margin-bottom: 0.15rem;
		display: inline-flex;
		align-items: center;
		gap: 0.6rem;
	}

	.hero__badge {
		background: var(--orange-500);
		color: #fff;
		font-family: var(--font-body);
		font-size: 0.75rem;
		font-weight: 600;
		border-radius: 999px;
		padding: 0.2rem 0.7rem;
	}

	.hero__text p {
		margin: 0;
		color: var(--ink-600);
	}

	.hero__cta {
		flex-shrink: 0;
		color: var(--gold-600);
		font-family: var(--font-display);
		font-weight: 600;
		font-size: 0.95rem;
		white-space: nowrap;
	}

	/* Recent enquiries --------------------------------------------------- */
	.recent {
		list-style: none;
		margin: 0.7rem 0 0;
		padding: 0;
		max-width: 56rem;
		display: grid;
	}

	.recent__row {
		display: flex;
		align-items: center;
		gap: 0.8rem;
		padding: 0.55rem 0.9rem;
		border-radius: var(--radius);
		text-decoration: none;
		font-size: 0.93rem;
	}

	.recent__row:hover {
		background: rgba(35, 31, 32, 0.04);
	}

	.recent__dot {
		flex-shrink: 0;
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: var(--line);
	}

	.recent__dot--new {
		background: var(--orange-500);
		box-shadow: 0 0 0 3px var(--orange-100);
	}

	.recent__name {
		font-weight: 600;
		color: var(--ink-900);
		white-space: nowrap;
	}

	.recent__preview {
		color: var(--ink-400);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		margin-right: auto;
	}

	.recent__date {
		flex-shrink: 0;
		color: var(--ink-400);
		font-size: 0.85rem;
	}

	/* Content tiles ------------------------------------------------------ */
	.section-label {
		font-size: 0.82rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.14em;
		color: var(--ink-400);
		margin: 2.2rem 0 1rem;
	}

	.tiles {
		display: grid;
		gap: 1rem;
		max-width: 56rem;
	}

	@media (min-width: 700px) {
		.tiles {
			grid-template-columns: 1fr 1fr;
		}
	}

	.tile {
		display: flex;
		align-items: center;
		gap: 1.1rem;
		padding: 1.25rem 1.4rem;
		text-decoration: none;
		transition:
			transform 0.15s ease,
			box-shadow 0.15s ease;
	}

	.tile:hover {
		transform: translateY(-2px);
		box-shadow: var(--shadow-lift);
	}

	.tile__icon {
		flex-shrink: 0;
		width: 44px;
		height: 44px;
		border-radius: 12px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		background: var(--tint);
		border: 1px solid var(--line);
	}

	.tile__icon svg {
		width: 22px;
		height: 22px;
		fill: var(--gold-600);
	}

	.tile__body {
		display: grid;
		gap: 0.05rem;
		min-width: 0;
	}

	.tile__title {
		font-family: var(--font-display);
		font-weight: 600;
		color: var(--ink-900);
		font-size: 1.05rem;
	}

	.tile__count {
		color: var(--ink-600);
		font-size: 0.9rem;
	}

	.tile__count strong {
		color: var(--ink-900);
	}

	.tile__blurb {
		color: var(--ink-400);
		font-size: 0.85rem;
	}

	.tile__arrow {
		margin-left: auto;
		color: var(--gold-600);
		font-weight: 600;
	}
</style>
