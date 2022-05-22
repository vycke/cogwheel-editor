import { send, assign } from 'cogwheel';
import { machineStore } from '$lib/helpers/stateMachineStore';
import type { MachineConfig, Event, Action } from 'cogwheel/dist/types';

type Variant = 'info' | 'warning' | 'danger' | 'success';

export type ToastContext = {
	label: string;
	variant: Variant;
};

type ToastEvent = Event & { label?: string; variant?: Variant };
type ToastAction = Action<ToastContext, ToastEvent>;

const autoCloseAction: ToastAction = function () {
	return send({ type: 'CLOSED' }, 6000);
};

const toggleAction: ToastAction = function (s, { label, variant }) {
	return assign({ ...s.context, label, variant });
};

const config: MachineConfig<ToastContext, ToastEvent> = {
	init: 'invisible',
	states: {
		visible: {
			CLOSED: 'invisible',
			OPENED: 'visible',
			_entry: [toggleAction, autoCloseAction]
		},
		invisible: { OPENED: 'visible' }
	}
};

export const toastStore = machineStore<ToastContext, ToastEvent>(config);

function _send(label: string, variant: ToastContext['variant']) {
	return toastStore.send({ type: 'OPENED', label, variant });
}

export const toast = {
	success: (label: string) => _send(label, 'success'),
	info: (label: string) => _send(label, 'info'),
	danger: (label: string) => _send(label, 'danger'),
	warning: (label: string) => _send(label, 'warning')
};
