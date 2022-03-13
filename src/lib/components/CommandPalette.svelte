<script>
	import Command from '$lib/icons/Command.svelte';
	import { modal } from '$lib/stores/modal';
	import Modal from './utilities/Modal.svelte';
	import { shortcut } from '$lib/shortcuts';
	import { commands } from '$lib/constants';

	export let cmd = '';

	function toggle() {
		modal.send({ type: 'TOGGLE' });
	}

	function execute(e) {
		if (e.charCode === 13) toggle();
	}

	$: _commands: commands;
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
			on:keypress={execute}
			placeholder={'e.g. ADD new-node-name'}
			class="radius-3 p-1 bg-grey-4 text-grey-0 text-2 flex-grow border-grey-4 border-w-2"
		/>
		<ul role="list">
			{#each commands as command}
				<li class="flex-row items-center p-1 border-b-grey-4 gap-1">
					<span class="text-3">{command.key}:</span>
					<span class="text-grey-3 text-2">{command.description}</span>
				</li>
			{/each}
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
