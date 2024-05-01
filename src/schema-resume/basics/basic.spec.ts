import { expectEffectFailure, expectEffectSuccess } from '@/test/test-utils.js'
import { JSONSchema, Schema } from '@effect/schema'
import { describe, expect, test } from 'vitest'

import { Basics } from './basics.js'

describe('Basics', () => {
	const basicsInput = {
		email: 'thomas@gmail.com',
		image: 'http://example.com/image.jpg',
		label: 'Software Engineer',
		location: {
			address: '1234 Glücklichkeit Straße Hinterhaus 5. Etage li.',
			city: 'Berlin',
			countryCode: 'DE',
			postalCode: '10999',
			region: 'California',
		},
		name: 'Thomas Anderson',
		phone: '+4907121172923',
		profiles: [
			{
				network: 'Facebook',
				url: 'http://twitter.example.com/neutralthoughts',
				username: 'neutralthoughts',
			},
		],
		summary: 'Web Developer with a passion for web-based applications',
		url: 'http://thomasanderson.com',
	} satisfies typeof Basics.Encoded

	const required: typeof Basics.Encoded = {
		name: basicsInput.name,
		label: basicsInput.label,
		email: basicsInput.email,
		summary: basicsInput.summary,
		location: {
			city: basicsInput.location.city,
			countryCode: basicsInput.location.countryCode,
		},
		profiles: [],
	}

	describe('decode', () => {
		const parse = Schema.decodeUnknownSync(Basics)

		test('handle all missing property', () => {
			const input: unknown = required
			expect(() => parse(input)).not.toThrow()
		})

		test('name', async () => {
			await expectEffectFailure(
				Basics.decode({ ...required, name: '' }),
				`(Basics (Encoded side) <-> Basics)
└─ Encoded side transformation failure
   └─ Basics (Encoded side)
      └─ ["name"]
         └─ expected a non-empty string with no leading or trailing whitespace, got ''`,
			)

			await expectEffectFailure(
				Basics.decode({ ...required, name: '  ' }),
				`(Basics (Encoded side) <-> Basics)
└─ Encoded side transformation failure
   └─ Basics (Encoded side)
      └─ ["name"]
         └─ expected a non-empty string with no leading or trailing whitespace, got '  '`,
			)

			await expectEffectSuccess(Basics.decode({ ...required, name: basicsInput.name }), {
				email: 'thomas@gmail.com',
				label: 'Software Engineer',
				location: {
					city: 'Berlin',
					countryCode: 'DE',
				},
				name: 'Thomas Anderson',
				profiles: [],
				summary: 'Web Developer with a passion for web-based applications',
			})
		})

		test('label', async () => {
			await expectEffectFailure(
				Basics.decode({ ...required, label: '' }),
				`(Basics (Encoded side) <-> Basics)
└─ Encoded side transformation failure
   └─ Basics (Encoded side)
      └─ ["label"]
         └─ expected a non-empty string with no leading or trailing whitespace, got ''`,
			)

			await expectEffectFailure(
				Basics.decode({ ...required, label: '  ' }),
				`(Basics (Encoded side) <-> Basics)
└─ Encoded side transformation failure
   └─ Basics (Encoded side)
      └─ ["label"]
         └─ expected a non-empty string with no leading or trailing whitespace, got '  '`,
			)

			await expectEffectSuccess(Basics.decode({ ...required, label: basicsInput.label }), {
				email: 'thomas@gmail.com',
				label: 'Software Engineer',
				location: {
					city: 'Berlin',
					countryCode: 'DE',
				},
				name: 'Thomas Anderson',
				profiles: [],
				summary: 'Web Developer with a passion for web-based applications',
			})
		})

		test('email', async () => {
			await expectEffectFailure(
				Basics.decode({ ...required, email: '' }),
				`(Basics (Encoded side) <-> Basics)
└─ Encoded side transformation failure
   └─ Basics (Encoded side)
      └─ ["email"]
         └─ expected an Email address string matching the pattern '^(?!\\.)(?!.*\\.\\.)([A-Z0-9_+-.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9-]*\\.)+[A-Z]{2,}$', got ''`,
			)
			await expectEffectFailure(
				Basics.decode({ ...required, email: '  ' }),
				`(Basics (Encoded side) <-> Basics)
└─ Encoded side transformation failure
   └─ Basics (Encoded side)
      └─ ["email"]
         └─ expected an Email address string matching the pattern '^(?!\\.)(?!.*\\.\\.)([A-Z0-9_+-.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9-]*\\.)+[A-Z]{2,}$', got '  '`,
			)
			await expectEffectSuccess(Basics.decode({ ...required, email: basicsInput.email }), {
				email: 'thomas@gmail.com',
				label: 'Software Engineer',
				location: {
					city: 'Berlin',
					countryCode: 'DE',
				},
				name: 'Thomas Anderson',
				profiles: [],
				summary: 'Web Developer with a passion for web-based applications',
			})
		})

		test('image', async () => {
			await expectEffectFailure(
				Basics.decode({ ...required, image: '' }),
				`(Basics (Encoded side) <-> Basics)
└─ Encoded side transformation failure
   └─ Basics (Encoded side)
      └─ ["image"]
         └─ Invalid URL string; got: ''`,
			)

			await expectEffectFailure(
				Basics.decode({ ...required, image: '  ' }),
				`(Basics (Encoded side) <-> Basics)
└─ Encoded side transformation failure
   └─ Basics (Encoded side)
      └─ ["image"]
         └─ Invalid URL string; got: '  '`,
			)

			await expectEffectSuccess(Basics.decode({ ...required, image: basicsInput.image }), {
				email: 'thomas@gmail.com',
				image: 'http://example.com/image.jpg',
				label: 'Software Engineer',
				location: {
					city: 'Berlin',
					countryCode: 'DE',
				},
				name: 'Thomas Anderson',
				profiles: [],
				summary: 'Web Developer with a passion for web-based applications',
			})
		})

		test('location', async () => {
			expect(() => parse({ ...required, location: {} })).toThrow()
			await expectEffectSuccess(Basics.decode({ ...required, location: basicsInput.location }), {
				email: 'thomas@gmail.com',
				label: 'Software Engineer',
				location: {
					address: '1234 Glücklichkeit Straße Hinterhaus 5. Etage li.',
					city: 'Berlin',
					countryCode: 'DE',
					postalCode: '10999',
					region: 'California',
				},
				name: 'Thomas Anderson',
				profiles: [],
				summary: 'Web Developer with a passion for web-based applications',
			})
		})

		test('phone', async () => {
			await expectEffectFailure(
				Basics.decode({ ...required, phone: '' }),
				`(Basics (Encoded side) <-> Basics)
└─ Encoded side transformation failure
   └─ Basics (Encoded side)
      └─ ["phone"]
         └─ Invalid E.164 phone number: ''`,
			)

			await expectEffectFailure(
				Basics.decode({ ...required, phone: '  ' }),
				`(Basics (Encoded side) <-> Basics)
└─ Encoded side transformation failure
   └─ Basics (Encoded side)
      └─ ["phone"]
         └─ Invalid E.164 phone number: '  '`,
			)

			await expectEffectFailure(
				Basics.decode({ ...required, phone: ' abcdefghijk' }),
				`(Basics (Encoded side) <-> Basics)
└─ Encoded side transformation failure
   └─ Basics (Encoded side)
      └─ ["phone"]
         └─ Invalid E.164 phone number: ' abcdefghijk'`,
			)
			await expectEffectSuccess(Basics.decode({ ...required, phone: basicsInput.phone }), {
				email: 'thomas@gmail.com',
				label: 'Software Engineer',
				location: {
					city: 'Berlin',
					countryCode: 'DE',
				},
				name: 'Thomas Anderson',
				phone: '+4907121172923',
				profiles: [],
				summary: 'Web Developer with a passion for web-based applications',
			})
		})

		test('profiles', async () => {
			await expectEffectSuccess(Basics.decode({ ...required, profiles: [] }), {
				email: 'thomas@gmail.com',
				label: 'Software Engineer',
				location: {
					city: 'Berlin',
					countryCode: 'DE',
				},
				name: 'Thomas Anderson',
				profiles: [],
				summary: 'Web Developer with a passion for web-based applications',
			})
			await expectEffectSuccess(Basics.decode({ ...required, profiles: basicsInput.profiles }), {
				email: 'thomas@gmail.com',
				label: 'Software Engineer',
				location: {
					city: 'Berlin',
					countryCode: 'DE',
				},
				name: 'Thomas Anderson',
				profiles: [
					{
						network: 'Facebook',
						url: 'http://twitter.example.com/neutralthoughts',
						username: 'neutralthoughts',
					},
				],
				summary: 'Web Developer with a passion for web-based applications',
			})
		})

		test('summary', async () => {
			await expectEffectFailure(
				Basics.decode({ ...required, summary: '' }),
				`(Basics (Encoded side) <-> Basics)
└─ Encoded side transformation failure
   └─ Basics (Encoded side)
      └─ ["summary"]
         └─ expected a non-empty string with no leading or trailing whitespace, got ''`,
			)

			await expectEffectFailure(
				Basics.decode({ ...required, summary: '  ' }),
				`(Basics (Encoded side) <-> Basics)
└─ Encoded side transformation failure
   └─ Basics (Encoded side)
      └─ ["summary"]
         └─ expected a non-empty string with no leading or trailing whitespace, got '  '`,
			)

			await expectEffectSuccess(Basics.decode({ ...required, summary: basicsInput.summary }), {
				email: 'thomas@gmail.com',
				label: 'Software Engineer',
				location: {
					city: 'Berlin',
					countryCode: 'DE',
				},
				name: 'Thomas Anderson',
				profiles: [],
				summary: 'Web Developer with a passion for web-based applications',
			})
		})

		test('url', async () => {
			await expectEffectFailure(
				Basics.decode({ ...required, url: '' }),
				`(Basics (Encoded side) <-> Basics)
└─ Encoded side transformation failure
   └─ Basics (Encoded side)
      └─ ["url"]
         └─ Invalid URL string; got: ''`,
			)
			await expectEffectFailure(
				Basics.decode({ ...required, url: '  ' }),
				`(Basics (Encoded side) <-> Basics)
└─ Encoded side transformation failure
   └─ Basics (Encoded side)
      └─ ["url"]
         └─ Invalid URL string; got: '  '`,
			)

			await expectEffectSuccess(Basics.decode({ ...required, url: basicsInput.url }), {
				email: 'thomas@gmail.com',
				label: 'Software Engineer',
				location: {
					city: 'Berlin',
					countryCode: 'DE',
				},
				name: 'Thomas Anderson',
				profiles: [],
				summary: 'Web Developer with a passion for web-based applications',
				url: 'http://thomasanderson.com',
			})
		})
	})

	test('encode == decode', () => {
		expect(Basics.decode(basicsInput)).toEqual(Basics.encode(basicsInput))
	})

	describe('JSONSchema', () => {
		test('encodedSchema', () => {
			expect(JSONSchema.make(Schema.encodedSchema(Basics))).toMatchInlineSnapshot(`
				{
				  "$schema": "http://json-schema.org/draft-07/schema#",
				  "additionalProperties": false,
				  "properties": {
				    "email": {
				      "description": "a string",
				      "title": "string",
				      "type": "string",
				    },
				    "image": {
				      "description": "a string",
				      "title": "string",
				      "type": "string",
				    },
				    "label": {
				      "description": "a string",
				      "title": "string",
				      "type": "string",
				    },
				    "location": {
				      "additionalProperties": false,
				      "properties": {
				        "address": {
				          "description": "a string",
				          "title": "string",
				          "type": "string",
				        },
				        "city": {
				          "description": "a string",
				          "title": "string",
				          "type": "string",
				        },
				        "countryCode": {
				          "description": "a string",
				          "title": "string",
				          "type": "string",
				        },
				        "postalCode": {
				          "description": "a string",
				          "title": "string",
				          "type": "string",
				        },
				        "region": {
				          "description": "a string",
				          "title": "string",
				          "type": "string",
				        },
				      },
				      "required": [
				        "city",
				        "countryCode",
				      ],
				      "type": "object",
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
				    "profiles": {
				      "items": {
				        "additionalProperties": false,
				        "properties": {
				          "network": {
				            "description": "a string",
				            "title": "string",
				            "type": "string",
				          },
				          "url": {
				            "description": "a string",
				            "title": "string",
				            "type": "string",
				          },
				          "username": {
				            "description": "a string",
				            "title": "string",
				            "type": "string",
				          },
				        },
				        "required": [
				          "network",
				          "url",
				          "username",
				        ],
				        "type": "object",
				      },
				      "type": "array",
				    },
				    "summary": {
				      "description": "a string",
				      "title": "string",
				      "type": "string",
				    },
				    "url": {
				      "description": "a string",
				      "title": "string",
				      "type": "string",
				    },
				  },
				  "required": [
				    "email",
				    "label",
				    "name",
				    "summary",
				    "location",
				    "profiles",
				  ],
				  "type": "object",
				}
			`)
		})

		test('naked', () => {
			expect(JSON.stringify(JSONSchema.make(Basics), null, '\t')).toMatchFileSnapshot(
				'basic-schema.snapshot.json',
			)
		})
	})
})
