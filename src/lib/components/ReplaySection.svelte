<script>
	import ActionButton from './form/ActionButton.svelte';
	import { logs } from '$lib/stores/logs';
	import CodeHighlighter from './CodeHighlighter.svelte';

	let defaultEvent = '{\n\ttype: "",\n\tpayload: {}\n}';

	let event = defaultEvent;
	let context = '{\n\ttype: ""\n}';

	function addEvent(e) {
		logs.update((v) => [...v, e.target.value]);
		event = defaultEvent;
	}
</script>

<div class="wrapper | p-3 flex-col">
	{#if $logs.length === 0}
	<span class="italic text-grey-3">No events played yet!</span>
	<div class="flex-grow" />
	{:else}
	<h2 class="bold line text-3 mb-2">Current state</h2>
	<CodeHighlighter value="{context}" />
	<div class="flex-grow">
		<h2 class="bold line mb-2 text-3">History</h2>
		{#each $logs as log}
		<CodeHighlighter value="{log}" />
		{/each}
	</div>
	{/if} <textarea rows={5} bind:value={event} placeholder={'{\n\ttype:\n}'} class="radius-3 p-1
	bg-grey-4 text-grey-0 text-2" />
	<ActionButton class="mt-3" on:click="{addEvent}">Create event</ActionButton>
</div>

<style>
	.wrapper {
		height: 100%;
	}

	.line {
		border-bottom: 1px solid var(--color-grey-3);
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
