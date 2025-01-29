import deno from '@deno/vite-plugin'
import { defineConfig } from 'vitest/config'

export default defineConfig({
	plugins: [deno()],
	test: {
		include: ['src/**/*.spec.ts'],
	},
})
