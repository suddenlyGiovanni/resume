import { JSONSchema, Schema } from 'effect'
import { describe, expect, test } from 'vitest'

import { Work } from './work.ts'

describe('Work', () => {
	const workInput = {
		contact: {
			email: 'zuckerberg@mark.cto',
			name: 'Mark Zuckerberg (CTO)',
			phone: '+353861234567',
		},
		description: 'Social Media Company',
		location: 'Menlo Park, CA',
		name: 'Facebook',
		roles: [
			{
				highlights: ['Founded the company', 'Wrote a new algorithm'],
				responsibilities: ['Designed and built web applications', 'Managed a team of 10 engineers'],
				startDate: '1988-02-01',
				title: 'Software Engineer',
			},
		],
		summary: 'My day-to-day activities involved designing and building web applications...',
		url: 'https://facebook.example.com',
	} satisfies typeof Work.Type

	const required: typeof Work.Type = {
		description: workInput.description,
		name: workInput.name,
		roles: workInput.roles,
	}

	describe('decode', () => {
		const parse = Schema.decodeUnknownSync(Work)

		test('handle missing partial properties', () => {
			expect(() => parse({ ...required })).not.toThrow()
		})

		test('description', () => {
			expect(() => parse({ ...required, description: '' })).toThrow()
			expect(() => parse({ ...required, description: ' ' })).toThrow()
			expect(() => parse({ ...required, description: 'Educational Software Company' })).not.toThrow()
		})

		test('location', () => {
			expect(() => parse({ ...required, location: '' })).toThrow()
			expect(() => parse({ ...required, location: ' ' })).toThrow()
			expect(() => parse({ ...required, location: workInput.location })).not.toThrow()
		})

		test('name', () => {
			expect(() => parse({ ...required, name: '' })).toThrow()
			expect(() => parse({ ...required, name: ' ' })).toThrow()
			expect(() => parse({ ...required, name: workInput.name })).not.toThrow()
		})

		describe('roles', () => {
			test('empty roles array', () => {
				expect(() => parse({ ...required, roles: [] })).toThrow()
			})
		})

		test('summary', () => {
			expect(() => parse({ ...required, summary: '' })).toThrow()
			expect(() => parse({ ...required, summary: ' ' })).toThrow()
			expect(() => parse({ ...required, summary: workInput.summary })).not.toThrow()
		})

		test('url', () => {
			expect(() => parse({ ...required, url: '' })).toThrow()
			expect(() => parse({ ...required, url: ' ' })).toThrow()
			expect(() => parse({ ...required, url: workInput.url })).not.toThrow()
		})

		test('contact', () => {
			expect(() => parse({ ...required, contact: { email: workInput.contact.email, name: ' ' } })).toThrow()
			expect(() =>
				parse({
					...required,
					contact: {
						email: workInput.contact.email,
						name: workInput.contact.name,
					},
				}),
			).not.toThrow()
			expect(() => parse({ ...required, contact: { ...workInput.contact, email: '' } })).toThrow()
			expect(() => parse({ ...required, contact: { ...workInput.contact, email: ' ' } })).toThrow()
			expect(() =>
				parse({ ...required, contact: { ...workInput.contact, email: workInput.contact.email } }),
			).not.toThrow()
			expect(() => parse({ ...required, contact: { ...workInput.contact, phone: '' } })).toThrow()
			expect(() => parse({ ...required, contact: { ...workInput.contact, phone: ' ' } })).toThrow()
			expect(() =>
				parse({ ...required, contact: { ...workInput.contact, phone: workInput.contact.phone } }),
			).not.toThrow()
		})

		describe('JSONSchema', () => {
			test('naked', async () => {
				await expect(JSON.stringify(JSONSchema.make(Work), null, 2)).toMatchFileSnapshot('work-schema.snapshot.json')
			})

			test.todo('typeSchema', () => {
				expect(JSONSchema.make(Schema.typeSchema(Work))).toMatchInlineSnapshot()
			})

			test('encodedSchema', () => {
				expect(JSONSchema.make(Schema.encodedSchema(Work))).toMatchInlineSnapshot(`
					{
					  "$defs": {
					    "Email": {
					      "type": "string",
					    },
					    "NonEmptyTrimmedString": {
					      "type": "string",
					    },
					    "PhoneString": {
					      "type": "string",
					    },
					    "StringDate": {
					      "type": "string",
					    },
					    "TrimmedNonEmpty": {
					      "type": "string",
					    },
					    "UrlString": {
					      "type": "string",
					    },
					  },
					  "$schema": "http://json-schema.org/draft-07/schema#",
					  "additionalProperties": false,
					  "properties": {
					    "contact": {
					      "additionalProperties": false,
					      "properties": {
					        "email": {
					          "$ref": "#/$defs/Email",
					        },
					        "name": {
					          "$ref": "#/$defs/NonEmptyTrimmedString",
					        },
					        "phone": {
					          "$ref": "#/$defs/PhoneString",
					        },
					      },
					      "required": [
					        "email",
					        "name",
					      ],
					      "type": "object",
					    },
					    "description": {
					      "$ref": "#/$defs/TrimmedNonEmpty",
					    },
					    "location": {
					      "$ref": "#/$defs/NonEmptyTrimmedString",
					    },
					    "name": {
					      "$ref": "#/$defs/NonEmptyTrimmedString",
					    },
					    "roles": {
					      "additionalItems": {
					        "additionalProperties": false,
					        "properties": {
					          "endDate": {
					            "$ref": "#/$defs/StringDate",
					          },
					          "highlights": {
					            "additionalItems": {
					              "$ref": "#/$defs/TrimmedNonEmpty",
					            },
					            "items": [
					              {
					                "$ref": "#/$defs/TrimmedNonEmpty",
					              },
					            ],
					            "minItems": 1,
					            "type": "array",
					          },
					          "responsibilities": {
					            "items": {
					              "$ref": "#/$defs/TrimmedNonEmpty",
					            },
					            "type": "array",
					          },
					          "startDate": {
					            "$ref": "#/$defs/StringDate",
					          },
					          "technologies": {
					            "additionalItems": {
					              "$ref": "#/$defs/NonEmptyTrimmedString",
					            },
					            "items": [
					              {
					                "$ref": "#/$defs/NonEmptyTrimmedString",
					              },
					            ],
					            "minItems": 1,
					            "type": "array",
					          },
					          "title": {
					            "$ref": "#/$defs/NonEmptyTrimmedString",
					          },
					        },
					        "required": [
					          "responsibilities",
					          "startDate",
					          "title",
					        ],
					        "type": "object",
					      },
					      "items": [
					        {
					          "additionalProperties": false,
					          "properties": {
					            "endDate": {
					              "$ref": "#/$defs/StringDate",
					            },
					            "highlights": {
					              "additionalItems": {
					                "$ref": "#/$defs/TrimmedNonEmpty",
					              },
					              "items": [
					                {
					                  "$ref": "#/$defs/TrimmedNonEmpty",
					                },
					              ],
					              "minItems": 1,
					              "type": "array",
					            },
					            "responsibilities": {
					              "items": {
					                "$ref": "#/$defs/TrimmedNonEmpty",
					              },
					              "type": "array",
					            },
					            "startDate": {
					              "$ref": "#/$defs/StringDate",
					            },
					            "technologies": {
					              "additionalItems": {
					                "$ref": "#/$defs/NonEmptyTrimmedString",
					              },
					              "items": [
					                {
					                  "$ref": "#/$defs/NonEmptyTrimmedString",
					                },
					              ],
					              "minItems": 1,
					              "type": "array",
					            },
					            "title": {
					              "$ref": "#/$defs/NonEmptyTrimmedString",
					            },
					          },
					          "required": [
					            "responsibilities",
					            "startDate",
					            "title",
					          ],
					          "type": "object",
					        },
					      ],
					      "minItems": 1,
					      "type": "array",
					    },
					    "summary": {
					      "$ref": "#/$defs/TrimmedNonEmpty",
					    },
					    "url": {
					      "$ref": "#/$defs/UrlString",
					    },
					  },
					  "required": [
					    "description",
					    "name",
					    "roles",
					  ],
					  "type": "object",
					}
				`)
			})
		})
	})
})
