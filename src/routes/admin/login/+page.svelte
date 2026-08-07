<script lang="ts">
	let { data, form } = $props();

	$effect(() => {
		if (form?.success) window.location.assign('/admin');
	});
</script>

<svelte:head>
	<title>Admin login | Jewel Bespoke Build</title>
</svelte:head>

<div class="login">
	<div class="card login__card">
		<h1>Admin login</h1>
		{#if !data.configured}
			<p class="login__warn">
				Admin credentials are not configured. Set <code>ADMIN_USERNAME</code> and
				<code>ADMIN_PASSWORD</code> environment variables, then restart the site.
			</p>
		{/if}
		{#if data.why === 'nocookie'}
			<p class="login__warn" role="alert">
				<strong>Diagnostic:</strong> you reached the admin area without a session cookie — the
				login itself succeeded, but the browser didn't store or send the cookie back.
			</p>
		{:else if data.why === 'badtoken'}
			<p class="login__warn" role="alert">
				<strong>Diagnostic:</strong> a session cookie was sent but failed signature
				verification — the signing secret differs between requests.
			</p>
		{/if}
		{#if form?.error}
			<p class="login__error" role="alert">{form.error}</p>
		{/if}
		{#if form?.success}
			<p class="login__success" role="status">
				Logged in — taking you to the dashboard… <a href="/admin">Continue</a>
			</p>
		{/if}
		<form method="POST">
			<label>
				Username
				<input name="username" autocomplete="username" required />
			</label>
			<label>
				Password
				<input name="password" type="password" autocomplete="current-password" required />
			</label>
			<button class="btn btn--primary" type="submit">Log in</button>
		</form>
	</div>
</div>

<style>
	.login {
		display: grid;
		place-items: center;
		min-height: 60vh;
	}

	.login__card {
		width: min(400px, 100%);
		padding: 2.2rem 2.2rem 2.4rem;
	}

	.login__card h1 {
		font-size: 1.5rem;
	}

	form {
		display: grid;
		gap: 1rem;
	}

	label {
		display: grid;
		gap: 0.3rem;
		font-size: 0.92rem;
		font-weight: 600;
	}

	input {
		font: inherit;
		padding: 0.7rem 0.9rem;
		border: 1px solid var(--line);
		border-radius: var(--radius);
	}

	input:focus {
		outline: 2px solid var(--orange-500);
		outline-offset: 1px;
	}

	button {
		justify-self: start;
	}

	.login__error {
		color: #a33a2a;
		background: #fdf1ee;
		border: 1px solid #f0cfc7;
		border-radius: var(--radius);
		padding: 0.7rem 0.9rem;
		margin: 0;
		font-size: 0.92rem;
	}

	.login__success {
		background: #eef7ee;
		border: 1px solid #cfe6cf;
		border-radius: var(--radius);
		padding: 0.7rem 0.9rem;
		margin: 0;
		font-size: 0.92rem;
	}

	.login__warn {
		color: var(--ink-600);
		background: var(--tint);
		border: 1px solid var(--line);
		border-radius: var(--radius);
		padding: 0.7rem 0.9rem;
		font-size: 0.9rem;
	}
</style>
