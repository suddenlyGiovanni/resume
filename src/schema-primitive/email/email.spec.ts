import * as jsonSchema from '@effect/schema/JSONSchema'
import * as S from '@effect/schema/Schema'
import { describe, expect, test } from 'vitest'

import { Email } from './email.ts'

describe('Email', () => {
	describe('decode', () => {
		const parse = S.decodeUnknownSync(Email)

		test('empty string', () => {
			expect(() => parse('')).toThrow()
		})

		test.todo('white spacing padded email string', () => {
			// Do we want to trim the email string?
			expect(parse('  testemail@test.com  ')).toEqual('testemail@test.com')
		})

		test('invalid email', () => {
			expect(() => parse('testemail')).toThrow()
			expect(() => parse('abc.def@')).toThrow()
			expect(() => parse('@another-email.com')).toThrow()
			expect(() => parse('MISSING_DOMAIN_NAME@.com')).toThrow()
			expect(() => parse('@onlydomain.com')).toThrow()
			expect(() => parse('email@domain')).toThrow()
			expect(() => parse('justastring')).toThrow()
			expect(() => parse('missing@.dot')).toThrow()
			expect(() => parse('no@multiple..dots')).toThrow()
			expect(() => parse('@.com')).toThrow()
		})

		test('valid email', () => {
			expect(() => parse('testemail@test.com')).not.toThrow()
			expect(() => parse('abc.def@subdomain.domain.com')).not.toThrow()
			expect(() => parse('another-email@test.co.uk')).not.toThrow()
			expect(() => parse('EMAIL_WORKS@testserver.NET')).not.toThrow()
			expect(() => parse('1234567890@1234567890.com')).not.toThrow()
		})
	})

	describe('JSONSchema', () => {
		const AnnotatedEmail = Email.annotations({
			title: 'EMAIL TITLE',
			description: 'EMAIL DESCRIPTION',
			examples: ['EMAIL EXAMPLE'],
		})

		test('naked', () => {
			expect(JSON.stringify(jsonSchema.make(Email), null, '\t')).toMatchInlineSnapshot(`
				"{
					"$schema": "http://json-schema.org/draft-07/schema#",
					"$ref": "#/$defs/Email",
					"description": "Email address",
					"pattern": "^(?!\\\\.)(?!.*\\\\.\\\\.)([A-Z0-9_+-.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9-]*\\\\.)+[A-Z]{2,}$",
					"format": "email",
					"$defs": {
						"Email": {
							"type": "string",
							"description": "Email address",
							"title": "email",
							"examples": [
								"<local-part>@<domain>",
								"foo@bar.com",
								"foo.bar@baz.com"
							]
						}
					}
				}"
			`)

			expect(JSON.stringify(jsonSchema.make(AnnotatedEmail), null, '\t')).toMatchInlineSnapshot(`
				"{
					"$schema": "http://json-schema.org/draft-07/schema#",
					"$ref": "#/$defs/Email",
					"description": "EMAIL DESCRIPTION",
					"pattern": "^(?!\\\\.)(?!.*\\\\.\\\\.)([A-Z0-9_+-.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9-]*\\\\.)+[A-Z]{2,}$",
					"title": "EMAIL TITLE",
					"examples": [
						"EMAIL EXAMPLE"
					],
					"format": "email",
					"$defs": {
						"Email": {
							"type": "string",
							"description": "Email address",
							"title": "email",
							"examples": [
								"<local-part>@<domain>",
								"foo@bar.com",
								"foo.bar@baz.com"
							]
						}
					}
				}"
			`)
		})

		test('with encodedSchema', () => {
			expect(
				JSON.stringify(jsonSchema.make(S.encodedSchema(Email)), null, '\t'),
			).toMatchInlineSnapshot(`
				"{
					"$schema": "http://json-schema.org/draft-07/schema#",
					"$ref": "#/$defs/Email",
					"$defs": {
						"Email": {
							"type": "string",
							"description": "Email address",
							"title": "email",
							"examples": [
								"<local-part>@<domain>",
								"foo@bar.com",
								"foo.bar@baz.com"
							]
						}
					}
				}"
			`)

			expect(
				JSON.stringify(jsonSchema.make(S.encodedSchema(AnnotatedEmail)), null, '\t'),
			).toMatchInlineSnapshot(`
				"{
					"$schema": "http://json-schema.org/draft-07/schema#",
					"$ref": "#/$defs/Email",
					"$defs": {
						"Email": {
							"type": "string",
							"description": "Email address",
							"title": "email",
							"examples": [
								"<local-part>@<domain>",
								"foo@bar.com",
								"foo.bar@baz.com"
							]
						}
					}
				}"
			`)
		})

		test('with typeSchema', () => {
			expect(
				JSON.stringify(jsonSchema.make(S.typeSchema(Email)), null, '\t'),
			).toMatchInlineSnapshot(`
				"{
					"$schema": "http://json-schema.org/draft-07/schema#",
					"$ref": "#/$defs/Email",
					"description": "Email address",
					"pattern": "^(?!\\\\.)(?!.*\\\\.\\\\.)([A-Z0-9_+-.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9-]*\\\\.)+[A-Z]{2,}$",
					"format": "email",
					"$defs": {
						"Email": {
							"type": "string",
							"description": "Email address",
							"title": "email",
							"examples": [
								"<local-part>@<domain>",
								"foo@bar.com",
								"foo.bar@baz.com"
							]
						}
					}
				}"
			`)

			expect(
				JSON.stringify(jsonSchema.make(S.typeSchema(AnnotatedEmail)), null, '\t'),
			).toMatchInlineSnapshot(`
				"{
					"$schema": "http://json-schema.org/draft-07/schema#",
					"$ref": "#/$defs/Email",
					"description": "EMAIL DESCRIPTION",
					"pattern": "^(?!\\\\.)(?!.*\\\\.\\\\.)([A-Z0-9_+-.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9-]*\\\\.)+[A-Z]{2,}$",
					"title": "EMAIL TITLE",
					"examples": [
						"EMAIL EXAMPLE"
					],
					"format": "email",
					"$defs": {
						"Email": {
							"type": "string",
							"description": "Email address",
							"title": "email",
							"examples": [
								"<local-part>@<domain>",
								"foo@bar.com",
								"foo.bar@baz.com"
							]
						}
					}
				}"
			`)
		})
	})
})
