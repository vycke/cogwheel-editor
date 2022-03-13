<script>
	import Command from '$lib/icons/Command.svelte';
	import { modal } from '$lib/stores/modal';
	import Modal from './utilities/Modal.svelte';
	import { shortcut } from '$lib/shortcuts';

	export let cmd = '';

	function toggle() {
		modal.send({ type: 'TOGGLE' });
	}
</script>

<button
	class="radius-1 bg-secondary color-primary pointer"
	on:click={toggle}
	use:shortcut={{ key: 'p', callback: toggle }}
>
	<Command />
</button>
<Modal>
	<div class="flex-col">
		<input
			bind:value={cmd}
			placeholder={'e.g. ADD new-node-name'}
			class="radius-3 p-1 bg-grey-4 text-grey-0 text-2 flex-grow border-grey-4 border-w-2"
		/>
		<ul role="list">
			<li>test</li>
			<li>test</li>
			<li>test</li>
			<li>test</li>
		</ul>
	</div>
</Modal>

<style>
	button {
		cursor: pointer;
	}

	input::placeholder {
		color: var(--color-grey-3);
		font-family: var(--monospace);
	}

	input {
		font-family: var(--monospace);
	}
</style>
