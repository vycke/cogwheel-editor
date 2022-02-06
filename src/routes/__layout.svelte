<script>
	import Toast from '$lib/components/Toast.svelte';
	import 'prismjs';
	import '../styles/index.scss';
</script>

<main class="flex-grow sidebar-r sidebar-w-5 gap-3">
	<slot />
</main>

<Toast />
