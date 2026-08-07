<script lang="ts">
	import { site } from '$lib/data/site';

	type Status = 'idle' | 'sending' | 'sent' | 'error';

	let status: Status = $state('idle');
	let errorMessage = $state('');

	let firstName = $state('');
	let lastName = $state('');
	let email = $state('');
	let phone = $state('');
	let message = $state('');
	let company = $state(''); // honeypot — humans never see or fill this

	async function submit(e: SubmitEvent) {
		e.preventDefault();
		if (status === 'sending') return;
		status = 'sending';
		errorMessage = '';

		try {
			const res = await fetch('/api/contact', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ firstName, lastName, email, phone, message, company })
			});
			const body = await res.json().catch(() => ({}));
			if (!res.ok) {
				throw new Error(body.error ?? 'Something went wrong sending your message.');
			}
			status = 'sent';
		} catch (err) {
			status = 'error';
			errorMessage = err instanceof Error ? err.message : 'Something went wrong.';
		}
	}
</script>

{#if status === 'sent'}
	<div class="card form-success" role="status">
		<h3>Thank you for reaching out!</h3>
		<p>
			Your message is on its way to our team. We aim to respond within one working day. If it's
			urgent, call us on <a href={site.phoneHref}>{site.phone}</a>.
		</p>
	</div>
{:else}
	<form class="form" onsubmit={submit}>
		<div class="form__row">
			<label>
				First name
				<input type="text" name="firstName" autocomplete="given-name" required bind:value={firstName} />
			</label>
			<label>
				Last name
				<input type="text" name="lastName" autocomplete="family-name" required bind:value={lastName} />
			</label>
		</div>
		<div class="form__row">
			<label>
				Email address
				<input type="email" name="email" autocomplete="email" required bind:value={email} />
			</label>
			<label>
				Phone number <span class="form__optional">(optional)</span>
				<input type="tel" name="phone" autocomplete="tel" bind:value={phone} />
			</label>
		</div>
		<label>
			Tell us about your project
			<textarea
				name="message"
				rows="6"
				required
				placeholder="e.g. We're considering a rear extension and loft conversion in Kingston…"
				bind:value={message}
			></textarea>
		</label>

		<div class="form__hp" aria-hidden="true">
			<label>
				Company
				<input type="text" name="company" tabindex="-1" autocomplete="off" bind:value={company} />
			</label>
		</div>

		{#if status === 'error'}
			<p class="form__error" role="alert">
				{errorMessage} You can also email us directly at
				<a href="mailto:{site.email}">{site.email}</a>.
			</p>
		{/if}

		<button class="btn btn--primary form__submit" type="submit" disabled={status === 'sending'}>
			{status === 'sending' ? 'Sending…' : 'Send message'}
		</button>
	</form>
{/if}

<style>
	.form {
		display: grid;
		gap: 1.1rem;
	}

	.form__row {
		display: grid;
		gap: 1.1rem;
	}

	@media (min-width: 640px) {
		.form__row {
			grid-template-columns: 1fr 1fr;
		}
	}

	label {
		display: grid;
		gap: 0.35rem;
		font-size: 0.92rem;
		font-weight: 600;
		color: var(--ink-900);
	}

	.form__optional {
		font-weight: 400;
		color: var(--ink-400);
	}

	input,
	textarea {
		font: inherit;
		font-weight: 400;
		padding: 0.75rem 0.9rem;
		border: 1px solid var(--line);
		border-radius: var(--radius);
		background: #fff;
		color: var(--ink-900);
		width: 100%;
	}

	input:focus,
	textarea:focus {
		outline: 2px solid var(--gold-500);
		outline-offset: 1px;
		border-color: var(--gold-500);
	}

	textarea {
		resize: vertical;
	}

	.form__hp {
		position: absolute;
		left: -9999px;
		opacity: 0;
		pointer-events: none;
	}

	.form__error {
		color: #a33a2a;
		background: #fdf1ee;
		border: 1px solid #f0cfc7;
		border-radius: var(--radius);
		padding: 0.8rem 1rem;
		margin: 0;
	}

	.form__submit {
		justify-self: start;
	}

	.form-success {
		padding: 2rem 2.2rem;
	}

	.form-success p {
		margin: 0;
		color: var(--ink-600);
	}
</style>
