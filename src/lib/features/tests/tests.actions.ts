import { get } from 'svelte/store';
import { toast } from '../toast/toast.store';
import { tests } from './tests.store';

export async function copyTests() {
	await navigator.clipboard.writeText(get(tests));
	toast.info('Tests copied to your clipboard!');
}
