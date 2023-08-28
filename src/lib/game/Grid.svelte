<script lang="ts">
	import { container, grid, cell_size, game } from '$lib/game/data';
	import { show_rulers } from './settings';
	import { onMount } from 'svelte';
	import Cell from './Cell.svelte';
	import { dev } from '$app/environment';
	import Rulers from './Rulers.svelte';

	// setup our grid
	onMount(() => {
		// we are drawing this with css grid
		// draw order: rows, then columns
		let array = new Array($grid.rows);
		for (let i = 0; i < $grid.columns; i++) {
			array[i] = new Array($grid.columns);
		}

		// set store with initialized game state
		game.set(array);

		// now we can manipulate the state of each cell
		for (let r = 0; r < $grid.rows; r++) {
			for (let c = 0; c < $grid.columns; c++) {
				$game[r][c] = 0;
			}
		}
	});

	// let's track if we click and drag so we can draw, this is updated in markup
	let mouse_down = false;
</script>

<div class="container" bind:offsetWidth={$container.w} bind:offsetHeight={$container.h}>
	{#if $game}
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div
			class="grid"
			style:grid-template-columns="repeat({$grid.columns}, {$cell_size}px)"
			style:top="{$grid.orphaned_h / 2}px"
			style:left="{$grid.orphaned_w / 2}px"
			on:mousedown={() => (mouse_down = true)}
			on:mouseup={() => (mouse_down = false)}
		>
			{#each { length: $grid.rows } as _, row}
				{#each { length: $grid.columns } as _, column}
					<Cell {row} {column} {mouse_down} />
				{/each}
			{/each}
		</div>
	{/if}
	{#if $show_rulers}
		<Rulers />
	{/if}
</div>

<style>
	.container {
		width: 100%;
		height: 100%;
		position: relative;
	}

	.grid {
		position: absolute;
		display: grid;
		border: 1px solid var(--accent);
	}
</style>
