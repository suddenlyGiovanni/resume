import * as process from 'node:process'
import { defineConfig } from 'vitest/config'

export default defineConfig({
	test: {
		reporters: process.env['GITHUB_ACTIONS'] ? ['dot', 'github-actions'] : ['default'],
		coverage: {
			provider: 'v8',
			reporter: ['text', 'json', 'html'],
		},
		include: ['src/**/*.spec.ts'],
	},
})
