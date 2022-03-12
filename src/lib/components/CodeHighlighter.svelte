<script>
	export let value = '';
	export let language = 'javascript';
	let className = '';
	export { className as class };
</script>

<div class="viewer | {className}">
	<pre aria-hidden="true" class="{className}"><code class="language-{language}"
			>{@html Prism.highlight(value, Prism.languages[language])}
    </code>
  </pre>
</div>

<style>
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
