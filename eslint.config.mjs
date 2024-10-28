import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier';

export default [
	{ files: ['**/*.{js,mjs,cjs,ts}'] },
	{
		languageOptions: {
			ecmaVersion: 'latest',
			globals: {
				...globals.browser,
				...globals.node,
			},
			parserOptions: {
				project: ['tsconfig.json', 'tsconfig.eslint.json'],
			},
		},
	},
	{ ignores: ['node_modules'] },
	{ plugins: { prettier } },
	{
		rules: {
			'prettier/prettier': 'error',
			'no-console': ['error', { allow: ['error', 'warn'] }],
			'prefer-const': 'warn',
		},
	},
	{
		files: ['index.js', 'index.ts'],
		rules: {
			'@typescript-eslint/no-unused-vars': ['error', { varsIgnorePattern: '^cancelLesson$' }],
		},
	},
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
];
