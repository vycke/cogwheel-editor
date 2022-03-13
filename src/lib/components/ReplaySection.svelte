<script>
	import Button from './form/Button.svelte';
	import { events } from '$lib/stores/config';

	let event = ``;

	function addEvent(e) {
		events.update((v) => [...v, event]);
		event = '';
	}
</script>

<div class="wrapper | p-3 flex-col">
	<div class="flex-grow" />

	<input
		bind:value={event}
		placeholder={'e.g. TOGGLE'}
		class="radius-3 p-1 bg-grey-4 text-grey-0 text-2"
	/>
	<Button class="mt-3" on:click={addEvent}>Create event</Button>
</div>

<style>
	.wrapper {
		height: 100%;
	}

	input::placeholder {
		color: var(--color-grey-3);
		font-family: var(--monospace);
	}

	input {
		font-family: var(--monospace);
	}
</style>
