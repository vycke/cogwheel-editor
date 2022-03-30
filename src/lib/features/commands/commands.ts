import { events } from '../simulation/simulation.store';
import { modal } from './commands.store';

export type Command = {
	key: string;
	description: string;
	callback: (str?: string) => void;
};

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
		callback: async () => await navigator.clipboard.writeText('')
	},
	{
		key: 'COPY',
		description: 'Copy cogwheel config to clipboard',
		callback: async () => await navigator.clipboard.writeText('')
	}
];
