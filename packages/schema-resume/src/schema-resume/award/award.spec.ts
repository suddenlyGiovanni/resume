import { JSONSchema, Schema } from 'effect'
import { describe, expect, test } from 'vitest'

import { Award } from './award.js'

describe('award', () => {
	const awardInput = {
		awarder: 'Time Magazine',
		title: 'One of the 100 greatest minds of the century',
		date: '1970-01-01',
		summary: 'Received for my work with Quantum Physics',
	} satisfies typeof Award.Encoded

	describe('decode', () => {
		const parse = Schema.decodeUnknownSync(Award)
		test('handle all missing property', () => {
			const input: unknown = {}
			expect(() => parse(input)).not.toThrow()
		})

		test('awarder', () => {
			expect(() => parse({ awarder: '' })).toThrow()
			expect(() => parse({ awarder: '  ' })).toThrow()
			expect(() => parse({ awarder: awardInput.awarder })).not.toThrow()
		})

		test('date', () => {
			expect(() => parse({ date: '' })).toThrow()
			expect(() => parse({ awarder: awardInput.date })).not.toThrow()
		})

		test('title', () => {
			expect(() => parse({ title: '' })).toThrow()
			expect(() => parse({ title: '  ' })).toThrow()
			expect(() => parse({ title: awardInput.title })).not.toThrow()
		})

		test('summary', () => {
			expect(() => parse({ summary: '' })).toThrow()
			expect(() => parse({ summary: '  ' })).toThrow()
			expect(() => parse({ summary: awardInput.summary })).not.toThrow()
		})
	})

	test('JSONSchema', async () => {
		await expect(JSON.stringify(JSONSchema.make(Award), null, 2)).toMatchFileSnapshot(
			'award-schema.snapshot.json',
		)
	})
})
