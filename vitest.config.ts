// @ts-types="npm:@types/node"
import process from 'node:process'
import { defineConfig } from 'vitest/config'

export default defineConfig({
	test: {
		reporters: process.env['GITHUB_ACTIONS'] ? ['dot', 'github-actions'] : ['dot'],
		workspace: ['packages/*'],
		coverage: {
			provider: 'v8',
			reporter: ['json', 'text'],
		},
	},
})
