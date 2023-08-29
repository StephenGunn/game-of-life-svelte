<script lang="ts">
	import { show_rulers, is_currently_playing } from '$lib/game/settings';
	import { grid, currently_alive, generation, controls_width } from '$lib/game/data';
	import Play from '$lib/game/Play.svelte';
	import Randomize from '$lib/game/Randomize.svelte';
	import Resize from '$lib/game/Resize.svelte';
	import Toggle from './Toggle.svelte';
	import Reset from '$lib/game/Reset.svelte';
	import Speed from '$lib/game/Speed.svelte';
	import DrawTools from '$lib/game/DrawTools.svelte';
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
			<div class="title">Draw Tools</div>
			<DrawTools />
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
		<div class="item">
			<div class="title">Show Rulers</div>
			<Toggle on:switch={() => ($show_rulers = !$show_rulers)} value={$show_rulers} />
		</div>
		<div class="item">
			<div class="title">Keyboard Controls</div>
			<div class="key">
				<kbd>space</kbd>
				<div>
					{#if $is_currently_playing}
						pause
					{:else}
						play
					{/if}
				</div>
			</div>
			<div class="key">
				<kbd>right arrow</kbd>
				<div>single gen.</div>
			</div>
			<div class="key">
				<kbd>r</kbd>
				<div>rotate shape</div>
			</div>
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

	.key {
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 0.75rem;
	}

	kbd {
		border: 1px solid var(--muted);
		padding: 0.25rem 0.5rem;
		border-radius: 0.25rem;
		min-width: 1.5rem;
		text-align: center;
		color: var(--secondary);
	}
</style>
