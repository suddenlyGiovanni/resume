import * as S from '@effect/schema/Schema'

import { UrlString, TrimmedNonEmpty, StringDate } from '@/schema-primitive/index.js'

export class Education extends S.Class<Education>('Education')({
	area: TrimmedNonEmpty.annotations({
		title: 'area',
		description: 'e.g. Arts',
		examples: ['Arts', 'Computer Science'],
	}),

	courses: S.optional(
		S.Array(
			TrimmedNonEmpty.annotations({
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

	endDate: S.optional(
		StringDate.annotations({
			title: 'endDate',
			description: 'end date of education',
			examples: ['2020-01-01'],
		}),
		{ exact: true },
	),

	score: S.optional(
		TrimmedNonEmpty.annotations({
			title: 'score',
			description: 'grade point average, e.g. 3.67/4.0',
			examples: ['3.67/4.0'],
		}),
		{
			exact: true,
		},
	),

	institution: TrimmedNonEmpty.annotations({
		title: 'institution',
		description: 'name of the institution',
		examples: ['Massachusetts Institute of Technology'],
	}),

	location: S.optional(TrimmedNonEmpty, { exact: true }),

	startDate: StringDate.annotations({
		title: 'startDate',
		description: 'start date of education',
		examples: ['1970-01-01T00:00'],
	}),

	studyType: TrimmedNonEmpty.annotations({
		title: 'studyType',
		description: 'the type of study',
		examples: ['Bachelor', 'Master', 'Doctorate'],
	}),

	url: S.optional(
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
