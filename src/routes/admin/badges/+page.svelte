<script lang="ts">
	import { enhance } from '$app/forms';

	let { data, form } = $props();
</script>

<svelte:head>
	<title>Badges | Admin</title>
</svelte:head>

<div class="head">
	<h1>Badges</h1>
</div>

<p class="intro">
	The accreditation and partnership logos shown in the strip on the homepage. Untick
	<strong>Shown on site</strong> to take one off the site without deleting it (e.g. while an
	accreditation lapses) — you can bring it back any time.
</p>

{#if form?.saved}
	<p class="ok" role="status">Saved. <a href="/" target="_blank" rel="noopener">View the homepage ↗</a></p>
{/if}
{#if form?.error}
	<p class="err" role="alert">{form.error}</p>
{/if}

{#if !data.configured}
	<p class="warn">Supabase is not connected yet — see the dashboard for setup steps.</p>
{:else if data.missing}
	<p class="warn">
		The badges table doesn't exist yet. Run <code>supabase/2026-08-31-badges.sql</code> in the
		Supabase SQL editor (additive only — it doesn't touch any existing data), then reload this
		page. Until then the homepage shows the original built-in badges.
	</p>
{:else}
	{#if data.badges.length === 0}
		<p>No badges — the homepage strip is hidden. Add one below to bring it back.</p>
	{:else}
		<ul class="list">
			{#each data.badges as b (b.id)}
				<li class="card row" class:row--hidden={!b.visible}>
					<form
						class="row__form"
						method="POST"
						action="?/save"
						enctype="multipart/form-data"
						use:enhance
					>
						<input type="hidden" name="id" value={b.id} />
						<span class="row__img">
							{#if b.image_url}
								<img src={b.image_url} alt={b.label} />
							{:else}
								<span class="row__placeholder">No image</span>
							{/if}
						</span>
						<div class="row__fields">
							<label class="row__label">
								Name <span>(shown to screen readers as the image's alt text)</span>
								<input name="label" required value={b.label} />
							</label>
							<div class="row__controls">
								<label class="row__order">
									Sort order <span>(lower = first)</span>
									<input name="sort_order" type="number" value={b.sort_order} />
								</label>
								<label class="row__visible">
									<input type="checkbox" name="visible" checked={b.visible} />
									Shown on site
								</label>
								<label class="row__file">
									Replace image
									<input type="file" name="image" accept="image/*" />
								</label>
							</div>
						</div>
						<button class="btn btn--primary row__save" type="submit">Save</button>
					</form>
					<form
						method="POST"
						action="?/delete"
						onsubmit={(e) => {
							if (!confirm(`Delete "${b.label}"? This cannot be undone — use "Shown on site" to hide it instead if you might want it back.`))
								e.preventDefault();
						}}
					>
						<input type="hidden" name="id" value={b.id} />
						<button class="danger" type="submit">Delete</button>
					</form>
				</li>
			{/each}
		</ul>
	{/if}

	<h2 class="add-title">Add a badge</h2>
	<form class="card add" method="POST" action="?/create" enctype="multipart/form-data" use:enhance>
		<label>
			Name <span>(e.g. "SafeContractor accreditation" — used as the alt text)</span>
			<input name="label" required placeholder="New accreditation" />
		</label>
		<label>
			Logo image <span>(PNG with transparency works best, under 4 MB)</span>
			<input type="file" name="image" accept="image/*" required />
		</label>
		<div>
			<button class="btn btn--primary" type="submit">+ Add badge</button>
		</div>
	</form>
{/if}

<style>
	.head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		flex-wrap: wrap;
		margin-bottom: 0.4rem;
	}

	.head h1 {
		margin: 0;
	}

	.intro {
		color: var(--ink-600);
		max-width: 46rem;
		margin-bottom: 1.4rem;
	}

	.ok {
		background: #eef7ee;
		border: 1px solid #cfe6cf;
		border-radius: var(--radius);
		padding: 0.7rem 1rem;
		max-width: 46rem;
	}

	.err {
		background: #fdf1ee;
		border: 1px solid #f0cfc7;
		color: #a33a2a;
		border-radius: var(--radius);
		padding: 0.7rem 1rem;
		max-width: 46rem;
	}

	.warn {
		background: #fdf6ec;
		border: 1px solid #f0dfc0;
		border-radius: var(--radius);
		padding: 0.9rem 1.1rem;
		color: var(--ink-600);
		max-width: 46rem;
	}

	.list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: 0.8rem;
		max-width: 56rem;
	}

	.row {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 1rem 1.2rem;
	}

	.row--hidden {
		opacity: 0.6;
	}

	.row__form {
		display: flex;
		align-items: center;
		gap: 1.2rem;
		flex: 1;
		flex-wrap: wrap;
	}

	.row__img img {
		height: 56px;
		width: auto;
		max-width: 110px;
		object-fit: contain;
	}

	.row__placeholder {
		display: grid;
		place-items: center;
		width: 80px;
		height: 56px;
		background: var(--tint);
		border: 1px dashed var(--line);
		border-radius: var(--radius);
		color: var(--ink-400);
		font-size: 0.8rem;
	}

	.row__fields {
		display: grid;
		gap: 0.6rem;
		flex: 1;
		min-width: 240px;
	}

	.row__controls {
		display: flex;
		align-items: end;
		gap: 1.2rem;
		flex-wrap: wrap;
	}

	label {
		display: grid;
		gap: 0.3rem;
		font-size: 0.88rem;
		font-weight: 600;
	}

	label span {
		font-weight: 400;
		color: var(--ink-400);
	}

	input:not([type='checkbox']):not([type='file']) {
		font: inherit;
		font-weight: 400;
		padding: 0.55rem 0.75rem;
		border: 1px solid var(--line);
		border-radius: var(--radius);
		width: 100%;
	}

	input:focus {
		outline: 2px solid var(--orange-500);
		outline-offset: 1px;
	}

	.row__order input {
		max-width: 110px;
	}

	.row__visible {
		display: flex;
		align-items: center;
		gap: 0.45rem;
		padding-bottom: 0.55rem;
	}

	.row__visible input {
		width: 1.05rem;
		height: 1.05rem;
		accent-color: var(--orange-500);
	}

	.row__file input {
		font-size: 0.82rem;
	}

	.row__save {
		padding: 0.5rem 1.3rem;
		font-size: 0.88rem;
	}

	.danger {
		font: inherit;
		font-size: 0.85rem;
		color: #a33a2a;
		background: none;
		border: 1px solid #e5b8ae;
		border-radius: 999px;
		padding: 0.4rem 1rem;
		cursor: pointer;
		white-space: nowrap;
	}

	.danger:hover {
		background: #fdf1ee;
	}

	.add-title {
		font-size: 1.1rem;
		margin: 2rem 0 0.8rem;
	}

	.add {
		display: grid;
		gap: 1rem;
		padding: 1.4rem 1.6rem;
		max-width: 46rem;
	}
</style>
