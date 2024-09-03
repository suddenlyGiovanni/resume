import { Schema } from '@effect/schema'

import { StringDate, TrimmedNonEmpty, UrlString } from '../../schema-primitive/index.js'

export class Volunteer extends Schema.Class<Volunteer>('Volunteer')({
	endDate: Schema.optionalWith(StringDate, { exact: true }),

	highlights: Schema.optionalWith(
		Schema.Array(
			TrimmedNonEmpty.annotations({
				title: 'highlight',
				examples: ['Increased profits by 20% from 2011-2012 through viral advertising'],
			}),
		).annotations({
			title: 'highlights',
			description: 'Specify accomplishments and achievements',
		}),
		{ exact: true },
	),

	organization: Schema.optionalWith(
		Schema.NonEmptyTrimmedString.annotations({
			title: 'organization',
			description: 'Name of the organization',
			examples: ['Facebook'],
		}),
		{ exact: true },
	),

	position: Schema.optionalWith(
		Schema.NonEmptyTrimmedString.annotations({
			title: 'position',
			description: 'The title of your position at the company',
			examples: ['Software Engineer'],
		}),
		{ exact: true },
	),

	startDate: Schema.optionalWith(StringDate, { exact: true }),

	summary: Schema.optionalWith(
		TrimmedNonEmpty.annotations({
			title: 'summary',
			description: 'Give an overview of your responsibilities at the company',
			examples: ['My day-to-day activities involved designing and building web applications...'],
		}),
		{ exact: true },
	),

	url: Schema.optionalWith(
		UrlString.annotations({
			title: 'url',
			description: 'URL (as per RFC 3986) of the company',
			examples: ['https://facebook.example.com'],
		}),
		{ exact: true },
	),
}) {}
