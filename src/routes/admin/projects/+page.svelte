<script lang="ts">
	import { enhance } from '$app/forms';

	let { data, form } = $props();
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

{#if form?.error}
	<p class="err" role="alert">{form.error}</p>
{/if}

{#if !data.configured}
	<p>Supabase is not connected yet — see the dashboard for setup steps.</p>
{:else if data.projects.length === 0}
	<p>No projects yet. The seed data may not have been run — or add your first project above.</p>
{:else}
	<p class="hint">
		Use the arrows to change the order projects appear in on the website. Hidden projects are
		kept here but taken off the site until you show them again.
	</p>
	<ul class="list">
		{#each data.projects as p, i (p.id)}
			{@const hidden = p.visible === false}
			<li class="card row" class:row--hidden={hidden}>
				<div class="row__move">
					<form method="POST" action="?/move" use:enhance>
						<input type="hidden" name="id" value={p.id} />
						<input type="hidden" name="delta" value="-1" />
						<button disabled={i === 0} title="Move up" aria-label="Move {p.name} up">▲</button>
					</form>
					<form method="POST" action="?/move" use:enhance>
						<input type="hidden" name="id" value={p.id} />
						<input type="hidden" name="delta" value="1" />
						<button
							disabled={i === data.projects.length - 1}
							title="Move down"
							aria-label="Move {p.name} down">▼</button
						>
					</form>
				</div>
				{#if p.gallery?.[0]}
					<img src={p.gallery[0]} alt="" />
				{:else}
					<span class="row__placeholder" aria-hidden="true"></span>
				{/if}
				<div class="row__text">
					<strong>
						{p.name}
						{#if hidden}<span class="row__pill">Hidden</span>{/if}
					</strong>
					<span>/{p.slug} · {p.gallery?.length ?? 0} photos{p.accessible ? ' · accessible living' : ''}</span>
				</div>
				<form method="POST" action="?/toggleVisible" use:enhance>
					<input type="hidden" name="id" value={p.id} />
					<input type="hidden" name="visible" value={hidden ? 'true' : 'false'} />
					<button
						class="row__toggle"
						title={hidden ? 'Put this project back on the website' : 'Take this project off the website without deleting it'}
					>
						{hidden ? 'Show' : 'Hide'}
					</button>
				</form>
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

	.hint {
		color: var(--ink-400);
		font-size: 0.92rem;
		max-width: 46rem;
		margin: -0.6rem 0 1.1rem;
	}

	.err {
		background: #fdf1ee;
		border: 1px solid #f0cfc7;
		color: #a33a2a;
		border-radius: var(--radius);
		padding: 0.7rem 1rem;
		max-width: 46rem;
	}

	.row--hidden {
		background: #faf9f7;
	}

	.row--hidden img,
	.row--hidden .row__text {
		opacity: 0.55;
	}

	.row__move {
		display: grid;
		gap: 0.2rem;
		flex-shrink: 0;
	}

	.row__move button {
		font: inherit;
		font-size: 0.62rem;
		line-height: 1;
		width: 28px;
		height: 22px;
		border-radius: 6px;
		border: 1px solid var(--line);
		background: #fff;
		color: var(--ink-600);
		cursor: pointer;
	}

	.row__move button:hover:not(:disabled) {
		border-color: var(--ink-900);
		color: var(--ink-900);
	}

	.row__move button:disabled {
		opacity: 0.3;
		cursor: default;
	}

	.row__pill {
		display: inline-block;
		margin-left: 0.4rem;
		font-family: var(--font-body);
		font-size: 0.68rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: var(--ink-600);
		background: var(--tint);
		border: 1px solid var(--line);
		border-radius: 999px;
		padding: 0.1rem 0.5rem;
		vertical-align: middle;
	}

	.row__toggle {
		font: inherit;
		font-size: 0.85rem;
		color: var(--ink-600);
		background: none;
		border: 1px solid var(--line);
		border-radius: 999px;
		padding: 0.4rem 0.95rem;
		cursor: pointer;
	}

	.row__toggle:hover {
		border-color: var(--ink-900);
		color: var(--ink-900);
	}

	@media (max-width: 560px) {
		.row {
			flex-wrap: wrap;
		}

		.row__text {
			flex-basis: calc(100% - 140px);
		}
	}

	.row__edit {
		padding: 0.45rem 1.1rem;
		font-size: 0.88rem;
	}
</style>
