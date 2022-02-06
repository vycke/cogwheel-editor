<script>
	import { config } from '$lib/stores/config';
	import CodeViewer from './CodeViewer.svelte';

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
</script>

<div class="grid-1 flex-grow">
	<textarea
		class="editor | grid-row-1 grid-col-1 text-grey-0"
		spellcheck="false"
		bind:value={$config}
		on:keydown={checkTab}
	/>

	<CodeViewer bind:value={$config} class="grid-row-1 grid-col-1" />
</div>

<style>
	.editor {
		font-size: var(--size-2);
		font-family: var(--monospace);
		tab-size: 2;
		padding: var(--size-3);
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
</style>
