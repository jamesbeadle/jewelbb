<script lang="ts">
	let { data } = $props();
</script>

<svelte:head>
	<title>Admin | Jewel Bespoke Build</title>
</svelte:head>

<h1>Dashboard</h1>

{#if !data.configured}
	<p class="warn">
		Supabase is not connected yet. Set <code>SUPABASE_URL</code> and
		<code>SUPABASE_SERVICE_ROLE_KEY</code> environment variables (see README), run
		<code>supabase/schema.sql</code> in the Supabase SQL editor, then restart the site.
	</p>
{:else if data.staffCount === null}
	<p class="warn">
		Supabase is configured but unreachable — check the keys, and that
		<code>supabase/schema.sql</code> has been run.
	</p>
{/if}

<div class="tiles">
	<a class="card tile" href="/admin/staff">
		<h2>Staff</h2>
		<p>{data.staffCount === null ? '—' : data.staffCount} team members</p>
		<span>Manage names, roles, bios and photos →</span>
	</a>
	<a class="card tile" href="/admin/brochure">
		<h2>Brochure</h2>
		<p>{data.sectionCount === null ? '—' : data.sectionCount} sections</p>
		<span>Edit content, then share or print /brochure →</span>
	</a>
</div>

<style>
	.warn {
		background: #fdf6ec;
		border: 1px solid #f0dfc0;
		border-radius: var(--radius);
		padding: 0.9rem 1.1rem;
		color: var(--ink-600);
		max-width: 46rem;
	}

	.tiles {
		display: grid;
		gap: 1.5rem;
		margin-top: 1.6rem;
	}

	@media (min-width: 700px) {
		.tiles {
			grid-template-columns: 1fr 1fr;
			max-width: 46rem;
		}
	}

	.tile {
		padding: 1.6rem 1.7rem;
		text-decoration: none;
	}

	.tile h2 {
		font-size: 1.25rem;
		margin-bottom: 0.2rem;
	}

	.tile p {
		color: var(--ink-600);
		margin-bottom: 0.6rem;
	}

	.tile span {
		color: var(--gold-600);
		font-weight: 600;
		font-size: 0.92rem;
	}
</style>
