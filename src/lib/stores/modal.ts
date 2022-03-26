import { machineStore } from './utils';

const config = {
	init: 'invisible',
	states: {
		visible: { TOGGLE: 'invisible' },
		invisible: { TOGGLE: 'visible' }
	}
};

export const modal = machineStore(config);
