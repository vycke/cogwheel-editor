export const defaultStore = `{
	init: "visible",
	states: {
		visible: {
			TOGGLE: {
				target: "invisible"
			},
		},
		invisible: {
			TOGGLE: {
				target: "visible"
			},
		}
	}
}`;

export const commands = [
	{ key: 'N', description: 'Add node <name> to the configuration', cb: () => console.log('yay') },
	{
		key: 'T',
		description: 'Add transition <name> from <source> to <target> to the configuration',
		cb: () => console.log('yay')
	}
];
