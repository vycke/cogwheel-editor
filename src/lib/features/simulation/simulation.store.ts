import type { MachineStore } from '$lib/helpers/stateMachineStore';
import { machine } from 'cogwheel';
import { writable, derived, type Writable } from 'svelte/store';
import { editorStore, type EditorCtx } from '../editor/editor.store';

type Store = {
	current: string;
};

type Event = string;

export const events = writable<Event[]>([]);
export const simulated = derived<[Writable<Event[]>, MachineStore<EditorCtx>], Store>(
	[events, editorStore],
	([$events, $config]) => {
		const _machine = machine($config.context.config);
		$events.forEach((e) => _machine.send({ type: e }));
		return { current: _machine.current };
	}
);
