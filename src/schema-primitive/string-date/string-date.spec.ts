import * as jsonSchema from '@effect/schema/JSONSchema'
import * as S from '@effect/schema/Schema'
import * as Either from 'effect/Either'
import { describe, expect, test } from 'vitest'

import { StringDate } from './string-date.js'

describe('StringDate', () => {
	const decode = S.decodeEither(StringDate)
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
			expect(jsonSchema.make(StringDate)).toMatchInlineSnapshot(`
				{
				  "$schema": "http://json-schema.org/draft-07/schema#",
				  "description": "a string that is a valid YYYY-MM-DD date",
				  "format": "date",
				  "maxLength": 10,
				  "minLength": 10,
				  "title": "StringDate",
				  "type": "string",
				}
			`)

			expect(jsonSchema.make(annotatedStringDate)).toMatchInlineSnapshot(`
				{
				  "$schema": "http://json-schema.org/draft-07/schema#",
				  "description": "DESCRIPTION",
				  "examples": [
				    "2021-01-01",
				  ],
				  "format": "date",
				  "maxLength": 10,
				  "minLength": 10,
				  "title": "TITLE",
				  "type": "string",
				}
			`)
		})

		test('encodedSchema', () => {
			expect(jsonSchema.make(S.encodedSchema(StringDate))).toMatchInlineSnapshot(`
				{
				  "$schema": "http://json-schema.org/draft-07/schema#",
				  "description": "a string",
				  "title": "string",
				  "type": "string",
				}
			`)

			expect(jsonSchema.make(S.encodedSchema(StringDate))).toMatchInlineSnapshot(`
				{
				  "$schema": "http://json-schema.org/draft-07/schema#",
				  "description": "a string",
				  "title": "string",
				  "type": "string",
				}
			`)
		})

		test('typeSchema', () => {
			expect(jsonSchema.make(S.typeSchema(StringDate))).toMatchInlineSnapshot(`
				{
				  "$schema": "http://json-schema.org/draft-07/schema#",
				  "description": "a string that is a valid YYYY-MM-DD date",
				  "format": "date",
				  "maxLength": 10,
				  "minLength": 10,
				  "title": "StringDate",
				  "type": "string",
				}
			`)

			expect(jsonSchema.make(S.typeSchema(annotatedStringDate))).toMatchInlineSnapshot(`
				{
				  "$schema": "http://json-schema.org/draft-07/schema#",
				  "description": "DESCRIPTION",
				  "examples": [
				    "2021-01-01",
				  ],
				  "format": "date",
				  "maxLength": 10,
				  "minLength": 10,
				  "title": "TITLE",
				  "type": "string",
				}
			`)
		})
	})
})
