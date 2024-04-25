import * as S from '@effect/schema/Schema'

import {
	Email,
	ISO8601DateString,
	nonEmptyString,
	Phone,
	UrlString,
} from '@/schema-primitive/index.ts'

import { Role } from './role.ts'

export const Work = S.Struct({
	contact: S.optional(
		S.Struct({
			name: nonEmptyString({
				title: 'name',
				description: 'The name and role of the contact person',
				examples: ['Mark Zuckerberg (CTO)'],
			}),

			email: Email,

			phone: S.optional(Phone, { exact: true }),
		}),
		{ exact: true },
	),

	description: nonEmptyString({
		title: 'description',
		description: 'A short description of the company',
		examples: ['Social Media Company', 'Educational Software Company'],
	}),

	endDate: S.optional(
		ISO8601DateString.annotations({
			title: 'endDate',
			description: 'The date when you stopped working at the company',
			examples: ['2012-01-01'],
		}),
		{ exact: true },
	),

	location: S.optional(
		nonEmptyString({
			title: 'location',
			description: 'Location of the company',
			examples: ['Menlo Park, CA'],
		}),
		{ exact: true },
	),

	name: nonEmptyString({
		title: 'name',
		description: 'Name of the company',
		examples: ['Facebook'],
	}),

	roles: S.NonEmptyArray(Role).annotations({
		title: 'roles',
		description: 'The roles you had at the company, in reverse chronological order',
	}),

	startDate: ISO8601DateString.annotations({
		title: 'startDate',
		description: 'The date when you started working at the company',
		examples: ['2011-01-01'],
	}),

	summary: S.optional(
		nonEmptyString({
			title: 'summary',
			description:
				'A brief introduction of what the company does; a tagline, a mission statement, an elevator pitch; something that gives a sense of the company in a few words',
			examples: [
				'An educational software company that helps students learn through interactive games',
				'Help users to handle all their administrative tasks digitally with ease.',
			],
		}),
		{ exact: true },
	),

	techStack: S.optional(
		S.NonEmptyArray(nonEmptyString()).annotations({
			title: 'technology stack',
			description:
				"the technologies that are powering the company's product; it is optional as it can also be expressed in the roles section",
			examples: [['React', 'Node.js']],
		}),
	),

	url: S.optional(UrlString, { exact: true }),
}).pipe(
	S.filter(
		work => {
			// short-circuit if there is no end date
			if (!work.endDate) return true
			// check if the start date is before the end date
			return new Date(work.startDate) < new Date(work.endDate)
		},
		{ message: () => 'The start date must be before the end date' },
	),
)

export type WorkEncoded = S.Schema.Encoded<typeof Work>
export type WorkType = S.Schema.Type<typeof Work>