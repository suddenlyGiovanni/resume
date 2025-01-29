// @ts-types="@types/node"
import * as fs from 'node:fs/promises'
// @ts-types="@types/node"
import { URL } from 'node:url'
import { Resume } from '@suddenly-giovanni/schema-resume'
import { Schema } from 'effect'
import { describe, expect, it } from 'vitest'
import YAML from 'yaml'

describe('integration test', () => {
	it('resume.yml should fulfill Resume schema constraints', async () => {
		const parse = Schema.decodeUnknownSync(Resume)

		const pathToResume = new URL('./resume.yml', import.meta.url)
		const stringifyResumeYaml = await fs.readFile(pathToResume, 'utf8')
		const resumeYaml = YAML.parse(stringifyResumeYaml)

		expect(() => parse(resumeYaml)).not.toThrow()
	})
})
