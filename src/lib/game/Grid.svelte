<script lang="ts">
	import { container, grid, cell_size, game } from '$lib/game/data';
	import { show_rulers } from './settings';
	import { onMount } from 'svelte';
	import Cell from './Cell.svelte';
	import { dev } from '$app/environment';
	import Rulers from './Rulers.svelte';

	// we need to init our blank grid on mount
	onMount(() => {
		// we are drawing this with css grid
		// draw order: rows, then columns
		let array = new Array($grid.rows);
		for (let i = 0; i < $grid.columns; i++) {
			array[i] = new Array($grid.columns);
		}

		// init empty array
		game.set(array);

		// now we can manipulate the state of each cell
		for (let r = 0; r < $grid.rows; r++) {
			for (let c = 0; c < $grid.columns; c++) {
				$game[r][c] = 0;
			}
		}

		// we need to trim the game array after resize to remove hidden cells
		// maybe, i will leave this here until after i get the game logic working
		let timeout: ReturnType<typeof setTimeout>;
		const debounced_resize = () => {
			clearTimeout(timeout);
			timeout = setTimeout(() => {
				console.log('resize detected');
			}, 500);
		};

		window.addEventListener('resize', debounced_resize);
	});

	// $: if ($game && dev) console.table($game);

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
			<!--
                this seems backwards but this is what it takes to work with css grid
                i could wrap the columns in a sub div and stack the cells inside but
                i think leaving it like this will be easier for the browser to render
            -->
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
