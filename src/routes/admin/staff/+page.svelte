<script lang="ts">
	let { data } = $props();
</script>

<svelte:head>
	<title>Staff | Admin</title>
</svelte:head>

<div class="head">
	<h1>Staff</h1>
	{#if data.configured}
		<form method="POST" action="?/create">
			<button class="btn btn--primary" type="submit">+ Add team member</button>
		</form>
	{/if}
</div>

{#if !data.configured}
	<p>Supabase is not connected yet — see the dashboard for setup steps.</p>
{:else if data.members.length === 0}
	<p>No team members yet. The seed data may not have been run — or add your first member above.</p>
{:else}
	<ul class="list">
		{#each data.members as m (m.id)}
			<li class="card row">
				{#if m.photo_url}
					<img src={m.photo_url} alt="" />
				{:else}
					<span class="row__placeholder" aria-hidden="true"></span>
				{/if}
				<div class="row__text">
					<strong>{m.name}</strong>
					<span>{m.role || '—'}</span>
				</div>
				<span class="row__order" title="Sort order">#{m.sort_order}</span>
				<a class="btn btn--outline row__edit" href="/admin/staff/{m.id}">Edit</a>
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
		width: 48px;
		height: 48px;
		border-radius: 999px;
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
