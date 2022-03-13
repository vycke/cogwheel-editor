<script>
	import Button from './form/Button.svelte';
	import { events } from '$lib/stores/config';
	import { toast } from '$lib/stores/toast';
	import Trash from '$lib/icons/Trash.svelte';

	let event = ``;

	function addEvent(e) {
		events.update((v) => [...v, event]);
		event = '';
	}

	function handleReset() {
		events.set([]);
		toast.send({
			type: 'OPENED',
			payload: { label: 'Events removed!', type: 'info' }
		});
	}
</script>

<div class="wrapper | p-3 flex-col relative">
	<button
		on:click|preventDefault={handleReset}
		class="absolute post-0 posr-0 bg-grey-4 text-grey-0 hover:text-primary transition-300 px-3 py-1 border-grey-5"
	>
		<Trash />
	</button>

	<ul role="list" class="flex-grow flex-col">
		{#each $events as e}
			<div class="flex-row items-center gap-2 border-b-grey-4 py-2">
				<span class="text-grey-3 uppercase text-2">event:</span>
				<span>{e}</span>
			</div>
		{/each}
	</ul>

	<div class="flex-row gap-3 items-stretch">
		<input
			bind:value={event}
			placeholder={'e.g. TOGGLE'}
			class="radius-3 p-1 bg-grey-4 text-grey-0 text-2 flex-grow border-grey-4 border-w-2"
		/>
		<Button class="text-4" on:click={addEvent}>+</Button>
	</div>
</div>

<style>
	button {
		cursor: pointer;
		z-index: 2;
		border-bottom-left-radius: var(--size-3);
		border-top-right-radius: var(--size-3);
	}

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
