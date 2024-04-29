import * as S from '@effect/schema/Schema'

import { UrlString, TrimmedNonEmpty, StringDate } from '@/schema-primitive/index.js'

export const Publication = S.Struct({
	name: S.optional(
		TrimmedNonEmpty.annotations({
			title: 'name',
			description: 'The name of the publication',
			examples: ['The World Wide Web'],
		}),
		{ exact: true },
	),

	publisher: S.optional(
		TrimmedNonEmpty.annotations({
			title: 'publisher',
			description: 'The publisher of the publication',
			examples: ['IEEE', 'Computer Magazine'],
		}),
		{ exact: true },
	),

	releaseDate: S.optional(StringDate, { exact: true }),

	summary: S.optional(
		TrimmedNonEmpty.annotations({
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
