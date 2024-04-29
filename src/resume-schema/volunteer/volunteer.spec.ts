import * as JSONSchema from '@effect/schema/JSONSchema'
import * as S from '@effect/schema/Schema'
import { describe, expect, test } from 'vitest'

import { Volunteer } from './volunteer.js'

describe('Volunteer', () => {
	const volunteerInput = {
		endDate: '2021-01-01',
		highlights: ['Saved the world from certain doom'],
		organization: 'Facebook',
		position: 'Software Engineer',
		startDate: '2020-01-01',
		summary: 'My day-to-day activities involved designing and building web applications...',
		url: 'https://facebook.example.com',
	} satisfies S.Schema.Type<typeof Volunteer>

	describe('decode', () => {
		const parse = S.decodeUnknownSync(Volunteer)

		test('handle missing partial properties', () => {
			expect(() => parse({})).not.toThrow()
		})

		test('endDate', () => {
			expect(() => parse({ endDate: '' })).toThrow()
			expect(() => parse({ endDate: ' ' })).toThrow()
			expect(() => parse({ endDate: volunteerInput.endDate })).not.toThrow()
		})

		test('highlights', () => {
			expect(() => parse({ highlights: [] })).not.toThrow()
			expect(() => parse({ highlights: [''] })).toThrow()
			expect(() => parse({ highlights: [' '] })).toThrow()
			expect(() => parse({ highlights: volunteerInput.highlights })).not.toThrow()
		})

		test('organization', () => {
			expect(() => parse({ organization: '' })).toThrow()
			expect(() => parse({ organization: ' ' })).toThrow()
			expect(() => parse({ organization: volunteerInput.organization })).not.toThrow()
		})

		test('position', () => {
			expect(() => parse({ position: '' })).toThrow()
			expect(() => parse({ position: ' ' })).toThrow()
			expect(() => parse({ position: volunteerInput.position })).not.toThrow()
		})

		test('startDate', () => {
			expect(() => parse({ startDate: '' })).toThrow()
			expect(() => parse({ startDate: ' ' })).toThrow()
			expect(() => parse({ startDate: volunteerInput.startDate })).not.toThrow()
		})

		test('summary', () => {
			expect(() => parse({ summary: '' })).toThrow()
			expect(() => parse({ summary: ' ' })).toThrow()
			expect(() => parse({ summary: volunteerInput.summary })).not.toThrow()
		})

		test('url', () => {
			expect(() => parse({ url: '' })).toThrow()
			expect(() => parse({ url: ' ' })).toThrow()
			expect(() => parse({ url: volunteerInput.url })).not.toThrow()
		})
	})

	describe('JSONSchema', () => {
		test('naked', () => {
			expect(() => JSON.stringify(JSONSchema.make(Volunteer), null, '\t')).toThrow(
				'cannot build a JSON Schema for a refinement without a JSON Schema annotation',
			)
		})

		test('encodedSchema', () => {
			const jsonSchema = JSONSchema.make(S.encodedSchema(Volunteer))
			const serializedJsonSchema = JSON.stringify(jsonSchema, null, '\t')
			expect(serializedJsonSchema).toMatchFileSnapshot('volunteer-schema.snapshot.json')
		})

		test('typeSchema', () => {
			expect(() => JSON.stringify(JSONSchema.make(S.typeSchema(Volunteer)), null, '\t')).toThrow(
				'cannot build a JSON Schema for a refinement without a JSON Schema annotation',
			)
		})
	})
})
