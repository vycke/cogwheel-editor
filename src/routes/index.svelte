<script>
	import CodeEditor from '$lib/components/CodeEditor.svelte';
	import AppFooter from '$lib/components/structure/Footer.svelte';
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
	<AppFooter />
</section>

<style>
	.sidebar {
		overflow-y: auto;
		max-height: 100vh;
	}
</style>
