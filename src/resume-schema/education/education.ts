import * as S from '@effect/schema/Schema'

import { ISO8601DateString, UrlString, nonEmptyString } from '@/schema-primitive/index.js'

export const Education = S.Struct({
	area: nonEmptyString({
		title: 'area',
		description: 'e.g. Arts',
		examples: ['Arts', 'Computer Science'],
	}),

	courses: S.optional(
		S.Array(
			nonEmptyString({
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
		ISO8601DateString.annotations({
			title: 'endDate',
			description: 'end date of education',
			examples: ['2020-01-01'],
		}),
		{ exact: true },
	),

	score: S.optional(
		nonEmptyString({
			title: 'score',
			description: 'grade point average, e.g. 3.67/4.0',
			examples: ['3.67/4.0'],
		}),
		{
			exact: true,
		},
	),

	institution: nonEmptyString({
		title: 'institution',
		description: 'name of the institution',
		examples: ['Massachusetts Institute of Technology'],
	}),

	location: S.optional(nonEmptyString(), { exact: true }),

	startDate: ISO8601DateString.annotations({
		title: 'startDate',
		description: 'start date of education',
		examples: ['1970-01-01T00:00'],
	}),

	studyType: nonEmptyString({
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
}).pipe(
	S.filter(
		education => {
			if (!education.startDate) return true
			// short-circuit if there is no end date
			if (!education.endDate) return true
			// check if the start date is before the end date
			return new Date(education.startDate) < new Date(education.endDate)
		},
		{ message: () => 'The start date must be before the end date' },
	),
)

export type Education = S.Schema.Encoded<typeof Education>
export type EducationType = S.Schema.Type<typeof Education>
