import { expect, it } from 'vitest';
import { visibility } from '../machineConfigurations';
import { machineStore } from '../stateMachineStore';

it('State machine store', () => {
	const store = machineStore(visibility);
	let value = undefined;
	store.state.subscribe((s) => (value = s));

	expect(value).toEqual({ context: {}, current: 'invisible', id: '' });
	store.send({ type: 'TOGGLE' });
	expect(value.current).toBe('visible');
	store.send({ type: 'TOGGLE' });
	expect(value.current).toBe('invisible');
});
