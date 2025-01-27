import { defineConfig } from 'vitest/config'

export default defineConfig({
	test: {
		reporters: process.env['GITHUB_ACTIONS'] ? ['dot', 'github-actions'] : ['dot'],
		workspace: ['packages/*'],
		coverage: {
			provider: 'istanbul',
			reporter: ['json', 'text'],
		},
	},
})
