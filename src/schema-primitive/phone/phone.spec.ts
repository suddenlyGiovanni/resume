import * as jsonSchema from '@effect/schema/JSONSchema'
import * as S from '@effect/schema/Schema'
import { describe, expect, test } from 'vitest'

import { Phone } from './phone.ts'

describe('Phone', () => {
	describe('decode', () => {
		const parse = S.decodeUnknownSync(Phone)

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
	})

	describe('JSONSchema', () => {
		test('naked', () => {
			expect(
				JSON.stringify(jsonSchema.make(S.encodedSchema(Phone)), null, '\t'),
			).toMatchInlineSnapshot(`
			"{
				"$schema": "http://json-schema.org/draft-07/schema#",
				"type": "string",
				"description": "a string",
				"title": "string"
			}"
		`)
		})

		test('encodedSchema', () => {
			expect(JSON.stringify(jsonSchema.make(Phone), null, '\t')).toMatchInlineSnapshot(`
				"{
					"$schema": "http://json-schema.org/draft-07/schema#",
					"type": "string",
					"description": "Phone number that can be coveted to a valid E.164 format",
					"title": "Phone",
					"minLength": 1,
					"examples": [
						"+4907121172923",
						"+441632960961",
						"+353861234567",
						"00353861234567",
						"+39 02 1234567",
						"+1-800-123-4567",
						"+1 800 123 4567",
						"+49 (0) 216 554 1036"
					],
					"pattern": "^\\\\+[1-9]\\\\d{1,14}$"
				}"
			`)
		})
	})
})
