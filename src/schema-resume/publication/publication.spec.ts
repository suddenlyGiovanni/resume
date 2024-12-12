import { JSONSchema, Schema } from 'effect'
import { describe, expect, test } from 'vitest'

import { Publication } from './publication.js'

describe('Publication', () => {
	const publicationInput = {
		name: 'The World Wide Web',
		publisher: 'IEEE, Computer Magazine',
		releaseDate: '2022-04-05',
		summary: 'Discussion of the World Wide Web, HTTP, HTML',
		url: 'http://www.computer.org.example.com/csdl/mags/co/1996/10/rx069-abs.html',
	} satisfies typeof Publication.Type

	describe('decode', () => {
		const parse = Schema.decodeUnknownSync(Publication)

		test('handle all missing property', () => {
			const input: unknown = {}
			expect(() => parse(input)).not.toThrow()
		})

		test('name', () => {
			expect(() => parse({ name: '' })).toThrow()
			expect(() => parse({ name: '  ' })).toThrow()
			expect(() => parse({ name: publicationInput.name })).not.toThrow()
		})

		test('publisher', () => {
			expect(() => parse({ publisher: '' })).toThrow()
			expect(() => parse({ publisher: '  ' })).toThrow()
			expect(() => parse({ publisher: publicationInput.publisher })).not.toThrow()
		})

		test('releaseDate', () => {
			expect(() => parse({ releaseDate: '' })).toThrow()
			expect(() => parse({ releaseDate: '  ' })).toThrow()
			expect(() => parse({ releaseDate: publicationInput.releaseDate })).not.toThrow()
		})

		test('summary', () => {
			expect(() => parse({ summary: '' })).toThrow()
			expect(() => parse({ summary: '  ' })).toThrow()
			expect(() => parse({ summary: publicationInput.summary })).not.toThrow()
		})

		test('url', () => {
			expect(() => parse({ url: '' })).toThrow()
			expect(() => parse({ url: '  ' })).toThrow()
			expect(() => parse({ url: publicationInput.url })).not.toThrow()
		})
	})

	test('JSONSchema', async () => {
		await expect(JSON.stringify(JSONSchema.make(Publication), null, '\t')).toMatchFileSnapshot(
			'publication-schema.snapshot.json',
		)
	})
})
