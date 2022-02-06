<script>
	import CodeEditor from './CodeEditor.svelte';
	import Footer from './Footer.svelte';

	let selected = 'config';
	const items = ['config', 'state', 'events'];
</script>

<section class="sidebar | flex-col content-start p-3">
	<div class="flex-row mb-3 border-w-5 border-grey-5 bg-grey-5 radius-5 self-end">
		{#each items as item}
			<button class:selected={selected === item} class="item" on:click={() => (selected = item)}
				>{item}</button
			>
		{/each}
	</div>

	<div class="flex-grow flex-col bg-grey-5 radius-3">
		{#if selected === 'config'}
			<CodeEditor />
		{/if}
	</div>

	<Footer />
</section>

<style>
	.sidebar {
		overflow-y: auto;
		max-height: 100vh;
	}

	.item {
		padding: var(--size-0) var(--size-4);
		cursor: pointer;
		background: transparent;
		border-radius: var(--size-3);
		color: var(--color-grey-0);
		transition: var(--transition-300);
		text-transform: capitalize;
	}

	.item:hover {
		background: var(--color-grey-4);
	}

	.selected {
		background-color: var(--color-primary);
		color: var(--color-grey-5);
	}

	.selected:hover {
		color: var(--color-grey-1);
	}
</style>
