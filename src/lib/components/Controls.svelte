<script lang="ts">
	import { show_coords, show_rulers } from '$lib/game/settings';
	import { grid, currently_alive } from '$lib/game/data';
	import Play from '$lib/game/Play.svelte';
	import Randomize from '$lib/game/Randomize.svelte';
	import Resize from '$lib/game/Resize.svelte';
	import Toggle from './Toggle.svelte';
</script>

<aside>
	<div class="controls">
		<div class="item">
			<div class="title">Game Controls</div>
			<Play />
		</div>
		<div class="item">
			<div class="title">Cells</div>
			<div class="spread">
				<div>total</div>
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
			<div class="title">Cell Size</div>
			<Resize />
		</div>
		<div class="item">
			<div class="title">Randomize</div>
			<Randomize />
		</div>
		<div class="item">
			<div class="title">Show Rulers</div>
			<Toggle on:switch={() => ($show_rulers = !$show_rulers)} value={$show_rulers} />
		</div>
		<div class="item">
			<div class="title">Grid</div>
			<div class="spread">
				<div>columns</div>
				<div>{$grid.columns}</div>
			</div>
			<div class="spread">
				<div>rows</div>
				<div>{$grid.rows}</div>
			</div>
		</div>
		<div class="item">
			<div class="title">Show Coords</div>
			<Toggle on:switch={() => ($show_coords = !$show_coords)} value={$show_coords} />
		</div>
	</div>
</aside>

<style>
	aside {
		width: 350px;
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
