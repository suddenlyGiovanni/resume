import * as jsonSchema from '@effect/schema/JSONSchema'
import * as S from '@effect/schema/Schema'
import { describe, expect, test } from 'vitest'

import { UrlString } from './url-string.js'

type UrlDescriptionTuple = [url: string, description: string]
type UrlDescriptionTupleArray = readonly UrlDescriptionTuple[]

describe('UrlString', () => {
	describe('decode', () => {
		const parse = S.decodeUnknownSync(UrlString)

		test('empty string', () => {
			expect(() => parse('')).toThrow('Invalid URL string')
		})

		test.each([
			['', 'Empty string'],
			[' ', 'Whitespace'],
			['\t', 'Tab'],
			['\n', 'Newline'],
			['\r', 'Carriage return'],
			['facebook.example.com', 'Without protocol'],
			['http//facebook.example.com', 'Missing colon in protocol'],
			['http:/#', 'Only fragment identifier'],
			['http://', 'No domain or path'],
			['example.com', 'Without http:// or https://'],
			// ['http:/facebook.example.com', 'One slash in protocol'],
			// ['http://facebook.example.c', 'Top level domain less than two characters'],
			// ['http://example', 'Without top level domain'],
			// ['http://example.', 'Domain name ends with a dot'],
			// ['http://.com', 'Missing hostname'],
		] satisfies UrlDescriptionTupleArray)('invalid URL: "%s" => reason "%s"', invalidUrl => {
			expect(() => parse(invalidUrl)).toThrow('Invalid URL string')
		})

		test.each([
			['https://facebook.example.com', 'HTTPS URL'],
			['http://facebook.example.com', 'HTTP URL'],
			['ftp://facebook.example.com', 'FTP URL'],
			['http://127.0.0.1', 'Local IP address'],
			['http://example.com?foo=bar&baz=qux', 'With query parameters'],
			['https://example.com/#section', 'With fragment identifier'],
			['http://example.com:8080', 'With port number'],
			['http://🍌🍌🍌.ws', 'Punycode encoded URL (Actual domain is xn--qeiaa.ws)'],
			['https://www.übercool.de', 'Internationalized URL'],
		] satisfies UrlDescriptionTupleArray)('valid URL: "%s" => reason "%s"', validUrl => {
			expect(() => parse(validUrl)).not.toThrow()
		})
	})

	describe('JSONSchema', () => {
		const AnnotatedUrlString = UrlString.annotations({
			title: 'URL TITLE',
			description: 'URL DESCRIPTION',
			examples: ['URL EXAMPLE'],
		})

		test('naked', () => {
			expect(JSON.stringify(jsonSchema.make(UrlString), null, '\t')).toMatchInlineSnapshot(`
				"{
					"$schema": "http://json-schema.org/draft-07/schema#",
					"$ref": "#/$defs/UrlString",
					"description": "a string that fulfills the URL requirements (as per RFC 3986)",
					"format": "uri",
					"$defs": {
						"UrlString": {
							"type": "string",
							"description": "URL string that fulfills the URL requirements (as per RFC 3986)",
							"title": "url",
							"examples": [
								"https://example.com",
								"https://example.com/#section",
								"http://example.com:8080",
								"http://🍌🍌🍌.ws",
								"https://www.übercool.de"
							]
						}
					}
				}"
			`)

			expect(
				JSON.stringify(jsonSchema.make(AnnotatedUrlString), null, '\t'),
			).toMatchInlineSnapshot(`
				"{
					"$schema": "http://json-schema.org/draft-07/schema#",
					"$ref": "#/$defs/UrlString",
					"description": "URL DESCRIPTION",
					"title": "URL TITLE",
					"examples": [
						"URL EXAMPLE"
					],
					"format": "uri",
					"$defs": {
						"UrlString": {
							"type": "string",
							"description": "URL string that fulfills the URL requirements (as per RFC 3986)",
							"title": "url",
							"examples": [
								"https://example.com",
								"https://example.com/#section",
								"http://example.com:8080",
								"http://🍌🍌🍌.ws",
								"https://www.übercool.de"
							]
						}
					}
				}"
			`)
		})

		test('with encodedSchema', () => {
			expect(
				JSON.stringify(jsonSchema.make(S.encodedSchema(UrlString)), null, '\t'),
			).toMatchInlineSnapshot(`
				"{
					"$schema": "http://json-schema.org/draft-07/schema#",
					"$ref": "#/$defs/UrlString",
					"$defs": {
						"UrlString": {
							"type": "string",
							"description": "URL string that fulfills the URL requirements (as per RFC 3986)",
							"title": "url",
							"examples": [
								"https://example.com",
								"https://example.com/#section",
								"http://example.com:8080",
								"http://🍌🍌🍌.ws",
								"https://www.übercool.de"
							]
						}
					}
				}"
			`)

			expect(
				JSON.stringify(jsonSchema.make(S.encodedSchema(AnnotatedUrlString)), null, '\t'),
			).toMatchInlineSnapshot(`
				"{
					"$schema": "http://json-schema.org/draft-07/schema#",
					"$ref": "#/$defs/UrlString",
					"$defs": {
						"UrlString": {
							"type": "string",
							"description": "URL string that fulfills the URL requirements (as per RFC 3986)",
							"title": "url",
							"examples": [
								"https://example.com",
								"https://example.com/#section",
								"http://example.com:8080",
								"http://🍌🍌🍌.ws",
								"https://www.übercool.de"
							]
						}
					}
				}"
			`)
		})

		test('with typeSchema', () => {
			expect(
				JSON.stringify(jsonSchema.make(S.typeSchema(UrlString)), null, '\t'),
			).toMatchInlineSnapshot(`
				"{
					"$schema": "http://json-schema.org/draft-07/schema#",
					"$ref": "#/$defs/UrlString",
					"description": "a string that fulfills the URL requirements (as per RFC 3986)",
					"format": "uri",
					"$defs": {
						"UrlString": {
							"type": "string",
							"description": "URL string that fulfills the URL requirements (as per RFC 3986)",
							"title": "url",
							"examples": [
								"https://example.com",
								"https://example.com/#section",
								"http://example.com:8080",
								"http://🍌🍌🍌.ws",
								"https://www.übercool.de"
							]
						}
					}
				}"
			`)

			expect(
				JSON.stringify(jsonSchema.make(S.typeSchema(AnnotatedUrlString)), null, '\t'),
			).toMatchInlineSnapshot(`
				"{
					"$schema": "http://json-schema.org/draft-07/schema#",
					"$ref": "#/$defs/UrlString",
					"description": "URL DESCRIPTION",
					"title": "URL TITLE",
					"examples": [
						"URL EXAMPLE"
					],
					"format": "uri",
					"$defs": {
						"UrlString": {
							"type": "string",
							"description": "URL string that fulfills the URL requirements (as per RFC 3986)",
							"title": "url",
							"examples": [
								"https://example.com",
								"https://example.com/#section",
								"http://example.com:8080",
								"http://🍌🍌🍌.ws",
								"https://www.übercool.de"
							]
						}
					}
				}"
			`)
		})
	})
})
