import { editorStore } from './editor.store';

export function updateText(text: string) {
	editorStore.send({ type: 'TEXT_CHANGED', payload: text });
}

// used for commands
export function addNode(label = '') {
	editorStore.send({ type: 'ADD_ELEMENT', payload: { type: 'node', label } });
}

// Used for commands
export function addTransition(str = '') {
	const tokens = str.split(' ');
	if (tokens.length < 3) return;
	const [source, target, label] = tokens;

	editorStore.send({
		type: 'ADD_ELEMENT',
		payload: { type: 'transition', source, target, label }
	});
}
