<script lang="ts">
	let { data } = $props();
</script>

<svelte:head>
	<title>Brochure | Admin</title>
</svelte:head>

<div class="head">
	<h1>Brochure</h1>
	<div class="head__actions">
		<a class="btn btn--outline" href="/brochure" target="_blank" rel="noopener">Preview ↗</a>
		{#if data.configured}
			<form method="POST" action="?/create">
				<button class="btn btn--primary" type="submit">+ Add section</button>
			</form>
		{/if}
	</div>
</div>

<p class="hint">
	Each section is a page of the brochure. Visitors read it at <code>/brochure</code> and can save
	it as a PDF from there.
</p>

{#if !data.configured}
	<p>Supabase is not connected yet — see the dashboard for setup steps.</p>
{:else if data.sections.length === 0}
	<p>No sections yet. Run the seed SQL, or add your first section above.</p>
{:else}
	<ul class="list">
		{#each data.sections as s (s.id)}
			<li class="card row">
				<div class="row__text">
					<strong>{s.title || 'Untitled'}</strong>
					<span>{s.subtitle || (s.body ? s.body.slice(0, 70) + '…' : 'Empty')}</span>
				</div>
				<span class="row__order" title="Sort order">#{s.sort_order}</span>
				<a class="btn btn--outline row__edit" href="/admin/brochure/{s.id}">Edit</a>
			</li>
		{/each}
	</ul>
{/if}

<style>
	.head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		flex-wrap: wrap;
	}

	.head h1 {
		margin: 0;
	}

	.head__actions {
		display: flex;
		gap: 0.8rem;
		align-items: center;
	}

	.hint {
		color: var(--ink-600);
		margin-block: 0.8rem 1.4rem;
		max-width: 46rem;
	}

	.list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: 0.8rem;
		max-width: 46rem;
	}

	.row {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 0.8rem 1.1rem;
	}

	.row__text {
		display: grid;
		margin-right: auto;
		min-width: 0;
	}

	.row__text span {
		color: var(--ink-400);
		font-size: 0.88rem;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.row__order {
		color: var(--ink-400);
		font-size: 0.85rem;
	}

	.row__edit {
		padding: 0.45rem 1.1rem;
		font-size: 0.88rem;
	}
</style>
