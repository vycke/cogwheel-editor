import { send, assign } from 'cogwheel';
import { machineStore } from './utils';

const config = {
	visible: {
		CLOSED: 'invisible',
		OPENED: 'visible',
		_entry: [
			(_s, ctx, values) => assign({ ...ctx, ...values }),
			(_s, ctx) => send({ type: 'CLOSED', payload: ctx, delay: 6000 })
		]
	},
	invisible: { OPENED: 'visible' }
};

export const toast = machineStore('invisible', config);
