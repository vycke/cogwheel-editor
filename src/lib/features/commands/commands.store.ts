import { machineStore } from '$lib/helpers/stateMachineStore';

type Ctx = Record<string, never>;

const config = {
	init: 'invisible',
	states: {
		visible: { TOGGLE: 'invisible' },
		invisible: { TOGGLE: 'visible' }
	}
};

export const modal = machineStore<Ctx>(config);