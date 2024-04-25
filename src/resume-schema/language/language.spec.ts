import * as JSONSchema from '@effect/schema/JSONSchema'
import * as S from '@effect/schema/Schema'
import { describe, expect, test } from 'vitest'

import { Language } from './language.ts'

describe('Language', () => {
	const languageInput = {
		fluency: 'Fluent',
		language: 'English',
	} satisfies S.Schema.Type<typeof Language>

	describe('decode', () => {
		const parse = S.decodeUnknownSync(Language)

		test('handle all missing property', () => {
			const input: unknown = {}
			expect(() => parse(input)).not.toThrow()
		})

		test('fluency', () => {
			expect(() => parse({ fluency: '' })).toThrow()
			expect(() => parse({ fluency: '  ' })).toThrow()
			expect(() => parse({ fluency: languageInput.fluency })).not.toThrow()
		})

		test('language', () => {
			expect(() => parse({ language: '' })).toThrow()
			expect(() => parse({ language: '  ' })).toThrow()
			expect(() => parse({ language: languageInput.language })).not.toThrow()
		})
	})

	test('JSONSchema', () => {
		const jsonSchema = JSONSchema.make(S.encodedSchema(Language))
		const serializedJsonSchema = JSON.stringify(jsonSchema, null, '\t')
		expect(serializedJsonSchema).toMatchFileSnapshot('language-schema.snapshot.json')
	})
})
