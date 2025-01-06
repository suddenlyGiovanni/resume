import { identity, JSONSchema, Schema } from 'effect'
import { describe, expect, test } from 'vitest'

import { expectEitherRight } from '../../test/index.ts'
import { nonEmptyString } from './non-empty-string.ts'

describe('nonEmptyString', () => {
	const NonEmptyString = nonEmptyString()

	test('does not transform non-empty-strings', () => {
		const decode = Schema.decodeEither(NonEmptyString)
		expectEitherRight(decode('test string'), 'test string')
	})

	test('throws error when empty string is passed', () => {
		const decode = Schema.decodeEither(NonEmptyString)
		expect(decode('   ')).toMatchInlineSnapshot(`
			{
			  "_id": "Either",
			  "_tag": "Left",
			  "left": {
			    "_id": "ParseError",
			    "message": "nonEmptyString
			└─ Predicate refinement failure
			   └─ Expected a non empty string, actual """,
			  },
			}
		`)
	})

	test('trims leading and trailing white spaces', () => {
		const decode = Schema.decodeEither(NonEmptyString)
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
			expect(JSON.stringify(JSONSchema.make(NonEmptyString), null, '\t')).toMatchInlineSnapshot(`
				"{
					"$schema": "http://json-schema.org/draft-07/schema#",
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
					},
					"$ref": "#/$defs/NonEmptyString"
				}"
			`)

			expect(
				JSON.stringify(JSONSchema.make(NonEmptyStringAnnotated), null, '\t'),
			).toMatchInlineSnapshot(`
				"{
					"$schema": "http://json-schema.org/draft-07/schema#",
					"$defs": {
						"NonEmptyString": {
							"type": "string",
							"description": "DESCRIPTION",
							"title": "TITLE",
							"examples": [
								"EXAMPLES"
							]
						}
					},
					"$ref": "#/$defs/NonEmptyString"
				}"
			`)
		})

		test('encodedSchema', () => {
			expect(
				JSON.stringify(JSONSchema.make(Schema.encodedSchema(NonEmptyString)), null, '\t'),
			).toMatchInlineSnapshot(`
				"{
					"$schema": "http://json-schema.org/draft-07/schema#",
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
					},
					"$ref": "#/$defs/NonEmptyString"
				}"
			`)

			expect(
				JSON.stringify(JSONSchema.make(Schema.encodedSchema(NonEmptyStringAnnotated)), null, '\t'),
			).toMatchInlineSnapshot(`
				"{
					"$schema": "http://json-schema.org/draft-07/schema#",
					"$defs": {
						"NonEmptyString": {
							"type": "string",
							"description": "DESCRIPTION",
							"title": "TITLE",
							"examples": [
								"EXAMPLES"
							]
						}
					},
					"$ref": "#/$defs/NonEmptyString"
				}"
			`)

			expect(
				JSON.stringify(
					JSONSchema.make(
						Schema.encodedSchema(
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
			expect(() => JSONSchema.make(Schema.typeSchema(NonEmptyString))).toMatchInlineSnapshot(
				'[Function]',
			)
			expect(() => JSONSchema.make(Schema.typeSchema(NonEmptyStringAnnotated)))
				.toMatchInlineSnapshot('[Function]')
		})
	})
})

describe('Annotation', () => {
	test('on naked String', () => {
		expect(JSONSchema.make(Schema.String)).toMatchInlineSnapshot(`
			{
			  "$schema": "http://json-schema.org/draft-07/schema#",
			  "type": "string",
			}
		`)

		expect(
			JSONSchema.make(
				Schema.String.annotations({
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
			<A extends string>(minLength: number, annotations?: Schema.Annotations.Filter<A>) =>
			<I, R>(self: Schema.Schema<A, I, R>): Schema.Schema<A, I, R> =>
				self.pipe(
					Schema.filter((a): a is A => a.length >= minLength, {
						typeId: Schema.MinLengthSchemaId,
						description: `a string at least ${minLength} character(s) long`,
						jsonSchema: {
							...annotations?.jsonSchema,
							minLength,
						},
						...annotations,
					}),
				)

		const nonEmpty = <A extends string>(
			annotations?: Schema.Annotations.Filter<A>,
		): <I, R>(self: Schema.Schema<A, I, R>) => Schema.Schema<A, I, R> =>
			minLength(1, {
				description: 'a non empty string',
				...annotations,
			})

		const NonEmpty = Schema.String.pipe(
			// is is a refinement that only checks if the string is not empty
			nonEmpty({
				identifier: 'NonEmpty',
				title: 'NonEmpty',
			}),
		)

		// default annotations
		expect(JSONSchema.make(NonEmpty)).toMatchInlineSnapshot(`
			{
			  "$defs": {
			    "NonEmpty": {
			      "description": "a non empty string",
			      "minLength": 1,
			      "title": "NonEmpty",
			      "type": "string",
			    },
			  },
			  "$ref": "#/$defs/NonEmpty",
			  "$schema": "http://json-schema.org/draft-07/schema#",
			}
		`)

		expect(JSONSchema.make(NonEmpty.annotations({ jsonSchema: { foo: 'bar' } }))).not.toEqual(
			JSONSchema.make(NonEmpty),
		)

		// custom annotations

		expect(
			JSONSchema.make(
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
			  "$defs": {
			    "NonEmpty": {
			      "description": "custom description",
			      "examples": [
			        "custom example",
			      ],
			      "foo": "bar",
			      "title": "custom title",
			      "type": "string",
			    },
			  },
			  "$ref": "#/$defs/NonEmpty",
			  "$schema": "http://json-schema.org/draft-07/schema#",
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
			<A extends string>(annotations?: Schema.Annotations.Filter<A>) =>
			<I, R>(self: Schema.Schema<A, I, R>): Schema.Schema<A, I, R> =>
				self.pipe(
					Schema.filter((a): a is A => a === a.trim(), {
						typeId: Schema.TrimmedSchemaId,
						description: 'a string with no leading or trailing whitespace',
						...annotations,
					}),
				)

		/**
		 * @category string constructors
		 * @since 1.0.0
		 */
		const Trimmed = Schema.String.pipe(
			trimmed({
				identifier: 'Trimmed',
				title: 'Trimmed',
			}),
		)

		// default annotations
		expect(JSONSchema.make(Schema.encodedSchema(Trimmed))).toMatchInlineSnapshot(`
			{
			  "$defs": {
			    "Trimmed": {
			      "type": "string",
			    },
			  },
			  "$ref": "#/$defs/Trimmed",
			  "$schema": "http://json-schema.org/draft-07/schema#",
			}
		`)

		// custom annotations
		expect(
			JSONSchema.make(
				Schema.encodedSchema(
					Trimmed.annotations({
						title: 'custom title',
						description: 'custom description',
						examples: ['custom example'],
					}),
				),
			),
		).toMatchInlineSnapshot(`
			{
			  "$defs": {
			    "Trimmed": {
			      "type": "string",
			    },
			  },
			  "$ref": "#/$defs/Trimmed",
			  "$schema": "http://json-schema.org/draft-07/schema#",
			}
		`)

		const Trim = Schema.transform(Schema.String, Trimmed, {
			decode: (s) => s.trim(),
			encode: identity,
		}).annotations({ identifier: 'Trim' })

		// default annotations
		expect(JSONSchema.make(Schema.encodedSchema(Trim))).toMatchInlineSnapshot(`
			{
			  "$defs": {
			    "Trim": {
			      "type": "string",
			    },
			  },
			  "$ref": "#/$defs/Trim",
			  "$schema": "http://json-schema.org/draft-07/schema#",
			}
		`)
	})
})
