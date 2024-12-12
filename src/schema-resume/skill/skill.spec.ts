import { JSONSchema, Schema } from 'effect'
import { describe, expect, test } from 'vitest'

import { Skill } from './skill.js'

describe('Skill', () => {
	const skillInput = {
		keywords: ['Rust', 'Java', 'Scala'],
		level: 'Wizard',
		name: 'Web Development',
	} satisfies typeof Skill.Type

	const required = {
		keywords: skillInput.keywords,
		name: skillInput.name,
	}

	describe('decode', () => {
		const parse = Schema.decodeUnknownSync(Skill)

		test('handle missing partial properties', () => {
			expect(() => parse({ ...required })).not.toThrow()
		})

		test('name', () => {
			expect(() => parse({ ...required, name: '' })).toThrow()
			expect(() => parse({ ...required, name: ' ' })).toThrow()
			expect(() => parse({ ...required, name: 'Baking' })).not.toThrow()
		})

		test('keywords', () => {
			expect(() => parse({ ...required, keywords: [] })).not.toThrow()
			expect(() => parse({ ...required, keywords: [''] })).toThrow()
			expect(() => parse({ ...required, keywords: [' '] })).toThrow()
			expect(() => parse({ ...required, keywords: ['foo', 'bar', 'baz'] })).not.toThrow()
		})

		test('level', () => {
			expect(() => parse({ ...required, level: '' })).toThrow()
			expect(() => parse({ ...required, level: ' ' })).toThrow()
			expect(() => parse({ ...required, level: 'Jesus' })).not.toThrow()
		})
	})

	test('JSONSchema', async () => {
		await expect(JSON.stringify(JSONSchema.make(Skill), null, '\t')).toMatchFileSnapshot(
			'skill-schema.snapshot.json',
		)
	})
})
