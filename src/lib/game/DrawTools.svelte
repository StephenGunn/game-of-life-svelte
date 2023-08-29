<script lang="ts">
	import { gliders } from './shapes';
	import { draw_mode } from './settings';
	import { shape_direction, active_shape_group } from './shapes';

	$active_shape_group = gliders;

	const rotate_shape = () => {
		if ($shape_direction < $active_shape_group.length - 1) {
			$shape_direction += 1;
		} else {
			$shape_direction = 0;
		}
		$active_shape_group = $active_shape_group;
	};

	let highlight_rotate = false;
	// Some keyboard bindings
	const on_key_down = (event: KeyboardEvent) => {
		// don't want repeats
		if (event.repeat) return;

		// switch incase we want to add more stuff later
		switch (event.key) {
			case 'r':
				highlight_rotate = true;
				setTimeout(() => {
					highlight_rotate = false;
				}, 50);
				rotate_shape();
				break;
		}
	};
</script>

<svelte:window on:keydown|preventDefault={on_key_down} />

<div class="buttons">
	<button class:active={$draw_mode === 'free'} on:click={() => ($draw_mode = 'free')}>
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"
			><rect width="256" height="256" fill="none" /><circle
				cx="128"
				cy="132"
				r="20"
				fill="none"
				stroke="currentColor"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="16"
			/><line
				x1="128"
				y1="152"
				x2="128"
				y2="248"
				fill="none"
				stroke="currentColor"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="16"
			/><path
				d="M72,72,40.83,127.43a8,8,0,0,0,.73,8.29L128,248l86.43-112.28a8,8,0,0,0,.73-8.29L184,72Z"
				fill="none"
				stroke="currentColor"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="16"
			/><path
				d="M184,72V32a8,8,0,0,0-8-8H80a8,8,0,0,0-8,8V72"
				fill="none"
				stroke="currentColor"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="16"
			/></svg
		> Draw
	</button>
	<button class:active={$draw_mode === 'glider'} on:click={() => ($draw_mode = 'glider')}>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 256 256"
			style:transform="rotate({$shape_direction * 90}deg)"
			><rect width="256" height="256" fill="none" /><path
				d="M223.69,42.18a8,8,0,0,0-9.87-9.87l-192,58.22a8,8,0,0,0-1.25,14.93L106.19,146a8,8,0,0,1,3.8,3.8l40.55,85.61a8,8,0,0,0,14.93-1.25Z"
				fill="none"
				stroke="currentColor"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="16"
			/><line
				x1="108.42"
				y1="147.58"
				x2="160"
				y2="96"
				fill="none"
				stroke="currentColor"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="16"
			/></svg
		> Glider
	</button>
	<button class:active={highlight_rotate} disabled={$draw_mode === 'free'} on:click={rotate_shape}>
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"
			><rect width="256" height="256" fill="none" /><polyline
				points="184 104 232 104 232 56"
				fill="none"
				stroke="currentColor"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="16"
			/><path
				d="M188.4,192a88,88,0,1,1,1.83-126.23L232,104"
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
	button.active {
		background: var(--primary);
	}

	svg {
		transition: transform 200ms ease;
		width: 1.1rem;
		height: 1.1rem;
	}
</style>
