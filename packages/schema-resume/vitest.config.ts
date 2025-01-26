import {defineConfig} from 'vitest/config'

export default defineConfig({
	test: {
		includeSource: ['./src/test/test-globals.ts'],
		globalSetup: './src/test/test-globals.ts',
		include: ['src/**/*.spec.ts'],
	},
})
