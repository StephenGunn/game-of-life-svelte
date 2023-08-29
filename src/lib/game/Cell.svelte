<script lang="ts">
	import { cell_size, game } from '$lib/game/data';

	export let row: number = 0;
	export let column: number = 0;

	// I use a <button> here to make ARIA happy
	// what do we say to the god of accessiblity warnings? "yes ma'am"

	// does this cell still exist on the game board?
	$: available = ($game ?? []).length > row || ($game[column] ?? []).length > column;

	// celular atomata
	$: alive = available && $game[row] && $game[row][column] && $game[row][column] === 1;
</script>

<div class="cell" class:alive style:width="{$cell_size}px" style:height="{$cell_size}px" />

<style>
	.cell {
		border: 1px solid var(--accent);
		background: transparent;
		font-size: 0.5rem;
		display: grid;
		place-content: center;
		color: var(--muted);
		overflow: hidden;
	}
	.cell:hover {
		background: var(--muted);
	}

	.alive {
		background: var(--primary);
		/* border: 1px solid var(--primary); */
		color: var(--background);
		font-weight: bold;
	}
</style>
