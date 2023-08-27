<script lang="ts">
	import '$styles/vars.css';
	import '$styles/app.css';
</script>

<header>
	<a href="/">
		<div class="title">Conway's Game Of Life</div>
		<div class="subtitle">In Svelte (kit)</div>
	</a>
</header>
<aside />
<slot />

<style>
	header {
		padding: 0.5rem;
		border-bottom: 1px solid var(--accent);
	}

	a {
		text-decoration: none;
	}

	.title {
		font-size: 1.2rem;
	}
	.subtitle {
		color: var(--secondary);
	}
</style>
