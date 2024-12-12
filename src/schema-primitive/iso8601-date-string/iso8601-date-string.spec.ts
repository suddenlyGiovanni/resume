import { JSONSchema, Schema } from 'effect'

import { Either, pipe } from 'effect'
import { describe, expect, test } from 'vitest'

import { expectEitherRight } from '../../test/test-utils.js'
import { ISO8601DateString } from './iso8601-date-string.js'

// decode: transform data from an input type `Encoded` to an output type `Type`
// encode: converting data from an output type `Type` back to an input type `Encoded`
describe('ISO8601Date', () => {
	const decode = Schema.decodeEither(ISO8601DateString)

	test('Years', () => {
		const expected = '1970-01-01T00:00:00.000Z'
		expectEitherRight(decode('1970'), expected)
		expect(
			pipe('1970', Schema.decodeSync(ISO8601DateString), Schema.encodeSync(ISO8601DateString)),
		).toEqual(expected)
		expectEitherRight(decode('1'), '2001-01-01T00:00:00.000Z')
		expectEitherRight(decode('01'), '2001-01-01T00:00:00.000Z')
		expectEitherRight(decode('0001'), '0001-01-01T00:00:00.000Z')
		expectEitherRight(decode('0001'), '0001-01-01T00:00:00.000Z')
		expect(() => Schema.decodeSync(ISO8601DateString)('NaN')).toThrow()
	})

	describe('Calendar dates', () => {
		test('YYYY-MM', () => {
			expectEitherRight(decode('1969-12'), '1969-12-01T00:00:00.000Z')
			expect(decode('YYYY-MM')).toMatchInlineSnapshot(`
				{
				  "_id": "Either",
				  "_tag": "Left",
				  "left": {
				    "_id": "ParseError",
				    "message": "ISO8601DateString
				└─ Encoded side transformation failure
				   └─ Date
				      └─ Predicate refinement failure
				         └─ Expected Date, actual Invalid Date",
				  },
				}
			`)
		})

		test('YYYYMM is not spec compliant', () => {
			expectEitherRight(decode('196912'), '+196912-01-01T00:00:00.000Z')
			expect(Either.isLeft(decode('YYYYMM'))).toBe(true)
		})

		test('YYYY-MM-DD', () => {
			expectEitherRight(decode('1969-12-31'), '1969-12-31T00:00:00.000Z')
			expect(Either.isLeft(decode('YYYY-MM-DD'))).toBe(true)
		})

		test('YYYYMMDD is not spec compliant', () => {
			expect(Either.isLeft(decode('19691231'))).toBe(true)
			expect(Either.isLeft(decode('YYYYMMDD'))).toBe(true)
		})

		test('-YY-MM should not be used as the year coercion might surprise you', () => {
			expectEitherRight(decode('-69-12'), '1969-12-01T00:00:00.000Z') // ok!
			expectEitherRight(decode('-01-12'), '2001-01-12T00:00:00.000Z') // ok!
			expectEitherRight(decode('-99-12'), '1999-12-01T00:00:00.000Z') // ok!
			expectEitherRight(decode('-10-12'), '2001-10-12T00:00:00.000Z') // this should have been 2010-12-01
			expectEitherRight(decode('-10-13'), '2001-10-13T00:00:00.000Z') // this should have been an invalid date
			expect(Either.isLeft(decode('-99-13'))) // this raise an error
		})

		test('-YYMM should not be used as the coercion might surprise you', () => {
			expectEitherRight(decode('-6912'), '6912-01-01T00:00:00.000Z') // nope!
		})

		test('--MM-DD should not be used as the year is context dependant and apparently not inferred correctly', () => {
			expectEitherRight(decode('--10-10'), '2001-10-10T00:00:00.000Z') // nope!
		})

		test('--MMDD should be avoided too', () => {
			expectEitherRight(decode('--1010'), '1010-01-01T00:00:00.000Z') // nope! should have been `<current_year>-10-10...`
		})

		test('---DD should be avoided too', () => {
			expect(Either.isLeft(decode('---31'))).toBe(true)
		})
	})

	describe('Times should not be used without specifying also the Calendar dates', () => {
		const yyyyMmDd = '1969-12-31' as const

		test('`Thh:mm:ss.sss` NOT `Thhmmss.sss`', () => {
			expect(Either.isLeft(decode('T23:59:59.999'))).toBe(true) // can't decode time without calendar date
			expectEitherRight(decode(`${yyyyMmDd}T23:59:59.999` as const), `${yyyyMmDd}T23:59:59.999Z`)
			expect(Either.isLeft(decode(`${yyyyMmDd}T235959.999` as const))).toBe(true)
		})

		test('`Thh:mm:ss` NOT `Thhmmss`', () => {
			expectEitherRight(decode(`${yyyyMmDd}T23:59:59` as const), `${yyyyMmDd}T23:59:59.000Z`)
			expect(Either.isLeft(decode(`${yyyyMmDd}T235959` as const))).toBe(true)
		})

		test('`Thh:mm` NOT `Thhmm`', () => {
			expectEitherRight(decode(`${yyyyMmDd}T23:59` as const), `${yyyyMmDd}T23:59:00.000Z`)
			expect(Either.isLeft(decode(`${yyyyMmDd}T2359` as const))).toBe(true)
		})

		describe('Time zone designators', () => {
			const hhMmSsSss = 'T23:59:59.000' as const
			const yyyyMmDdHhMmSsSss = `${yyyyMmDd}${hhMmSsSss}` as const

			test('default to zulu time a.k.a. UTC', () => {
				expectEitherRight(decode(yyyyMmDdHhMmSsSss), `${yyyyMmDd}T23:59:59.000Z`)
			})

			test('Thh:mm:ss.sss±[hh]:[mm]', () => {
				expectEitherRight(decode(`${yyyyMmDdHhMmSsSss}-12:00`), '1970-01-01T11:59:59.000Z')
				expectEitherRight(decode(`${yyyyMmDdHhMmSsSss}-11:00`), '1970-01-01T10:59:59.000Z')
				expectEitherRight(decode(`${yyyyMmDdHhMmSsSss}-10:00`), '1970-01-01T09:59:59.000Z')
				expectEitherRight(decode(`${yyyyMmDdHhMmSsSss}-09:00`), '1970-01-01T08:59:59.000Z')
				expectEitherRight(decode(`${yyyyMmDdHhMmSsSss}-08:00`), '1970-01-01T07:59:59.000Z')
				expectEitherRight(decode(`${yyyyMmDdHhMmSsSss}-07:00`), '1970-01-01T06:59:59.000Z')
				expectEitherRight(decode(`${yyyyMmDdHhMmSsSss}-06:00`), '1970-01-01T05:59:59.000Z')
				expectEitherRight(decode(`${yyyyMmDdHhMmSsSss}-05:00`), '1970-01-01T04:59:59.000Z')
				expectEitherRight(decode(`${yyyyMmDdHhMmSsSss}-04:00`), '1970-01-01T03:59:59.000Z')
				expectEitherRight(decode(`${yyyyMmDdHhMmSsSss}-03:00`), '1970-01-01T02:59:59.000Z')
				expectEitherRight(decode(`${yyyyMmDdHhMmSsSss}-02:00`), '1970-01-01T01:59:59.000Z')
				expectEitherRight(decode(`${yyyyMmDdHhMmSsSss}-01:00`), '1970-01-01T00:59:59.000Z')
				expectEitherRight(decode(`${yyyyMmDdHhMmSsSss}+00:00`), `${yyyyMmDd}T23:59:59.000Z`)
				expectEitherRight(decode(`${yyyyMmDdHhMmSsSss}+01:00`), `${yyyyMmDd}T22:59:59.000Z`)
				expectEitherRight(decode(`${yyyyMmDdHhMmSsSss}+02:00`), `${yyyyMmDd}T21:59:59.000Z`)
				expectEitherRight(decode(`${yyyyMmDdHhMmSsSss}+03:00`), `${yyyyMmDd}T20:59:59.000Z`)
				expectEitherRight(decode(`${yyyyMmDdHhMmSsSss}+04:00`), `${yyyyMmDd}T19:59:59.000Z`)
				expectEitherRight(decode(`${yyyyMmDdHhMmSsSss}+05:00`), `${yyyyMmDd}T18:59:59.000Z`)
				expectEitherRight(decode(`${yyyyMmDdHhMmSsSss}+06:00`), `${yyyyMmDd}T17:59:59.000Z`)
				expectEitherRight(decode(`${yyyyMmDdHhMmSsSss}+07:00`), `${yyyyMmDd}T16:59:59.000Z`)
				expectEitherRight(decode(`${yyyyMmDdHhMmSsSss}+08:00`), `${yyyyMmDd}T15:59:59.000Z`)
				expectEitherRight(decode(`${yyyyMmDdHhMmSsSss}+09:00`), `${yyyyMmDd}T14:59:59.000Z`)
				expectEitherRight(decode(`${yyyyMmDdHhMmSsSss}+10:00`), `${yyyyMmDd}T13:59:59.000Z`)
				expectEitherRight(decode(`${yyyyMmDdHhMmSsSss}+11:00`), `${yyyyMmDd}T12:59:59.000Z`)
				expectEitherRight(decode(`${yyyyMmDdHhMmSsSss}+12:00`), `${yyyyMmDd}T11:59:59.000Z`)
			})

			test('Thh:mm:ss.sss±[hh][mm]', () => {
				expectEitherRight(decode(`${yyyyMmDdHhMmSsSss}+0100`), `${yyyyMmDd}T22:59:59.000Z`)
				expectEitherRight(decode(`${yyyyMmDdHhMmSsSss}-0100`), '1970-01-01T00:59:59.000Z')
			})

			test('Thh:mm:ss.sss±[hh] should not work', () => {
				expect(Either.isLeft(decode(`${yyyyMmDdHhMmSsSss}+01`))).toBe(true)
			})
		})
	})

	describe('JSONSchema', () => {
		const iso8601DateStringAnnotated = ISO8601DateString.annotations({
			title: 'ISO8601Date',
			description:
				'A string ISO 8601 date Schema. Given any string date, it validates it to be a valid input for the Date constructor, and then it converts it to a string in the ISO 8601 format.',
			examples: ['2021-01-01', '2021-01-01T00:00:00.000Z'],
		})

		test('naked', () => {
			expect(JSON.stringify(JSONSchema.make(ISO8601DateString), null, '\t')).toMatchInlineSnapshot(`
				"{
					"$ref": "#/$defs/ISO8601DateString",
					"$schema": "http://json-schema.org/draft-07/schema#",
					"$defs": {
						"ISO8601DateString": {
							"title": "ISO 8601 Date string",
							"description": "A date string conforming to the ISO 8601 format. valid inputs will be converter to fully qualified ISO 8601 strings.",
							"format": "date-time",
							"type": "string"
						}
					}
				}"
			`)

			expect(
				JSON.stringify(JSONSchema.make(iso8601DateStringAnnotated), null, '\t'),
			).toMatchInlineSnapshot(`
				"{
					"$ref": "#/$defs/ISO8601DateString",
					"$schema": "http://json-schema.org/draft-07/schema#",
					"$defs": {
						"ISO8601DateString": {
							"title": "ISO 8601 Date string",
							"description": "A date string conforming to the ISO 8601 format. valid inputs will be converter to fully qualified ISO 8601 strings.",
							"format": "date-time",
							"type": "string"
						}
					}
				}"
			`)
		})

		test('encodedSchema', () => {
			expect(
				JSON.stringify(JSONSchema.make(Schema.encodedSchema(ISO8601DateString)), null, '\t'),
			).toMatchInlineSnapshot(`
				"{
					"$ref": "#/$defs/ISO8601DateString",
					"$schema": "http://json-schema.org/draft-07/schema#",
					"$defs": {
						"ISO8601DateString": {
							"type": "string",
							"description": "a string that will be parsed into a Date"
						}
					}
				}"
			`)

			expect(
				JSON.stringify(
					JSONSchema.make(Schema.encodedSchema(iso8601DateStringAnnotated)),
					null,
					'\t',
				),
			).toMatchInlineSnapshot(`
				"{
					"$ref": "#/$defs/ISO8601DateString",
					"$schema": "http://json-schema.org/draft-07/schema#",
					"$defs": {
						"ISO8601DateString": {
							"type": "string",
							"description": "a string that will be parsed into a Date"
						}
					}
				}"
			`)
		})

		test('typeSchema', () => {
			expect(
				JSON.stringify(JSONSchema.make(Schema.typeSchema(ISO8601DateString)), null, '\t'),
			).toMatchInlineSnapshot(`
				"{
					"type": "string",
					"$schema": "http://json-schema.org/draft-07/schema#"
				}"
			`)

			expect(
				JSON.stringify(JSONSchema.make(Schema.typeSchema(iso8601DateStringAnnotated)), null, '\t'),
			).toMatchInlineSnapshot(`
				"{
					"type": "string",
					"$schema": "http://json-schema.org/draft-07/schema#"
				}"
			`)
		})
	})
})
