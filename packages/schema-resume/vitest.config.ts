import deno from '@deno/vite-plugin'
import { defineProject } from 'vitest/config'

export default defineProject({
	plugins: [deno()],
	test: {
		includeSource: ['./src/test/test-globals.ts'],
		globalSetup: './src/test/test-globals.ts',
		include: ['src/**/*.spec.ts'],
	},
})
