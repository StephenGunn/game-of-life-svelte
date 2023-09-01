<script lang="ts">
	import { mobile_menu_active, header_height } from '$lib/game/settings';
</script>

<header bind:offsetHeight={$header_height} class:show_on_mobile={$mobile_menu_active}>
	<a href="/"> Conway's Game Of Life in Svelte(Kit) </a>
	<nav>
		<a href="/" class="hide_mobile">Game</a>
		<a href="/about">About</a>
		<a
			href="https://github.com/StephenGunn/game-of-life-svelte"
			target="_blank"
			rel="noopener noreferrer">Source</a
		>
	</nav>
</header>

<button on:click={() => ($mobile_menu_active = !$mobile_menu_active)}>
	{#if !$mobile_menu_active}
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"
			><rect width="256" height="256" fill="none" /><line
				x1="40"
				y1="128"
				x2="216"
				y2="128"
				stroke="currentColor"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="16"
			/><line
				x1="40"
				y1="64"
				x2="216"
				y2="64"
				stroke="currentColor"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="16"
			/><line
				x1="40"
				y1="192"
				x2="216"
				y2="192"
				stroke="currentColor"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="16"
			/></svg
		>
	{:else}
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"
			><rect width="256" height="256" fill="none" /><line
				x1="200"
				y1="56"
				x2="56"
				y2="200"
				stroke="currentColor"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="16"
			/><line
				x1="200"
				y1="200"
				x2="56"
				y2="56"
				stroke="currentColor"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="16"
			/></svg
		>
	{/if}
</button>

<style>
	header {
		padding: 0 1rem;
		border-bottom: 1px solid var(--accent);
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 50px;
		width: 100%;
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

	button {
		display: none;
	}

	@media (max-width: 768px) {
		.hide_mobile {
			display: none;
		}
		header {
			position: absolute;
			bottom: 100%;
			font-size: 0.8rem;
			background: var(--background);
			z-index: 3;
		}
		header.show_on_mobile {
			bottom: calc(100% - 50px);
		}
		button {
			display: grid;
			position: absolute;
			bottom: 1rem;
			right: 1rem;
			z-index: 11;
			background: var(--accent);
			border: none;
			color: var(--primary);
			aspect-ratio: 1/1;
			place-content: center;
		}

		button svg {
			width: 1.2rem;
			height: 1.2rem;
		}
	}
</style>
