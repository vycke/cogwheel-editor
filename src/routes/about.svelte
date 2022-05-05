<script lang="ts">
	import Footer from '$lib/components/structure/Footer.svelte';
	import {
		authExample,
		autoSignoutExample,
		cacheExample,
		cogwheelEditorExample,
		formExample
	} from '$lib/constants';
</script>

<svelte:head>
	<title>About cogwheel editor</title>
</svelte:head>

<div class="p-0" />
<div class="p-0 flex-col">
	<div class="flex-grow bg-grey-5 radius-0 p-0">
		<h1>About</h1>
		<p>
			<a href="https://github.com/kevtiq/cogwheel">Cogwheel</a> is a small state management library
			inspired by <a href="https://xstate.js.org/">XState</a>. This editor is small side-project to
			enhance the developer experience of the cogwheel library, inspired by
			<a href="https://stately.ai/">Stately.ai</a>.
		</p>

		<h2 class="mt-0">Examples</h2>
		<ul>
			<li><a href="/#/{window.btoa(authExample)}" target="_blank">Authentication example</a></li>
			<li><a href="/#/{window.btoa(formExample)}" target="_blank">Form example</a></li>
			<li>
				<a href="/#/{window.btoa(cacheExample)}" target="_blank">Caching + fetching example</a>
			</li>
			<li>
				<a href="/#/{window.btoa(autoSignoutExample)}" target="_blank">Auto signout example</a>
			</li>
			<li>
				<a href="/#/{window.btoa(cogwheelEditorExample)}" target="_blank">Cogwheel editor example</a
				>
			</li>
		</ul>
	</div>
	<Footer />
</div>
