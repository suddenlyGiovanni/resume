import { JSONSchema, Schema } from 'effect'
import { describe, expect, test } from 'vitest'

import { ISODateString } from './iso-date-string.js'

describe('ISODateString', () => {
	describe('decode', () => {
		const parse = Schema.decodeUnknownSync(ISODateString)
		test('empty string', () => {
			expect(() => parse('')).toThrow()
		})

		test('YYYY-MM-DD', () => {
			expect(() => parse('2012-04-05')).toThrow()
		})

		test('YYYY-MM-DDTHH:MM:SS.sssZ', () => {
			expect(() => parse('2012-04-05T14:13:38.988Z')).not.toThrow()
			expect(() => parse('2024-03-11T14:13:38.988Z')).not.toThrow()
		})
	})

	test('JSONSchema', () => {
		const jsonSchema = JSONSchema.make(ISODateString)
		const serializedJsonSchema = JSON.stringify(jsonSchema, null, '\t')
		expect(serializedJsonSchema).toMatchInlineSnapshot(`
			"{
				"$schema": "http://json-schema.org/draft-07/schema#",
				"type": "string",
				"description": "a string that will be trimmed"
			}"
		`)
	})
})
