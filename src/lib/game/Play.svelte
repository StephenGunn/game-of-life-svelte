<script lang="ts">
	import { grid, game, currently_alive, generation } from './data';
	import { is_currently_playing, is_fast } from './settings';

	const count_neighbors = (x: number, y: number) => {
		// we are using another set of nested loops to count all of our neighbors and subtract the
		// using the modulus op to do the wrap around check... This was hard.
		// value of the middle cell to not throw off the count.
		let sum = 0;

		// 3x3 sub-grid
		for (let i = -1; i < 2; i++) {
			for (let j = -1; j < 2; j++) {
				// wrap around logic
				let col = (x + i + $grid.columns) % $grid.columns;
				let row = (y + j + $grid.rows) % $grid.rows;
				sum += $game[col][row];
			}
		}
		sum -= $game[x][y];
		return sum;
	};

	let game_loop: ReturnType<typeof setInterval>;
	const next_step = () => {
		// if nothing is left, stop the game before we loop through everything.
		if ($currently_alive === 0) {
			$is_currently_playing = false;
			clearInterval(game_loop);
		}

		// init our next frame
		let next: (0 | 1)[][];
		next = new Array($grid.columns);
		for (let i = 0; i < $grid.columns; i++) {
			next[i] = new Array($grid.rows);
		}

		// count our generation
		$generation += 1;

		// iterate through our game
		for (let i = 0; i < $grid.columns; i++) {
			for (let j = 0; j < $grid.rows; j++) {
				// let's try and make this a little nicer
				let state = $game[i][j];
				const neighbors = count_neighbors(i, j);
				if (state === 0 && neighbors === 3) {
					next[i][j] = 1;
				} else if (state === 1 && (neighbors < 2 || neighbors > 3)) {
					next[i][j] = 0;
				} else {
					next[i][j] = state;
				}
			}
		}

		console.table(next);

		$game = next;
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
</script>

<div>
	<button on:click={play_toggle}>
		{#if !$is_currently_playing}
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"
				><rect width="256" height="256" fill="none" /><path
					d="M72,39.88V216.12a8,8,0,0,0,12.15,6.69l144.08-88.12a7.82,7.82,0,0,0,0-13.38L84.15,33.19A8,8,0,0,0,72,39.88Z"
					fill="none"
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="16"
				/></svg
			> Play
		{:else}
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"
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
			> Pause
		{/if}
	</button>
	<button on:click={next_step} disabled={$is_currently_playing}>
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
		> Single Step</button
	>
</div>

<style>
	button:disabled {
		background: var(--muted);
	}
</style>
