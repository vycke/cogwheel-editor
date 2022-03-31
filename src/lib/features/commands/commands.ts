import { events } from '../simulation/simulation.store';

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
