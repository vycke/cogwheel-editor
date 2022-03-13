<script>
	import Command from '$lib/icons/Command.svelte';
	import { modal } from '$lib/stores/modal';
	import Modal from './utilities/Modal.svelte';
	import { shortcut } from '$lib/shortcuts';
	import { commands } from '$lib/commands';
	import { toast } from '$lib/stores/toast';

	export let cmd = '';
	export let ref;
	$: cmds = commands.filter((c) => c.key.includes(cmd.split(':')[0].toUpperCase()));

	function toggle() {
		cmd = '';
		modal.send({ type: 'TOGGLE' });
		if ($modal.state === 'visible') ref?.focus();
	}

	function execute(e) {
		if (e.charCode === 13) {
			if (!cmds.length) return;
			const [_, command] = cmd.split(':');
			cmds[0].cb(command?.trim());
			cmd = '';
			toast.send({
				type: 'OPENED',
				payload: { label: 'Command executed', type: 'info' }
			});
		}
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
			bind:this={ref}
			on:keypress={execute}
			placeholder={'e.g. ADD new-node-name'}
			class="radius-3 p-1 bg-grey-4 text-grey-0 text-2 flex-grow border-grey-4 border-w-2"
		/>
		<ul role="list">
			{#each cmds as command}
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
