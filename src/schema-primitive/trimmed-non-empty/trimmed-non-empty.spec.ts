import * as AST from '@effect/schema/AST'
import * as jsonSchema from '@effect/schema/JSONSchema'
import * as S from '@effect/schema/Schema'
import { describe, expect, test } from 'vitest'

import { expectEitherLeft, expectEitherRight } from '../../test/test-utils.js'
import { TrimmedNonEmpty, trimmedNonEmpty } from './trimmed-non-empty.js'

describe('trimmedNonEmpty', () => {
	describe('Regex Pattern', () => {
		const regex = /^[^\s].*[^\s]$/
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
		const decode = S.decodeEither(TrimmedNonEmpty)
		expectEitherRight(decode('test string'), 'test string')
	})

	test('throws error when empty string is passed', () => {
		const decode = S.decodeEither(TrimmedNonEmpty)
		const emptyString = '   '
		expectEitherLeft(
			decode(emptyString),
			`expected a non-empty string with no leading or trailing whitespace, got "${emptyString}"`,
		)
	})

	test('does not modify the string, only validates against the def rules', () => {
		const decode = S.decodeEither(TrimmedNonEmpty)
		const testString = '   test string   ' as const
		expectEitherRight(decode(testString), testString)
	})

	test('should preserve `annotations.jsonSchema`', () => {
		expect(
			S.String.pipe(trimmedNonEmpty()).ast.annotations[AST.JSONSchemaAnnotationId],
		).toMatchInlineSnapshot(`
			{
			  "minLength": 1,
			  "pattern": "^[^\\s].*[^\\s]$",
			}
		`)

		expect(
			S.String.pipe(trimmedNonEmpty({ jsonSchema: {} })).ast.annotations[
				AST.JSONSchemaAnnotationId
			],
		).toMatchInlineSnapshot(`
			{
			  "minLength": 1,
			  "pattern": "^[^\\s].*[^\\s]$",
			}
		`)

		expect(
			S.String.pipe(trimmedNonEmpty({ jsonSchema: { foo: 'bar', baz: 'zebra' } })).ast.annotations[
				AST.JSONSchemaAnnotationId
			],
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
				expect(jsonSchema.make(TrimmedNonEmpty)).toMatchInlineSnapshot(
					`
				{
				  "$schema": "http://json-schema.org/draft-07/schema#",
				  "description": "a non-empty string with no leading or trailing whitespace",
				  "minLength": 1,
				  "pattern": "^[^\\s].*[^\\s]$",
				  "title": "TrimmedNonEmpty",
				  "type": "string",
				}
			`,
				)
			})

			test('with annotations', () => {
				expect(
					jsonSchema.make(
						TrimmedNonEmpty.annotations({
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
				  "pattern": "^[^\\s].*[^\\s]$",
				  "title": "title",
				  "type": "string",
				}
			`)
			})

			test('when composing with other filters ', () => {
				expect(
					jsonSchema.make(
						TrimmedNonEmpty.pipe(
							S.lowercased({
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
					  "title": "TrimmedNonEmpty",
					  "type": "string",
					}
				`)

				expect(
					jsonSchema.make(
						TrimmedNonEmpty.pipe(
							S.lowercased({
								jsonSchema: {
									pattern: new RegExp(/^[a-z]+$/).source,
								},
							}),
							S.maxLength(10),
							S.minLength(2),
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
