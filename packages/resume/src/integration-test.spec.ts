import * as fs from 'node:fs/promises'
import * as yaml from '@std/yaml'
import { Resume } from '@suddenlygiovanni/schema-resume'
import { Schema } from 'effect'
import { describe, expect, it } from 'vitest'

describe('integration test', () => {
	it('resume.yml should fulfill Resume schema constraints', async () => {
		const parse = Schema.decodeUnknownSync(Resume)

		const pathToResume = new URL('./resume.yml', import.meta.url)
		const stringifyResumeYaml = await fs.readFile(pathToResume, 'utf8')
		const resumeYaml = yaml.parse(stringifyResumeYaml)

		expect(() => parse(resumeYaml)).not.toThrow()
	})
})
