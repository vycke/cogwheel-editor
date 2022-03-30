<script lang="ts">
	import { editorStore as store } from './editor.store';
	import { openToast } from '../toast/toast.actions';
	import Prism from '$lib/helpers/prism';
	import { updateText } from './editor.actions';

	function checkTab(e) {
		if (e.key == 'Tab') {
			e.preventDefault();
			const _before = e.target.value.slice(0, e.target.selectionStart);
			const _after = e.target.value.slice(e.target.selectionEnd, e.target.length);
			const _pos = e.target.selectionEnd + 2;
			e.target.value = _before + '  ' + _after;
			updateText(_before + '  ' + _after);
			e.target.selectionStart = _pos;
			e.target.selectionEnd = _pos;
		}
	}

	// Reactive updated to the store.
	export let text = $store.context.text;
	$: updateText(text);

	async function handlyCopy() {
		await navigator.clipboard.writeText($store.context.text);
		openToast('Configuration copied to your clipboard!');
	}
</script>

<div class="grid-1 flex-grow relative">
	<button
		on:click|preventDefault={handlyCopy}
		class="absolute post-0 posr-0 bg-grey-4 text-grey-0 hover:text-primary transition-300 px-3 py-1 border-grey-5"
	>
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
			<path
				d="M502.6 70.63l-61.25-61.25C435.4 3.371 427.2 0 418.7 0H255.1c-35.35 0-64 28.66-64 64l.0195 256C192 355.4 220.7 384 256 384h192c35.2 0 64-28.8 64-64V93.25C512 84.77 508.6 76.63 502.6 70.63zM464 320c0 8.836-7.164 16-16 16H255.1c-8.838 0-16-7.164-16-16L239.1 64.13c0-8.836 7.164-16 16-16h128L384 96c0 17.67 14.33 32 32 32h47.1V320zM272 448c0 8.836-7.164 16-16 16H63.1c-8.838 0-16-7.164-16-16L47.98 192.1c0-8.836 7.164-16 16-16H160V128H63.99c-35.35 0-64 28.65-64 64l.0098 256C.002 483.3 28.66 512 64 512h192c35.2 0 64-28.8 64-64v-32h-47.1L272 448z"
				fill="currentColor"
			/>
		</svg>
	</button>
	{#if $store.state === 'invalid'}
		<span class="absolute posb-0 posr-0 mb-1 mr-1 text-3 bg-danger-1 lh-3 radius-1 p-1">
			Invalid configuration
		</span>
	{/if}
	<textarea
		class="editor | monospace text-2 p-3 grid-row-1 grid-col-1 text-grey-0"
		spellcheck="false"
		bind:value={text}
		on:keydown={checkTab}
	/>

	<div class="viewer | grid-row-1 grid-col-1 p-3">
		<pre aria-hidden="true" class="grid-row-1 grid-col-1 p-3"><code class="language-javascript"
				>{@html Prism.highlight($store.context.text, Prism.languages.javascript, 'javascript')}
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

	svg {
		height: var(--size-3);
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
