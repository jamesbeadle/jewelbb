<script lang="ts">
	import { enhance } from '$app/forms';

	let { data, form } = $props();

	const project = $derived(data.project);
</script>

<svelte:head>
	<title>Edit {project.name} | Admin</title>
</svelte:head>

<nav class="crumbs"><a href="/admin/projects">← All projects</a></nav>
<h1>Edit project</h1>

{#if form?.saved}
	<p class="ok" role="status">
		Saved. <a href="/{project.slug}" target="_blank" rel="noopener">View the project page ↗</a>
	</p>
{/if}
{#if form?.error}
	<p class="err" role="alert">{form.error}</p>
{/if}

<form class="card editor" method="POST" action="?/save" use:enhance>
	<div class="editor__grid">
		<label>
			Name
			<input name="name" required value={project.name} />
		</label>
		<label>
			Slug <span>(the page address: /slug)</span>
			<input name="slug" value={project.slug} />
		</label>
	</div>
	<label>
		Subtitle
		<input name="subtitle" value={project.subtitle} />
	</label>
	<label>
		Description
		<textarea name="description" rows="7">{project.description}</textarea>
	</label>
	<div class="editor__grid">
		<label>
			Meta title <span>(browser tab & Google)</span>
			<input name="meta_title" value={project.meta_title} />
		</label>
		<label>
			Meta description <span>(Google snippet)</span>
			<input name="meta_description" value={project.meta_description} />
		</label>
	</div>
	<div class="editor__grid editor__grid--tight">
		<label>
			Cross-link project <span>(“view our other project…”)</span>
			<select name="cross_link">
				<option value="">— none —</option>
				{#each data.others as o (o.slug)}
					<option value={o.slug} selected={o.slug === project.cross_link}>{o.name}</option>
				{/each}
			</select>
		</label>
		<label class="editor__order">
			Sort order <span>(lower = shown first)</span>
			<input name="sort_order" type="number" value={project.sort_order} />
		</label>
		<label class="editor__check">
			<input type="checkbox" name="accessible" checked={project.accessible} />
			Accessible living project
		</label>
	</div>
	<div>
		<button class="btn btn--primary" type="submit">Save changes</button>
	</div>
</form>

<section class="card gallery-card">
	<h2>Gallery <span class="muted">({project.gallery?.length ?? 0} photos — the first is the cover)</span></h2>

	{#if project.gallery?.length}
		<ul class="gal">
			{#each project.gallery as src, i (src + i)}
				<li class="gal__item">
					<img {src} alt="Photo {i + 1}" loading="lazy" />
					<div class="gal__tools">
						<form method="POST" action="?/movePhoto" use:enhance>
							<input type="hidden" name="index" value={i} />
							<input type="hidden" name="delta" value="-1" />
							<button title="Move earlier" disabled={i === 0} aria-label="Move photo {i + 1} earlier">←</button>
						</form>
						<form method="POST" action="?/movePhoto" use:enhance>
							<input type="hidden" name="index" value={i} />
							<input type="hidden" name="delta" value="1" />
							<button
								title="Move later"
								disabled={i === project.gallery.length - 1}
								aria-label="Move photo {i + 1} later">→</button
							>
						</form>
						<form
							method="POST"
							action="?/removePhoto"
							use:enhance
							onsubmit={(e) => {
								if (!confirm('Remove this photo from the gallery?')) e.preventDefault();
							}}
						>
							<input type="hidden" name="index" value={i} />
							<button class="gal__remove" title="Remove" aria-label="Remove photo {i + 1}">×</button>
						</form>
					</div>
					{#if i === 0}<span class="gal__cover">Cover</span>{/if}
				</li>
			{/each}
		</ul>
	{:else}
		<p class="muted">No photos yet — upload some below.</p>
	{/if}

	<form class="upload" method="POST" action="?/addPhotos" enctype="multipart/form-data" use:enhance>
		<label class="upload__file">
			Add photos <span>(up to 4 MB per upload — repeat for more)</span>
			<input type="file" name="photos" accept="image/*" multiple />
		</label>
		<button class="btn btn--outline" type="submit">Upload</button>
	</form>
</section>

<form
	method="POST"
	action="?/delete"
	onsubmit={(e) => {
		if (!confirm('Delete this project and its page? This cannot be undone.')) e.preventDefault();
	}}
>
	<button class="danger" type="submit">Delete this project</button>
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
		max-width: 56rem;
	}

	.err {
		background: #fdf1ee;
		border: 1px solid #f0cfc7;
		color: #a33a2a;
		border-radius: var(--radius);
		padding: 0.7rem 1rem;
		max-width: 56rem;
	}

	.editor {
		display: grid;
		gap: 1rem;
		padding: 1.8rem;
		max-width: 56rem;
	}

	.editor__grid {
		display: grid;
		gap: 1rem;
	}

	@media (min-width: 700px) {
		.editor__grid {
			grid-template-columns: 1fr 1fr;
		}

		.editor__grid--tight {
			grid-template-columns: 1fr auto auto;
			align-items: end;
		}
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
	textarea,
	select {
		font: inherit;
		font-weight: 400;
		padding: 0.65rem 0.85rem;
		border: 1px solid var(--line);
		border-radius: var(--radius);
		width: 100%;
		background: #fff;
	}

	input:focus,
	textarea:focus,
	select:focus {
		outline: 2px solid var(--orange-500);
		outline-offset: 1px;
	}

	.editor__order input {
		max-width: 120px;
	}

	.editor__check {
		grid-auto-flow: column;
		align-items: center;
		justify-content: start;
		gap: 0.5rem;
		padding-bottom: 0.65rem;
	}

	.editor__check input {
		width: auto;
	}

	.gallery-card {
		margin-top: 1.6rem;
		padding: 1.8rem;
		max-width: 56rem;
	}

	.gallery-card h2 {
		font-size: 1.15rem;
		margin-bottom: 1rem;
	}

	.muted {
		color: var(--ink-400);
		font-weight: 400;
		font-size: 0.9rem;
	}

	.gal {
		list-style: none;
		margin: 0 0 1.2rem;
		padding: 0;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
		gap: 0.8rem;
	}

	.gal__item {
		position: relative;
		border-radius: var(--radius);
		overflow: hidden;
		border: 1px solid var(--line);
	}

	.gal__item img {
		width: 100%;
		aspect-ratio: 4 / 3;
		object-fit: cover;
		display: block;
	}

	.gal__tools {
		position: absolute;
		inset-inline: 0;
		bottom: 0;
		display: flex;
		justify-content: center;
		gap: 0.35rem;
		padding: 0.35rem;
		background: linear-gradient(transparent, rgba(13, 20, 30, 0.65));
	}

	.gal__tools button {
		font: inherit;
		font-size: 0.85rem;
		line-height: 1;
		width: 28px;
		height: 28px;
		border-radius: 999px;
		border: 0;
		background: rgba(255, 255, 255, 0.9);
		cursor: pointer;
	}

	.gal__tools button:disabled {
		opacity: 0.4;
		cursor: default;
	}

	.gal__remove {
		color: #a33a2a;
		font-weight: 700;
	}

	.gal__cover {
		position: absolute;
		top: 0.4rem;
		left: 0.4rem;
		font-size: 0.7rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		background: var(--gold-600, #b8860b);
		color: #fff;
		border-radius: 999px;
		padding: 0.15rem 0.55rem;
	}

	.upload {
		display: flex;
		align-items: end;
		gap: 1rem;
		flex-wrap: wrap;
	}

	.upload__file {
		flex: 1;
		min-width: 240px;
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
