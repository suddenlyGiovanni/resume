import * as process from 'node:process'

// biome-ignore lint/suspicious/noExportsInTest: this is a test harness file
export function setup() {
	process.env.TZ = 'UTC'
}
