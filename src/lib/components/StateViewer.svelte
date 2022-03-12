<script>
	import mermaid from 'mermaid';
	import { onMount } from 'svelte';
	import { mermaidDefinition } from '$lib/stores/config';

	let canvas;

	onMount(() => {
		if (!canvas) return;
		mermaid.initialize({ theme: 'dark', themeVariables: { nodeBorder: '#00eace' } });
		mermaidDefinition.subscribe((def) => {
			mermaid.render('mermaid', def, (svgCode) => {
				canvas.innerHTML = svgCode;
			});
		});
	});
</script>

<div bind:this={canvas} class="h-full flex-row items-center justify-center p-3" />
<!-- 
<style>
	:global(g[data-selected='true'] rect) {
		fill: var(--color-primary) !important;
		color: var(--color-secondary) !important;
	}
	:global(g[data-selected='true'] span) {
		color: var(--color-secondary) !important;
	}
</style> -->
