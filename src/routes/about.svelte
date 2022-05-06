<script lang="ts">
	import Footer from '$lib/components/structure/Footer.svelte';
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
	</div>
	<Footer />
</div>
