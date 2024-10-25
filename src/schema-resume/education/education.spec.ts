import { JSONSchema, Schema } from 'effect'
import { describe, expect, test } from 'vitest'

import { Education } from './education.js'

describe('Education', () => {
	const educationInput = {
		area: 'Computer Science',
		courses: ['Computer Science', 'Data Structures'],
		endDate: '2020-02-01',
		score: '3.67/4.0',
		institution: 'Massachusetts Institute of Technology',
		startDate: '2008-03-01',
		studyType: 'Bachelor',
		url: 'https://mit.com',
		location: 'Cambridge, MA',
	} satisfies typeof Education.Type

	const required: typeof Education.Type = {
		area: educationInput.area,
		institution: educationInput.institution,
		startDate: educationInput.startDate,
		studyType: educationInput.studyType,
	}

	describe('decode', () => {
		const parse = Schema.decodeUnknownSync(Education)

		test('handle all missing property', () => {
			const input: unknown = { ...required }
			expect(() => parse(input)).not.toThrow()
		})

		test('area', () => {
			expect(() => parse({ ...required, area: '' })).toThrow()
			expect(() => parse({ ...required, area: '  ' })).toThrow()
			expect(() => parse({ ...required, area: 'Cooking' })).not.toThrow()
		})

		test('courses', () => {
			expect(() => parse({ ...required, courses: [] })).not.toThrow()
			expect(() => parse({ ...required, courses: [''] })).toThrow()
			expect(() => parse({ ...required, courses: ['  '] })).toThrow()
			expect(() => parse({ ...required, courses: educationInput.courses })).not.toThrow()
		})

		test('score', () => {
			expect(() => parse({ ...required, score: '' })).toThrow()
			expect(() => parse({ ...required, score: '  ' })).toThrow()
			expect(() => parse({ ...required, score: educationInput.score })).not.toThrow()
		})

		test('institution', () => {
			expect(() => parse({ ...required, institution: '' })).toThrow()
			expect(() => parse({ ...required, institution: '  ' })).toThrow()
			expect(() => parse({ ...required, institution: educationInput.institution })).not.toThrow()
		})

		describe('dates', () => {
			test('startDate', () => {
				expect(() => parse({ ...required, startDate: '' })).toThrow()
				expect(() => parse({ ...required, startDate: '  ' })).toThrow()
				expect(() => parse({ ...required, startDate: educationInput.startDate })).not.toThrow()
				expect(parse({ ...required, startDate: educationInput.startDate }).startDate).toBe(
					'2008-03-01',
				)
			})

			test('endDate', () => {
				expect(() => parse({ ...required, endDate: '' })).toThrow()
				expect(() => parse({ ...required, endDate: '  ' })).toThrow()
				expect(() => parse({ ...required, endDate: educationInput.endDate })).not.toThrow()
				expect(parse({ ...required, endDate: educationInput.endDate }).endDate).toBe('2020-02-01')
			})

			test.todo('start date before end date', () => {
				const input: Schema.Schema.Encoded<typeof Education> = {
					...required,
					startDate: '1989-01-01',
					endDate: '1988-01-01',
				}
				expect(() => parse(input)).toThrow()
			})
		})

		test('studyType', () => {
			expect(() => parse({ ...required, studyType: '' })).toThrow()
			expect(() => parse({ ...required, studyType: '  ' })).toThrow()
			expect(() => parse({ ...required, studyType: educationInput.studyType })).not.toThrow()
		})

		test('url', () => {
			expect(() => parse({ ...required, url: '' })).toThrow()
			expect(() => parse({ ...required, url: '  ' })).toThrow()
			expect(() => parse({ ...required, url: educationInput.url })).not.toThrow()
		})

		test('location', () => {
			expect(() => parse({ ...required, location: '' })).toThrow()
			expect(() => parse({ ...required, location: '  ' })).toThrow()
			expect(() => parse({ ...required, location: educationInput.location })).not.toThrow()
		})
	})

	test('JSONSchema', () => {
		expect(JSON.stringify(JSONSchema.make(Education), null, '\t')).toMatchFileSnapshot(
			'education-schema.snapshot.json',
		)
	})
})
