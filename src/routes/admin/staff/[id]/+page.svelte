<script lang="ts">
	import { enhance } from '$app/forms';

	let { data, form } = $props();
</script>

<svelte:head>
	<title>Edit {data.member.name} | Admin</title>
</svelte:head>

<nav class="crumbs"><a href="/admin/staff">← All staff</a></nav>
<h1>Edit team member</h1>

{#if form?.saved}
	<p class="ok" role="status">Saved. <a href="/about" target="_blank" rel="noopener">View the About page ↗</a></p>
{/if}
{#if form?.error}
	<p class="err" role="alert">{form.error}</p>
{/if}

<form class="card editor" method="POST" action="?/save" enctype="multipart/form-data" use:enhance>
	<div class="editor__photo">
		{#if data.member.photo_url}
			<img src={data.member.photo_url} alt={data.member.name} />
		{:else}
			<span class="editor__placeholder">No photo</span>
		{/if}
		<label class="editor__file">
			Replace photo
			<input type="file" name="photo" accept="image/*" />
		</label>
	</div>

	<div class="editor__fields">
		<label>
			Name
			<input name="name" required value={data.member.name} />
		</label>
		<label>
			Role
			<input name="role" value={data.member.role} />
		</label>
		<label>
			Bio
			<textarea name="bio" rows="6">{data.member.bio}</textarea>
		</label>
		<label class="editor__order">
			Sort order <span>(lower = shown first)</span>
			<input name="sort_order" type="number" value={data.member.sort_order} />
		</label>
		<div class="editor__actions">
			<button class="btn btn--primary" type="submit">Save changes</button>
		</div>
	</div>
</form>

<form
	method="POST"
	action="?/delete"
	onsubmit={(e) => {
		if (!confirm('Delete this team member? This cannot be undone.')) e.preventDefault();
	}}
>
	<button class="danger" type="submit">Delete this team member</button>
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
		gap: 1.8rem;
		padding: 1.8rem;
		max-width: 46rem;
	}

	@media (min-width: 700px) {
		.editor {
			grid-template-columns: 180px 1fr;
		}
	}

	.editor__photo {
		display: grid;
		gap: 0.8rem;
		align-content: start;
		justify-items: center;
	}

	.editor__photo img {
		width: 140px;
		height: 140px;
		border-radius: 999px;
		object-fit: cover;
		border: 2px solid var(--gold-300);
	}

	.editor__placeholder {
		display: grid;
		place-items: center;
		width: 140px;
		height: 140px;
		border-radius: 999px;
		background: var(--tint);
		border: 1px dashed var(--line);
		color: var(--ink-400);
		font-size: 0.88rem;
	}

	.editor__file {
		font-size: 0.88rem;
		font-weight: 600;
		display: grid;
		gap: 0.3rem;
		justify-items: center;
	}

	.editor__fields {
		display: grid;
		gap: 1rem;
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

	input:focus,
	textarea:focus {
		outline: 2px solid var(--orange-500);
		outline-offset: 1px;
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
