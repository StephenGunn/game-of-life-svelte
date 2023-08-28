<script lang="ts">
	import { grid, cell_size } from './data';
</script>

<div class="h_ruler" style:left="{$grid.orphaned_w / 2 + 1}px">
	{#each { length: $grid.columns } as _, x}
		<div style:width="{$cell_size}px" style:height="{$grid.orphaned_h / 2}px" class="number">
			{x + 1}
		</div>
	{/each}
</div>
<div class="v_ruler" style:top="{$grid.orphaned_h / 2 + 1}px">
	{#each { length: $grid.rows } as _, y}
		<div style:height="{$cell_size}px" style:width="{$grid.orphaned_w / 2}px" class="number">
			{y + 1}
		</div>
	{/each}
</div>

<style>
	.h_ruler {
		position: absolute;
		display: flex;
	}

	.number {
		text-align: center;
		font-size: 0.7rem;
		display: grid;
		place-content: center;
		color: var(--muted);
	}

	.v_ruler {
		position: absolute;
		display: flex;
		left: 0;
		flex-flow: column;
	}
</style>
