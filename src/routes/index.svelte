<script>
	import Editor from '$lib/features/editor/Editor.svelte';
	import Footer from '$lib/components/structure/Footer.svelte';
	import TabContainer from '$lib/components/navigation/TabContainer.svelte';
	import Simulation from '$lib/features/simulation/Simulation.svelte';
	import Visualizer from '$lib/features/visualizer/Visualizer.svelte';
	import Commands from '$lib/features/commands/Commands.svelte';

	let items = [
		{ label: 'editor', component: Editor },
		{ label: 'simulation', component: Simulation }
	];
</script>

<svelte:head>
	<title>Cogwheel editor</title>
</svelte:head>

<Visualizer />

<section class="sidebar | flex-col content-start p-3">
	<TabContainer class="self-end" {items}>
		<Commands slot="header" />
	</TabContainer>

	<Footer />
</section>

<style>
	.sidebar {
		overflow-y: auto;
		max-height: 100vh;
	}
</style>
