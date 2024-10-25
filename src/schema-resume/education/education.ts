import { Schema } from 'effect'

import { StringDate, TrimmedNonEmpty, UrlString } from '../../schema-primitive/index.js'

export class Education extends Schema.Class<Education>('Education')({
	area: Schema.NonEmptyTrimmedString.annotations({
		title: 'area',
		description: 'e.g. Arts',
		examples: ['Arts', 'Computer Science'],
	}),

	courses: Schema.optionalWith(
		Schema.Array(
			Schema.NonEmptyTrimmedString.annotations({
				title: 'course',
				examples: ['H1302 - Introduction to American history'],
			}),
		).annotations({
			title: 'courses',
			description: 'List notable courses/subjects',
			examples: [['course1', 'course2']],
		}),
		{ exact: true },
	),

	endDate: Schema.optionalWith(
		StringDate.annotations({
			title: 'endDate',
			description: 'end date of education',
			examples: ['2020-01-01'],
		}),
		{ exact: true },
	),

	score: Schema.optionalWith(
		Schema.NonEmptyTrimmedString.annotations({
			title: 'score',
			description: 'grade point average, e.g. 3.67/4.0',
			examples: ['3.67/4.0'],
		}),
		{
			exact: true,
		},
	),

	institution: Schema.NonEmptyTrimmedString.annotations({
		title: 'institution',
		description: 'name of the institution',
		examples: ['Massachusetts Institute of Technology'],
	}),

	location: Schema.optionalWith(TrimmedNonEmpty, { exact: true }),

	startDate: StringDate.annotations({
		title: 'startDate',
		description: 'start date of education',
		examples: ['1970-01-01T00:00'],
	}),

	studyType: Schema.NonEmptyTrimmedString.annotations({
		title: 'studyType',
		description: 'the type of study',
		examples: ['Bachelor', 'Master', 'Doctorate'],
	}),

	url: Schema.optionalWith(
		UrlString.annotations({
			title: 'url',
			description: 'URL (as per RFC 3986) of the institution',
			examples: ['http://mit.com'],
		}),
		{
			exact: true,
		},
	),
}) {}
