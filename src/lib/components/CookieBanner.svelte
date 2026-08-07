<script lang="ts">
	import { browser } from '$app/environment';

	const KEY = 'jewelbb-cookie-consent';

	let visible = $state(browser ? localStorage.getItem(KEY) === null : false);

	function choose(consent: 'accepted' | 'declined') {
		localStorage.setItem(KEY, consent);
		visible = false;
	}
</script>

{#if visible}
	<div class="cookies" role="region" aria-label="Cookie consent">
		<p>
			We use cookies on our website to see how you interact with it. By accepting, you agree to
			our use of such cookies. <a href="/privacy-policy">Privacy policy</a>
		</p>
		<div class="cookies__actions">
			<button class="btn btn--outline cookies__btn" onclick={() => choose('declined')}>
				Decline all
			</button>
			<button class="btn btn--primary cookies__btn" onclick={() => choose('accepted')}>
				Accept
			</button>
		</div>
	</div>
{/if}

<style>
	.cookies {
		position: fixed;
		inset: auto 1rem 1rem 1rem;
		z-index: 90;
		max-width: 480px;
		background: #fff;
		border: 1px solid var(--line);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-lift);
		padding: 1.3rem 1.5rem;
	}

	@media (min-width: 640px) {
		.cookies {
			inset: auto auto 1.5rem 1.5rem;
		}
	}

	.cookies p {
		font-size: 0.92rem;
		color: var(--ink-600);
		margin-bottom: 1rem;
	}

	.cookies__actions {
		display: flex;
		gap: 0.7rem;
	}

	.cookies__btn {
		padding: 0.55rem 1.2rem;
		font-size: 0.88rem;
	}
</style>
