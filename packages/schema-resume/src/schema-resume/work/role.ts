import { Schema } from 'effect'

import { StringDate, TrimmedNonEmpty } from '../../schema-primitive/index.ts'

export class Role extends Schema.Class<Role>('Role')({
	endDate: Schema.optionalWith(StringDate, { exact: true }).annotations({
		description: 'The date when you stopped working in this role',
		examples: ['2012-01-01'],
		title: 'endDate',
	}),

	highlights: Schema.optionalWith(Schema.NonEmptyArray(TrimmedNonEmpty), {
		exact: true,
	}).annotations({
		description: 'Specify multiple accomplishments',
		examples: [['Increased profits by 20% from 2011-2012 through viral advertising']],
		title: 'highlights',
	}),

	responsibilities: Schema.propertySignature(Schema.Array(TrimmedNonEmpty)).annotations({
		description: 'Specify multiple responsibilities',
		examples: [['code owner of x']],
		title: 'responsibilities',
	}),

	startDate: Schema.propertySignature(StringDate).annotations({
		description: 'The date when you started working in this role',
		examples: ['2011-01-01'],
		title: 'startDate',
	}),

	technologies: Schema.optionalWith(Schema.NonEmptyArray(Schema.NonEmptyTrimmedString), {
		exact: true,
	}).annotations({
		description: 'Specify multiple technologies used',
		examples: [['React', 'Node.js']],
		title: 'technologies',
	}),
	title: Schema.propertySignature(Schema.NonEmptyTrimmedString).annotations({
		description: 'The title of your position at the company: <seniority level> <role title>',
		examples: ['Junior Software Developer', 'Senior Software Engineer'],
		title: 'title',
	}),
}) {}
