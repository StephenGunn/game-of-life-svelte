<script lang="ts">
	import {
		grid,
		cell_size,
		game,
		game_loaded,
		mouse_position,
		draw_this_data
	} from '$lib/game/data';
	import { is_currently_playing, draw_mode, controls_width, header_height } from './settings';
	import { shape_direction, active_shape_group } from './shapes';

	export let mouse_over_grid = false;
	export let mouse_down: boolean;
	let draw_buffer: number[][] = [];

	export const handle_mouse_up = () => {
		// if the game is currently in action, send the data to our play function to be loaded
		// into the next frame and don't try and draw it one cell at a time
		if ($is_currently_playing) {
			$draw_this_data = draw_buffer;
		} else {
			// if we are stopped, instantly give birth to the draw buffer cells
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

	export const free_draw = (row: number, column: number) => {
		// check if the cell already exists in the draw buffer
		if (is_in_draw_buffer([row, column])) return;

		// if it doesnt, add it
		draw_buffer.push([row, column]);
		draw_buffer = draw_buffer;
	};

	// general purpose draw function
	export const draw_shape = (row: number, column: number, shape: (0 | 1)[][]) => {
		for (let relative_row = 0; relative_row < shape.length; relative_row++) {
			for (
				let relative_column = 0;
				relative_column < shape[relative_row].length;
				relative_column++
			) {
				// wrap around logic
				let target_row = (row + relative_row + $grid.rows) % $grid.rows;
				let target_column = (column + relative_column + $grid.columns) % $grid.columns;

				// one shot?
				if (
					shape[relative_row][relative_column] &&
					!is_in_draw_buffer([target_row, target_column])
				) {
					draw_buffer.push([target_row, target_column]);
				}

				draw_buffer = draw_buffer;
			}
		}
	};

	// update draw position object only when mouse is down and game is loaded
	$: if (mouse_down && $game_loaded) {
		let x = Math.floor($mouse_position.x - $controls_width - $grid.orphaned_w / 2);
		let y = Math.floor($mouse_position.y - $header_height - $grid.orphaned_h / 2);

		let temp_row = Math.floor(Math.floor(y > 0 ? y : 0) / $cell_size);
		let temp_column = Math.floor(Math.floor(x > 0 ? x : 0) / $cell_size);

		if ($draw_mode === 'free') {
			free_draw(temp_row, temp_column);
		} else {
			draw_shape(temp_row, temp_column, $active_shape_group[$shape_direction]);
		}
	}

	// top left of the shape preview container
	let preview_coords = {
		row: 0,
		column: 0
	};

	// only calculate the shape preview coords if we need to
	$: if ($draw_mode !== 'free' && mouse_over_grid) {
		let x = Math.floor($mouse_position.x - $controls_width - $grid.orphaned_w / 2);
		let y = Math.floor($mouse_position.y - $header_height - $grid.orphaned_h / 2);

		preview_coords = {
			row: Math.floor(Math.floor(y > 0 ? y : 0) / $cell_size),
			column: Math.floor(Math.floor(x > 0 ? x : 0) / $cell_size)
		};
	}
</script>

{#if draw_buffer.length}
	{#each draw_buffer as cell}
		<div
			class="buffer_cell"
			style:width="{$cell_size}px"
			style:height="{$cell_size}px"
			style:top="{cell[0] * $cell_size}px"
			style:left="{cell[1] * $cell_size}px"
		/>
	{/each}
{/if}

{#if $draw_mode !== 'free' && mouse_over_grid}
	<div
		class="shape_preview"
		style:width="{$active_shape_group[$shape_direction].length * $cell_size}px"
		style:height="{$active_shape_group[$shape_direction].length * $cell_size}px"
		style:top="{preview_coords.row * $cell_size}px"
		style:left="{preview_coords.column * $cell_size}px"
	>
		{#each $active_shape_group[$shape_direction] as row, row_index}
			{#each row as cell, column_index}
				{#if cell === 1}
					<div
						class="buffer_cell"
						style:width="{$cell_size}px"
						style:height="{$cell_size}px"
						style:left="{column_index * $cell_size}px"
						style:top="{row_index * $cell_size}px"
					/>
				{/if}
			{/each}
		{/each}
	</div>
{/if}

<style>
	.buffer_cell {
		position: absolute;
		border: 1px solid var(--accent);
		background: var(--secondary);
	}

	.shape_preview {
		position: absolute;
	}

	@media (max-width: 768px) {
		.shape_preview {
			display: none;
		}
	}
</style>
