import { config, diagram, events } from './stores/config';
import { get } from 'svelte/store';
import { modal } from './stores/modal';

export type Command = {
	key: string,
	description: string,
	callback: Function
}

export const commands: Command[] = [
	{
		key: 'EVENT',
		description: 'New simulation event: <name>',
		callback: (e: string) => events.update((v: string[]) => [...v, e])
	},
	{
		key: 'ESC',
		description: 'ctrl + P',
		callback: () => modal.send({ type: 'TOGGLE' })
	},
	{
		key: 'MERMAID',
		description: 'Copy mermaid config to clipboard',
		callback: async () => await navigator.clipboard.writeText(get(diagram))
	},
	{
		key: 'COPY',
		description: 'Copy cogwheel config to clipboard',
		callback: async () => await navigator.clipboard.writeText(get(config))
	}
];
