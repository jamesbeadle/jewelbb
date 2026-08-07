<script lang="ts">
	import { enhance } from '$app/forms';

	let { data, form } = $props();
</script>

<svelte:head>
	<title>Edit brochure section | Admin</title>
</svelte:head>

<nav class="crumbs"><a href="/admin/brochure">← All sections</a></nav>
<h1>Edit brochure section</h1>

{#if form?.saved}
	<p class="ok" role="status">Saved. <a href="/brochure" target="_blank" rel="noopener">Preview the brochure ↗</a></p>
{/if}
{#if form?.error}
	<p class="err" role="alert">{form.error}</p>
{/if}

<form class="card editor" method="POST" action="?/save" enctype="multipart/form-data" use:enhance>
	<label>
		Title
		<input name="title" value={data.section.title} />
	</label>
	<label>
		Subtitle <span>(optional, shown under the title)</span>
		<input name="subtitle" value={data.section.subtitle} />
	</label>
	<label>
		Body <span>(markdown — **bold**, - bullet lists, blank line = new paragraph)</span>
		<textarea name="body" rows="12">{data.section.body}</textarea>
	</label>

	<div class="editor__imagerow">
		{#if data.section.image_url}
			<img class="editor__thumb" src={data.section.image_url} alt="" />
			<label class="editor__check">
				<input type="checkbox" name="remove_image" /> Remove current image
			</label>
		{/if}
		<label>
			{data.section.image_url ? 'Replace image' : 'Add image'} <span>(optional)</span>
			<input type="file" name="image" accept="image/*" />
		</label>
	</div>

	<label class="editor__order">
		Sort order <span>(lower = earlier page)</span>
		<input name="sort_order" type="number" value={data.section.sort_order} />
	</label>

	<div>
		<button class="btn btn--primary" type="submit">Save changes</button>
	</div>
</form>

<form
	method="POST"
	action="?/delete"
	onsubmit={(e) => {
		if (!confirm('Delete this section? This cannot be undone.')) e.preventDefault();
	}}
>
	<button class="danger" type="submit">Delete this section</button>
</form>

<style>
	.crumbs {
		margin-bottom: 0.6rem;
	}

	.crumbs a {
		color: var(--ink-600);
		text-decoration: none;
		font-size: 0.92rem;
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

	.editor {
		display: grid;
		gap: 1.1rem;
		padding: 1.8rem;
		max-width: 46rem;
	}

	label {
		display: grid;
		gap: 0.3rem;
		font-size: 0.92rem;
		font-weight: 600;
	}

	label span {
		font-weight: 400;
		color: var(--ink-400);
	}

	input,
	textarea {
		font: inherit;
		font-weight: 400;
		padding: 0.65rem 0.85rem;
		border: 1px solid var(--line);
		border-radius: var(--radius);
		width: 100%;
	}

	textarea {
		font-family: ui-monospace, 'SF Mono', Menlo, monospace;
		font-size: 0.9rem;
		line-height: 1.55;
	}

	input:focus,
	textarea:focus {
		outline: 2px solid var(--orange-500);
		outline-offset: 1px;
	}

	.editor__imagerow {
		display: grid;
		gap: 0.8rem;
	}

	.editor__thumb {
		max-width: 260px;
		border-radius: var(--radius);
		border: 1px solid var(--line);
	}

	.editor__check {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-weight: 400;
	}

	.editor__check input {
		width: auto;
	}

	.editor__order input {
		max-width: 120px;
	}

	.danger {
		margin-top: 1.4rem;
		font: inherit;
		font-size: 0.88rem;
		color: #a33a2a;
		background: none;
		border: 1px solid #e5b8ae;
		border-radius: 999px;
		padding: 0.45rem 1.1rem;
		cursor: pointer;
	}

	.danger:hover {
		background: #fdf1ee;
	}
</style>
