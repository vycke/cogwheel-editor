<script>
	import Editor from '$lib/features/editor/Editor.svelte';
	import Footer from '$lib/components/structure/Footer.svelte';
	import TabContainer from '$lib/components/navigation/TabContainer.svelte';
	import Simulation from '$lib/features/simulation/Simulation.svelte';
	import Visualizer from '$lib/features/visualizer/Visualizer.svelte';
	import Commands from '$lib/features/commands/Commands.svelte';
	import TestOverview from '$lib/features/tests/TestOverview.svelte';
	import ExamplePanel from '$lib/features/examples/ExamplePanel.svelte';

	let items = [
		{ label: 'editor', component: Editor },
		{ label: 'tests', component: TestOverview },
		{ label: 'simulation', component: Simulation }
	];
</script>

<svelte:head>
	<title>Cogwheel editor</title>
</svelte:head>

<Visualizer />

<section class="sidebar | flex-col content-start p-0">
	<TabContainer class="self-end" {items}>
		<div class="flex-row items-center gap-00">
			<Commands />
			<ExamplePanel />
		</div>
	</TabContainer>

	<Footer />
</section>

<style>
	.sidebar {
		overflow-y: auto;
		max-height: 100vh;
	}
</style>
