<script lang="ts">
	import { header_height } from '$lib/game/data';
</script>

<header bind:offsetHeight={$header_height}>
	<a href="/"> Conway's Game Of Life in Svelte(Kit) </a>
	<nav>
		<a href="/">Game</a>
		<a href="/about">About</a>
		<a
			href="https://github.com/StephenGunn/game-of-life-svelte"
			target="_blank"
			rel="noopener noreferrer">Source</a
		>
	</nav>
</header>

<style>
	header {
		padding: 0 1rem;
		border-bottom: 1px solid var(--accent);
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 50px;
	}

	a {
		text-decoration: none;
		color: var(--secondary);
	}
	a:hover {
		color: var(--primary);
	}
	nav {
		display: flex;
		gap: 2rem;
	}
</style>
