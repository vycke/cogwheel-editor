import { derived, get } from 'svelte/store';
import mermaid from 'mermaid';
import { editorStore, type EditorCtx } from '../editor/editor.store';
import type { Event, Transition } from 'cogwheel/dist/types';
import type { ReadableMachineStore } from '$lib/helpers/stateMachineStore';
import { toast } from '../toast/toast.store';

type Ctx = Record<string, never>;

// Derived store used to create the mermaid definition
export const diagram = derived<ReadableMachineStore<EditorCtx>, string>(
	editorStore.state,
	($store, set) => {
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
				else syntax += `${state} --> ${(tDef as Transition<Ctx, Event>).target}: ${transition}\n`;
			});
		});

		if (mermaid.parse(syntax)) set(syntax);
	}
);

export async function copyMermaid() {
	await navigator.clipboard.writeText(get(diagram));
	toast.info('Mermaid definition copied to your clipboard!');
}
