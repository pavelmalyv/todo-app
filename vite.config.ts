import react from '@vitejs/plugin-react';
import checker from 'vite-plugin-checker';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
	base: '/todo-app/',
	resolve: {
		alias: {
			'@': '/src',
			'@styles': '/src/styles',
		},
	},
	plugins: [
		react(),
		checker({
			typescript: true,
			eslint: {
				lintCommand: 'eslint "./src/**/*.{ts,tsx}"',
				useFlatConfig: true,
			},
			stylelint: {
				lintCommand: 'stylelint ./src/**/*.{css,scss}',
			},
		}),
	],
});
