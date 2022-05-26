import { derived, get } from 'svelte/store';
import { editorStore } from '../editor/editor.store';
import { machine } from 'cogwheel';
import type { MachineConfig, Transition } from 'cogwheel/dist/types';
import { toast } from '../toast/toast.store';
import type { ReadableMachineStore } from '$lib/helpers/stateMachineStore';

type O = {
	[key: string]: unknown;
};
type TestContext = {
	config: MachineConfig<O, Event>;
};

// DFS algorithm to find all paths based on transition names. Once a state
// is reached that is already covered, the path finishes.
function getAllPaths(config: MachineConfig<O, Event>): string[][] {
	const paths: string[][] = [];

	function iter(key: string, visited: string[], path: string[]) {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { _entry, _exit, ...transitions } = config.states[key];
		if (!Object.keys(transitions).length) paths.push([...path]);

		Object.entries(transitions).forEach(([key, value]) => {
			const target = typeof value === 'string' ? value : (value as Transition<O, Event>).target;

			if (visited.includes(target)) paths.push([...path, key]);
			else iter(target, [...visited, target], [...path, key]);
		});
	}

	iter(config.init, [config.init], []);

	return paths;
}

// Derived store used to create the mermaid definition
export const tests = derived<ReadableMachineStore<TestContext>, string>(
	editorStore.state,
	($store, set) => {
		const paths: string[][] = getAllPaths($store.context.config);

		let syntax = '';

		paths.forEach((path, i) => {
			syntax += `test("${path.join('->')}"), () => {\n`;
			const _machine = machine<O>($store.context.config);
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
	}
);

export async function copyTests() {
	await navigator.clipboard.writeText(get(tests));
	toast.info('Tests copied to your clipboard!');
}
