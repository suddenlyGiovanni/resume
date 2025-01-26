import { JSONSchema, Schema } from 'effect'
import { Either } from 'effect'
import { describe, expect, test } from 'vitest'

import { StringDate } from './string-date.ts'

describe('StringDate', () => {
	const decode = Schema.decodeEither(StringDate)
	test('YYYY-MM-DD', () => {
		expect(Either.getOrThrow(decode('1969-12-31'))).toBe('1969-12-31')
		expect(decode('1969-13-31')).toMatchInlineSnapshot(`
				{
				  "_id": "Either",
				  "_tag": "Left",
				  "left": {
				    "_id": "ParseError",
				    "message": "expected a sting date 'YYYY-MM-DD', got '1969-13-31'",
				  },
				}
			`)
		expect(decode('1969-10-32')).toMatchInlineSnapshot(`
				{
				  "_id": "Either",
				  "_tag": "Left",
				  "left": {
				    "_id": "ParseError",
				    "message": "expected a sting date 'YYYY-MM-DD', got '1969-10-32'",
				  },
				}
			`)
		expect(decode('1969-12-31T23:59:59.999')).toMatchInlineSnapshot(`
			{
			  "_id": "Either",
			  "_tag": "Left",
			  "left": {
			    "_id": "ParseError",
			    "message": "expected a sting date 'YYYY-MM-DD', got '1969-12-31T23:59:59.999'",
			  },
			}
		`)
	})

	describe('JSONSchema', () => {
		const annotatedStringDate = StringDate.annotations({
			title: 'TITLE',
			description: 'DESCRIPTION',
			examples: ['2021-01-01'],
		})

		test('naked', () => {
			expect(JSONSchema.make(StringDate)).toMatchInlineSnapshot(`
				{
				  "$defs": {
				    "StringDate": {
				      "description": "a string that is a valid YYYY-MM-DD date",
				      "format": "date",
				      "maxLength": 10,
				      "minLength": 10,
				      "title": "StringDate",
				      "type": "string",
				    },
				  },
				  "$ref": "#/$defs/StringDate",
				  "$schema": "http://json-schema.org/draft-07/schema#",
				}
			`)

			expect(JSONSchema.make(annotatedStringDate)).toMatchInlineSnapshot(`
				{
				  "$defs": {
				    "StringDate": {
				      "description": "DESCRIPTION",
				      "examples": [
				        "2021-01-01",
				      ],
				      "format": "date",
				      "maxLength": 10,
				      "minLength": 10,
				      "title": "TITLE",
				      "type": "string",
				    },
				  },
				  "$ref": "#/$defs/StringDate",
				  "$schema": "http://json-schema.org/draft-07/schema#",
				}
			`)
		})

		test('encodedSchema', () => {
			expect(JSONSchema.make(Schema.encodedSchema(StringDate))).toMatchInlineSnapshot(`
				{
				  "$defs": {
				    "StringDate": {
				      "type": "string",
				    },
				  },
				  "$ref": "#/$defs/StringDate",
				  "$schema": "http://json-schema.org/draft-07/schema#",
				}
			`)

			expect(JSONSchema.make(Schema.encodedSchema(StringDate))).toMatchInlineSnapshot(`
				{
				  "$defs": {
				    "StringDate": {
				      "type": "string",
				    },
				  },
				  "$ref": "#/$defs/StringDate",
				  "$schema": "http://json-schema.org/draft-07/schema#",
				}
			`)
		})

		test('typeSchema', () => {
			expect(JSONSchema.make(Schema.typeSchema(StringDate))).toMatchInlineSnapshot(`
				{
				  "$defs": {
				    "StringDate": {
				      "description": "a string that is a valid YYYY-MM-DD date",
				      "format": "date",
				      "maxLength": 10,
				      "minLength": 10,
				      "title": "StringDate",
				      "type": "string",
				    },
				  },
				  "$ref": "#/$defs/StringDate",
				  "$schema": "http://json-schema.org/draft-07/schema#",
				}
			`)

			expect(JSONSchema.make(Schema.typeSchema(annotatedStringDate))).toMatchInlineSnapshot(`
				{
				  "$defs": {
				    "StringDate": {
				      "description": "DESCRIPTION",
				      "examples": [
				        "2021-01-01",
				      ],
				      "format": "date",
				      "maxLength": 10,
				      "minLength": 10,
				      "title": "TITLE",
				      "type": "string",
				    },
				  },
				  "$ref": "#/$defs/StringDate",
				  "$schema": "http://json-schema.org/draft-07/schema#",
				}
			`)
		})
	})
})
