<script lang="ts">
	let { data } = $props();
</script>

<svelte:head>
	<title>Page text | Admin</title>
</svelte:head>

<h1>Page text</h1>
<p class="intro">
	Edit the headings and copy on each page of the website. Anything you haven’t changed keeps its
	original wording, and each page can be reset back to the original at any time.
	Projects, staff and badges have their own sections.
</p>

{#if !data.configured}
	<p class="warn">Supabase is not connected yet — see the dashboard for setup steps.</p>
{:else if data.missing}
	<p class="warn">
		Page text needs a one-off database update: open the Supabase SQL editor, paste the contents
		of <code>supabase/2026-09-25-page-content.sql</code> and run it.
	</p>
{/if}

<ul class="list">
	{#each data.pages as p (p.key)}
		<li>
			<a class="card row" href="/admin/content/{p.key}">
				<span class="row__text">
					<strong>{p.label}</strong>
					<span>{p.path ?? 'Shared across pages'} · {p.blurb}</span>
				</span>
				{#if p.edited > 0}
					<span class="row__pill">{p.edited} edited</span>
				{/if}
				<span class="row__arrow" aria-hidden="true">→</span>
			</a>
		</li>
	{/each}
</ul>

<style>
	h1 {
		margin-bottom: 0.4rem;
	}

	.intro {
		color: var(--ink-600);
		max-width: 46rem;
		margin-bottom: 1.4rem;
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

	.list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: 0.7rem;
		max-width: 46rem;
	}

	.row {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 1rem 1.3rem;
		text-decoration: none;
		transition:
			transform 0.15s ease,
			box-shadow 0.15s ease;
	}

	.row:hover {
		transform: translateY(-2px);
		box-shadow: var(--shadow-lift);
	}

	.row__text {
		display: grid;
		margin-right: auto;
		min-width: 0;
	}

	.row__text strong {
		color: var(--ink-900);
	}

	.row__text span {
		color: var(--ink-400);
		font-size: 0.88rem;
	}

	.row__pill {
		flex-shrink: 0;
		font-size: 0.75rem;
		font-weight: 600;
		color: var(--gold-600);
		background: var(--orange-100);
		border-radius: 999px;
		padding: 0.2rem 0.65rem;
	}

	.row__arrow {
		color: var(--gold-600);
		font-weight: 600;
	}
</style>
