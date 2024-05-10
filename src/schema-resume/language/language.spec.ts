import { JSONSchema, Schema } from '@effect/schema'

import { describe, expect, test } from 'vitest'

import { Language } from './language.js'

describe('Language', () => {
	const languageInput = {
		fluency: 'Fluent',
		language: 'English',
	} satisfies typeof Language.Type

	describe('decode', () => {
		const parse = Schema.decodeUnknownSync(Language)

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
		expect(JSON.stringify(JSONSchema.make(Language), null, '\t')).toMatchFileSnapshot(
			'language-schema.snapshot.json',
		)
	})
})
