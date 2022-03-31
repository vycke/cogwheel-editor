import { editorStore } from './editor.store';

export function updateText(text: string) {
	editorStore.send({ type: 'TEXT_CHANGED', payload: text });
}

export function resetState() {
	editorStore.send({ type: 'RESET' });
}
