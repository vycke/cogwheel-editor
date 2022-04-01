import { get } from 'svelte/store';
import { editorStore } from '../editor/editor.store';
import { openToast } from '../toast/toast.actions';
import { diagram } from '../visualizer/visualizer.store';
import { modal } from './modal.store';

export function togglePalette() {
	modal.send({ type: 'TOGGLE' });
}

export async function copyMermaid() {
	await navigator.clipboard.writeText(get(diagram));
	openToast('Mermaid definition copied to your clipboard!');
}

export async function copyConfig() {
	await navigator.clipboard.writeText(get(editorStore).context.text);
	openToast('Configuration copied to your clipboard!');
}
