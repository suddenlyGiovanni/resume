import { JSONSchema, Schema } from 'effect'
import { describe, expect, test } from 'vitest'

import { Phone } from './phone.js'

describe('PhoneString', () => {
	const parse = Schema.decodeUnknownSync(Phone)

	const validNumbers = [
		{ phone: '+4907121172923', description: 'German number (standard format)' },
		{ phone: '+441632960961', description: 'UK number (standard format)' },
		{ phone: '+353861234567', description: 'Irish number (standard format)' },
		{
			phone: '00353861234567',
			description: 'Irish number with double-zero prefix (alternative format)',
		},
		{ phone: '+39 02 1234567', description: 'Italian number with space as separator' },
		{
			phone: '+1-800-123-4567',
			description: 'US number with hyphen as separator (assuming supported)',
		},
		{
			phone: '+1 800 123 4567',
			description: 'US number with spaces (might be valid depending on logic)',
		},
		{
			phone: '+49 (0) 216 554 1036',
			description: 'German number with parentheses and leading zero',
		},
		{
			phone: '+39021234567',
			description: 'Italian number without space (might be valid depending on logic)',
		},
	]

	const invalidNumbers = [
		{ phone: '', description: 'Empty string' },
		{ phone: ' ', description: 'Whitespace' },
		// { phone: '+1234567890', description: 'Non-standard phone number (missing country code)' },
		{ phone: '123456', description: 'Too short' },
		{ phone: 'abcdefghijk', description: 'Non-numeric characters' },
	]

	test.each(validNumbers)('parse valid phone number $phone ($description)', ({ phone }) => {
		expect(() => parse(phone)).not.toThrow()
	})

	test.each(invalidNumbers)('throws for invalid number $phone ($description)', ({ phone }) => {
		expect(() => parse(phone)).toThrow()
	})

	describe('JSONSchema', () => {
		describe('naked', () => {
			test('with no annotations', () => {
				expect(JSONSchema.make(Phone)).toMatchInlineSnapshot(`
				{
				  "$schema": "http://json-schema.org/draft-07/schema#",
				  "description": "a phone number conforming to the E.164 format standard",
				  "examples": [
				    "+4907121172923",
				    "+441632960961",
				    "+353861234567",
				    "00353861234567",
				    "+39 02 1234567",
				    "+1-800-123-4567",
				    "+1 800 123 4567",
				    "+49 (0) 216 554 1036",
				  ],
				  "pattern": "^\\+[1-9]\\d{1,14}$",
				  "title": "PhoneString",
				  "type": "string",
				}
			`)
			})

			test('with custom annotations', () => {
				expect(
					JSONSchema.make(
						Phone.annotations({
							title: 'TITLE',
							description: 'DESCRIPTION',
						}),
					),
				).toMatchInlineSnapshot(`
					{
					  "$schema": "http://json-schema.org/draft-07/schema#",
					  "description": "DESCRIPTION",
					  "examples": [
					    "+4907121172923",
					    "+441632960961",
					    "+353861234567",
					    "00353861234567",
					    "+39 02 1234567",
					    "+1-800-123-4567",
					    "+1 800 123 4567",
					    "+49 (0) 216 554 1036",
					  ],
					  "pattern": "^\\+[1-9]\\d{1,14}$",
					  "title": "TITLE",
					  "type": "string",
					}
				`)
			})
		})

		test('encodedSchema', () => {
			expect(JSONSchema.make(Schema.encodedSchema(Phone))).toMatchInlineSnapshot(`
				{
				  "$schema": "http://json-schema.org/draft-07/schema#",
				  "type": "string",
				}
			`)
		})

		test('typedSchema', () => {
			expect(JSONSchema.make(Schema.typeSchema(Phone))).toMatchInlineSnapshot(`
				{
				  "$schema": "http://json-schema.org/draft-07/schema#",
				  "description": "a phone number conforming to the E.164 format standard",
				  "examples": [
				    "+4907121172923",
				    "+441632960961",
				    "+353861234567",
				    "00353861234567",
				    "+39 02 1234567",
				    "+1-800-123-4567",
				    "+1 800 123 4567",
				    "+49 (0) 216 554 1036",
				  ],
				  "pattern": "^\\+[1-9]\\d{1,14}$",
				  "title": "PhoneString",
				  "type": "string",
				}
			`)
		})
	})
})
