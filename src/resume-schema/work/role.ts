import * as S from '@effect/schema/Schema'

import { ISO8601DateString, nonEmptyString } from '@/schema-primitive/index.js'

export class Role extends S.Class<Role>('Role')({
	title: nonEmptyString({
		title: 'title',
		description: 'The title of your position at the company: <seniority level> <role title>',
		examples: ['Junior Software Developer', 'Senior Software Engineer'],
	}),

	startDate: ISO8601DateString.annotations({
		title: 'startDate',
		description: 'The date when you started working in this role',
		examples: ['2011-01-01'],
	}),

	endDate: S.optional(
		ISO8601DateString.annotations({
			title: 'endDate',
			description: 'The date when you stopped working in this role',
			examples: ['2012-01-01'],
		}),
		{ exact: true },
	),

	responsibilities: S.Array(
		nonEmptyString({
			title: 'responsibility',
			description: 'A specific responsibility',
			examples: ['code owner of x'],
		}),
	).annotations({
		title: 'responsibilities',
		description: 'Specify multiple responsibilities',
	}),

	highlights: S.optional(
		S.NonEmptyArray(
			nonEmptyString({
				title: 'highlight',
				description: 'A specific accomplishment',
				examples: ['Increased profits by 20% from 2011-2012 through viral advertising'],
			}),
		).annotations({
			title: 'highlights',
			description: 'Specify multiple accomplishments',
		}),
		{ exact: true },
	),

	technologies: S.optional(
		S.NonEmptyArray(
			nonEmptyString({
				title: 'technology',
				description: 'A specific technology used',
				examples: ['React', 'Node.js'],
			}),
		).annotations({
			title: 'technologies',
			description: 'Specify multiple technologies used',
		}),
		{ exact: true },
	),
}) {}
