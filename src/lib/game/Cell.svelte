<script lang="ts">
	import { cell_size, game } from '$lib/game/data';
	import { show_coords, is_draw } from '$lib/game/settings';

	// x == column index
	// y == row index
	export let x: number = 0;
	export let y: number = 0;
	export let mouse_down: boolean = false;

	// I use a <button> here to make ARIA happy
	// what do we say to the god of accessiblity warnings? "yes ma'am"

	// responsive helper, does this cell still exist on the game board?
	$: available = ($game ?? []).length > x || ($game[x] ?? []).length > y;

	// celular atomata in svelte :)
	$: alive = available && $game[x] && $game[x][y] && $game[x][y] === 1 ? 1 : 0;

	const handle_toggle = () => {
		// double check to see if we're setting a value that exists in the game state
		if (available) {
			// set the draw mode, if user clicks on an active tile, erase mode happens
			$is_draw = $game[x][y] === 0 ? true : false;
			// ternary toggle (is there a more elegant way to do this?)
			$game[x][y] = $game[x][y] === 0 ? 1 : 0;
		}
	};

	const handle_mouseenter = () => {
		if (!mouse_down || !available) return;
		$game[x][y] = $is_draw ? 1 : 0;
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
		{x}, {y}
	{/if}
</button>

<style>
	button {
		border: 1px solid var(--accent);
		background: transparent;
		font-size: 0.5rem;
		display: grid;
		place-content: center;
		color: var(--secondary);
	}

	.alive {
		background: var(--primary);
		border: 1px solid var(--primary);
		color: black;
	}
</style>
