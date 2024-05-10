import * as JSONSchema from '@effect/schema/JSONSchema'
import * as S from '@effect/schema/Schema'
import { describe, expect, test } from 'vitest'

import { ISODateString } from './iso-date-string.js'

describe('ISODateString', () => {
	describe('decode', () => {
		const parse = S.decodeUnknownSync(ISODateString)
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
				"pattern": "^[0-9]{4}-((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01])|(0[469]|11)-(0[1-9]|[12][0-9]|30)|(02)-(0[1-9]|[12][0-9]))T(0[0-9]|1[0-9]|2[0-3]):(0[0-9]|[1-5][0-9]):(0[0-9]|[1-5][0-9])\\\\.[0-9]{3}Z$"
			}"
		`)
	})
})
