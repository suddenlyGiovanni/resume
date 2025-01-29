import deno from '@deno/vite-plugin'
import { defineConfig } from 'vitest/config'

export default defineConfig({
	plugins: [deno()],
	test: {
		includeSource: ['./src/test/test-globals.ts'],
		globalSetup: './src/test/test-globals.ts',
		include: ['src/**/*.spec.ts'],
	},
})
