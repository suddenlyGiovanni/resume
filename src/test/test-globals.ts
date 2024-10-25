// biome-ignore lint/correctness/noNodejsModules: necessary for testing purpose
import * as process from 'node:process'

export function setup() {
	process.env.TZ = 'UTC'
}
