import { visibility } from '$lib/helpers/machineConfigurations';
import { machineStore } from '$lib/helpers/stateMachineStore';

export const exampleModal = machineStore<Record<string, never>>(visibility);

export function toggleExamplePanel() {
	exampleModal.send({ type: 'TOGGLE' });
}
