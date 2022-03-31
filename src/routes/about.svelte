<script lang="ts">
	import Footer from '$lib/components/structure/Footer.svelte';
	import { authExample, cacheExample, formExample } from '$lib/constants';
</script>

<svelte:head>
	<title>About cogwheel editor</title>
</svelte:head>

<div class="p-3" />
<div class="p-3 flex-col">
	<div class="flex-grow bg-grey-5 radius-3 p-3">
		<h1>About</h1>
		<p>
			<a href="https://github.com/kevtiq/cogwheel">Cogwheel</a> is a small state management library
			inspired by <a href="https://xstate.js.org/">XState</a>. This editor is small side-project to
			enhance the developer experience of the cogwheel library, inspired by
			<a href="https://stately.ai/">Stately.ai</a>.
		</p>

		<h2 class="mt-3">Examples</h2>
		<ul>
			<li><a href="/#/{window.btoa(authExample)}" target="_blank">Authentication example</a></li>
			<li><a href="/#/{window.btoa(formExample)}" target="_blank">Form example</a></li>
			<li>
				<a href="/#/{window.btoa(cacheExample)}" target="_blank">Caching + fetching example</a>
			</li>
		</ul>
	</div>
	<Footer />
</div>
