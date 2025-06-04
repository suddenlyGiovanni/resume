import process from 'node:process'
import { defineConfig } from 'vitest/config'

export default defineConfig({
	test: {
		reporters: process.env['GITHUB_ACTIONS'] ? ['dot', 'github-actions'] : ['dot'],
		projects: ['packages/*'],
		coverage: {
			provider: 'istanbul',
			reporter: ['json', 'text'],
		},
	},
})
