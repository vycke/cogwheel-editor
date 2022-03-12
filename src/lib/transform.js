export function strToConfig(str) {
	return eval('(' + str + ')');
}

export function configToMermaid(config) {
	let syntax = `stateDiagram-v2\n`;
	if (!config) return syntax;

	const _machine = strToConfig(config);

	syntax += `[*] --> ${_machine.init}\n`;
	Object.entries(_machine.states).forEach(([state, sDef]) => {
		syntax += `${state}\n`;
		Object.entries(sDef).forEach(([transition, tDef]) => {
			if (transition === '_entry' || transition === '_exit') return;
			if (typeof tDef === 'string') syntax += `${state} --> ${tDef}: ${transition}\n`;
			else syntax += `${state} --> ${tDef.target}: ${transition}\n`;
		});
	});

	return syntax;
}
