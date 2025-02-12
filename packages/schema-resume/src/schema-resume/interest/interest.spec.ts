import { JSONSchema, Schema } from 'effect'
import { describe, expect, test } from 'vitest'

import { Interest } from './interest.ts'

describe('Interest', () => {
	const interestInput = {
		keywords: ['philosophy', 'distributed systems'],
		name: 'Philosophy',
	} satisfies typeof Interest.Type

	describe('decode', () => {
		const parse = Schema.decodeUnknownSync(Interest)

		test('handle all missing property', () => {
			const input: unknown = {}
			expect(() => parse(input)).not.toThrow()
		})

		test('keywords', () => {
			expect(() => parse({ keywords: [] })).not.toThrow()
			expect(() => parse({ keywords: ['', '  '] })).toThrow()
			expect(() => parse({ keywords: interestInput.keywords })).not.toThrow()
		})

		test('name', () => {
			expect(() => parse({ name: '' })).toThrow()
			expect(() => parse({ name: '  ' })).toThrow()
			expect(() => parse({ name: interestInput.name })).not.toThrow()
		})
	})

	test('JSONSchema', async () => {
		await expect(JSON.stringify(JSONSchema.make(Interest), null, '\t')).toMatchFileSnapshot(
			'interest-schema.snapshot.json',
		)
	})
})
