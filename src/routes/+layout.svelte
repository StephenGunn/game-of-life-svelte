<script lang="ts">
	import '$styles/vars.css';
	import '$styles/app.css';
	import Controls from '$lib/components/Controls.svelte';
	import Header from '$lib/components/Header.svelte';
</script>

<svelte:head>
	<title>Conway's Game Of Life in Svelte</title>
</svelte:head>

<Header />
<main>
	<Controls />
	<slot />
</main>

<style>
	main {
		display: flex;
		height: calc(100vh - 3rem);
	}
</style>
