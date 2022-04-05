<script lang="ts">
	import Button from '$lib/components/form/Button.svelte';
	import { events } from './simulation.store';
	import { openToast } from '$lib/features/toast/toast.actions';

	let event = ``;

	function addEvent() {
		events.update((v) => [...v, event]);
		event = '';
	}

	function handleReset() {
		events.set([]);
		openToast('Events removed!');
	}

	function execute(e) {
		if (e.charCode === 13) addEvent();
	}
</script>

<div class="wrapper | p-0 flex-col relative">
	<button
		on:click|preventDefault={handleReset}
		class="absolute post-0 posr-0 bg-grey-4 text-grey-0 hover:text-primary transition-300 px-0 py-000 border-grey-5"
	>
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
			<path
				d="M160 400C160 408.8 152.8 416 144 416C135.2 416 128 408.8 128 400V192C128 183.2 135.2 176 144 176C152.8 176 160 183.2 160 192V400zM240 400C240 408.8 232.8 416 224 416C215.2 416 208 408.8 208 400V192C208 183.2 215.2 176 224 176C232.8 176 240 183.2 240 192V400zM320 400C320 408.8 312.8 416 304 416C295.2 416 288 408.8 288 400V192C288 183.2 295.2 176 304 176C312.8 176 320 183.2 320 192V400zM317.5 24.94L354.2 80H424C437.3 80 448 90.75 448 104C448 117.3 437.3 128 424 128H416V432C416 476.2 380.2 512 336 512H112C67.82 512 32 476.2 32 432V128H24C10.75 128 0 117.3 0 104C0 90.75 10.75 80 24 80H93.82L130.5 24.94C140.9 9.357 158.4 0 177.1 0H270.9C289.6 0 307.1 9.358 317.5 24.94H317.5zM151.5 80H296.5L277.5 51.56C276 49.34 273.5 48 270.9 48H177.1C174.5 48 171.1 49.34 170.5 51.56L151.5 80zM80 432C80 449.7 94.33 464 112 464H336C353.7 464 368 449.7 368 432V128H80V432z"
				fill="currentColor"
			/>
		</svg>
	</button>

	<ul class="flex-grow flex-col">
		{#each $events as e, i}
			<div class="flex-row items-center gap-00 border-b-grey-4 py-00">
				<span class="text-grey-3 uppercase text-00">event {i + 1}:</span>
				<span>{e}</span>
			</div>
		{/each}
	</ul>

	<div class="flex-row gap-0 items-stretch">
		<input
			bind:value={event}
			placeholder={'e.g. TOGGLE'}
			on:keypress={execute}
			class="radius-3 p-000 bg-grey-4 text-grey-0 text-00 flex-grow border-grey-4 border-w-2"
		/>
		<Button class="text-1" on:click={addEvent}>+</Button>
	</div>
</div>

<style>
	button {
		cursor: pointer;
		z-index: 2;
		border-bottom-left-radius: var(--size-0);
		border-top-right-radius: var(--size-0);
	}

	svg {
		height: var(--size-0);
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
