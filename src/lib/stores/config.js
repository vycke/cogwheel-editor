import { writable } from 'svelte/store';

const defaultStore =
	'{\n\tvisible: {\n\t\tTOGGLE: {\n\t\t\ttarget: "invisible"\n\t\t},\n\t},\n\tinvisible: {\n\t\tTOGGLE: {\n\t\t\ttarget: "visible"\n\t\t},\n\t}\n}';

export const config = writable(defaultStore);
