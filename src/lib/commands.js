import { config, diagram, events } from './stores/config';
import { get } from 'svelte/store';
import { modal } from './stores/modal';

export const commands = [
	{
		key: 'EVENT',
		description: 'New simulation event: <name>',
		cb: (e) => events.update((v) => [...v, e])
	},
	{
		key: 'ESC',
		description: 'ctrl + P',
		cb: () => modal.send({ type: 'TOGGLE' })
	},
	{
		key: 'MERMAID',
		description: 'Copy mermaid config to clipboard',
		cb: async () => await navigator.clipboard.writeText(get(diagram))
	},
	{
		key: 'COPY',
		description: 'Copy cogwheel config to clipboard',
		cb: async () => await navigator.clipboard.writeText(get(config))
	}
];
