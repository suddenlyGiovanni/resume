import * as fs from 'node:fs/promises'
import * as S from '@effect/schema/Schema'
import * as yaml from '@std/yaml'
import { describe, expect, it } from 'vitest'

import { Resume } from '../schema-resume/resume.js'

describe('integration test', () => {
	it('resume.yml should fulfill Resume schema constraints', async () => {
		const parse = S.decodeUnknownSync(Resume)

		const pathToResume = new URL('../../resume.yml', import.meta.url)
		const stringifyResumeYaml = await fs.readFile(pathToResume, 'utf8')
		const resumeYaml = yaml.parse(stringifyResumeYaml)

		expect(() => parse(resumeYaml)).not.toThrow()
	})
})
