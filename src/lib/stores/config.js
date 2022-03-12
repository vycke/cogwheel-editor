import { writable } from 'svelte/store';
import mermaid from 'mermaid';
import { configToMermaid, strToConfig } from '$lib/transform';

export const strConfig = writable('');
export const machineConfig = writable({});
export const mermaidDefinition = writable('');

strConfig.subscribe((str) => {
	window.location = `#/${btoa(str)}`;
	try {
		const _mermaidDefinition = configToMermaid(str);
		if (mermaid.parse(_mermaidDefinition)) mermaidDefinition.set(_mermaidDefinition);

		const _config = strToConfig(str);
		machineConfig.set(_config);
	} catch (e) {
		console.log(e);
	}
});
