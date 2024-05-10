import { JSONSchema, Schema } from '@effect/schema'
import { describe, expect, test } from 'vitest'

import { Email } from './email.js'

describe('Email', () => {
	describe('decode', () => {
		const parse = Schema.decodeUnknownSync(Email)

		test('empty string', () => {
			expect(() => parse('')).toThrow()
		})

		test('white spacing padded email string', () => {
			// Do we want to trim the email string?
			expect(() => parse('  testemail@test.com  ')).toThrow()
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
			expect(parse('testemail@test.com')).toEqual('testemail@test.com')
			expect(parse('abc.def@subdomain.domain.com')).toEqual('abc.def@subdomain.domain.com')
			expect(parse('another-email@test.co.uk')).toEqual('another-email@test.co.uk')
			expect(parse('EMAIL_WORKS@testserver.NET')).toEqual('EMAIL_WORKS@testserver.NET')
			expect(parse('1234567890@1234567890.com')).toEqual('1234567890@1234567890.com')
		})
	})

	describe('JSONSchema', () => {
		const AnnotatedEmail = Email.annotations({
			title: 'EMAIL TITLE',
			description: 'EMAIL DESCRIPTION',
			examples: ['EMAIL EXAMPLE'],
		})

		test('naked', () => {
			expect(JSONSchema.make(Email)).toMatchInlineSnapshot(`
				{
				  "$schema": "http://json-schema.org/draft-07/schema#",
				  "description": "an Email address string matching the pattern ^(?!\\.)(?!.*\\.\\.)([A-Z0-9_+-.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9-]*\\.)+[A-Z]{2,}$",
				  "examples": [
				    "<local-part>@<domain>",
				    "foo@bar.com",
				    "foo.bar@baz.com",
				  ],
				  "format": "email",
				  "pattern": "^(?!\\.)(?!.*\\.\\.)([A-Z0-9_+-.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9-]*\\.)+[A-Z]{2,}$",
				  "title": "Email",
				  "type": "string",
				}
			`)

			expect(JSONSchema.make(AnnotatedEmail)).toMatchInlineSnapshot(`
				{
				  "$schema": "http://json-schema.org/draft-07/schema#",
				  "description": "EMAIL DESCRIPTION",
				  "examples": [
				    "EMAIL EXAMPLE",
				  ],
				  "format": "email",
				  "pattern": "^(?!\\.)(?!.*\\.\\.)([A-Z0-9_+-.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9-]*\\.)+[A-Z]{2,}$",
				  "title": "EMAIL TITLE",
				  "type": "string",
				}
			`)
		})

		test('with encodedSchema', () => {
			expect(
				JSON.stringify(JSONSchema.make(Schema.encodedSchema(Email)), null, '\t'),
			).toMatchInlineSnapshot(`
				"{
					"$schema": "http://json-schema.org/draft-07/schema#",
					"type": "string",
					"description": "a string",
					"title": "string"
				}"
			`)

			expect(JSONSchema.make(Schema.encodedSchema(AnnotatedEmail))).toMatchInlineSnapshot(`
				{
				  "$schema": "http://json-schema.org/draft-07/schema#",
				  "description": "a string",
				  "title": "string",
				  "type": "string",
				}
			`)
		})

		test('with typeSchema', () => {
			expect(JSONSchema.make(Schema.typeSchema(Email))).toMatchInlineSnapshot(`
				{
				  "$schema": "http://json-schema.org/draft-07/schema#",
				  "description": "an Email address string matching the pattern ^(?!\\.)(?!.*\\.\\.)([A-Z0-9_+-.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9-]*\\.)+[A-Z]{2,}$",
				  "examples": [
				    "<local-part>@<domain>",
				    "foo@bar.com",
				    "foo.bar@baz.com",
				  ],
				  "format": "email",
				  "pattern": "^(?!\\.)(?!.*\\.\\.)([A-Z0-9_+-.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9-]*\\.)+[A-Z]{2,}$",
				  "title": "Email",
				  "type": "string",
				}
			`)

			expect(JSONSchema.make(Schema.typeSchema(AnnotatedEmail))).toMatchInlineSnapshot(`
				{
				  "$schema": "http://json-schema.org/draft-07/schema#",
				  "description": "EMAIL DESCRIPTION",
				  "examples": [
				    "EMAIL EXAMPLE",
				  ],
				  "format": "email",
				  "pattern": "^(?!\\.)(?!.*\\.\\.)([A-Z0-9_+-.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9-]*\\.)+[A-Z]{2,}$",
				  "title": "EMAIL TITLE",
				  "type": "string",
				}
			`)
		})
	})
})
