import { derived, get } from 'svelte/store';
import { editorStore, type EditorCtx } from '../editor/editor.store';
import type { MachineStore } from '$lib/helpers/stateMachineStore';
import { machine } from 'cogwheel';
import type { MachineConfig, O, Transition } from 'cogwheel/dist/types';
import { toast } from '../toast/toast.store';

// DFS algorithm to find all paths based on transition names. Once a state
// is reached that is already covered, the path finishes.
function getAllPaths(config: MachineConfig<O>): string[][] {
	const paths: string[][] = [];

	function iter(state: string, visited: string[], path: string[]) {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const states = config.states[state];

		if (!states) {
			paths.push([...path]);
			return;
		}

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { _entry, _exit, ...transitions } = states;
		Object.entries(transitions).forEach(([key, value]) => {
			const target = typeof value === 'string' ? value : (value as Transition<O>).target;

			if (visited.includes(target)) {
				paths.push([...path, key]);
				return;
			}
			iter(target, [...visited, target], [...path, key]);
		});
	}

	iter(config.init, [config.init], []);
	return paths;
}

// Derived store used to create the mermaid definition
export const tests = derived<MachineStore<EditorCtx>, string>(editorStore, ($store, set) => {
	const paths: string[][] = getAllPaths($store.context.config);

	let syntax = '';

	paths.forEach((path, i) => {
		syntax += `test('${path.join('->')}'), () => {\n`;
		const _machine = machine($store.context.config);
		syntax += '\tconst _machine = machine(config);\n';
		path.forEach((event) => {
			_machine.send({ type: event });
			syntax += `\t_machine.send({ type: "${event}" });\n`;
		});

		syntax += `\texpect(_machine.current).toBe("${_machine.current}")\n`;
		syntax += `}`;
		if (i < paths.length - 1) syntax += '\n\n';
	});

	set(syntax);
});

export async function copyTests() {
	await navigator.clipboard.writeText(get(tests));
	toast.info('Tests copied to your clipboard!');
}
