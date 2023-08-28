<script lang="ts">
	import { grid, game } from './data';

	let is_currently_playing = false;

	const play_toggle = () => {
		is_currently_playing = !is_currently_playing;
	};
	const next_step = () => {};
</script>

<div>
	<button on:click={play_toggle}>
		{#if !is_currently_playing}
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
	<button on:click={next_step} disabled={is_currently_playing}>
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
