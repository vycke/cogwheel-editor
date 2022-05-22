import { addNode, addTransition, copyConfig } from '../editor/editor.store';
import { clearLog } from '../simulation/simulation.store';
import { copyTests } from '../tests/tests.store';
import { copyMermaid } from '../visualizer/visualizer.store';
import { toggleCommandPanel } from './modal.store';

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
		callback: toggleCommandPanel
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
	},
	{
		key: 'tests',
		description: 'copy test configuration to clipboard',
		callback: copyTests
	},
	{
		key: 'clear',
		description: 'clear the simulation log',
		callback: clearLog
	}
];
