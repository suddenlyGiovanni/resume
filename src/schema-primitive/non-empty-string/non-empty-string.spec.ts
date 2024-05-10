import * as jsonSchema from '@effect/schema/JSONSchema'
import * as S from '@effect/schema/Schema'
import { identity } from 'effect/Function'
import { describe, expect, test } from 'vitest'

import { expectEitherRight } from '../../test/test-utils.js'
import { nonEmptyString } from './non-empty-string.js'

describe('nonEmptyString', () => {
	const NonEmptyString = nonEmptyString()

	test('does not transform non-empty-strings', () => {
		const decode = S.decodeEither(NonEmptyString)
		expectEitherRight(decode('test string'), 'test string')
	})

	test('throws error when empty string is passed', () => {
		const decode = S.decodeEither(NonEmptyString)
		expect(decode('   ')).toMatchInlineSnapshot(`
			{
			  "_id": "Either",
			  "_tag": "Left",
			  "left": {
			    "_id": "ParseError",
			    "message": "a non empty string
			└─ Predicate refinement failure
			   └─ Expected a non empty string, actual """,
			  },
			}
		`)
	})

	test('trims leading and trailing white spaces', () => {
		const decode = S.decodeEither(NonEmptyString)
		expectEitherRight(decode('   test string   ' as const), 'test string' as const)
	})

	describe('JSONSchema', () => {
		const NonEmptyStringAnnotated = nonEmptyString({
			identifier: 'NonEmptyString',
			title: 'TITLE',
			description: 'DESCRIPTION',
			examples: ['EXAMPLES'],
		})

		test('naked', () => {
			expect(JSON.stringify(jsonSchema.make(NonEmptyString), null, '\t')).toMatchInlineSnapshot(`
				"{
					"$schema": "http://json-schema.org/draft-07/schema#",
					"minLength": 1
				}"
			`)

			expect(
				JSON.stringify(jsonSchema.make(NonEmptyStringAnnotated), null, '\t'),
			).toMatchInlineSnapshot(`
				"{
					"$schema": "http://json-schema.org/draft-07/schema#",
					"minLength": 1
				}"
			`)
		})

		test('encodedSchema', () => {
			expect(
				JSON.stringify(jsonSchema.make(S.encodedSchema(NonEmptyString)), null, '\t'),
			).toMatchInlineSnapshot(`
				"{
					"$schema": "http://json-schema.org/draft-07/schema#",
					"$ref": "#/$defs/NonEmptyString",
					"$defs": {
						"NonEmptyString": {
							"type": "string",
							"description": "a non empty string",
							"title": "non empty string",
							"examples": [
								"' test string  '",
								"'test string'"
							]
						}
					}
				}"
			`)

			expect(
				JSON.stringify(jsonSchema.make(S.encodedSchema(NonEmptyStringAnnotated)), null, '\t'),
			).toMatchInlineSnapshot(`
				"{
					"$schema": "http://json-schema.org/draft-07/schema#",
					"$ref": "#/$defs/NonEmptyString",
					"$defs": {
						"NonEmptyString": {
							"type": "string",
							"description": "DESCRIPTION",
							"title": "TITLE",
							"examples": [
								"EXAMPLES"
							]
						}
					}
				}"
			`)

			expect(
				JSON.stringify(
					jsonSchema.make(
						S.encodedSchema(
							nonEmptyString({
								title: '__TITLE__',
								description: '__DESCRIPTION__',
								examples: ['__EXAMPLES__'],
								jsonSchema: {
									minLength: 1, // this is what throws it off...
								},
							}),
						),
					),
					null,
					'\t',
				),
			).toMatchInlineSnapshot(`
				"{
					"$schema": "http://json-schema.org/draft-07/schema#",
					"minLength": 1
				}"
			`)
		})

		test('typeSchema', () => {
			expect(() => jsonSchema.make(S.typeSchema(NonEmptyString))).toMatchInlineSnapshot(
				`[Function]`,
			)
			expect(() => jsonSchema.make(S.typeSchema(NonEmptyStringAnnotated))).toMatchInlineSnapshot(
				`[Function]`,
			)
		})
	})
})

