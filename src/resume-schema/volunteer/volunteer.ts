import * as S from '@effect/schema/Schema'

import { ISO8601DateString, UrlString, nonEmptyString } from '@/schema-primitive/index.ts'

export const Volunteer = S.Struct({
	endDate: S.optional(ISO8601DateString, { exact: true }),

	highlights: S.optional(
		S.Array(
			nonEmptyString({
				title: 'highlight',
				examples: ['Increased profits by 20% from 2011-2012 through viral advertising'],
			}),
		).annotations({
			title: 'highlights',
			description: 'Specify accomplishments and achievements',
		}),
		{ exact: true },
	),

	organization: S.optional(
		nonEmptyString({
			title: 'organization',
			description: 'Name of the organization',
			examples: ['Facebook'],
		}),
		{ exact: true },
	),

	position: S.optional(
		nonEmptyString({
			title: 'position',
			description: 'The title of your position at the company',
			examples: ['Software Engineer'],
		}),
		{ exact: true },
	),

	startDate: S.optional(ISO8601DateString, { exact: true }),

	summary: S.optional(
		nonEmptyString({
			title: 'summary',
			description: 'Give an overview of your responsibilities at the company',
			examples: ['My day-to-day activities involved designing and building web applications...'],
		}),
		{ exact: true },
	),

	url: S.optional(
		UrlString.annotations({
			title: 'url',
			description: 'URL (as per RFC 3986) of the company',
			examples: ['https://facebook.example.com'],
		}),
		{ exact: true },
	),
})

export type Volunteer = S.Schema.Encoded<typeof Volunteer>
