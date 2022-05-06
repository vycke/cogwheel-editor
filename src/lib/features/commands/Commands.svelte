<script lang="ts">
	import { commands } from './commands';
	import Modal from '$lib/components/utilities/Modal.svelte';
	import { shortcut } from '$lib/helpers/shortcut';
	import { commandModal, toggleCommandPanel } from './modal.store';

	export let cmd = '';
	let ref: HTMLElement;
	$: cmds = commands.filter((c) => c.key.includes(cmd.split(' ')[0].toLowerCase()));

	function toggle() {
		cmd = '';
		toggleCommandPanel();
		if ($commandModal.state === 'visible') ref.focus();
	}

	function execute(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			if (!cmds.length) return;
			const [_, ...command] = cmd.split(' ');
			cmds[0].callback(command.join(' ')?.trim());
			cmd = '';
		}
	}
</script>

<button class="radius-1 bg-grey-4" on:click={toggle} use:shortcut={{ key: 'p', callback: toggle }}>
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
		<path
			fill="currentColor"
			d="M9.372 86.63C-3.124 74.13-3.124 53.87 9.372 41.37C21.87 28.88 42.13 28.88 54.63 41.37L246.6 233.4C259.1 245.9 259.1 266.1 246.6 278.6L54.63 470.6C42.13 483.1 21.87 483.1 9.372 470.6C-3.124 458.1-3.124 437.9 9.372 425.4L178.7 256L9.372 86.63zM544 416C561.7 416 576 430.3 576 448C576 465.7 561.7 480 544 480H256C238.3 480 224 465.7 224 448C224 430.3 238.3 416 256 416H544z"
		/>
	</svg>
</button>
<Modal store={commandModal}>
	<div class="flex-col">
		<input
			bind:value={cmd}
			bind:this={ref}
			on:keypress={execute}
			placeholder={'e.g. ADD new-node-name'}
			class="radius-0 p-000 bg-grey-4 text-grey-0 text-00 flex-grow border-grey-4 border-w-2"
		/>
		<ul class="list">
			{#each cmds as command}
				<li class="flex-row items-center p-000 border-b-grey-4 gap-000">
					<span class="text-00">{command.key}:</span>
					<span class="text-grey-3 text-00">{command.description}</span>
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
		outline: none;
	}

	input:focus {
		border-radius: var(--size-0);
		border: var(--color-primary) solid 2px;
	}

	svg {
		color: var(--color-grey-1);
		height: var(--size-0);
		transition: all 300ms;
	}

	svg:hover {
		color: var(--color-primary);
	}
</style>
