<script lang="ts">
	import { enhance } from '$app/forms';
	import ImagePicker from '$lib/components/admin/ImagePicker.svelte';

	let { data, form } = $props();

	let pickerOpen = $state(false);
	// Seeded once; the picker adds new uploads to this list itself.
	const initialUploads = () => [...data.uploaded];
	let uploaded = $state<string[]>(initialUploads());
	let pickedUrl = $state('');
	let addForm: HTMLFormElement | undefined = $state();

	const visibleCount = $derived(data.slides.filter((s) => s.visible).length);

	function onpick(url: string) {
		pickedUrl = url;
		// Wait for the hidden input to update before submitting.
		queueMicrotask(() => addForm?.requestSubmit());
	}
</script>

<svelte:head>
	<title>Slideshow | Admin</title>
</svelte:head>

<div class="head">
	<h1>Homepage slideshow</h1>
	{#if data.configured && !data.missing}
		<button class="btn btn--primary" type="button" onclick={() => (pickerOpen = true)}>
			+ Add photo
		</button>
	{/if}
</div>
<p class="hint">
	The photos that rotate at the top of the homepage, in this order. Pick from any project gallery
	or upload new ones. Landscape photos work best — they’re shown in a 4:3 frame.
</p>

{#if !data.configured}
	<p class="warn">Supabase is not connected yet — see the dashboard for setup steps.</p>
{:else if data.missing}
	<p class="warn">
		The slideshow needs a one-off database update: open the Supabase SQL editor, paste the contents
		of <code>supabase/2026-09-25-home-slides.sql</code> and run it.
	</p>
{/if}
{#if form?.error}
	<p class="err" role="alert">{form.error}</p>
{/if}
{#if data.configured && !data.missing && visibleCount === 0}
	<p class="warn">
		No photos are showing, so the homepage is using its standard photo. Add or show a photo to
		start the slideshow.
	</p>
{:else if visibleCount === 1}
	<p class="hint">Only one photo is showing, so it won’t rotate — add another to start the slideshow.</p>
{/if}

<form method="POST" action="?/add" bind:this={addForm} use:enhance hidden>
	<input type="hidden" name="image_url" value={pickedUrl} />
</form>

<ul class="list">
	{#each data.slides as s, i (s.id)}
		<li class="card row" class:row--hidden={!s.visible}>
			<div class="row__move">
				<form method="POST" action="?/move" use:enhance>
					<input type="hidden" name="id" value={s.id} />
					<input type="hidden" name="delta" value="-1" />
					<button disabled={i === 0} title="Move up" aria-label="Move photo {i + 1} up">▲</button>
				</form>
				<form method="POST" action="?/move" use:enhance>
					<input type="hidden" name="id" value={s.id} />
					<input type="hidden" name="delta" value="1" />
					<button
						disabled={i === data.slides.length - 1}
						title="Move down"
						aria-label="Move photo {i + 1} down">▼</button
					>
				</form>
			</div>
			<img src={s.image_url} alt="" />
			<form
				class="row__alt"
				method="POST"
				action="?/saveAlt"
				use:enhance={() =>
					async ({ update }) => {
						await update({ reset: false });
					}}
			>
				<input type="hidden" name="id" value={s.id} />
				<label>
					<span>Description{#if !s.visible}<span class="row__pill">Hidden</span>{/if}</span>
					<input name="alt" value={s.alt} placeholder="e.g. Oak-frame extension in Godalming" />
				</label>
				<button class="row__btn" type="submit">Save</button>
			</form>
			<div class="row__actions">
				<form method="POST" action="?/toggleVisible" use:enhance>
					<input type="hidden" name="id" value={s.id} />
					<input type="hidden" name="visible" value={s.visible ? 'false' : 'true'} />
					<button class="row__btn">{s.visible ? 'Hide' : 'Show'}</button>
				</form>
				<form
					method="POST"
					action="?/remove"
					use:enhance
					onsubmit={(e) => {
						if (!confirm('Remove this photo from the slideshow? (The photo itself is not deleted.)'))
							e.preventDefault();
					}}
				>
					<input type="hidden" name="id" value={s.id} />
					<button class="row__btn row__btn--danger" aria-label="Remove photo {i + 1}">Remove</button>
				</form>
			</div>
		</li>
	{/each}
</ul>

<ImagePicker bind:open={pickerOpen} bind:uploaded groups={data.siteImages} canUpload={data.configured} {onpick} />

<style>
	.head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		flex-wrap: wrap;
		margin-bottom: 0.6rem;
		max-width: 56rem;
	}

	.head h1 {
		margin: 0;
	}

	.hint {
		color: var(--ink-400);
		font-size: 0.92rem;
		max-width: 56rem;
		margin: 0 0 1.1rem;
	}

	.warn,
	.err {
		border-radius: var(--radius);
		padding: 0.8rem 1.1rem;
		max-width: 56rem;
		margin-bottom: 1.1rem;
	}

	.warn {
		background: #fdf6ec;
		border: 1px solid #f0dfc0;
		color: var(--ink-600);
	}

	.err {
		background: #fdf1ee;
		border: 1px solid #f0cfc7;
		color: #a33a2a;
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
		padding: 0.8rem 1.1rem;
		flex-wrap: wrap;
	}

	.row--hidden {
		background: #faf9f7;
	}

	.row--hidden img {
		opacity: 0.5;
	}

	.row img {
		width: 120px;
		aspect-ratio: 4 / 3;
		object-fit: cover;
		border-radius: var(--radius);
		border: 1px solid var(--line);
		flex-shrink: 0;
	}

	.row__move {
		display: grid;
		gap: 0.2rem;
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

	.row__move button:disabled {
		opacity: 0.3;
		cursor: default;
	}

	.row__alt {
		flex: 1;
		min-width: 220px;
		display: flex;
		align-items: end;
		gap: 0.5rem;
	}

	.row__alt label {
		flex: 1;
		display: grid;
		gap: 0.25rem;
		font-size: 0.82rem;
		font-weight: 600;
		color: var(--ink-600);
	}

	.row__alt input {
		font: inherit;
		font-weight: 400;
		font-size: 0.92rem;
		padding: 0.5rem 0.75rem;
		border: 1px solid var(--line);
		border-radius: var(--radius);
		width: 100%;
	}

	.row__actions {
		display: flex;
		gap: 0.4rem;
	}

	.row__btn {
		font: inherit;
		font-size: 0.85rem;
		color: var(--ink-600);
		background: #fff;
		border: 1px solid var(--line);
		border-radius: 999px;
		padding: 0.4rem 0.95rem;
		cursor: pointer;
	}

	.row__btn:hover {
		border-color: var(--ink-900);
		color: var(--ink-900);
	}

	.row__btn--danger {
		color: #a33a2a;
		border-color: #e5b8ae;
	}

	.row__pill {
		display: inline-block;
		margin-left: 0.3rem;
		font-size: 0.66rem;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		background: var(--tint);
		border: 1px solid var(--line);
		border-radius: 999px;
		padding: 0.05rem 0.45rem;
	}
</style>
