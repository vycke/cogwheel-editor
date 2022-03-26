<script lang="ts">
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
				<svg
					aria-hidden="true"
					focusable="false"
					role="img"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 512 512"
				>
					<path
						d="M256 8C119 8 8 119 8 256C8 393 119 504 256 504C393 504 504 393 504 256C504 119 393 8 256 8ZM256 456C145.5 456 56 366.5 56 256C56 145.5 145.5 56 256 56C366.5 56 456 145.5 456 256C456 366.5 366.5 456 256 456ZM357.8 193.8L295.6 256L357.8 318.2C362.5 322.9 362.5 330.5 357.8 335.2L335.2 357.8C330.5 362.5 322.9 362.5 318.2 357.8L256 295.6L193.8 357.8C189.1 362.5 181.5 362.5 176.8 357.8L154.2 335.2C149.5 330.5 149.5 322.9 154.2 318.2L216.4 256L154.2 193.8C149.5 189.1 149.5 181.5 154.2 176.8L176.8 154.2C181.5 149.5 189.1 149.5 193.8 154.2L256 216.4L318.2 154.2C322.9 149.5 330.5 149.5 335.2 154.2L357.8 176.8C362.5 181.5 362.5 189.1 357.8 193.8V193.8Z"
						fill="currentColor"
					/>
				</svg>
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
