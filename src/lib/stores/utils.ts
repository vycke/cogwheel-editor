import { machine as fsm } from 'cogwheel';
import type { MachineConfig } from 'cogwheel/dist/types';
import { writable } from 'svelte/store';

export function machineStore(config: MachineConfig<{}>) {
	const machine = fsm(config);
	const { subscribe, update } = writable({ state: machine.current, context: machine.context });

	machine.listen((state, context) => {
		update(() => ({ state, context }));
	});

	return { subscribe, send: machine.send };
}
