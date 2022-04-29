import { get } from 'svelte/store';
import { toast } from '../toast/toast.store';
import { diagram } from '../visualizer/visualizer.store';
import { modal } from './modal.store';

export function togglePalette() {
	modal.send({ type: 'TOGGLE' });
}

export async function copyMermaid() {
	await navigator.clipboard.writeText(get(diagram));
	toast.info('Mermaid definition copied to your clipboard!');
}
