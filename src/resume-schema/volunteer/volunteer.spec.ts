import * as JSONSchema from '@effect/schema/JSONSchema'
import * as S from '@effect/schema/Schema'
import { describe, expect, test } from 'vitest'

import { Volunteer } from './volunteer.js'

describe('Volunteer', () => {
	const volunteerInput = {
		endDate: '2021-01-01',
		highlights: ['Saved the world from certain doom'],
		organization: 'Facebook',
		position: 'Software Engineer',
		startDate: '2020-01-01',
		summary: 'My day-to-day activities involved designing and building web applications...',
		url: 'https://facebook.example.com',
	} satisfies S.Schema.Type<typeof Volunteer>

	describe('decode', () => {
		const parse = S.decodeUnknownSync(Volunteer)

		test('handle missing partial properties', () => {
			expect(() => parse({})).not.toThrow()
		})

		test('endDate', () => {
			expect(() => parse({ endDate: '' })).toThrow()
			expect(() => parse({ endDate: ' ' })).toThrow()
			expect(() => parse({ endDate: volunteerInput.endDate })).not.toThrow()
		})

		test('highlights', () => {
			expect(() => parse({ highlights: [] })).not.toThrow()
			expect(() => parse({ highlights: [''] })).toThrow()
			expect(() => parse({ highlights: [' '] })).toThrow()
			expect(() => parse({ highlights: volunteerInput.highlights })).not.toThrow()
		})

		test('organization', () => {
			expect(() => parse({ organization: '' })).toThrow()
			expect(() => parse({ organization: ' ' })).toThrow()
			expect(() => parse({ organization: volunteerInput.organization })).not.toThrow()
		})

		test('position', () => {
			expect(() => parse({ position: '' })).toThrow()
			expect(() => parse({ position: ' ' })).toThrow()
			expect(() => parse({ position: volunteerInput.position })).not.toThrow()
		})

		test('startDate', () => {
			expect(() => parse({ startDate: '' })).toThrow()
			expect(() => parse({ startDate: ' ' })).toThrow()
			expect(() => parse({ startDate: volunteerInput.startDate })).not.toThrow()
		})

		test('summary', () => {
			expect(() => parse({ summary: '' })).toThrow()
			expect(() => parse({ summary: ' ' })).toThrow()
			expect(() => parse({ summary: volunteerInput.summary })).not.toThrow()
		})

		test('url', () => {
			expect(() => parse({ url: '' })).toThrow()
			expect(() => parse({ url: ' ' })).toThrow()
			expect(() => parse({ url: volunteerInput.url })).not.toThrow()
		})
	})

	describe('JSONSchema', () => {
		test('naked', () => {
			expect(JSONSchema.make(Volunteer)).toMatchInlineSnapshot(`
				{
				  "$schema": "http://json-schema.org/draft-07/schema#",
				  "additionalProperties": false,
				  "properties": {
				    "endDate": {
				      "description": "a string that is a valid YYYY-MM-DD date",
				      "format": "date",
				      "maxLength": 10,
				      "minLength": 10,
				      "title": "StringDate",
				      "type": "string",
				    },
				    "highlights": {
				      "description": "Specify accomplishments and achievements",
				      "items": {
				        "description": "a non-empty string with no leading or trailing whitespace",
				        "examples": [
				          "Increased profits by 20% from 2011-2012 through viral advertising",
				        ],
				        "minLength": 1,
				        "pattern": "^[^\\s].*[^\\s]$",
				        "title": "highlight",
				        "type": "string",
				      },
				      "title": "highlights",
				      "type": "array",
				    },
				    "organization": {
				      "description": "Name of the organization",
				      "examples": [
				        "Facebook",
				      ],
				      "minLength": 1,
				      "pattern": "^[^\\s].*[^\\s]$",
				      "title": "organization",
				      "type": "string",
				    },
				    "position": {
				      "description": "The title of your position at the company",
				      "examples": [
				        "Software Engineer",
				      ],
				      "minLength": 1,
				      "pattern": "^[^\\s].*[^\\s]$",
				      "title": "position",
				      "type": "string",
				    },
				    "startDate": {
				      "description": "a string that is a valid YYYY-MM-DD date",
				      "format": "date",
				      "maxLength": 10,
				      "minLength": 10,
				      "title": "StringDate",
				      "type": "string",
				    },
				    "summary": {
				      "description": "Give an overview of your responsibilities at the company",
				      "examples": [
				        "My day-to-day activities involved designing and building web applications...",
				      ],
				      "minLength": 1,
				      "pattern": "^[^\\s].*[^\\s]$",
				      "title": "summary",
				      "type": "string",
				    },
				    "url": {
				      "description": "URL (as per RFC 3986) of the company",
				      "examples": [
				        "https://facebook.example.com",
				      ],
				      "format": "uri",
				      "title": "url",
				      "type": "string",
				    },
				  },
				  "required": [],
				  "type": "object",
				}
			`)
		})

		test('encodedSchema', () => {
			expect(
				JSON.stringify(JSONSchema.make(S.encodedSchema(Volunteer)), null, '\t'),
			).toMatchFileSnapshot('volunteer-schema.snapshot.json')
		})

		test('typeSchema', () => {
			expect(JSONSchema.make(S.typeSchema(Volunteer))).toMatchInlineSnapshot(`
				{
				  "$schema": "http://json-schema.org/draft-07/schema#",
				  "additionalProperties": false,
				  "properties": {
				    "endDate": {
				      "description": "a string that is a valid YYYY-MM-DD date",
				      "format": "date",
				      "maxLength": 10,
				      "minLength": 10,
				      "title": "StringDate",
				      "type": "string",
				    },
				    "highlights": {
				      "description": "Specify accomplishments and achievements",
				      "items": {
				        "description": "a non-empty string with no leading or trailing whitespace",
				        "examples": [
				          "Increased profits by 20% from 2011-2012 through viral advertising",
				        ],
				        "minLength": 1,
				        "pattern": "^[^\\s].*[^\\s]$",
				        "title": "highlight",
				        "type": "string",
				      },
				      "title": "highlights",
				      "type": "array",
				    },
				    "organization": {
				      "description": "Name of the organization",
				      "examples": [
				        "Facebook",
				      ],
				      "minLength": 1,
				      "pattern": "^[^\\s].*[^\\s]$",
				      "title": "organization",
				      "type": "string",
				    },
				    "position": {
				      "description": "The title of your position at the company",
				      "examples": [
				        "Software Engineer",
				      ],
				      "minLength": 1,
				      "pattern": "^[^\\s].*[^\\s]$",
				      "title": "position",
				      "type": "string",
				    },
				    "startDate": {
				      "description": "a string that is a valid YYYY-MM-DD date",
				      "format": "date",
				      "maxLength": 10,
				      "minLength": 10,
				      "title": "StringDate",
				      "type": "string",
				    },
				    "summary": {
				      "description": "Give an overview of your responsibilities at the company",
				      "examples": [
				        "My day-to-day activities involved designing and building web applications...",
				      ],
				      "minLength": 1,
				      "pattern": "^[^\\s].*[^\\s]$",
				      "title": "summary",
				      "type": "string",
				    },
				    "url": {
				      "description": "URL (as per RFC 3986) of the company",
				      "examples": [
				        "https://facebook.example.com",
				      ],
				      "format": "uri",
				      "title": "url",
				      "type": "string",
				    },
				  },
				  "required": [],
				  "type": "object",
				}
			`)
		})
	})
})
