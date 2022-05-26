import { expect, it } from 'vitest';
import { editorStore } from '../editor.store';

it('editor store', () => {
	let value = undefined;
	editorStore.state.subscribe((v) => (value = v));
	expect(value.current).toBe('valid');
	expect(value.context.config).toEqual({
		init: 'visible',
		states: {
			visible: { TOGGLE: 'invisible' },
			invisible: { TOGGLE: 'visible' }
		}
	});
});
