import { send, assign } from 'cogwheel';
import { machineStore } from '$lib/helpers/stateMachineStore';
import type { MachineConfig, MachineState } from 'cogwheel/dist/types';

export type Ctx = {
	label: string;
	type: 'info' | 'warning' | 'danger' | 'success';
};

const config: MachineConfig<Ctx> = {
	init: 'invisible',
	states: {
		visible: {
			CLOSED: 'invisible',
			OPENED: 'visible',
			_entry: [
				(s: MachineState<Ctx>, values: Ctx) => assign({ ...s.context, ...values }),
				(s: MachineState<Ctx>) => send({ type: 'CLOSED', payload: s.context, delay: 6000 })
			]
		},
		invisible: { OPENED: 'visible' }
	}
};

export const toastStore = machineStore<Ctx>(config);

function _send(label: string, type: Ctx['type']) {
	return toastStore.send({ type: 'OPENED', payload: { label, type } });
}

export const toast = {
	success: (label: string) => _send(label, 'success'),
	info: (label: string) => _send(label, 'info'),
	danger: (label: string) => _send(label, 'danger'),
	warning: (label: string) => _send(label, 'warning')
};
