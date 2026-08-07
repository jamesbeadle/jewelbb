<script lang="ts">
	import { badgeList } from '$lib/data/images';
</script>

<div class="badges" aria-label="Accreditations and partnerships">
	{#each badgeList as badge (badge.src)}
		<img src={badge.src} alt={badge.alt} loading="lazy" />
	{/each}
</div>

<style>
	.badges {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		gap: clamp(1.5rem, 4vw, 3rem);
	}

	.badges img {
		height: 64px;
		width: auto;
		object-fit: contain;
		filter: grayscale(20%);
		opacity: 0.92;
		transition: filter 0.2s ease, opacity 0.2s ease;
	}

	.badges img:hover {
		filter: none;
		opacity: 1;
	}
</style>
