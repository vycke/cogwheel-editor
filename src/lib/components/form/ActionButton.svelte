<script>
	let className = '';
	export { className as class };
	export let type = '';
	export let role = 'button';
</script>

<button
	class="radius-4 px-4 transition-300 pointer {className} border-primary border-w-2"
	{role}
	data-type="{type}"
	on:click
>
	<slot />
</button>

<style>
	button {
		--bg: var(--color-primary);
		--fg: var(--color-secondary);

		background-color: var(--bg);
		color: var(--fg);
		cursor: pointer;
	}

	button:hover {
		background-color: var(--fg);
		color: var(--bg);
	}

	button[data-type~='secondary'] {
		--bg: var(--color-secondary);
		--fg: var(--color-primary);
	}
</style>
