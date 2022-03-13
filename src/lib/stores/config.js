import { writable, derived } from 'svelte/store';
import mermaid from 'mermaid';
import { strToConfig } from '$lib/transform';
import { machine as fsm } from 'cogwheel';

export const config = writable('');
export const events = writable([]);

// Set the URL to make the graph shareable
config.subscribe((str) => {
	window.location = `#/${btoa(str)}`;
});

// Derived store used to create the mermaid definition
export const diagram = derived(config, ($config, set) => {
	let syntax = `stateDiagram-v2\n`;

	if (!$config) {
		set(syntax);
		return;
	}

	// When the machine config is not valid, keep the old visualization
	const _machine = strToConfig($config);
	if (!_machine) return;

	syntax += `[*] --> ${_machine.init}\n`;
	Object.entries(_machine.states).forEach(([state, sDef]) => {
		syntax += `${state}\n`;
		Object.entries(sDef).forEach(([transition, tDef]) => {
			if (transition === '_entry' || transition === '_exit') return;
			if (typeof tDef === 'string') syntax += `${state} --> ${tDef}: ${transition}\n`;
			else syntax += `${state} --> ${tDef.target}: ${transition}\n`;
		});
	});

	if (mermaid.parse(syntax)) set(syntax);
});

// Store that shows if the config is invalid or not
export const invalid = derived(config, ($config) => !strToConfig($config, false));

// A derived store that maintains the current state and context given all known
// events and the configuration
export const context = derived([events, config], ([$events, $config], set) => {
	const _config = strToConfig($config);
	if (!_config) {
		set({});
		return;
	}

	const _machine = fsm(_config);
	$events.forEach((e) => _machine.send({ type: e }));
	set({ current: _machine.current, context: _machine.context });
});
