import { derived } from 'svelte/store';
import { editorStore, type EditorCtx } from '../editor/editor.store';
import type { MachineStore } from '$lib/helpers/stateMachineStore';
import { machine } from 'cogwheel';
import type { MachineConfig, O } from 'cogwheel/dist/types';

function getAllPaths(config: MachineConfig<O>) {
	console.log(config);
	const paths: string[][] = [['TOGGLE', 'TOGGLE']];
	return paths;
}

// Derived store used to create the mermaid definition
export const tests = derived<MachineStore<EditorCtx>, string>(editorStore, ($store, set) => {
	const paths: string[][] = getAllPaths($store.context.config);

	let syntax = '';

	paths.forEach((path) => {
		syntax += `test('machine - ${path.join('->')}'), () => {\n`;
		const _machine = machine($store.context.config);
		syntax += '\tconst _machine = machine(config);\n';
		path.forEach((event) => {
			_machine.send({ type: event });
			syntax += `\t_machine.send({ type: "${event}" });\n`;
		});

		syntax += `\texpect(_machine.current).toBe("${_machine.current}")\n`;
		syntax += `}\n\n`;
	});

	set(syntax);
});
