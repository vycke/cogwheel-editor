<script context="module">
	import { config } from '$lib/stores/config';
	import { defaultStore } from '$lib/constants';
	// Load the initial graph based on the URL, or the default configuration
	export async function load({ url }) {
		config.set(atob(url?.hash.replace('#/', '')) || defaultStore);
		return {};
	}
</script>

<script>
	import CodeEditor from '$lib/components/CodeEditor.svelte';
	import Footer from '$lib/components/structure/Footer.svelte';
	import TabContainer from '$lib/components/navigation/TabContainer.svelte';
	import ReplaySection from '$lib/components/ReplaySection.svelte';
	import StateViewer from '$lib/components/StateViewer.svelte';

	const items = [
		{ label: 'editor', component: CodeEditor },
		{ label: 'replay', component: ReplaySection }
	];
</script>

<svelte:head>
	<title>Cogwheel editor</title>
</svelte:head>

<StateViewer />

<section class="sidebar | flex-col content-start p-3">
	<TabContainer class="self-end" {items} />
	<Footer />
</section>

<style>
	.sidebar {
		overflow-y: auto;
		max-height: 100vh;
	}
</style>
