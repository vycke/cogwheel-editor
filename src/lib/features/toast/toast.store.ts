import { send, assign } from 'cogwheel';
import { machineStore } from '$lib/helpers/stateMachineStore';
import type { MachineConfig } from 'cogwheel/dist/types';

export type Ctx = {
	label: string;
	type: 'info' | 'warning' | 'danger' | 'success';
}

const config: MachineConfig<Ctx> = {
	init: 'invisible',
	states: {
		visible: {
			CLOSED: 'invisible',
			OPENED: 'visible',
			_entry: [
				(_s, ctx: Ctx, values: Ctx) => assign({ ...ctx, ...values }),
				(_s, ctx: Ctx) => send({ type: 'CLOSED', payload: ctx, delay: 6000 })
			]
		},
		invisible: { OPENED: 'visible' }
	}
};

export const toast = machineStore<Ctx>(config);

