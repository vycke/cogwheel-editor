import { assign, machine, send } from 'cogwheel';
import { machineStore } from '$lib/helpers/stateMachineStore';
import type { MachineConfig, MachineState, State, Transition } from 'cogwheel/dist/types';
import { defaultStore } from '$lib/constants';
import { toast } from '../toast/toast.store';
import { get } from 'svelte/store';

type O = { [key: string]: unknown };

export type EditorCtx = {
	text: string;
	config: MachineConfig<O>;
};

type vPayload = {
	config: MachineConfig<O>;
};

type ePayload = {
	type: 'node' | 'transition';
	label?: string;
	source?: string;
	target?: string;
};

// Currently all actions are removed
function transform<T extends O>(text: string) {
	const _text = text.replace(new RegExp(/\[.+?\]/g), '[]');
	const config = eval('(' + _text + ')') as MachineConfig<T>;

	Object.entries(config.states).forEach(([skey, state]: [string, State<T>]) => {
		if (state._entry) delete config.states[skey]._entry;
		if (state._exit) delete config.states[skey]._exit;

		Object.entries(state).forEach(([tkey, transition]) => {
			if (typeof transition === 'string') return;
			if ((transition as Transition<T>).actions)
				delete (config.states[skey][tkey] as Transition<T>).actions;
		});
	});

	return config;
}

// initiatize the machine based on URL
function initialize() {
	const text = window.atob(window.location?.hash.replace('#/', '')) || defaultStore;
	try {
		return assign({ text, config: transform(text) });
	} catch (e) {
		return assign({ text, config: transform(defaultStore) });
	}
}

// update text based on input
function _updateText(state: MachineState<EditorCtx>, p: string) {
	return assign({ ...state.context, text: p });
}

// update URL based on text
function updateUrl(state: MachineState<EditorCtx>) {
	window.location.hash = `#/${window.btoa(state.context.text)}`;
}

// Validate if config is valid or not.
function validate(state: MachineState<EditorCtx>) {
	try {
		machine(transform(state.context.text));
		return send({ type: 'VALIDATED', payload: { config } });
	} catch (e) {
		return send({ type: 'INVALIDATED' });
	}
}

// replace config based on the text (converted in previous step )
function replaceConfig(state: MachineState<EditorCtx>, payload: vPayload) {
	return assign({ ...state.context, config: payload.config });
}

function addElement(state: MachineState<EditorCtx>, payload: ePayload) {
	const config = { ...state.context.config };
	if (payload.type === 'node') {
		config.states[payload.label] = {};
	} else if (payload.type === 'transition') {
		if (!config.states[payload.source]) config.states[payload.source] = {};
		config.states[payload.source][payload.label] = payload.target;
	}
	return assign({ ...state.context, config });
}

function replaceText(state: MachineState<EditorCtx>) {
	let text = '{\n';

	if (state.context.config.init) text += `\tinit: "${state.context.config.init}",\n\tstates: {\n`;
	if (state.context.config.states) {
		Object.entries(state.context.config.states).forEach(([k, v]) => {
			text += `\t\t${k}: {\n`;
			Object.entries(v).forEach(([s, t]) => {
				text += `\t\t\t${s}: "${t}",\n`;
			});
			text += `\t\t},\n`;
		});

		text += '\t}\n';
	}
	text += '}';

	return assign({ ...state.context, text });
}

// auto transition after previous action is executed
function autoTransition(event: string) {
	return function () {
		return send({ type: event });
	};
}

const config: MachineConfig<EditorCtx> = {
	init: 'init',
	states: {
		init: { LOADED: 'valid', _entry: [initialize, autoTransition('LOADED')] },
		valid: { ADD_ELEMENT: 'addElement', TEXT_CHANGED: 'updateText' },
		addElement: {
			FINISHED: 'valid',
			_entry: [addElement, replaceText, updateUrl, autoTransition('FINISHED')]
		},
		updateText: {
			VALIDATED: 'replaceConfig',
			INVALIDATED: 'invalid',
			_entry: [_updateText, validate]
		},
		replaceConfig: {
			FINISHED: 'valid',
			_entry: [replaceConfig, updateUrl, autoTransition('FINISHED')]
		},
		invalid: { TEXT_CHANGED: 'updateText' }
	}
};

export const editorStore = machineStore<EditorCtx>(config);

export function updateText(text: string) {
	editorStore.send({ type: 'TEXT_CHANGED', payload: text });
}

// used for commands
export function addNode(label = '') {
	editorStore.send({ type: 'ADD_ELEMENT', payload: { type: 'node', label } });
}

// Used for commands
export function addTransition(str = '') {
	const tokens = str.split(' ');
	if (tokens.length < 3) return;
	const [source, target, label] = tokens;

	editorStore.send({
		type: 'ADD_ELEMENT',
		payload: { type: 'transition', source, target, label }
	});
}

export async function copyConfig() {
	await navigator.clipboard.writeText(get(editorStore).context.text);
	toast.info('Configuration copied to your clipboard!');
}