describe('Annotation', () => {
	test('on naked String', () => {
		expect(jsonSchema.make(S.String)).toMatchInlineSnapshot(`
			{
			  "$schema": "http://json-schema.org/draft-07/schema#",
			  "description": "a string",
			  "title": "string",
			  "type": "string",
			}
		`)

		expect(
			jsonSchema.make(
				S.String.annotations({
					title: 'title',
					description: 'description',
					examples: ['example'],
				}),
			),
		).toMatchInlineSnapshot(`
			{
			  "$schema": "http://json-schema.org/draft-07/schema#",
			  "description": "description",
			  "examples": [
			    "example",
			  ],
			  "title": "title",
			  "type": "string",
			}
		`)
	})

	test('on a refinement such as NonEmpty', () => {
		const minLength =
			<A extends string>(minLength: number, annotations?: S.Annotations.Filter<A>) =>
			<I, R>(self: S.Schema<A, I, R>): S.Schema<A, I, R> =>
				self.pipe(
					S.filter((a): a is A => a.length >= minLength, {
						typeId: S.MinLengthTypeId,
						description: `a string at least ${minLength} character(s) long`,
						jsonSchema: {
							...annotations?.jsonSchema,
							minLength,
						},
						...annotations,
					}),
				)

		const nonEmpty = <A extends string>(
			annotations?: S.Annotations.Filter<A>,
		): (<I, R>(self: S.Schema<A, I, R>) => S.Schema<A, I, R>) =>
			minLength(1, {
				description: 'a non empty string',
				...annotations,
			})

		const NonEmpty = S.String.pipe(
			// is is a refinement that only checks if the string is not empty
			nonEmpty({
				identifier: 'NonEmpty',
				title: 'NonEmpty',
			}),
		)

		// default annotations
		expect(jsonSchema.make(NonEmpty)).toMatchInlineSnapshot(`
			{
			  "$schema": "http://json-schema.org/draft-07/schema#",
			  "description": "a non empty string",
			  "minLength": 1,
			  "title": "NonEmpty",
			  "type": "string",
			}
		`)

		expect(jsonSchema.make(NonEmpty.pipe(S.jsonSchema({ foo: 'bar' })))).not.toEqual(
			jsonSchema.make(NonEmpty),
		)

		// custom annotations

		expect(
			jsonSchema.make(
				NonEmpty.annotations({
					title: 'custom title',
					description: 'custom description',
					examples: ['custom example'],
					jsonSchema: {
						foo: 'bar',
					},
				}),
			),
		).toMatchInlineSnapshot(`
			{
			  "$schema": "http://json-schema.org/draft-07/schema#",
			  "description": "custom description",
			  "examples": [
			    "custom example",
			  ],
			  "foo": "bar",
			  "title": "custom title",
			  "type": "string",
			}
		`)
	})

	test('on a transformation such as Trim', () => {
		/**
		 * Verifies that a string contains no leading or trailing whitespaces.
		 *
		 * Note. This combinator does not make any transformations, it only validates.
		 * If what you were looking for was a combinator to trim strings, then check out the `trim` combinator.
		 *
		 * @category string filters
		 * @since 1.0.0
		 */
		const trimmed =
			<A extends string>(annotations?: S.Annotations.Filter<A>) =>
			<I, R>(self: S.Schema<A, I, R>): S.Schema<A, I, R> =>
				self.pipe(
					S.filter((a): a is A => a === a.trim(), {
						typeId: S.TrimmedTypeId,
						description: 'a string with no leading or trailing whitespace',
						...annotations,
					}),
				)

		/**
		 * @category string constructors
		 * @since 1.0.0
		 */
		const Trimmed = S.String.pipe(
			trimmed({
				identifier: 'Trimmed',
				title: 'Trimmed',
			}),
		)

		// default annotations
		expect(jsonSchema.make(S.encodedSchema(Trimmed))).toMatchInlineSnapshot(`
			{
			  "$schema": "http://json-schema.org/draft-07/schema#",
			  "description": "a string",
			  "title": "string",
			  "type": "string",
			}
		`)

		// custom annotations
		expect(
			jsonSchema.make(
				S.encodedSchema(
					Trimmed.annotations({
						title: 'custom title',
						description: 'custom description',
						examples: ['custom example'],
					}),
				),
			),
		).toMatchInlineSnapshot(`
			{
			  "$schema": "http://json-schema.org/draft-07/schema#",
			  "description": "a string",
			  "title": "string",
			  "type": "string",
			}
		`)

		const Trim = S.transform(S.String, Trimmed, {
			decode: s => s.trim(),
			encode: identity,
		}).annotations({ identifier: 'Trim' })

		// default annotations
		expect(jsonSchema.make(S.encodedSchema(Trim))).toMatchInlineSnapshot(`
			{
			  "$schema": "http://json-schema.org/draft-07/schema#",
			  "description": "a string",
			  "title": "string",
			  "type": "string",
			}
		`)
	})
})
