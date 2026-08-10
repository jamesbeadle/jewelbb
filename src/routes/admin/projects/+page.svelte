<script lang="ts">
	let { data } = $props();
</script>

<svelte:head>
	<title>Projects | Admin</title>
</svelte:head>

<div class="head">
	<h1>Projects</h1>
	{#if data.configured}
		<form method="POST" action="?/create">
			<button class="btn btn--primary" type="submit">+ Add project</button>
		</form>
	{/if}
</div>

{#if !data.configured}
	<p>Supabase is not connected yet — see the dashboard for setup steps.</p>
{:else if data.projects.length === 0}
	<p>No projects yet. The seed data may not have been run — or add your first project above.</p>
{:else}
	<ul class="list">
		{#each data.projects as p (p.id)}
			<li class="card row">
				{#if p.gallery?.[0]}
					<img src={p.gallery[0]} alt="" />
				{:else}
					<span class="row__placeholder" aria-hidden="true"></span>
				{/if}
				<div class="row__text">
					<strong>{p.name}</strong>
					<span>/{p.slug} · {p.gallery?.length ?? 0} photos{p.accessible ? ' · accessible living' : ''}</span>
				</div>
				<span class="row__order" title="Sort order">#{p.sort_order}</span>
				<a class="btn btn--outline row__edit" href="/admin/projects/{p.id}">Edit</a>
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
		margin-bottom: 1.4rem;
	}

	.head h1 {
		margin: 0;
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

	.row img,
	.row__placeholder {
		width: 72px;
		height: 48px;
		border-radius: var(--radius);
		object-fit: cover;
		background: var(--tint);
		border: 1px solid var(--line);
		flex-shrink: 0;
	}

	.row__text {
		display: grid;
		margin-right: auto;
	}

	.row__text span {
		color: var(--ink-400);
		font-size: 0.88rem;
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
