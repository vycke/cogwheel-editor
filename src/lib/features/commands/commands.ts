import { addNode, addTransition } from '../editor/editor.actions';
import { togglePalette, copyConfig, copyMermaid } from './commands.actions';

export type Command = {
	key: string;
	description: string;
	callback: (str?: string) => void;
};

export const commands: Command[] = [
	{
		key: 'node',
		description: '<label>',
		callback: addNode
	},
	{
		key: 'transition',
		description: '<source> <target> <label>',
		callback: addTransition
	},
	{
		key: 'esc',
		description: 'close the command palette',
		callback: togglePalette
	},
	{
		key: 'mermaid',
		description: 'copy mermaid config to clipboard',
		callback: copyMermaid
	},
	{
		key: 'copy',
		description: 'copy cogwheel config to clipboard',
		callback: copyConfig
	}
];
