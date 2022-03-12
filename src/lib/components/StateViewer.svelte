<script>
	import mermaid from 'mermaid';
	import { onMount } from 'svelte';
	import { config } from '$lib/stores/config';
	import { configToMermaid } from '$lib/transform';

	let canvas;

	onMount(() => {
		if (!canvas) return;
		mermaid.initialize({ theme: 'dark' });

		config.subscribe((state) => {
			try {
				const machine = configToMermaid(state);
				if (mermaid.parse(machine) && canvas) {
					mermaid.render('mermaid', machine, (svgCode) => {
						canvas.innerHTML = svgCode;
					});
				}
			} catch (e) {
				console.log(e);
			}
		});
	});
</script>

<div bind:this="{canvas}" class="h-full flex-row items-center justify-center p-3" />

<style></style>
