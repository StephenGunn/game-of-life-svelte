<script lang="ts">
	import { speed } from './settings';
</script>

<input type="range" min="0" max="5" bind:value={$speed} class="slider" />
<div class="display">
	<div>-</div>
	<div>+</div>
</div>

<style>
	.display {
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 0.75rem;
	}
	.slider {
		-webkit-appearance: none;
		appearance: none;
		width: 100%;
		height: 8px;
		background: var(--muted);
		outline: none;
		border-radius: 4px;
	}

	.slider::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		width: 20px;
		height: 20px;
		background: var(--secondary);
		cursor: pointer;
		border-radius: 50%;
	}

	.slider::-moz-range-thumb {
		appearance: none;
		width: 20px;
		height: 20px;
		background: var(--secondary);
		cursor: pointer;
		border-radius: 50%;
	}
</style>
