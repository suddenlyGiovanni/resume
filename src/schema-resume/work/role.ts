import { Schema } from '@effect/schema'

import { StringDate, TrimmedNonEmpty } from '../../schema-primitive/index.js'

export class Role extends Schema.Class<Role>('Role')({
	title: Schema.NonEmptyTrimmedString.annotations({
		title: 'title',
		description: 'The title of your position at the company: <seniority level> <role title>',
		examples: ['Junior Software Developer', 'Senior Software Engineer'],
	}),

	startDate: StringDate.annotations({
		title: 'startDate',
		description: 'The date when you started working in this role',
		examples: ['2011-01-01'],
	}),

	endDate: Schema.optionalWith(
		StringDate.annotations({
			title: 'endDate',
			description: 'The date when you stopped working in this role',
			examples: ['2012-01-01'],
		}),
		{ exact: true },
	),

	responsibilities: Schema.Array(
		TrimmedNonEmpty.annotations({
			title: 'responsibility',
			description: 'A specific responsibility',
			examples: ['code owner of x'],
		}),
	).annotations({
		title: 'responsibilities',
		description: 'Specify multiple responsibilities',
	}),

	highlights: Schema.optionalWith(
		Schema.NonEmptyArray(
			TrimmedNonEmpty.annotations({
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

	technologies: Schema.optionalWith(
		Schema.NonEmptyArray(
			Schema.NonEmptyTrimmedString.annotations({
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
