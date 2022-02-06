<script>
	import Clipboard from '$lib/icons/Clipboard.svelte';
	import { toast } from '$lib/stores/toast';
	export let value = '';
	let className = '';
	export { className as class };

	async function handlyCopy() {
		await navigator.clipboard.writeText(value);
		toast.send({
			type: 'OPENED',
			payload: { label: 'Configuration copied to your clipboard!', type: 'info' }
		});
	}
</script>

<div class="viewer | {className}">
	<button
		on:click|preventDefault={handlyCopy}
		class="bg-grey-4 text-grey-0 hover:text-primary transition-300 px-3 py-1"
	>
		<Clipboard />
	</button>
	<pre aria-hidden="true" class={className}><code class="language-js"
			>{@html Prism.highlight(value, Prism.languages.javascript)}
    </code>
  </pre>
</div>

<style>
	.viewer {
		position: relative;
		height: 100%;
	}

	pre > code {
		font-size: var(--size-2);
		font-family: var(--monospace);
		tab-size: 2;
		padding: var(--size-3);
	}

	pre {
		z-index: 0;
		overflow: none;
		height: 100%;
		position: relative;
	}

	button {
		position: absolute;
		top: 0;
		right: 0;
		cursor: pointer;
		z-index: 2;
		border-bottom-left-radius: var(--size-3);
		border-top-right-radius: var(--size-3);
	}
</style>
