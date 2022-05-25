import type { MachineStore } from './stateMachineStore';

type Ctx = Record<string, never>;
export type VisibilityStore = MachineStore<Ctx>;

export const visibility = {
	init: 'invisible',
	states: {
		visible: { TOGGLE: 'invisible' },
		invisible: { TOGGLE: 'visible' }
	}
};
