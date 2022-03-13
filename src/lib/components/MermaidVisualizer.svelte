<script>
	import mermaid from 'mermaid';
	import { onMount } from 'svelte';
	import { diagram, context } from '$lib/stores/config';

	let canvas;

	onMount(() => {
		if (!canvas) return;
		mermaid.initialize({ theme: 'dark', themeVariables: { nodeBorder: '#00eace' } });
		// Draw the mermaid definition
		diagram.subscribe((def) => {
			if (!def) return;
			mermaid.render('mermaid', def, (svgCode) => {
				if (!canvas) return;
				canvas.innerHTML = svgCode;
			});
		});
		// Update the visualization of the current state of the machine
		context.subscribe((def) => {
			document.querySelectorAll('g.nodes > *').forEach((n) => {
				if (n.id.includes(`state-${def.current}-`)) n.dataset.selected = true;
				else n.dataset.selected = false;
			});
		});
	});
</script>

<div bind:this={canvas} class="h-full flex-row items-center justify-center p-3" />

<style>
	:global(g[data-selected='true'] rect) {
		fill: var(--color-primary) !important;
		color: var(--color-secondary) !important;
	}
	:global(g[data-selected='true'] span) {
		color: var(--color-secondary) !important;
	}
</style>
