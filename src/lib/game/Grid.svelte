<script lang="ts">
	import {
		container,
		grid,
		cell_size,
		game,
		game_loaded,
		mouse_position,
		draw_this_data,
		controls_width,
		header_height
	} from '$lib/game/data';
	import { is_draw, show_rulers, is_currently_playing } from './settings';
	import { onMount } from 'svelte';
	import Cell from './Cell.svelte';
	import Rulers from './Rulers.svelte';

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
	let draw_buffer: number[][] = [];

	// send our raw mouse data to our store (will be processed in derived store)
	const handle_mouse_over = (event: MouseEvent) => {
		$mouse_position.x = event.clientX;
		$mouse_position.y = event.clientY;
	};

	const handle_mouse_up = () => {
		mouse_down = false;
		// if the game is currently in action, send the data to our play function to be loaded
		// into the next frame and don't try and draw it one cell at a time
		if ($is_currently_playing) {
			$draw_this_data = draw_buffer;
		} else {
			// if we are stopped, give birth to the draw buffer cells
			for (let cell = 0; cell < draw_buffer.length; cell++) {
				$game[draw_buffer[cell][0]][draw_buffer[cell][1]] = 1;
			}
		}
		draw_buffer = [];
	};

	// use this to only draw on blank cells
	const is_in_draw_buffer = (target: number[]): boolean => {
		return draw_buffer.some(
			(cell) =>
				cell.length === target.length && cell.every((value, index) => value === target[index])
		);
	};

	const draw = (row: number, column: number) => {
		// check if the cell already exists in the draw buffer
		if (is_in_draw_buffer([row, column])) return;

		// if it doesnt, add it
		draw_buffer.push([row, column]);
		draw_buffer = draw_buffer;
	};

	// update draw position object only when mouse is down and game is loaded
	$: if (mouse_down && $game_loaded) {
		let x = Math.floor($mouse_position.x - $controls_width - $grid.orphaned_w / 2);
		let y = Math.floor($mouse_position.y - $header_height - $grid.orphaned_h / 2);

		let temp_row = Math.floor(Math.floor(y > 0 ? y : 0) / $cell_size);
		let temp_column = Math.floor(Math.floor(x > 0 ? x : 0) / $cell_size);

		draw(temp_row, temp_column);
	}
</script>

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
			on:mouseup={handle_mouse_up}
		>
			{#each { length: $grid.rows } as _, row}
				{#each { length: $grid.columns } as _, column}
					<Cell {row} {column} />
				{/each}
			{/each}
			{#if draw_buffer.length}
				{#each draw_buffer as cell}
					<div
						class="buffer_cell"
						style:width="{$cell_size}px"
						style:height="{$cell_size}px"
						style:left="{cell[1] * $cell_size}px"
						style:top="{cell[0] * $cell_size}px"
					/>
				{/each}
			{/if}
		</div>
	{:else}
		<div class="loading">Generating...</div>
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

	.buffer_cell {
		position: absolute;
		border: 1px solid var(--accent);
		background: var(--secondary);
	}

	.grid {
		position: absolute;
		display: grid;
		border: 1px solid var(--accent);
	}

	.loading {
		width: 100%;
		height: 100%;
		display: grid;
		place-content: center;
		font-size: 2rem;
	}
</style>
