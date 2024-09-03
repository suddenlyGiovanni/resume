import { JSONSchema, Schema } from '@effect/schema'
import { describe, expect, test } from 'vitest'

import { Work } from './work.js'

describe('Work', () => {
	const workInput = {
		description: 'Social Media Company',
		location: 'Menlo Park, CA',
		name: 'Facebook',
		roles: [
			{
				startDate: '1988-02-01',
				title: 'Software Engineer',
				highlights: ['Founded the company', 'Wrote a new algorithm'],
				responsibilities: ['Designed and built web applications', 'Managed a team of 10 engineers'],
			},
		],
		summary: 'My day-to-day activities involved designing and building web applications...',
		url: 'https://facebook.example.com',
		contact: {
			phone: '+353861234567',
			email: 'zuckerberg@mark.cto',
			name: 'Mark Zuckerberg (CTO)',
		},
	} satisfies typeof Work.Type

	const required: typeof Work.Type = {
		name: workInput.name,
		roles: workInput.roles,
		description: workInput.description,
	}

	describe('decode', () => {
		const parse = Schema.decodeUnknownSync(Work)

		test('handle missing partial properties', () => {
			expect(() => parse({ ...required })).not.toThrow()
		})

		test('description', () => {
			expect(() => parse({ ...required, description: '' })).toThrow()
			expect(() => parse({ ...required, description: ' ' })).toThrow()
			expect(() =>
				parse({ ...required, description: 'Educational Software Company' }),
			).not.toThrow()
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
			expect(() =>
				parse({ ...required, contact: { email: workInput.contact.email, name: ' ' } }),
			).toThrow()
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
			test('naked', () => {
				expect(JSON.stringify(JSONSchema.make(Work), null, 2)).toMatchFileSnapshot(
					'work-schema.snapshot.json',
				)
			})

			test.todo('typeSchema', () => {
				expect(JSONSchema.make(Schema.typeSchema(Work))).toMatchInlineSnapshot()
			})

			test('encodedSchema', () => {
				expect(JSONSchema.make(Schema.encodedSchema(Work))).toMatchInlineSnapshot(`
					{
					  "$schema": "http://json-schema.org/draft-07/schema#",
					  "additionalProperties": false,
					  "properties": {
					    "contact": {
					      "additionalProperties": false,
					      "properties": {
					        "email": {
					          "type": "string",
					        },
					        "name": {
					          "type": "string",
					        },
					        "phone": {
					          "type": "string",
					        },
					      },
					      "required": [
					        "name",
					        "email",
					      ],
					      "type": "object",
					    },
					    "description": {
					      "type": "string",
					    },
					    "location": {
					      "type": "string",
					    },
					    "name": {
					      "type": "string",
					    },
					    "roles": {
					      "additionalItems": {
					        "additionalProperties": false,
					        "properties": {
					          "endDate": {
					            "type": "string",
					          },
					          "highlights": {
					            "items": {
					              "type": "string",
					            },
					            "minItems": 1,
					            "type": "array",
					          },
					          "responsibilities": {
					            "items": {
					              "type": "string",
					            },
					            "type": "array",
					          },
					          "startDate": {
					            "type": "string",
					          },
					          "technologies": {
					            "items": {
					              "type": "string",
					            },
					            "minItems": 1,
					            "type": "array",
					          },
					          "title": {
					            "type": "string",
					          },
					        },
					        "required": [
					          "title",
					          "startDate",
					          "responsibilities",
					        ],
					        "type": "object",
					      },
					      "items": [
					        {
					          "additionalProperties": false,
					          "properties": {
					            "endDate": {
					              "type": "string",
					            },
					            "highlights": {
					              "items": {
					                "type": "string",
					              },
					              "minItems": 1,
					              "type": "array",
					            },
					            "responsibilities": {
					              "items": {
					                "type": "string",
					              },
					              "type": "array",
					            },
					            "startDate": {
					              "type": "string",
					            },
					            "technologies": {
					              "items": {
					                "type": "string",
					              },
					              "minItems": 1,
					              "type": "array",
					            },
					            "title": {
					              "type": "string",
					            },
					          },
					          "required": [
					            "title",
					            "startDate",
					            "responsibilities",
					          ],
					          "type": "object",
					        },
					      ],
					      "minItems": 1,
					      "type": "array",
					    },
					    "summary": {
					      "type": "string",
					    },
					    "url": {
					      "type": "string",
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
