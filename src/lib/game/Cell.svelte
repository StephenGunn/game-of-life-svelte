<script lang="ts">
	import { cell_size, game } from '$lib/game/data';
	import { show_coords, is_draw } from '$lib/game/settings';

	export let row: number = 0;
	export let column: number = 0;
	export let mouse_down: boolean = false;

	// I use a <button> here to make ARIA happy
	// what do we say to the god of accessiblity warnings? "yes ma'am"

	// does this cell still exist on the game board?
	$: available = ($game ?? []).length > row || ($game[column] ?? []).length > column;

	// celular atomata
	$: alive = available && $game[row] && $game[row][column] && $game[row][column] === 1;

	const handle_toggle = () => {
		// double check to see if we're setting a value that exists in the game state
		if (available) {
			// set the draw mode, if user clicks on an active tile, erase mode happens
			$is_draw = $game[row][column] === 0 ? true : false;

			// ternary toggle (is there a more elegant way to do this?)
			$game[row][column] = $game[row][column] === 0 ? 1 : 0;
		}
	};

	const handle_mouseenter = () => {
		if (!mouse_down || !available) return;
		$game[row][column] = $is_draw ? 1 : 0;
	};
</script>

<button
	class:alive
	style:width="{$cell_size}px"
	style:height="{$cell_size}px"
	on:mouseenter={handle_mouseenter}
	on:mousedown={handle_toggle}
>
	{#if $show_coords}
		{column}, {row}
	{/if}
</button>

<style>
	button {
		border: 1px solid var(--accent);
		background: transparent;
		font-size: 0.5rem;
		display: grid;
		place-content: center;
		color: var(--muted);
		overflow: hidden;
	}

	.alive {
		background: var(--primary);
		/* border: 1px solid var(--primary); */
		color: var(--background);
		font-weight: bold;
	}
</style>
