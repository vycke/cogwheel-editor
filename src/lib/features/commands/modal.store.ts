import { visibility } from '$lib/helpers/machineConfigurations';
import { machineStore } from '$lib/helpers/stateMachineStore';

export const commandModal = machineStore<Record<string, never>>(visibility);

export function toggleCommandPanel() {
	commandModal.send({ type: 'TOGGLE' });
}
