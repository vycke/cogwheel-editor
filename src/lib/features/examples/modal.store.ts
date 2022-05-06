import { createVisibilityStore } from '$lib/helpers/visibilityStore';

export const exampleModal = createVisibilityStore('invisible');

export function toggleExamplePanel() {
	exampleModal.send({ type: 'TOGGLE' });
}
