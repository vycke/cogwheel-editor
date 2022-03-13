<script>
	import Close from '$lib/icons/Close.svelte';
	import { modal } from '$lib/stores/modal';
	export let title = '';
</script>

{#if $modal.state === 'visible'}
	<div class="dimmer" on:click|stopPropagation={() => modal.send({ type: 'TOGGLE' })} />
{/if}

<div class="modal | bg-grey-5 border-grey-5 border-w-3 radius-3" data-state={$modal.state}>
	<div class="flex-row items-center | bold">
		{#if title}
			<span class="flex-grow">{title}</span>
			<button on:click={() => modal.send({ type: 'TOGGLE' })} data-type="styleless">
				<Close />
			</button>
		{/if}
	</div>
	<slot />
</div>

<style>
	.dimmer {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 998;
		background-color: rgba(255, 255, 255, 0.05);
	}
	.modal {
		position: fixed;
		top: 2rem;
		min-width: var(--bp-4);
		left: 50%;
		transform: translateX(-50%);
		z-index: 999;
		transition: var(--transition-300);
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.18);
	}
	.modal[data-state='invisible'] {
		transform: translateY(-20rem) translateX(-50%) scale(1);
	}
</style>
