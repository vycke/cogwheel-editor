<script>
	let className = '';

	export { className as class };
	export let items = [];
	let selected = items[0].label;
</script>


<ul role="list" class="flex-row mb-3 border-w-5 border-grey-5 bg-grey-5 radius-5 {className}">
	{#each items as item}
		<li>
			<button class:selected={selected === item.label} class="item" on:click={() => (selected = item.label)}>
			{item.label}
		</button>
		</li>
	{/each}
</ul>

<div class="flex-grow flex-col bg-grey-5 radius-3">
	{#each items as item}
		{#if item.label === selected}
			<svelte:component this={item.component}/>
		{/if}
	{/each}
</div>

<style>
	.item {
		padding: var(--size-0) var(--size-4);
		cursor: pointer;
		background: transparent;
		border-radius: var(--size-3);
		color: var(--color-grey-0);
		transition: var(--transition-300);
		text-transform: capitalize;
	}

	.selected {
		background-color: var(--color-primary);
		color: var(--color-grey-5);
	}

	.item:hover, .selected:hover {
		background: var(--color-grey-4);
		color: var(--color-primary);
	}
</style>