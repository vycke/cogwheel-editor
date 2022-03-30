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
	window.location.href = `#/${window.btoa(ctx.text)}`;
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

// TODO configToText converter
function replaceText(_s: string, ctx: EditorCtx) {
	return assign({ ...ctx });
}

// TODO configToText converter
function addElement(_s, ctx: EditorCtx) {
	return assign({ ...ctx });
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
		valid: { NEW_ELEMENT: 'addElement', TEXT_CHANGED: 'updateText' },
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
		invalid: { TEXT_CHANGED: 'updatedText' }
	}
};

export const editorStore = machineStore<EditorCtx>(config);
