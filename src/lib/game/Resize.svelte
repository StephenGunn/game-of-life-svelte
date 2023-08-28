<script lang="ts">
	import { cell_size, cell_min_size } from './data';

	const increase_size = () => {
		$cell_size += 5;
	};

	const decrease_size = () => {
		$cell_size -= 5;
	};
</script>

<div>
	<button on:click={decrease_size} disabled={$cell_size <= $cell_min_size}>-</button>
	{$cell_size}px
	<button on:click={increase_size} disabled={$cell_size >= 50}>+</button>
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
