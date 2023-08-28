<script lang="ts">
	import { cell_size, cell_min_size, game, grid } from './data';
	import { is_currently_playing } from './settings';
	import { step } from './settings';
	const increase_size = () => {
		$cell_size += step;
	};

	const decrease_cell_size = () => {
		$cell_size -= step;

		// we only want a 20% chance of the cell to be alive
		// or too many cells happen and everything dies too fast :(
		// create our randomized board in fresh var in row -> column standard
		let increased_cell_count: (0 | 1)[][];
		increased_cell_count = new Array($grid.rows);
		for (let row = 0; row < $grid.rows; row++) {
			increased_cell_count[row] = new Array($grid.columns);
		}

		// add state for the new cells
		for (let row = 0; row < $grid.rows; row++) {
			for (let column = 0; column < $grid.columns; column++) {
				increased_cell_count[row][column] = 0;
			}
		}

		// finalize the random
		$game = increased_cell_count;
	};
</script>

<div>
	<button
		on:click={decrease_cell_size}
		disabled={$cell_size <= $cell_min_size || $is_currently_playing}
		title="caution: resets game state">-</button
	>
	{$cell_size}px
	<button on:click={increase_size} disabled={$cell_size >= 50 || $is_currently_playing}>+</button>
</div>

<style>
	button {
		width: 2rem;
		height: 2rem;
		font-size: 1.3rem;
	}

	button:disabled {
		background: var(--muted);
	}
</style>
