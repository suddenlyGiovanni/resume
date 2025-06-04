import process from 'node:process'

import deno from '@deno/vite-plugin'
import { defineConfig } from 'vitest/config'

export default defineConfig({
	plugins: [deno()],
	test: {
		reporters: process.env['GITHUB_ACTIONS'] ? ['dot', 'github-actions'] : ['dot'],
		projects: ['packages/*'],
		coverage: {
			provider: 'istanbul',
			reporter: ['json', 'text'],
		},
	},
})
