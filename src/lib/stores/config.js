import { writable } from 'svelte/store';

const defaultStore =
	'{\n\tinitial: "visible",\n\tstates: {\n\t\tvisible: {\n\t\t\tTOGGLE: {\n\t\t\t\ttarget: "invisible"\n\t\t\t},\n\t\t},\n\t\tinvisible: {\n\t\t\tTOGGLE: {\n\t\t\t\ttarget: "visible"\n\t\t\t},\n\t\t}\n\t}\n}';

export const config = writable(defaultStore);
