<script>
	import Button from './form/Button.svelte';

	let event = '';

	function addEvent(e) {
		logs.update((v) => [...v, e.target.value]);
		event = '';
	}
</script>

<div class="wrapper | p-3 flex-col">
	<textarea
		rows={5}
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

	textarea::placeholder {
		color: var(--color-grey-3);
		font-family: var(--monospace);
	}

	textarea {
		tab-size: 2;
		line-height: 1.2;
		font-family: var(--monospace);
	}
</style>
