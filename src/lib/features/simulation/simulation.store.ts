import type { ReadableMachineStore } from '$lib/helpers/stateMachineStore';
import { machine } from 'cogwheel';
import { writable, derived, type Writable } from 'svelte/store';
import { editorStore, type EditorCtx } from '../editor/editor.store';
import { toast } from '../toast/toast.store';

type Store = {
	current: string;
};

type SimEvent = string;

export const events = writable<SimEvent[]>([]);
export const simulated = derived<[Writable<SimEvent[]>, ReadableMachineStore<EditorCtx>], Store>(
	[events, editorStore.state],
	([$events, $config]) => {
		const _machine = machine($config.context.config);
		$events.forEach((e) => _machine.send({ type: e }));
		return { current: _machine.current };
	}
);

export function clearLog() {
	events.set([]);
	toast.info('Simulation log cleared');
}
