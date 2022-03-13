export function shortcut(node, params) {
	function handler(e) {
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
