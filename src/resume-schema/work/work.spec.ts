import * as JSONSchema from '@effect/schema/JSONSchema'
import * as S from '@effect/schema/Schema'

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
	} satisfies S.Schema.Encoded<typeof Work>

	const required: S.Schema.Encoded<typeof Work> = {
		name: workInput.name,
		roles: workInput.roles,
		description: workInput.description,
	}

	describe('decode', () => {
		const parse = S.decodeUnknownSync(Work)

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

		test('techStack', () => {
			const workInput: S.Schema.Encoded<typeof Work> = {
				name: required.name,
				roles: required.roles,
				description: required.description,
				techStack: ['TypeScript', 'Aws', 'SQLite'],
			}
			expect(() => parse(required)).not.toThrow()
			expect(() => parse(workInput)).not.toThrow()
			expect(parse(workInput).techStack).toEqual(workInput.techStack)
		})

		describe('JSONSchema', () => {
			test('naked', () => {
				expect(JSON.stringify(JSONSchema.make(Work), null, 2)).toMatchFileSnapshot(
					'work-schema.snapshot.json',
				)
			})

			test.todo('typeSchema', () => {
				expect(JSONSchema.make(S.typeSchema(Work))).toMatchInlineSnapshot()
			})

			test('encodedSchema', () => {
				expect(JSONSchema.make(S.encodedSchema(Work))).toMatchInlineSnapshot(`
					{
					  "$schema": "http://json-schema.org/draft-07/schema#",
					  "additionalProperties": false,
					  "properties": {
					    "contact": {
					      "additionalProperties": false,
					      "properties": {
					        "email": {
					          "description": "a string",
					          "title": "string",
					          "type": "string",
					        },
					        "name": {
					          "description": "a string",
					          "title": "string",
					          "type": "string",
					        },
					        "phone": {
					          "description": "a string",
					          "title": "string",
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
					      "description": "a string",
					      "title": "string",
					      "type": "string",
					    },
					    "location": {
					      "description": "a string",
					      "title": "string",
					      "type": "string",
					    },
					    "name": {
					      "description": "a string",
					      "title": "string",
					      "type": "string",
					    },
					    "roles": {
					      "additionalItems": {
					        "additionalProperties": false,
					        "properties": {
					          "endDate": {
					            "description": "a string",
					            "title": "string",
					            "type": "string",
					          },
					          "highlights": {
					            "additionalItems": {
					              "description": "a string",
					              "title": "string",
					              "type": "string",
					            },
					            "items": [
					              {
					                "description": "a string",
					                "title": "string",
					                "type": "string",
					              },
					            ],
					            "minItems": 1,
					            "type": "array",
					          },
					          "responsibilities": {
					            "items": {
					              "description": "a string",
					              "title": "string",
					              "type": "string",
					            },
					            "type": "array",
					          },
					          "startDate": {
					            "description": "a string",
					            "title": "string",
					            "type": "string",
					          },
					          "technologies": {
					            "additionalItems": {
					              "description": "a string",
					              "title": "string",
					              "type": "string",
					            },
					            "items": [
					              {
					                "description": "a string",
					                "title": "string",
					                "type": "string",
					              },
					            ],
					            "minItems": 1,
					            "type": "array",
					          },
					          "title": {
					            "description": "a string",
					            "title": "string",
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
					              "description": "a string",
					              "title": "string",
					              "type": "string",
					            },
					            "highlights": {
					              "additionalItems": {
					                "description": "a string",
					                "title": "string",
					                "type": "string",
					              },
					              "items": [
					                {
					                  "description": "a string",
					                  "title": "string",
					                  "type": "string",
					                },
					              ],
					              "minItems": 1,
					              "type": "array",
					            },
					            "responsibilities": {
					              "items": {
					                "description": "a string",
					                "title": "string",
					                "type": "string",
					              },
					              "type": "array",
					            },
					            "startDate": {
					              "description": "a string",
					              "title": "string",
					              "type": "string",
					            },
					            "technologies": {
					              "additionalItems": {
					                "description": "a string",
					                "title": "string",
					                "type": "string",
					              },
					              "items": [
					                {
					                  "description": "a string",
					                  "title": "string",
					                  "type": "string",
					                },
					              ],
					              "minItems": 1,
					              "type": "array",
					            },
					            "title": {
					              "description": "a string",
					              "title": "string",
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
					      "description": "a string",
					      "title": "string",
					      "type": "string",
					    },
					    "techStack": {
					      "additionalItems": {
					        "description": "a string",
					        "title": "string",
					        "type": "string",
					      },
					      "items": [
					        {
					          "description": "a string",
					          "title": "string",
					          "type": "string",
					        },
					      ],
					      "minItems": 1,
					      "type": "array",
					    },
					    "url": {
					      "description": "a string",
					      "title": "string",
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
