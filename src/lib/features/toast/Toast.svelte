<script>
	import { toast } from '$lib/features/toast/toast.store';
</script>

<div
	class="toast | py-00 px-0 | bold lh-00 bg-{$toast.context.type}-1 text-grey-0 radius-00"
	data-state={$toast.state}
>
	<span>{$toast.context.label}</span>
	<button on:click={() => toast.send({ type: 'CLOSED' })} class="ml-1 text-grey-0" data-type="link"
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
