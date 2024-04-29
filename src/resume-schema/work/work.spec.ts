import * as JSONSchema from '@effect/schema/JSONSchema'
import * as S from '@effect/schema/Schema'

import { describe, expect, test } from 'vitest'

import { Work, type WorkEncoded } from './work.js'

describe('Work', () => {
	const workInput = {
		description: 'Social Media Company',
		endDate: '1989-02-01',
		location: 'Menlo Park, CA',
		name: 'Facebook',
		roles: [
			{
				startDate: '1988-02-01',
				title: 'Software Engineer',
				highlights: ['Founded the company', 'Wrote a new algorithm'],
				responsibilities: ['Designed and built web applications', 'Managed a team of 10 engineers'],
			},
		],
		startDate: '1988-02-01',
		summary: 'My day-to-day activities involved designing and building web applications...',
		url: 'https://facebook.example.com',
		contact: {
			phone: '+353861234567',
			email: 'zuckerberg@mark.cto',
			name: 'Mark Zuckerberg (CTO)',
		},
	} satisfies S.Schema.Encoded<typeof Work>

	const required: S.Schema.Encoded<typeof Work> = {
		name: workInput.name,
		roles: workInput.roles,
		description: workInput.description,
		startDate: workInput.startDate,
	}

	describe('decode', () => {
		const parse = S.decodeUnknownSync(Work)

		test('handle missing partial properties', () => {
			expect(() => parse({ ...required })).not.toThrow()
		})

		test('description', () => {
			expect(() => parse({ ...required, description: '' })).toThrow()
			expect(() => parse({ ...required, description: ' ' })).toThrow()
			expect(() =>
				parse({ ...required, description: 'Educational Software Company' }),
			).not.toThrow()
		})

		test('location', () => {
			expect(() => parse({ ...required, location: '' })).toThrow()
			expect(() => parse({ ...required, location: ' ' })).toThrow()
			expect(() => parse({ ...required, location: workInput.location })).not.toThrow()
		})

		test('name', () => {
			expect(() => parse({ ...required, name: '' })).toThrow()
			expect(() => parse({ ...required, name: ' ' })).toThrow()
			expect(() => parse({ ...required, name: workInput.name })).not.toThrow()
		})

		describe('roles', () => {
			test('empty roles array', () => {
				expect(() => parse({ ...required, roles: [] })).toThrow()
			})
		})

		test('summary', () => {
			expect(() => parse({ ...required, summary: '' })).toThrow()
			expect(() => parse({ ...required, summary: ' ' })).toThrow()
			expect(() => parse({ ...required, summary: workInput.summary })).not.toThrow()
		})

		test('url', () => {
			expect(() => parse({ ...required, url: '' })).toThrow()
			expect(() => parse({ ...required, url: ' ' })).toThrow()
			expect(() => parse({ ...required, url: workInput.url })).not.toThrow()
		})

		test('contact', () => {
			expect(() =>
				parse({ ...required, contact: { email: workInput.contact.email, name: ' ' } }),
			).toThrow()
			expect(() =>
				parse({
					...required,
					contact: {
						email: workInput.contact.email,
						name: workInput.contact.name,
					},
				}),
			).not.toThrow()
			expect(() => parse({ ...required, contact: { ...workInput.contact, email: '' } })).toThrow()
			expect(() => parse({ ...required, contact: { ...workInput.contact, email: ' ' } })).toThrow()
			expect(() =>
				parse({ ...required, contact: { ...workInput.contact, email: workInput.contact.email } }),
			).not.toThrow()
			expect(() => parse({ ...required, contact: { ...workInput.contact, phone: '' } })).toThrow()
			expect(() => parse({ ...required, contact: { ...workInput.contact, phone: ' ' } })).toThrow()
			expect(() =>
				parse({ ...required, contact: { ...workInput.contact, phone: workInput.contact.phone } }),
			).not.toThrow()
		})

		describe('dates', () => {
			test('startDate', () => {
				expect(() => parse({ ...required, startDate: '' })).toThrow()
				expect(() => parse({ ...required, startDate: ' ' })).toThrow()
				expect(() => parse({ ...required, startDate: workInput.startDate })).not.toThrow()
				expect(parse({ ...required, startDate: workInput.startDate }).startDate).toBe('1988-02-01')
			})

			test('endDate', () => {
				expect(() => parse({ ...required, endDate: '' })).toThrow()
				expect(() => parse({ ...required, endDate: ' ' })).toThrow()
				expect(() => parse({ ...required, endDate: workInput.endDate })).not.toThrow()
				expect(parse({ ...required, endDate: workInput.endDate }).endDate).toBe('1989-02-01')
			})

			test.todo('start date before end date', () => {
				const input: WorkEncoded = {
					...required,
					endDate: '1968-02-01',
					startDate: '1969-05-01',
				}
				expect(() => parse(input)).toThrow()
			})
		})

		test('techStack', () => {
			const workInput: S.Schema.Encoded<typeof Work> = {
				name: required.name,
				roles: required.roles,
				description: required.description,
				startDate: required.startDate,
				techStack: ['TypeScript', 'Aws', 'SQLite'],
			}
			expect(() => parse(required)).not.toThrow()
			expect(() => parse(workInput)).not.toThrow()
			expect(parse(workInput).techStack).toEqual(workInput.techStack)
		})

		describe('JSONSchema', () => {
			test.todo('naked', () => {
				expect(JSONSchema.make(Work)).toMatchInlineSnapshot()
			})

			test.todo('typeSchema', () => {
				expect(JSONSchema.make(S.typeSchema(Work))).toMatchInlineSnapshot()
			})

			test('encodedSchema', () => {
				expect(
					JSON.stringify(JSONSchema.make(S.encodedSchema(Work)), null, '\t'),
				).toMatchFileSnapshot('work-schema.snapshot.json')
			})
		})
	})
})
