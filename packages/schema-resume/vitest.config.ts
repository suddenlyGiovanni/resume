import { defineConfig } from 'vitest/config'

export default defineConfig({

	test: {
		includeSource: ['./src/test/test-globals.ts'],
		reporters: process.env['GITHUB_ACTIONS'] ? ['dot', 'github-actions'] : ['default'],
		globalSetup: './src/test/test-globals.ts',
		coverage: {
			provider: 'v8',
			reporter: ['text', 'json', 'html'],
		},
		include: ['src/**/*.spec.ts'],
	},
})
