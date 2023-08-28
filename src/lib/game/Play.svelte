<script lang="ts">
	import { grid, game, currently_alive, generation } from './data';
	import { is_currently_playing, is_fast } from './settings';
	import { onDestroy } from 'svelte';

	const count_neighbors = (row: number, column: number) => {
		// we are using another set of nested loops to count all of our neighbors and subtract the
		// using the modulus op to do the wrap around check... This was hard.
		// value of the middle cell to not throw off the count.
		let neighbors_found = 0;

		// 3x3 sub-grid
		for (let relative_row = -1; relative_row < 2; relative_row++) {
			for (let relative_column = -1; relative_column < 2; relative_column++) {
				// wrap around logic
				let target_row = (row + relative_row + $grid.rows) % $grid.rows;
				let target_column = (column + relative_column + $grid.columns) % $grid.columns;
				neighbors_found += $game[target_row][target_column];
			}
		}
		neighbors_found -= $game[row][column];
		return neighbors_found;
	};

	let game_loop: ReturnType<typeof setInterval>;
	const next_step = () => {
		// if nothing is left, stop the game before we loop through everything.
		if ($currently_alive === 0) {
			$is_currently_playing = false;
			clearInterval(game_loop);
		}

		// init our next frame in row -> column standard
		let next_generation: (0 | 1)[][];
		next_generation = new Array($grid.rows);
		for (let row = 0; row < $grid.rows; row++) {
			next_generation[row] = new Array($grid.columns);
		}

		// count our generation
		$generation += 1;

		// iterate through our game
		for (let row = 0; row < $grid.rows; row++) {
			for (let column = 0; column < $grid.columns; column++) {
				// let's try and make this a little nicer
				let state = $game[row][column];
				const neighbors = count_neighbors(row, column);
				if (state === 0 && neighbors === 3) {
					next_generation[row][column] = 1;
				} else if (state === 1 && (neighbors < 2 || neighbors > 3)) {
					next_generation[row][column] = 0;
				} else {
					next_generation[row][column] = state;
				}
			}
		}

		// overwrite our game state with our next step.
		$game = next_generation;
	};

	export const play_toggle = () => {
		// stop logic
		if ($is_currently_playing) {
			$is_currently_playing = false;
			clearInterval(game_loop);
			return;
		}

		// play logic
		$is_currently_playing = true;
		next_step();
		game_loop = setInterval(
			() => {
				next_step();
			},
			$is_fast ? 100 : 500
		);
	};

	// stop the game if we navigate away
	onDestroy(() => {
		$is_currently_playing = false;
		clearInterval(game_loop);
	});
</script>

<div class="buttons">
	<button on:click={play_toggle} disabled={$currently_alive === 0}>
		{#if !$is_currently_playing}
			Play <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"
				><rect width="256" height="256" fill="none" /><path
					d="M72,39.88V216.12a8,8,0,0,0,12.15,6.69l144.08-88.12a7.82,7.82,0,0,0,0-13.38L84.15,33.19A8,8,0,0,0,72,39.88Z"
					fill="none"
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="16"
				/></svg
			>
		{:else}
			Pause <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"
				><rect width="256" height="256" fill="none" /><rect
					x="152"
					y="40"
					width="56"
					height="176"
					rx="8"
					fill="none"
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="16"
				/><rect
					x="48"
					y="40"
					width="56"
					height="176"
					rx="8"
					fill="none"
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="16"
				/></svg
			>
		{/if}
	</button>
	<button on:click={next_step} disabled={$is_currently_playing || $currently_alive === 0}>
		Single Gen.
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"
			><rect width="256" height="256" fill="none" /><polygon
				points="136 32 232 128 136 224 136 176 72 176 72 80 136 80 136 32"
				fill="none"
				stroke="currentColor"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="16"
			/><line
				x1="40"
				y1="176"
				x2="40"
				y2="80"
				fill="none"
				stroke="currentColor"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="16"
			/></svg
		>
	</button>
</div>

<style>
	.buttons {
		display: flex;
		gap: 1rem;
	}
	button {
		display: flex;
		flex-grow: 1;
	}
	button:disabled {
		background: var(--muted);
	}
</style>
