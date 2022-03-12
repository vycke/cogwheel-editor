export function configToMermaid(config) {
	let str = `stateDiagram-v2\n`;

	try {
		const _machine = eval('(' + config + ')');
		Object.entries(_machine.states).forEach(([state, sDef]) => {
			str += `${state}\n`;
			const { _entry, _exit, ...transitions } = sDef;
			Object.entries(transitions).forEach(([transition, tDef]) => {
				if (typeof tDef === 'string') str += `${state} --> ${tDef}: ${transition}\n`;
				else str += `${state} --> ${tDef.target}: ${transition}\n`;
			});
		});
	} catch (e) {
		console.log(e);
		throw e;
	}

	return str;
}
