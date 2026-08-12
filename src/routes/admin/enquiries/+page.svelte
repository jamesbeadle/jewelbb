<script lang="ts">
	import { enhance } from '$app/forms';

	let { data } = $props();

	let expanded: Record<string, boolean> = $state({});

	function toggle(id: string) {
		expanded[id] = !expanded[id];
	}

	function when(iso: string): string {
		const d = new Date(iso);
		const now = new Date();
		const days = Math.floor((now.getTime() - d.getTime()) / 86_400_000);
		const time = d.toLocaleString('en-GB', {
			hour: '2-digit',
			minute: '2-digit',
			timeZone: 'Europe/London'
		});
		if (days === 0) return `Today · ${time}`;
		if (days === 1) return `Yesterday · ${time}`;
		return d.toLocaleString('en-GB', {
			day: '2-digit',
			month: 'short',
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
			timeZone: 'Europe/London'
		});
	}

	function initials(first: string, last: string): string {
		return `${first[0] ?? ''}${last[0] ?? ''}`.toUpperCase();
	}

	const pageBase = $derived(data.view === 'archived' ? '?view=archived&' : '?');
</script>

<svelte:head>
	<title>Enquiries | Admin</title>
</svelte:head>

<div class="head">
	<div>
		<h1>Enquiries</h1>
		<p class="sub">
			Quote requests from the website contact form land here —
			{#if data.newCount > 0}<strong>{data.newCount} new</strong> waiting.{:else}nothing new right now.{/if}
		</p>
	</div>
</div>

<nav class="tabs" aria-label="Enquiry views">
	<a href="/admin/enquiries" class="tab" aria-current={data.view === 'inbox' ? 'page' : undefined}>
		Inbox
		{#if data.newCount > 0}<span class="tab__badge">{data.newCount}</span>{/if}
	</a>
	<a
		href="/admin/enquiries?view=archived"
		class="tab"
		aria-current={data.view === 'archived' ? 'page' : undefined}
	>
		Archived
		{#if data.archivedCount > 0}<span class="tab__count">{data.archivedCount}</span>{/if}
	</a>
</nav>

{#if !data.configured}
	<p class="warn">Supabase is not connected yet — see the dashboard for setup steps.</p>
{:else if data.dbError}
	<p class="warn">
		Could not load enquiries — check that <code>supabase/schema.sql</code> (which now includes the
		<code>enquiries</code> table) has been run.
		<br /><code class="warn__detail">{data.dbError}</code>
	</p>
{:else if data.total === 0}
	<div class="empty card">
		{#if data.view === 'archived'}
			<h2>No archived enquiries</h2>
			<p>When you archive an enquiry from the inbox it will move here.</p>
		{:else}
			<h2>No enquiries yet</h2>
			<p>
				When someone sends the “Request a free quote” form on the
				<a href="/contact" target="_blank" rel="noopener">contact page</a>, it will appear here
				instantly.
			</p>
		{/if}
	</div>
{:else}
	<ul class="list">
		{#each data.rows as r (r.id)}
			<li class="card enquiry" class:enquiry--new={r.status === 'new'}>
				<button
					type="button"
					class="enquiry__summary"
					onclick={() => toggle(r.id)}
					aria-expanded={expanded[r.id] ?? false}
				>
					<span class="enquiry__avatar" aria-hidden="true">{initials(r.first_name, r.last_name)}</span>
					<span class="enquiry__who">
						<span class="enquiry__name">
							{r.first_name}
							{r.last_name}
							{#if r.status === 'new'}<span class="pill pill--new">New</span>{/if}
						</span>
						<span class="enquiry__preview">{r.message}</span>
					</span>
					<span class="enquiry__meta">
						<span class="enquiry__date">{when(r.created_at)}</span>
						<span class="enquiry__chevron" class:enquiry__chevron--open={expanded[r.id]}>▾</span>
					</span>
				</button>

				{#if expanded[r.id]}
					<div class="enquiry__detail">
						<div class="enquiry__contact">
							<a href="mailto:{r.email}" title="Reply by email">✉ {r.email}</a>
							{#if r.phone}
								<a href="tel:{r.phone.replace(/\s+/g, '')}" title="Call">✆ {r.phone}</a>
							{/if}
						</div>
						<p class="enquiry__message">{r.message}</p>
						<div class="enquiry__actions">
							{#if r.status === 'archived'}
								<form method="POST" action="{pageBase}/restore" use:enhance>
									<input type="hidden" name="id" value={r.id} />
									<button class="action" type="submit">Move to inbox</button>
								</form>
							{:else}
								{#if r.status === 'new'}
									<form method="POST" action="{pageBase}/markRead" use:enhance>
										<input type="hidden" name="id" value={r.id} />
										<button class="action" type="submit">Mark as read</button>
									</form>
								{:else}
									<form method="POST" action="{pageBase}/markUnread" use:enhance>
										<input type="hidden" name="id" value={r.id} />
										<button class="action" type="submit">Mark as new</button>
									</form>
								{/if}
								<form method="POST" action="{pageBase}/archive" use:enhance>
									<input type="hidden" name="id" value={r.id} />
									<button class="action" type="submit">Archive</button>
								</form>
							{/if}
							<form
								method="POST"
								action="{pageBase}/remove"
								use:enhance
								onsubmit={(e) => {
									if (!confirm('Delete this enquiry permanently?')) e.preventDefault();
								}}
							>
								<input type="hidden" name="id" value={r.id} />
								<button class="action action--danger" type="submit">Delete</button>
							</form>
						</div>
					</div>
				{/if}
			</li>
		{/each}
	</ul>

	{#if data.totalPages > 1}
		<nav class="pager" aria-label="Pagination">
			{#if data.page > 1}
				<a class="btn btn--outline pager__btn" href="{pageBase}page={data.page - 1}">← Newer</a>
			{/if}
			<span class="pager__info">Page {data.page} of {data.totalPages}</span>
			{#if data.page < data.totalPages}
				<a class="btn btn--outline pager__btn" href="{pageBase}page={data.page + 1}">Older →</a>
			{/if}
		</nav>
	{/if}
{/if}

<style>
	.head {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 1rem;
		flex-wrap: wrap;
	}

	.head h1 {
		margin-bottom: 0.2rem;
	}

	.sub {
		color: var(--ink-600);
		margin: 0 0 1.4rem;
	}

	.tabs {
		display: flex;
		gap: 0.4rem;
		border-bottom: 1px solid var(--line);
		margin-bottom: 1.4rem;
	}

	.tab {
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
		padding: 0.55rem 1rem 0.65rem;
		text-decoration: none;
		color: var(--ink-600);
		font-family: var(--font-display);
		font-size: 0.95rem;
		font-weight: 500;
		border-bottom: 2.5px solid transparent;
		margin-bottom: -1px;
	}

	.tab:hover {
		color: var(--ink-900);
	}

	.tab[aria-current='page'] {
		color: var(--ink-900);
		border-bottom-color: var(--orange-500);
	}

	.tab__badge {
		background: var(--orange-500);
		color: #fff;
		font-size: 0.72rem;
		font-weight: 600;
		border-radius: 999px;
		padding: 0.1rem 0.5rem;
		line-height: 1.4;
	}

	.tab__count {
		background: var(--tint);
		border: 1px solid var(--line);
		color: var(--ink-600);
		font-size: 0.72rem;
		font-weight: 600;
		border-radius: 999px;
		padding: 0.1rem 0.5rem;
		line-height: 1.4;
	}

	.warn {
		background: #fdf6ec;
		border: 1px solid #f0dfc0;
		border-radius: var(--radius);
		padding: 0.9rem 1.1rem;
		color: var(--ink-600);
		max-width: 46rem;
	}

	.warn__detail {
		display: inline-block;
		margin-top: 0.5rem;
		font-size: 0.82rem;
		word-break: break-word;
		color: #8a5a2a;
	}

	.empty {
		padding: 2.4rem 2.2rem;
		max-width: 34rem;
		text-align: center;
		margin-inline: 0;
	}

	.empty h2 {
		font-size: 1.2rem;
		margin-bottom: 0.3rem;
	}

	.empty p {
		color: var(--ink-600);
		margin: 0;
	}

	.list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: 0.7rem;
		max-width: 52rem;
	}

	.enquiry {
		overflow: hidden;
	}

	.enquiry--new {
		border-left: 3px solid var(--orange-500);
	}

	.enquiry__summary {
		display: flex;
		align-items: center;
		gap: 1rem;
		width: 100%;
		padding: 0.95rem 1.2rem;
		background: none;
		border: none;
		font: inherit;
		text-align: left;
		cursor: pointer;
	}

	.enquiry__summary:hover {
		background: var(--tint);
	}

	.enquiry__avatar {
		flex-shrink: 0;
		width: 42px;
		height: 42px;
		border-radius: 50%;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		background: var(--gold-300);
		color: var(--ink-900);
		font-family: var(--font-display);
		font-weight: 600;
		font-size: 0.92rem;
	}

	.enquiry--new .enquiry__avatar {
		background: var(--orange-100);
		color: var(--orange-600);
	}

	.enquiry__who {
		display: grid;
		gap: 0.1rem;
		min-width: 0;
		margin-right: auto;
	}

	.enquiry__name {
		font-weight: 600;
		color: var(--ink-900);
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
	}

	.pill {
		font-size: 0.68rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		border-radius: 999px;
		padding: 0.12rem 0.55rem;
	}

	.pill--new {
		background: var(--orange-500);
		color: #fff;
	}

	.enquiry__preview {
		color: var(--ink-400);
		font-size: 0.9rem;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		max-width: 34rem;
	}

	.enquiry__meta {
		flex-shrink: 0;
		display: flex;
		align-items: center;
		gap: 0.7rem;
	}

	.enquiry__date {
		color: var(--ink-400);
		font-size: 0.85rem;
		white-space: nowrap;
	}

	.enquiry__chevron {
		color: var(--ink-400);
		transition: transform 0.15s ease;
	}

	.enquiry__chevron--open {
		transform: rotate(180deg);
	}

	.enquiry__detail {
		border-top: 1px solid var(--line);
		padding: 1.1rem 1.2rem 1.2rem;
		display: grid;
		gap: 0.9rem;
	}

	.enquiry__contact {
		display: flex;
		flex-wrap: wrap;
		gap: 0.6rem 1.4rem;
		font-size: 0.93rem;
	}

	.enquiry__contact a {
		color: var(--gold-600);
		font-weight: 600;
		text-decoration: none;
	}

	.enquiry__contact a:hover {
		text-decoration: underline;
	}

	.enquiry__message {
		margin: 0;
		white-space: pre-wrap;
		color: var(--ink-900);
		background: var(--tint);
		border: 1px solid var(--line);
		border-radius: var(--radius);
		padding: 0.9rem 1.1rem;
	}

	.enquiry__actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.action {
		font: inherit;
		font-size: 0.85rem;
		font-weight: 600;
		padding: 0.4rem 1rem;
		border-radius: 999px;
		border: 1px solid var(--line);
		background: #fff;
		color: var(--ink-600);
		cursor: pointer;
	}

	.action:hover {
		border-color: var(--ink-900);
		color: var(--ink-900);
	}

	.action--danger:hover {
		border-color: #a33a2a;
		color: #a33a2a;
	}

	.pager {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-top: 1.6rem;
	}

	.pager__btn {
		padding: 0.45rem 1.1rem;
		font-size: 0.88rem;
	}

	.pager__info {
		color: var(--ink-400);
		font-size: 0.9rem;
	}

	@media (max-width: 640px) {
		.enquiry__preview {
			display: none;
		}
	}
</style>
