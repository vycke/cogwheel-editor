export type ShortcutParam = {
	key: string, 
	callback: () => void
}

export function shortcut(_, params: ShortcutParam): SvelteActionReturnType {
	function handler(e: KeyboardEvent) {
		if (e.ctrlKey && e.key === params.key) {
			e.preventDefault();
			params.callback();
		}
	}

	document.addEventListener('keydown', handler, true);

	return {
		destroy() {
			document.removeEventListener('keydown', handler, true);
		}
	};
}
