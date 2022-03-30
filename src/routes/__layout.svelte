<script>
	import Toast from '$lib/features/toast/Toast.svelte';
	// required to ensure prism is correct attached to the Window;
	import '$lib/helpers/prism';
	import '../styles/index.scss';
</script>

<main class="flex-grow sidebar-r sidebar-w-5 gap-3">
	<slot />
</main>

<Toast />
