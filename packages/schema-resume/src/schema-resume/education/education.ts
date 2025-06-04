import { Schema } from 'effect'

import { StringDate, TrimmedNonEmpty, UrlString } from '../../schema-primitive/index.ts'

export class Education extends Schema.Class<Education>('Education')({
	area: Schema.propertySignature(Schema.NonEmptyTrimmedString).annotations({
		description: 'e.g. Arts',
		examples: ['Arts', 'Computer Science'],
		title: 'area',
	}),

	courses: Schema.optionalWith(Schema.Array(Schema.NonEmptyTrimmedString), {
		exact: true,
	}).annotations({
		description: 'List notable courses/subjects',
		examples: [['CS50', 'H1302 - Introduction to American history']],
		title: 'courses',
	}),

	endDate: Schema.optionalWith(StringDate, { exact: true }).annotations({
		description: 'end date of education',
		examples: ['2020-01-01'],
		title: 'endDate',
	}),

	institution: Schema.propertySignature(Schema.NonEmptyTrimmedString).annotations({
		description: 'name of the institution',
		examples: ['Massachusetts Institute of Technology'],
		title: 'institution',
	}),

	location: Schema.optionalWith(TrimmedNonEmpty, { exact: true }),

	score: Schema.optionalWith(Schema.NonEmptyTrimmedString, {
		exact: true,
	}).annotations({
		description: 'grade point average, e.g. 3.67/4.0',
		examples: ['3.67/4.0'],
		title: 'score',
	}),

	startDate: Schema.propertySignature(StringDate).annotations({
		description: 'start date of education',
		examples: ['1970-01-01T00:00'],
		title: 'startDate',
	}),

	studyType: Schema.propertySignature(Schema.NonEmptyTrimmedString).annotations({
		description: 'the type of study',
		examples: ['Bachelor', 'Master', 'Doctorate'],
		title: 'studyType',
	}),

	url: Schema.optionalWith(UrlString, { exact: true }).annotations({
		description: 'URL (as per RFC 3986) of the institution',
		examples: ['http://mit.com'],
		title: 'url',
	}),
}) {}
