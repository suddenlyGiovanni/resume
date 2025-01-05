import { Schema } from 'effect'

import { StringDate, TrimmedNonEmpty, UrlString } from '../../schema-primitive/index.js'

export class Volunteer extends Schema.Class<Volunteer>('Volunteer')({
	endDate: Schema.optionalWith(StringDate, { exact: true }),

	highlights: Schema.optionalWith(Schema.Array(TrimmedNonEmpty), { exact: true }).annotations({
		title: 'highlights',
		description: 'Specify accomplishments and achievements',
		examples: [['Increased profits by 20% from 2011-2012 through viral advertising']],
	}),

	organization: Schema.optionalWith(Schema.NonEmptyTrimmedString, { exact: true }).annotations({
		title: 'organization',
		description: 'Name of the organization',
		examples: ['Facebook'],
	}),

	position: Schema.optionalWith(Schema.NonEmptyTrimmedString, { exact: true }).annotations({
		title: 'position',
		description: 'The title of your position at the company',
		examples: ['Software Engineer'],
	}),

	startDate: Schema.optionalWith(StringDate, { exact: true }),

	summary: Schema.optionalWith(TrimmedNonEmpty, { exact: true }).annotations({
		title: 'summary',
		description: 'Give an overview of your responsibilities at the company',
		examples: ['My day-to-day activities involved designing and building web applications...'],
	}),

	url: Schema.optionalWith(UrlString, { exact: true }).annotations({
		title: 'url',
		description: 'URL (as per RFC 3986) of the company',
		examples: ['https://facebook.example.com'],
	}),
}) {}
