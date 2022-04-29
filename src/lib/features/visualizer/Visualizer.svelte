<script lang="ts">
	import mermaid from 'mermaid';
	import { onMount } from 'svelte';
	import { simulated } from '../simulation/simulation.store';
	import { diagram } from './visualizer.store';

	let canvas: HTMLElement;

	onMount(() => {
		if (!canvas) return;
		mermaid.initialize({ theme: 'dark', themeVariables: { nodeBorder: '#88c0c0' } });
		// Draw the mermaid definition
		diagram.subscribe((def) => {
			if (!def) return;

			mermaid.render('mermaid', def as string, (svgCode) => {
				if (!canvas) return;
				canvas.innerHTML = svgCode;
			});
		});
		// Update the visualization of the current state of the machine
		simulated.subscribe((def) => {
			document.querySelectorAll('g.nodes > *').forEach((n: HTMLElement) => {
				if (n.id.includes(`state-${def.current}-`)) n.dataset.selected = 'true';
				else n.dataset.selected = 'false';
			});
		});
	});
</script>

<div bind:this={canvas} class="h-full flex-row items-center justify-center p-0" />

<style>
	:global(g[data-selected='true'] rect) {
		fill: var(--color-primary) !important;
		color: var(--color-secondary) !important;
	}
	:global(g[data-selected='true'] span) {
		color: var(--color-secondary) !important;
	}
</style>
