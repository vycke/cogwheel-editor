import { machineStore, type MachineStore } from './stateMachineStore';

type Ctx = Record<string, never>;
export type VisibilityStore = MachineStore<Ctx>;

export function createVisibilityStore(init = 'invisible'): MachineStore<Ctx> {
	return machineStore<Ctx>({
		init,
		states: {
			visible: { TOGGLE: 'invisible' },
			invisible: { TOGGLE: 'visible' }
		}
	});
}
