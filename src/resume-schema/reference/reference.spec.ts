import * as JSONSchema from '@effect/schema/JSONSchema'
import * as S from '@effect/schema/Schema'
import { describe, expect, test } from 'vitest'

import { Reference } from './reference.js'

describe('Reference', () => {
	const referenceInput = {
		name: 'Timothy Cook',
		reference:
			'Joe blogs was a great employee, who turned up to work at least once a week. He exceeded my expectations when it came to doing nothing.',
	} satisfies S.Schema.Type<typeof Reference>

	describe('decode', () => {
		const parse = S.decodeUnknownSync(Reference)

		test('name', () => {
			expect(() => parse({ name: '' })).toThrow()
			expect(() => parse({ name: '  ' })).toThrow()
			expect(() => parse({ name: referenceInput.name })).not.toThrow()
		})

		test('reference', () => {
			expect(() => parse({ name: referenceInput.name, reference: '' })).toThrow()
			expect(() => parse({ name: referenceInput.name, reference: '  ' })).toThrow()
			expect(() =>
				parse({ name: referenceInput.name, reference: referenceInput.reference }),
			).not.toThrow()
		})
	})

	test('JSONSchema', () => {
		const jsonSchema = JSONSchema.make(S.encodedSchema(Reference))
		const serializedJsonSchema = JSON.stringify(jsonSchema, null, '\t')
		expect(serializedJsonSchema).toMatchFileSnapshot('reference-schema.snapshot.json')
	})
})
