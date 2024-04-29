import * as S from '@effect/schema/Schema'

import { Email, StringDate, Phone, UrlString, TrimmedNonEmpty } from '@/schema-primitive/index.js'

import { Role } from './role.js'

export class Work extends S.Class<Work>('Work')({
	contact: S.optional(
		S.Struct({
			name: TrimmedNonEmpty.annotations({
				title: 'name',
				description: 'The name and role of the contact person',
				examples: ['Mark Zuckerberg (CTO)'],
			}),

			email: Email,

			phone: S.optional(Phone, { exact: true }),
		}),
		{ exact: true },
	),

	description: TrimmedNonEmpty.annotations({
		title: 'description',
		description: 'A short description of the company',
		examples: ['Social Media Company', 'Educational Software Company'],
	}),

	endDate: S.optional(
		StringDate.annotations({
			title: 'endDate',
			description: 'The date when you stopped working at the company',
			examples: ['2012-01-01'],
		}),
		{ exact: true },
	),

	location: S.optional(
		TrimmedNonEmpty.annotations({
			title: 'location',
			description: 'Location of the company',
			examples: ['Menlo Park, CA'],
		}),
		{ exact: true },
	),

	name: TrimmedNonEmpty.annotations({
		title: 'name',
		description: 'Name of the company',
		examples: ['Facebook'],
	}),

	roles: S.NonEmptyArray(Role).annotations({
		title: 'roles',
		description: 'The roles you had at the company, in reverse chronological order',
	}),

	startDate: StringDate.annotations({
		title: 'startDate',
		description: 'The date when you started working at the company',
		examples: ['2011-01-01'],
	}),

	summary: S.optional(
		TrimmedNonEmpty.annotations({
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
		S.NonEmptyArray(TrimmedNonEmpty).annotations({
			title: 'technology stack',
			description:
				"the technologies that are powering the company's product; it is optional as it can also be expressed in the roles section",
			examples: [['React', 'Node.js']],
		}),
	),

	url: S.optional(UrlString, { exact: true }),
}) {}
