import * as process from 'node:process'
import { defineConfig } from 'vitest/config'

export default defineConfig({
	test: {
		include: ['src/**/*.spec.ts'],
	},
})
