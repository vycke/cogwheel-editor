import { machine as fsm } from 'cogwheel';
import type { MachineConfig, Event, MachineState } from 'cogwheel/dist/types';
import { readable } from 'svelte/store';
import type { Readable } from 'svelte/store';

type O = {
	[key: string]: unknown;
};

export type ReadableMachineStore<T extends O> = Readable<MachineState<T>>;
export type MachineStore<T extends O, E extends Event = Event> = {
	state: ReadableMachineStore<T>;
	send(event: E): void;
};

export function machineStore<T extends O, E extends Event = Event>(
	config: MachineConfig<T, E>
): MachineStore<T, E> {
	const machine = fsm(config);
	const { current, id, context } = machine;
	const state = readable({ current, id, context }, (set) => {
		return machine.listen(({ current, context }) => {
			set({ context, current, id });
		});
	});

	return { state, send: machine.send };
}
