import deno from '@deno/vite-plugin'
import { defineConfig } from 'vitest/config'

export default defineConfig({
	plugins: [deno()],
	test: {
		reporters: process.env['GITHUB_ACTIONS'] ? ['dot', 'github-actions'] : ['dot'],
		workspace: ['packages/*'],
		coverage: {
			provider: 'istanbul',
			reporter: ['json', 'text'],
		},
	},
})
