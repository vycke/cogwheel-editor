<script lang="ts">
	import { toast } from '$lib/stores/toast';
</script>

<div
	class="toast | py-2 px-3 | bold lh-2 bg-{$toast.context.type}-1 text-grey-0 radius-2"
	data-state={$toast.state}
>
	<span>{$toast.context.label}</span>
	<button on:click={() => toast.send({ type: 'CLOSED' })} class="ml-4 text-grey-0" data-type="link"
		>x</button
	>
</div>

<style>
	.toast {
		position: fixed;
		bottom: 2rem;
		right: 2rem;
		z-index: 999;
		transition: var(--transition-300);
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.18);
	}

	.toast button {
		background-color: transparent;
	}

	.toast[data-state='invisible'] {
		transform: translateY(20rem) scale(1);
	}
</style>
