import { expect } from '@std/expect'
import { describe, it } from '@std/testing/bdd'
import * as yaml from '@std/yaml'
import { Resume } from '@suddenlygiovanni/schema-resume'
import { Schema } from 'effect'

describe('integration test', () => {
	it('resume.yml should fulfill Resume schema constraints', async () => {
		const parse = Schema.decodeUnknownSync(Resume)

		const pathToResume = new URL('./resume.yml', import.meta.url)
		// biome-ignore lint/correctness/noUndeclaredVariables: <explanation>
		const stringifyResumeYaml = await Deno.readTextFile(pathToResume)
		const resumeYaml = yaml.parse(stringifyResumeYaml)
		expect(() => parse(resumeYaml)).not.toThrow()
	})
})
