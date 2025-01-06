import { Schema } from 'effect'

import {
	StringDate,
	TrimmedNonEmpty,
	UrlString,
} from '../../schema-primitive/index.ts'

export class Education extends Schema.Class<Education>('Education')({
	area: Schema.propertySignature(Schema.NonEmptyTrimmedString).annotations({
		title: 'area',
		description: 'e.g. Arts',
		examples: ['Arts', 'Computer Science'],
	}),

	courses: Schema.optionalWith(Schema.Array(Schema.NonEmptyTrimmedString), {
		exact: true,
	}).annotations({
		title: 'courses',
		description: 'List notable courses/subjects',
		examples: [['CS50', 'H1302 - Introduction to American history']],
	}),

	endDate: Schema.optionalWith(StringDate, { exact: true }).annotations({
		title: 'endDate',
		description: 'end date of education',
		examples: ['2020-01-01'],
	}),

	score: Schema.optionalWith(Schema.NonEmptyTrimmedString, {
		exact: true,
	}).annotations({
		title: 'score',
		description: 'grade point average, e.g. 3.67/4.0',
		examples: ['3.67/4.0'],
	}),

	institution: Schema.propertySignature(Schema.NonEmptyTrimmedString).annotations({
		title: 'institution',
		description: 'name of the institution',
		examples: ['Massachusetts Institute of Technology'],
	}),

	location: Schema.optionalWith(TrimmedNonEmpty, { exact: true }),

	startDate: Schema.propertySignature(StringDate).annotations({
		title: 'startDate',
		description: 'start date of education',
		examples: ['1970-01-01T00:00'],
	}),

	studyType: Schema.propertySignature(Schema.NonEmptyTrimmedString).annotations({
		title: 'studyType',
		description: 'the type of study',
		examples: ['Bachelor', 'Master', 'Doctorate'],
	}),

	url: Schema.optionalWith(UrlString, { exact: true }).annotations({
		title: 'url',
		description: 'URL (as per RFC 3986) of the institution',
		examples: ['http://mit.com'],
	}),
}) {}
