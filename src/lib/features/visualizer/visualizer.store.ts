import { derived } from 'svelte/store';
import mermaid from 'mermaid';
import { editorStore, type EditorCtx } from '../editor/editor.store';
import type { Transition } from 'cogwheel/dist/types';
import type { MachineStore } from '$lib/helpers/stateMachineStore';

type Ctx = Record<string, never>;

// Derived store used to create the mermaid definition
export const diagram = derived<MachineStore<EditorCtx>, string>(editorStore, ($store, set) => {
	let syntax = `stateDiagram-v2\n`;

	// When the machine config is not valid, keep the old visualization
	const _machine = $store.context.config;
	if (!_machine) return;

	syntax += `[*] --> ${_machine.init}\n`;
	Object.entries(_machine.states).forEach(([state, sDef]) => {
		syntax += `${state}\n`;
		Object.entries(sDef).forEach(([transition, tDef]) => {
			if (transition === '_entry' || transition === '_exit') return;
			if (typeof tDef === 'string') syntax += `${state} --> ${tDef}: ${transition}\n`;
			else syntax += `${state} --> ${(tDef as Transition<Ctx>).target}: ${transition}\n`;
		});
	});

	if (mermaid.parse(syntax)) set(syntax);
});
