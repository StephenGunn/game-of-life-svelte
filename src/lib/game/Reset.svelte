<script lang="ts">
	import { game, grid, generation } from './data';

	let button: HTMLButtonElement;
	const reset = () => {
		// we only want a 20% chance of the cell to be alive
		// or too many cells happen and everything dies too fast :(
		// create our randomized board in fresh var in row -> column standard
		let reset_game: (0 | 1)[][];
		reset_game = new Array($grid.rows);
		for (let row = 0; row < $grid.rows; row++) {
			reset_game[row] = new Array($grid.columns);
		}

		for (let row = 0; row < $grid.rows; row++) {
			for (let column = 0; column < $grid.columns; column++) {
				reset_game[row][column] = 0;
			}
		}

		// finalize the random
		$generation = 0;
		$game = reset_game;
	};
</script>

<button on:click={reset} bind:this={button}> Reset </button>
