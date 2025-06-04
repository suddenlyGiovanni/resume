import { JSONSchema, Schema } from 'effect'
import { describe, expect, test } from 'vitest'

import { Role } from './role.ts'

describe('Role', () => {
	const role: typeof Role.Type = {
		responsibilities: ['code owner of front end app'],
		startDate: '1988-02-01',
		title: 'Junior Web Developer',
	}

	test('required role attributes', () => {
		expect(() => Schema.decodeUnknownSync(Role)(role)).not.toThrow()
	})

	test('all role attributes', () => {
		const decodeRole = Schema.decodeUnknownSync(Role)
		const roleInput: typeof Role.Type = {
			...role,
			endDate: '1989-02-01',
			highlights: ['Wrote a new algorithm'],
			responsibilities: ['Managed a team of 10 engineers'],
			technologies: ['JavaScript', 'HTML', 'CSS'],
		}
		expect(() => decodeRole(roleInput)).not.toThrow()
		expect(decodeRole(roleInput)).toMatchInlineSnapshot(`
			Role {
			  "endDate": "1989-02-01",
			  "highlights": [
			    "Wrote a new algorithm",
			  ],
			  "responsibilities": [
			    "Managed a team of 10 engineers",
			  ],
			  "startDate": "1988-02-01",
			  "technologies": [
			    "JavaScript",
			    "HTML",
			    "CSS",
			  ],
			  "title": "Junior Web Developer",
			}
		`)
	})

	test('toJsonSchema', async () => {
		await expect(JSON.stringify(JSONSchema.make(Role), null, '\t')).toMatchFileSnapshot('role-schema.snapshot.json')
	})
})
