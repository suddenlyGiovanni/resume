import * as S from '@effect/schema/Schema'

import { nonEmptyString, UrlString } from '@/schema-primitive/index.ts'

export const Publication = S.Struct({
	name: S.optional(
		nonEmptyString({
			title: 'name',
			description: 'The name of the publication',
			examples: ['The World Wide Web'],
		}),
		{ exact: true },
	),

	publisher: S.optional(
		nonEmptyString({
			title: 'publisher',
			description: 'The publisher of the publication',
			examples: ['IEEE', 'Computer Magazine'],
		}),
		{ exact: true },
	),

	releaseDate: S.optional(
		S.Date.annotations({
			title: 'releaseDate',
			description: 'Using ISO 8601 with YYYY-MM-DDThh:mm:ss',
			examples: [new Date('2012-04-05'), new Date('2012-04-05T10:00:00.000Z')],
		}),
		{ exact: true },
	),

	summary: S.optional(
		nonEmptyString({
			title: 'summary',
			description: 'Short summary of publication',
			examples: ['Discussion of the World Wide Web, HTTP, HTML'],
		}),
		{ exact: true },
	),

	url: S.optional(
		UrlString.annotations({
			title: 'url',
			description: 'URL (as per RFC 3986) to the publication',
			examples: ['http://www.computer.org.example.com/csdl/mags/co/1996/10/rx069-abs.html'],
		}),
		{ exact: true },
	),
})

export type Publication = S.Schema.Encoded<typeof Publication>