import { createVisibilityStore } from '$lib/helpers/visibilityStore';

export const modal = createVisibilityStore('invisible');

export function togglePalette() {
	modal.send({ type: 'TOGGLE' });
}
