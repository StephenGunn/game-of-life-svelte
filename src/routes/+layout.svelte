<script lang="ts">
	import '$styles/vars.css';
	import '$styles/app.css';
	import Header from '$lib/components/Header.svelte';
</script>

<svelte:head>
	<title>Conway's Game Of Life in Svelte</title>
	<meta name="robots" content="all" />
	<meta name="title" content="Conway's Game Of Life in Svelte" />
	<meta
		name="description"
		content="A quick and open-source attempt to build the game of life in Svelte"
	/>

	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://life.jovianmoon.io" />
	<meta property="og:title" content="Conway's Game Of Life in Svelte" />
	<meta
		property="og:description"
		content="A quick and open-source attempt to build the game of life in Svelte"
	/>

	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content="https://life.jovianmoon.io" />
	<meta property="twitter:title" content="Conway's Game Of Life in Svelte" />
	<meta
		property="twitter:description"
		content="A quick and open-source attempt to build the game of life in Svelte"
	/>

	<meta property="twitter:image" content="/share.png" />
	<meta property="og:image" content="/share.png" />
</svelte:head>

<Header />
<main>
	<slot />
</main>

<style>
	main {
		display: flex;
		height: calc(100vh - 3rem);
	}
</style>
