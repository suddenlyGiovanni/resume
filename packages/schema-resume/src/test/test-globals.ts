// @ts-types="npm:@types/node@22.10.10"
import * as process from 'node:process'

export function setup() {
	process.env.TZ = 'UTC'
}
