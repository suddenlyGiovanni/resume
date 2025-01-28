import { JSONSchema, Schema, SchemaAST } from 'effect'
import { describe, expect, test } from 'vitest'

import { expectEitherLeft, expectEitherRight } from '../../test/index.ts'
import { TrimmedNonEmpty, trimmedNonEmpty } from './trimmed-non-empty.ts'

describe('trimmedNonEmpty', () => {
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
		const decode = Schema.decodeEither(TrimmedNonEmpty)
		expectEitherRight(decode('test string'), 'test string')
	})

	test('throws error when empty string is passed', () => {
		const decode = Schema.decodeEither(TrimmedNonEmpty)
		const emptyString = '   '
		expectEitherLeft(
			decode(emptyString),
			`expected a non-empty string with no leading or trailing whitespace, got "${emptyString}"`,
		)
	})

	test('does not modify the string, only validates against the def rules', () => {
		const decode = Schema.decodeEither(TrimmedNonEmpty)
		const testString = '   test string   ' as const
		expectEitherRight(decode(testString), testString)
	})

	test('should preserve `annotations.jsonSchema`', () => {
		expect(
			Schema.String.pipe(trimmedNonEmpty()).ast.annotations[SchemaAST.JSONSchemaAnnotationId],
		).toMatchInlineSnapshot(`
			{
			  "minLength": 1,
			  "pattern": "^[^\\s].*[^\\s]$",
			}
		`)

		expect(
			Schema.String.pipe(trimmedNonEmpty({ jsonSchema: {} })).ast.annotations[
				SchemaAST.JSONSchemaAnnotationId
			],
		).toMatchInlineSnapshot(`
			{
			  "minLength": 1,
			  "pattern": "^[^\\s].*[^\\s]$",
			}
		`)

		expect(
			Schema.String.pipe(trimmedNonEmpty({ jsonSchema: { foo: 'bar', baz: 'zebra' } })).ast
				.annotations[SchemaAST.JSONSchemaAnnotationId],
		).toMatchInlineSnapshot(`
				{
				  "baz": "zebra",
				  "foo": "bar",
				  "minLength": 1,
				  "pattern": "^[^\\s].*[^\\s]$",
				}
			`)
	})

	describe('JsonSchema', () => {
		describe('naked', () => {
			test('no annotations', () => {
				expect(JSONSchema.make(TrimmedNonEmpty)).toMatchInlineSnapshot(
					`
					{
					  "$defs": {
					    "TrimmedNonEmpty": {
					      "description": "a non-empty string with no leading or trailing whitespace",
					      "minLength": 1,
					      "pattern": "^[^\\s].*[^\\s]$",
					      "title": "TrimmedNonEmpty",
					      "type": "string",
					    },
					  },
					  "$ref": "#/$defs/TrimmedNonEmpty",
					  "$schema": "http://json-schema.org/draft-07/schema#",
					}
				`,
				)
			})

			test('with annotations', () => {
				expect(
					JSONSchema.make(
						TrimmedNonEmpty.annotations({
							title: 'title',
							description: 'description',
							examples: ['examples'],
						}),
					),
				).toMatchInlineSnapshot(`
					{
					  "$defs": {
					    "TrimmedNonEmpty": {
					      "description": "description",
					      "examples": [
					        "examples",
					      ],
					      "minLength": 1,
					      "pattern": "^[^\\s].*[^\\s]$",
					      "title": "title",
					      "type": "string",
					    },
					  },
					  "$ref": "#/$defs/TrimmedNonEmpty",
					  "$schema": "http://json-schema.org/draft-07/schema#",
					}
				`)
			})

			test('when composing with other filters ', () => {
				expect(
					JSONSchema.make(
						TrimmedNonEmpty.pipe(
							Schema.lowercased({
								jsonSchema: {
									pattern: new RegExp(/^[a-z]+$/).source,
								},
							}),
						),
					),
				).toMatchInlineSnapshot(`
					{
					  "$defs": {
					    "TrimmedNonEmpty": {
					      "description": "a non-empty string with no leading or trailing whitespace",
					      "minLength": 1,
					      "pattern": "^[^\\s].*[^\\s]$",
					      "title": "TrimmedNonEmpty",
					      "type": "string",
					    },
					  },
					  "$ref": "#/$defs/TrimmedNonEmpty",
					  "$schema": "http://json-schema.org/draft-07/schema#",
					  "description": "a lowercase string",
					  "pattern": "^[a-z]+$",
					  "title": "lowercased",
					}
				`)

				expect(
					JSONSchema.make(
						TrimmedNonEmpty.pipe(
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
					  "$defs": {
					    "TrimmedNonEmpty": {
					      "description": "a non-empty string with no leading or trailing whitespace",
					      "minLength": 1,
					      "pattern": "^[^\\s].*[^\\s]$",
					      "title": "TrimmedNonEmpty",
					      "type": "string",
					    },
					  },
					  "$ref": "#/$defs/TrimmedNonEmpty",
					  "$schema": "http://json-schema.org/draft-07/schema#",
					  "description": "DESCRIPTION",
					  "maxLength": 10,
					  "minLength": 2,
					  "pattern": "^[a-z]+$",
					  "title": "TITLE",
					}
				`)
			})
		})
	})
})
