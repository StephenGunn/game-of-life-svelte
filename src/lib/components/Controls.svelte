<script lang="ts">
	import { show_rulers } from '$lib/game/settings';
	import { grid, currently_alive, generation, controls_width } from '$lib/game/data';
	import Play from '$lib/game/Play.svelte';
	import Randomize from '$lib/game/Randomize.svelte';
	import Resize from '$lib/game/Resize.svelte';
	import Toggle from './Toggle.svelte';
	import Reset from '$lib/game/Reset.svelte';
	import Speed from '$lib/game/Speed.svelte';
</script>

<aside bind:offsetWidth={$controls_width}>
	<div class="controls">
		<div class="item">
			<Play />
		</div>
		<div class="item">
			<div class="spread">
				<div>generation</div>
				<div>{$generation}</div>
			</div>
			<div class="spread">
				<div>cells</div>
				<div>{$grid.columns * $grid.rows}</div>
			</div>
			<div class="spread">
				<div>alive</div>
				<div>{$currently_alive}</div>
			</div>
			<div class="spread">
				<div>dead</div>
				<div>{$grid.columns * $grid.rows - $currently_alive}</div>
			</div>
		</div>

		<div class="item">
			<div class="title">Speed</div>
			<Speed />
		</div>
		<div class="item">
			<div class="title">Show Rulers</div>
			<Toggle on:switch={() => ($show_rulers = !$show_rulers)} value={$show_rulers} />
		</div>
		<div class="item">
			<div class="title">Randomize</div>
			<Randomize />
		</div>
		<div class="item">
			<div class="title">Reset Game</div>
			<Reset />
		</div>
		<div class="item">
			<div class="title">Cell Size</div>
			<Resize />
		</div>
	</div>
</aside>

<style>
	aside {
		width: 300px;
		min-width: 300px;
		border-right: 1px solid var(--accent);
		overflow-y: auto;
	}

	.controls {
		padding: 1rem;
		display: flex;
		flex-flow: column;
		gap: 1.5rem;
	}

	.item {
		display: flex;
		flex-flow: column;
		gap: 0.5rem;
	}

	.spread {
		display: flex;
		align-items: center;
		font-size: 0.8rem;
		justify-content: space-between;
	}

	.title {
		font-weight: bold;
		color: var(--secondary);
	}
</style>
