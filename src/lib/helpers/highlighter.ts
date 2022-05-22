const comment = /\/\/(.*?)/g;
const keys = /\b(function|const|var|let|await|expect|test|assign|send)(\s{1}|\()(?=[^\w])/g;
const global = /\b(document|window|Array|String|Object|Number|\$)(?=[^\w])/g;
const strings = /"(.*?)"/g;
const methods = /\.([a-zA-Z0-9]*?)\(/g;
const functions = /function\s{1}(.*?)\(/g;
const brackets = /({|}|\(|\)|\[|\])/g;

export function highlighter(text: string): string {
	const lines = text.split('\n');

	const res = lines
		.map((line) => {
			return line
				.replace(strings, '<span class="token string">"$1"</span>')
				.replace(functions, 'function <span class="token function">$1</span>(')
				.replace(methods, '.<span class="token method">$1</span>(')
				.replace(global, '<span class="token global">$1</span>')
				.replace(comment, '//<span class="token comment">$1</span>')
				.replace(keys, (m) => {
					const key = m.substring(0, m.length - 1);
					const last = m.slice(-1);
					return `<span class="token key">${key}</span>${last}`;
				})
				.replace(brackets, (m) => `<span class="token bracket">${m}</span>`);
		})
		.join('\n');

	return res;
}
