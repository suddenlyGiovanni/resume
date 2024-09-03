import { JSONSchema, Schema } from '@effect/schema'
import { describe, expect, test } from 'vitest'

import { expectEitherRight } from '../../test/test-utils.js'

describe('NonEmptyTrimmedString', () => {
	describe('Regex Pattern', () => {
		const regex = /^\S.*\S$/
		test('should validate trimmed non-empty strings with random tokens', () => {
			const validString = 'valid123$%^&*'
			expect(regex.test(validString)).toBe(true)
		})

		test('should invalidate strings with leading spaces, regardless of random tokens', () => {
			const invalidString = ' invalid123$%^&*'
			expect(regex.test(invalidString)).toBe(false)
		})

		test('should invalidate strings with trailing spaces, regardless of random tokens', () => {
			const invalidString = 'invalid123$%^&* '
			expect(regex.test(invalidString)).toBe(false)
		})

		test('should invalidate empty strings, even with random tokens', () => {
			const emptyString = ' '
			expect(regex.test(emptyString)).toBe(false)
		})
	})

	test('does not transform non-empty-strings', () => {
		const decode = Schema.decodeEither(Schema.NonEmptyTrimmedString)
		expectEitherRight(decode('test string'), 'test string')
	})

	test('throws error when empty string is passed', () => {
		const decode = Schema.decodeEither(Schema.NonEmptyTrimmedString)
		const emptyString = '   '

		expect(decode(emptyString)).toMatchInlineSnapshot(`
			{
			  "_id": "Either",
			  "_tag": "Left",
			  "left": {
			    "_id": "ParseError",
			    "message": "NonEmptyTrimmedString
			└─ From side refinement failure
			   └─ Trimmed
			      └─ Predicate refinement failure
			         └─ Expected Trimmed, actual "   "",
			  },
			}
		`)
	})

	test('does not modify the string, only validates against the def rules', () => {
		const decode = Schema.decodeEither(Schema.NonEmptyTrimmedString)
		const testString = '   test string   ' as const

		expect(decode(testString)).toMatchInlineSnapshot(`
			{
			  "_id": "Either",
			  "_tag": "Left",
			  "left": {
			    "_id": "ParseError",
			    "message": "NonEmptyTrimmedString
			└─ From side refinement failure
			   └─ Trimmed
			      └─ Predicate refinement failure
			         └─ Expected Trimmed, actual "   test string   "",
			  },
			}
		`)
	})

	describe('JsonSchema', () => {
		describe('naked', () => {
			test('no annotations', () => {
				expect(JSONSchema.make(Schema.NonEmptyTrimmedString)).toMatchInlineSnapshot(
					`
					{
					  "$schema": "http://json-schema.org/draft-07/schema#",
					  "description": "a non empty string",
					  "minLength": 1,
					  "pattern": "^\\S[\\s\\S]*\\S$|^\\S$|^$",
					  "title": "NonEmptyTrimmedString",
					  "type": "string",
					}
				`,
				)
			})

			test('with annotations', () => {
				expect(
					JSONSchema.make(
						Schema.NonEmptyTrimmedString.annotations({
							title: 'title',
							description: 'description',
							examples: ['examples'],
						}),
					),
				).toMatchInlineSnapshot(`
					{
					  "$schema": "http://json-schema.org/draft-07/schema#",
					  "description": "description",
					  "examples": [
					    "examples",
					  ],
					  "minLength": 1,
					  "pattern": "^\\S[\\s\\S]*\\S$|^\\S$|^$",
					  "title": "title",
					  "type": "string",
					}
				`)
			})

			test('when composing with other filters ', () => {
				expect(
					JSONSchema.make(
						Schema.NonEmptyTrimmedString.pipe(
							Schema.lowercased({
								jsonSchema: {
									pattern: new RegExp(/^[a-z]+$/).source,
								},
							}),
						),
					),
				).toMatchInlineSnapshot(`
					{
					  "$schema": "http://json-schema.org/draft-07/schema#",
					  "description": "a lowercase string",
					  "minLength": 1,
					  "pattern": "^[a-z]+$",
					  "title": "NonEmptyTrimmedString",
					  "type": "string",
					}
				`)

				expect(
					JSONSchema.make(
						Schema.NonEmptyTrimmedString.pipe(
							Schema.lowercased({
								jsonSchema: {
									pattern: new RegExp(/^[a-z]+$/).source,
								},
							}),
							Schema.maxLength(10),
							Schema.minLength(2),
						).annotations({
							title: 'TITLE',
							description: 'DESCRIPTION',
						}),
					),
				).toMatchInlineSnapshot(`
					{
					  "$schema": "http://json-schema.org/draft-07/schema#",
					  "description": "DESCRIPTION",
					  "maxLength": 10,
					  "minLength": 2,
					  "pattern": "^[a-z]+$",
					  "title": "TITLE",
					  "type": "string",
					}
				`)
			})
		})
	})
})
