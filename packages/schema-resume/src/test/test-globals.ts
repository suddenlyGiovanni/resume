// @ts-types="@types/node"
import * as process from 'node:process'

export function setup() {
	process.env.TZ = 'UTC'
}
