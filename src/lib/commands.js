import { events } from './stores/config';
import { modal } from './stores/modal';

export const commands = [
	{
		key: 'E',
		description: 'New simulation event: <name>',
		cb: (e) => events.update((v) => [...v, e])
	},
	// { key: 'N', description: 'New node: <name>', cb: () => console.log('yay') },
	// {
	// 	key: 'T',
	// 	description: 'New transition: <name> <source> <target>',
	// 	cb: () => console.log('yay')
	// },
	{
		key: 'C',
		description: 'ctrl + P',
		cb: () => modal.send({ type: 'TOGGLE' })
	}
];
