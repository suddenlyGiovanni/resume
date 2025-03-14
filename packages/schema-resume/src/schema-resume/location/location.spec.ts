import { JSONSchema, Schema } from 'effect'
import { describe, expect, test } from 'vitest'

import { Location } from './location.ts'

describe('Location', () => {
	const locationInput = {
		address: '1234 Glücklichkeit Straße Hinterhaus 5. Etage li.',
		city: 'Berlin',
		countryCode: 'DE',
		postalCode: '10999',
		region: 'California',
	} satisfies typeof Location.Type

	const required: typeof Location.Type = {
		countryCode: locationInput.countryCode,
		city: locationInput.city,
	}

	describe('decode', () => {
		const parse = Schema.decodeUnknownSync(Location)

		test('handle all missing property', () => {
			const input: unknown = { ...required }
			expect(() => parse(input)).not.toThrow()
		})

		test('address', () => {
			expect(() => parse({ ...required, address: '' })).toThrow()
			expect(() => parse({ ...required, address: '  ' })).toThrow()
			expect(() => parse({ ...required, address: '   Booger Hollow Road 69' })).not.toThrow()
		})

		test('city', () => {
			expect(() => parse({ ...required, city: '' })).toThrow()
			expect(() => parse({ ...required, city: '  ' })).toThrow()
			expect(() => parse({ ...required, city: 'Constantinople' })).not.toThrow()
		})

		test('countryCode', () => {
			expect(() => parse({ ...required, countryCode: '' })).toThrow()
			expect(() => parse({ ...required, countryCode: '  ' })).toThrow()
			expect(() => parse({ ...required, countryCode: 'D' })).toThrow()
			expect(() => parse({ ...required, countryCode: 'DEUTSCHLAND' })).toThrow()
			expect(() => parse({ ...required, countryCode: 'de' })).toThrow()
			expect(() => parse({ ...required, countryCode: 'AU' })).not.toThrow()
		})

		test('postalCode', () => {
			expect(() => parse({ ...required, postalCode: '' })).toThrow()
			expect(() => parse({ ...required, postalCode: '  ' })).toThrow()
			// expect(() => parse({ postalCode: 'ABCS' })).toThrow()
			expect(() => parse({ ...required, postalCode: '90210' })).not.toThrow()
		})

		test('region', () => {
			expect(() => parse({ ...required, region: '' })).toThrow()
			expect(() => parse({ ...required, region: '  ' })).toThrow()
			expect(() => parse({ ...required, region: 'Mississippi' })).not.toThrow()
		})
	})

	describe('JSONSchema', () => {
		test('encodedSchema', () => {
			expect(JSONSchema.make(Schema.encodedSchema(Location))).toMatchInlineSnapshot(`
				{
				  "$defs": {
				    "NonEmptyTrimmedString": {
				      "type": "string",
				    },
				    "TrimmedNonEmpty": {
				      "type": "string",
				    },
				    "countryCode": {
				      "type": "string",
				    },
				  },
				  "$schema": "http://json-schema.org/draft-07/schema#",
				  "additionalProperties": false,
				  "properties": {
				    "address": {
				      "$ref": "#/$defs/TrimmedNonEmpty",
				    },
				    "city": {
				      "$ref": "#/$defs/NonEmptyTrimmedString",
				    },
				    "countryCode": {
				      "$ref": "#/$defs/countryCode",
				    },
				    "postalCode": {
				      "$ref": "#/$defs/NonEmptyTrimmedString",
				    },
				    "region": {
				      "$ref": "#/$defs/NonEmptyTrimmedString",
				    },
				  },
				  "required": [
				    "city",
				    "countryCode",
				  ],
				  "type": "object",
				}
			`)
		})

		test('naked', async () => {
			await expect(JSON.stringify(JSONSchema.make(Location), null, '\t')).toMatchFileSnapshot(
				'location-schema.snapshot.json',
			)
		})
	})
})
