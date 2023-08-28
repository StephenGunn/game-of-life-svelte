<script lang="ts">
	// trying to create a basic reusable switcher
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let value = true;
	const switcher = () => {
		value = !value;
		dispatch('switch', {
			value
		});
	};

	export const set_from_outside = (new_value: boolean) => (value = new_value);

	let falseW: number;
	let trueW: number;
	let height: number;
</script>

<div class="container">
	<div
		class="switch"
		on:click={switcher}
		on:keypress={switcher}
		bind:offsetHeight={height}
		role="button"
		tabindex="0"
	>
		<div
			class="highlight"
			style:width="{value ? trueW : falseW}px"
			style:height="{height}px"
			style:transform="translateX({value ? 0 : trueW}px)"
			class:active={value}
		/>
		<div class="item" bind:offsetWidth={trueW} class:active={value}>
			<slot name="true">True</slot>
		</div>
		<div class="item" bind:offsetWidth={falseW} class:active={!value}>
			<slot name="false">False</slot>
		</div>
	</div>
</div>

<style>
	.container .switch {
		background: rgba(0, 0, 0, 0.5);
		display: inline-flex;
		border-radius: 0.5rem;
		position: relative;
	}

	.container .highlight {
		position: absolute;
		background: var(--secondary);
		top: 0;
		transition: all 200ms ease-in-out;
		z-index: 1;
		border-radius: 0.5rem;
	}

	.container .highlight.active {
		background: var(--primary);
	}

	.container .item {
		padding: 0.25rem 0.5rem;
		display: inline-grid;
		place-content: center;
		cursor: pointer;
		position: relative;
		z-index: 2;
		font-size: 0.8rem;
		font-weight: bold;
		color: var(--secondary);
	}

	.container .item.active {
		color: white;
	}
</style>
