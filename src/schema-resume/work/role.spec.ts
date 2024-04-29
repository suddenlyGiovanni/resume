import * as JSONSchema from '@effect/schema/JSONSchema'
import * as S from '@effect/schema/Schema'

import { describe, expect, test } from 'vitest'

import { Role } from './role.js'

describe('Role', () => {
	const role: S.Schema.Encoded<typeof Role> = {
		startDate: '1988-02-01',
		title: 'Junior Web Developer',
		responsibilities: ['code owner of front end app'],
	}

	test('required role attributes', () => {
		expect(() => S.decodeUnknownSync(Role)(role)).not.toThrow()
	})

	test('all role attributes', () => {
		const decodeRole = S.decodeUnknownSync(Role)
		const roleInput: S.Schema.Encoded<typeof Role> = {
			...role,
			endDate: '1989-02-01',
			responsibilities: ['Managed a team of 10 engineers'],
			highlights: ['Wrote a new algorithm'],
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

	test('toJsonSchema', () => {
		expect(JSON.stringify(JSONSchema.make(Role), null, '\t')).toMatchFileSnapshot(
			'role-schema.snapshot.json',
		)
	})
})
