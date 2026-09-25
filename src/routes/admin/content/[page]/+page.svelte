<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ContentField } from '$lib/content/pages';

	let { data, form } = $props();

	const page = $derived(data.page);
	const seoFields = $derived(page.fields.filter((f) => f.key.startsWith('seo_')));
	const bodyFields = $derived(page.fields.filter((f) => !f.key.startsWith('seo_')));

	function initial(): Record<string, string> {
		const next: Record<string, string> = {};
		for (const f of data.page.fields) next[f.key] = data.saved[f.key] ?? f.default;
		return next;
	}

	let values = $state(initial());

	// Re-sync the form whenever the saved content changes (save, reset, navigation).
	const snapshot = () => [data.page.key, data.saved] as const;
	let synced = $state.raw(snapshot());
	$effect.pre(() => {
		const now = snapshot();
		if (synced[0] !== now[0] || synced[1] !== now[1]) {
			synced = now;
			values = initial();
		}
	});

	function changed(f: ContentField): boolean {
		return (values[f.key] ?? '').trim() !== f.default.trim();
	}

	function rows(f: ContentField): number {
		const text = values[f.key] ?? f.default;
		const estimate = text.split('\n').reduce((n, l) => n + Math.max(1, Math.ceil(l.length / 85)), 0);
		return Math.min(14, Math.max(3, estimate + 1));
	}
</script>

<svelte:head>
	<title>{page.label} text | Admin</title>
</svelte:head>

{#snippet field(f: ContentField)}
	<div class="field">
		<div class="field__head">
			<label for="f-{f.key}">{f.label}</label>
			{#if changed(f)}
				<span class="field__edited">Edited</span>
				<button type="button" class="field__restore" onclick={() => (values[f.key] = f.default)}>
					Restore original
				</button>
			{/if}
		</div>
		{#if f.help}<p class="field__help">{f.help}</p>{/if}
		{#if f.type === 'textarea'}
			<textarea id="f-{f.key}" name={f.key} rows={rows(f)} bind:value={values[f.key]}></textarea>
		{:else}
			<input id="f-{f.key}" name={f.key} bind:value={values[f.key]} />
		{/if}
	</div>
{/snippet}

<nav class="crumbs"><a href="/admin/content">← All pages</a></nav>
<div class="head">
	<h1>{page.label}</h1>
	{#if page.path}
		<a class="btn btn--outline head__view" href={page.path} target="_blank" rel="noopener">View page ↗</a>
	{/if}
</div>
<p class="blurb">{page.blurb}</p>

{#if !data.configured}
	<p class="err">Supabase is not connected yet — changes can’t be saved.</p>
{:else if data.missing}
	<p class="err">
		Page text needs a one-off database update: run
		<code>supabase/2026-09-25-page-content.sql</code> in the Supabase SQL editor.
	</p>
{/if}
{#if form?.saved}
	<p class="ok" role="status">
		Saved — the website is updated.
		{#if page.path}<a href={page.path} target="_blank" rel="noopener">View the page ↗</a>{/if}
	</p>
{:else if form?.reset}
	<p class="ok" role="status">Reset — this page is back to its original text.</p>
{/if}
{#if form?.error}
	<p class="err" role="alert">{form.error}</p>
{/if}

<form
	class="card editor"
	method="POST"
	action="?/save"
	use:enhance={() =>
		async ({ update }) => {
			await update({ reset: false });
		}}
>
	{#each bodyFields as f (f.key)}
		{@render field(f)}
	{/each}

	{#if seoFields.length}
		<fieldset class="seo">
			<legend>Search engines (SEO)</legend>
			{#each seoFields as f (f.key)}
				{@render field(f)}
			{/each}
		</fieldset>
	{/if}

	<div class="editor__actions">
		<button class="btn btn--primary" type="submit">Save changes</button>
	</div>
</form>

{#if Object.keys(data.saved).length > 0}
	<form
		method="POST"
		action="?/reset"
		use:enhance
		onsubmit={(e) => {
			if (!confirm(`Put every field on “${page.label}” back to its original text?`)) e.preventDefault();
		}}
	>
		<button class="danger" type="submit">Reset whole page to original text</button>
	</form>
{/if}

<style>
	.crumbs {
		margin-bottom: 0.6rem;
	}

	.crumbs a {
		color: var(--ink-600);
		text-decoration: none;
		font-size: 0.92rem;
	}

	.head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		flex-wrap: wrap;
		max-width: 56rem;
	}

	.head h1 {
		margin: 0;
	}

	.head__view {
		padding: 0.45rem 1.1rem;
		font-size: 0.88rem;
	}

	.blurb {
		color: var(--ink-400);
		margin: 0.3rem 0 1.4rem;
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
		gap: 1.2rem;
		padding: 1.8rem;
		max-width: 56rem;
	}

	.field {
		display: grid;
		gap: 0.3rem;
	}

	.field__head {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		flex-wrap: wrap;
	}

	.field__head label {
		font-size: 0.92rem;
		font-weight: 600;
	}

	.field__edited {
		font-size: 0.7rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: var(--gold-600);
		background: var(--orange-100);
		border-radius: 999px;
		padding: 0.1rem 0.5rem;
	}

	.field__restore {
		font: inherit;
		font-size: 0.8rem;
		color: var(--ink-400);
		background: none;
		border: 0;
		padding: 0;
		text-decoration: underline;
		cursor: pointer;
	}

	.field__restore:hover {
		color: var(--ink-900);
	}

	.field__help {
		margin: 0;
		font-size: 0.85rem;
		color: var(--ink-400);
	}

	input,
	textarea {
		font: inherit;
		padding: 0.65rem 0.85rem;
		border: 1px solid var(--line);
		border-radius: var(--radius);
		width: 100%;
		background: #fff;
		line-height: 1.55;
	}

	textarea {
		resize: vertical;
	}

	input:focus,
	textarea:focus {
		outline: 2px solid var(--orange-500);
		outline-offset: 1px;
	}

	.seo {
		display: grid;
		gap: 1.2rem;
		margin: 0.6rem 0 0;
		padding: 1.2rem 0 0;
		border: 0;
		border-top: 1px solid var(--line);
	}

	.seo legend {
		font-family: var(--font-display);
		font-weight: 600;
		font-size: 1.02rem;
		padding: 0 0.6rem 0 0;
	}

	.editor__actions {
		position: sticky;
		bottom: 0;
		padding: 0.8rem 0 0.2rem;
		background: linear-gradient(transparent, #fff 35%);
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
