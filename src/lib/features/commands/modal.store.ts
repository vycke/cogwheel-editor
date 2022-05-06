import { createVisibilityStore } from '$lib/helpers/visibilityStore';

export const commandModal = createVisibilityStore('invisible');

export function toggleCommandPanel() {
	commandModal.send({ type: 'TOGGLE' });
}
