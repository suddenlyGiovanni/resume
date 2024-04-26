import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
	plugins: [tsconfigPaths()],
	test: {
		includeSource: ['./src/test/test-globals.ts'],
		reporters: process.env['GITHUB_ACTIONS'] ? ['dot', 'github-actions'] : ['default'],
		globalSetup: './src/test/test-globals.ts',
		coverage: {
			provider: 'v8',
			reporter: ['text', 'json', 'html'],
		},
	},
})
