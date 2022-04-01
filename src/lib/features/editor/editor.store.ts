import { assign, machine, send } from 'cogwheel';
import { machineStore } from '$lib/helpers/stateMachineStore';
import type { MachineConfig } from 'cogwheel/dist/types';
import { defaultStore } from '$lib/constants';

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

// initiatize the machine based on URL
function initialize() {
	const text = window.atob(window.location?.hash.replace('#/', '')) || defaultStore;
	return assign({ text, config: eval('(' + text + ')') });
}

// update text based on input
function updateText(_s, ctx: EditorCtx, p: string) {
	return assign({ ...ctx, text: p });
}

// update URL based on text
function updateUrl(_s, ctx: EditorCtx) {
	window.location.hash = `#/${window.btoa(ctx.text)}`;
}

// Validate if config is valid or not.
function validate(_s, ctx: EditorCtx) {
	try {
		const config = eval('(' + ctx.text + ')');
		machine(config);
		return send({ type: 'VALIDATED', payload: { config } });
	} catch (e) {
		return send({ type: 'INVALIDATED' });
	}
}

// replace config based on the text (converted in previous step )
function replaceConfig(_s, ctx: EditorCtx, payload: vPayload) {
	return assign({ ...ctx, config: payload.config });
}

function addElement(_s, ctx: EditorCtx, payload: ePayload) {
	const config = { ...ctx.config };
	if (payload.type === 'node') {
		config.states[payload.label] = {};
	} else if (payload.type === 'transition') {
		if (!config.states[payload.source]) config.states[payload.source] = {};
		config.states[payload.source][payload.label] = payload.target;
	}
	return assign({ ...ctx, config });
}

function replaceText(_s: string, ctx: EditorCtx) {
	let text = '{\n';

	if (ctx.config.init) text += `\tinit: "${ctx.config.init}",\n\tstates: {\n`;
	if (ctx.config.states) {
		Object.entries(ctx.config.states).forEach(([k, v]) => {
			text += `\t\t${k}: {\n`;
			Object.entries(v).forEach(([s, t]) => {
				text += `\t\t\t${s}: "${t}",\n`;
			});
			text += `\t\t},\n`;
		});

		text += '\t}\n';
	}
	text += '}';
	return assign({ ...ctx, text });
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
			_entry: [updateText, validate]
		},
		replaceConfig: {
			FINISHED: 'valid',
			_entry: [replaceConfig, updateUrl, autoTransition('FINISHED')]
		},
		invalid: { TEXT_CHANGED: 'updateText' }
	}
};

export const editorStore = machineStore<EditorCtx>(config);
