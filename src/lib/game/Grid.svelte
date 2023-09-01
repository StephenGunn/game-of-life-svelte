<script lang="ts">
	import {
		container,
		grid,
		cell_size,
		game,
		game_loaded,
		mouse_position,
		window_width
	} from '$lib/game/data';
	import { shape_direction, active_shape_group } from './shapes';

	import { show_rulers, controls_width, header_height, draw_mode } from './settings';
	import { SvelteComponent, onMount } from 'svelte';
	import Cell from './Cell.svelte';
	import Rulers from './Rulers.svelte';
	import Draw from './Draw.svelte';

	// setup our grid
	onMount(() => {
		// we are drawing this with css grid
		// draw order: rows, then columns
		let array = new Array($grid.rows);
		for (let row = 0; row < $grid.rows; row++) {
			array[row] = new Array($grid.columns);
		}

		// set store with initialized game state
		game.set(array);

		// now we can manipulate the state of each cell
		for (let row = 0; row < $grid.rows; row++) {
			for (let column = 0; column < $grid.columns; column++) {
				$game[row][column] = 0;
			}
		}

		game_loaded.set(true);
	});

	// mouse capture logic for drawing tools
	let mouse_down = false;
	let mouse_over_grid = false;

	// send our raw mouse data to our store (will be processed in derived store)
	const handle_mouse_over = (event: MouseEvent) => {
		mouse_over_grid = true;
		$mouse_position.y = event.clientY;
		$mouse_position.x = event.clientX;
	};

	// right now i have to handle touch events in this file, can i handle it somewhere else?
	const handle_touch = (event: TouchEvent) => {
		let touch = event.touches[0];

		mouse_over_grid = true;
		let raw_x = touch.clientX;
		let raw_y = touch.clientY;

		let x = Math.floor(raw_x - $grid.orphaned_w / 2);
		let y = Math.floor(raw_y - $grid.orphaned_h / 2);

		let temp_row = Math.floor(Math.floor(y > 0 ? y : 0) / $cell_size);
		let temp_column = Math.floor(Math.floor(x > 0 ? x : 0) / $cell_size);

		// logic to prevent drawing outside of our grid and crashing our game
		temp_row = temp_row < $grid.rows ? temp_row : $grid.rows - 1;
		temp_column = temp_column < $grid.columns ? temp_column : $grid.columns - 1;

		if ($draw_mode === 'free') {
			draw_functions.free_draw(temp_row, temp_column);
		} else {
			draw_functions.draw_shape(temp_row, temp_column, $active_shape_group[$shape_direction]);
		}
	};

	// this gives me access to Draw.svelte's functions
	let draw_functions: SvelteComponent;
</script>

<svelte:window bind:outerWidth={$window_width} />
<div class="container" bind:offsetWidth={$container.w} bind:offsetHeight={$container.h}>
	{#if $game_loaded}
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<!-- svelte-ignore a11y-mouse-events-have-key-events -->
		<div
			class="grid"
			style:grid-template-columns="repeat({$grid.columns}, {$cell_size}px)"
			style:top="{$grid.orphaned_h / 2}px"
			style:left="{$grid.orphaned_w / 2}px"
			on:mouseover={handle_mouse_over}
			on:mousedown={() => {
				mouse_down = true;
			}}
			on:mouseup={() => {
				mouse_down = false;
				draw_functions.handle_mouse_up();
			}}
			on:mouseleave={() => {
				mouse_over_grid = false;
			}}
			on:touchstart|preventDefault={handle_touch}
			on:touchmove|preventDefault={handle_touch}
			on:touchend|preventDefault={() => draw_functions.handle_mouse_up()}
		>
			{#each { length: $grid.rows } as _, row}
				{#each { length: $grid.columns } as _, column}
					<Cell {row} {column} />
				{/each}
			{/each}
			<Draw {mouse_down} bind:this={draw_functions} {mouse_over_grid} />
		</div>
	{:else}
		<div class="loading">Initializing...</div>
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
		/* outline: 1px solid red; */
	}

	.grid {
		position: absolute;
		display: grid;
		border: 1px solid var(--accent);
		overflow: hidden;
	}

	.loading {
		width: 100%;
		height: 100%;
		display: grid;
		place-content: center;
		font-size: 2rem;
	}

	@media (max-width: 768px) {
		.loading {
			font-size: 1rem;
		}
	}
</style>
