<script lang="ts">
	import { grid, cell_size } from './data';
</script>

<div class="col_ruler" style:left="{$grid.orphaned_w / 2 + 1}px">
	{#each { length: $grid.columns } as _, x}
		<div style:width="{$cell_size}px" style:height="{$grid.orphaned_h / 2}px" class="number">
			{x + 1}
		</div>
	{/each}
</div>
<div class="row_ruler" style:top="{$grid.orphaned_h / 2 + 1}px">
	{#each { length: $grid.rows } as _, y}
		<div style:height="{$cell_size}px" style:width="{$grid.orphaned_w / 2}px" class="number">
			{y + 1}
		</div>
	{/each}
</div>

<style>
	.row_ruler {
		position: absolute;
		display: flex;
		left: 0;
		flex-flow: column;
	}

	.col_ruler {
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
</style>
