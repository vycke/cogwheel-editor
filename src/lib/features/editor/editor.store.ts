import { assign, machine, send } from 'cogwheel';
import { machineStore } from '$lib/helpers/stateMachineStore';
import type { Action, Event, MachineConfig, State, Transition } from 'cogwheel/dist/types';
import { examples } from '$lib/features/examples/constants';
import { toast } from '../toast/toast.store';
import { get } from 'svelte/store';

const defaultStore = examples.find((e) => e.default).config;

type O = { [key: string]: unknown };
type AddElementEvent = Event & {
	label: string;
	variant: 'node' | 'transition';
	source?: string;
	target?: 'string';
};
type ConfigEvent = Event & { config: MachineConfig<O, Event> };
type TextEvent = Event & { text: string };
type ErrorEvent = Event & { error: string };
type EditorEvent = Event | AddElementEvent | ConfigEvent | TextEvent | ErrorEvent;

export type EditorCtx = {
	text: string;
	config: MachineConfig<O, EditorEvent>;
	error: string;
};
type EditorAction = Action<EditorCtx, EditorEvent>;

// Currently all actions are removed
function textToConfig(text: string) {
	const _text = text.replace(new RegExp(/\[.+?\]/g), '[]');
	const config = eval('(' + _text + ')') as MachineConfig<O, Event>;

	Object.entries(config.states).forEach(([skey, state]: [string, State<O, Event>]) => {
		if (state._entry) delete config.states[skey]._entry;
		if (state._exit) delete config.states[skey]._exit;

		Object.entries(state).forEach(([tkey, transition]) => {
			if (typeof transition === 'string') return;
			if ((transition as Transition<O, Event>).actions)
				delete (config.states[skey][tkey] as Transition<O, Event>).actions;
		});
	});

	return config;
}

// Function to transform config to Text
function configToText(config) {
	let text = '{\n';

	if (config.init) text += `\tinit: "${config.init}",\n\tstates: {\n`;
	if (config.states) {
		Object.entries(config.states).forEach(([k, v]) => {
			text += `\t\t${k}: {\n`;
			Object.entries(v).forEach(([s, t]) => {
				text += `\t\t\t${s}: "${t}",\n`;
			});
			text += `\t\t},\n`;
		});

		text += '\t}\n';
	}
	text += '}';

	return text;
}

// initiatize the machine based on URL
const initAction: EditorAction = function (_s, event) {
	let text = '';

	if ((event as TextEvent).text) text = (event as TextEvent).text;
	else text = window.atob(window.location?.hash.replace('#/', '')) || defaultStore;

	try {
		const config = textToConfig(text);
		window.location.hash = `#/${window.btoa(text)}`;
		return assign({ text, config });
	} catch (e) {
		return assign({ text, config: textToConfig(defaultStore) });
	}
};

// update text based on input
const updateTextAction: EditorAction = function (state, event) {
	return assign({ ...state.context, text: (event as TextEvent).text });
};

// update URL based on text
const updateUrlAction: EditorAction = function (state) {
	window.location.hash = `#/${window.btoa(state.context.text)}`;
};

// Validate if config is valid or not.
const validateAction: EditorAction = function (state) {
	try {
		const config = textToConfig(state.context.text);
		machine(config);
		return send({ type: 'VALIDATED', config } as ConfigEvent);
	} catch (e) {
		return send({ type: 'INVALIDATED', error: e.message } as ErrorEvent);
	}
};

// replace config based on the text (converted in previous step )
const replaceConfigAction: EditorAction = function (state, event) {
	return assign({ ...state.context, config: (event as ConfigEvent).config });
};

const addElementAction: EditorAction = function (state, event) {
	const { label, source, target, variant } = event as AddElementEvent;
	const config = { ...state.context.config };
	if (variant === 'node') {
		config.states[label] = {};
	} else if (variant === 'transition') {
		if (!config.states[source]) config.states[source] = {};
		config.states[source][label] = target;
	}
	return assign({ ...state.context, config });
};

const replaceTextAction: EditorAction = function (state) {
	const text = configToText(state.context.config);
	return assign({ ...state.context, text });
};

// auto transition after previous action is executed
const transitionAction = function (event: string) {
	return function () {
		return send({ type: event });
	};
};

const errorAction: EditorAction = function (state, event) {
	return assign({ ...state.context, error: (event as ErrorEvent).error });
};

const config: MachineConfig<EditorCtx, EditorEvent> = {
	init: 'init',
	states: {
		init: { LOADED: 'valid', _entry: [initAction, transitionAction('LOADED')] },
		valid: { ADD_ELEMENT: 'addElement', TEXT_CHANGED: 'updateText', RESET: 'init' },
		addElement: {
			FINISHED: 'valid',
			_entry: [addElementAction, replaceTextAction, updateUrlAction, transitionAction('FINISHED')]
		},
		updateText: {
			VALIDATED: 'replaceConfig',
			INVALIDATED: 'invalid',
			_entry: [updateTextAction, validateAction]
		},
		replaceConfig: {
			FINISHED: 'valid',
			_entry: [replaceConfigAction, updateUrlAction, transitionAction('FINISHED')]
		},
		invalid: { TEXT_CHANGED: 'updateText', RESET: 'init', _entry: [errorAction] }
	}
};

export const editorStore = machineStore<EditorCtx, EditorEvent>(config);

export function updateText(text: string) {
	editorStore.send({ type: 'TEXT_CHANGED', text });
}

// used for commands
export function addNode(label = '') {
	editorStore.send({ type: 'ADD_ELEMENT', variant: 'node', label });
}

// Used for commands
export function addTransition(str = '') {
	const tokens = str.split(' ');
	if (tokens.length < 3) return;
	const [source, target, label] = tokens;

	editorStore.send({
		type: 'ADD_ELEMENT',
		variant: 'transition',
		source,
		target,
		label
	} as AddElementEvent);
}

export function reset(text: string) {
	editorStore.send({ type: 'RESET', text } as TextEvent);
}

export async function copyConfig() {
	await navigator.clipboard.writeText(get(editorStore.state).context.text);
	toast.info('Configuration copied to your clipboard!');
}
