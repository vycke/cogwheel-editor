import adapter from '@sveltejs/adapter-auto';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter()
	},
	vite: {
		optimizeDeps: { include: ['mermaid'] }
	}
};

export default config;
