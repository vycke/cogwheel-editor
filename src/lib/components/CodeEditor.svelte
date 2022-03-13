<script>
	import { config } from '$lib/stores/config';
	import { toast } from '$lib/stores/toast';
	import Clipboard from '$lib/icons/Clipboard.svelte';

	function checkTab(e) {
		if (e.key == 'Tab') {
			e.preventDefault();
			const _before = e.target.value.slice(0, e.target.selectionStart);
			const _after = e.target.value.slice(e.target.selectionEnd, e.target.length);
			const _pos = e.target.selectionEnd + 2;
			e.target.value = _before + '  ' + _after;
			config.set(_before + '  ' + _after);
			e.target.selectionStart = _pos;
			e.target.selectionEnd = _pos;
		}
	}

	async function handlyCopy() {
		await navigator.clipboard.writeText($config);
		toast.send({
			type: 'OPENED',
			payload: { label: 'Configuration copied to your clipboard!', type: 'info' }
		});
	}
</script>

<div class="grid-1 flex-grow relative">
	<button
		on:click|preventDefault={handlyCopy}
		class="absolute post-0 posr-0 bg-grey-4 text-grey-0 hover:text-primary transition-300 px-3 py-1 border-grey-5"
	>
		<Clipboard />
	</button>
	<textarea
		class="editor | monospace text-2 p-3 grid-row-1 grid-col-1 text-grey-0"
		spellcheck="false"
		bind:value={$config}
		on:keydown={checkTab}
	/>

	<div class="viewer | grid-row-1 grid-col-1 p-3">
		<pre aria-hidden="true" class="grid-row-1 grid-col-1 p-3"><code class="language-javascript"
				>{@html Prism.highlight($config, Prism.languages.javascript)}
			</code>
		</pre>
	</div>
</div>

<style>
	button {
		cursor: pointer;
		z-index: 2;
		border-bottom-left-radius: var(--size-3);
		border-top-right-radius: var(--size-3);
	}

	.editor {
		tab-size: 2;
		z-index: 1;
		resize: none;
		color: transparent;
		background: transparent;
		caret-color: var(--color-primary);
		height: 100%;
		overflow: none;
	}

	.editor:focus {
		outline: none;
	}

	.viewer {
		position: relative;
	}

	pre > code {
		font-size: var(--size-2);
		font-family: var(--monospace);
		tab-size: 2;
	}

	pre {
		z-index: 0;
		overflow: none;
		height: 100%;
		position: relative;
	}
</style>
