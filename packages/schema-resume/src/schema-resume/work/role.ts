import { Schema } from 'effect'

import { StringDate, TrimmedNonEmpty } from '../../schema-primitive/index.js'

export class Role extends Schema.Class<Role>('Role')({
	title: Schema.propertySignature(Schema.NonEmptyTrimmedString).annotations({
		title: 'title',
		description: 'The title of your position at the company: <seniority level> <role title>',
		examples: ['Junior Software Developer', 'Senior Software Engineer'],
	}),

	startDate: Schema.propertySignature(StringDate).annotations({
		title: 'startDate',
		description: 'The date when you started working in this role',
		examples: ['2011-01-01'],
	}),

	endDate: Schema.optionalWith(StringDate, { exact: true }).annotations({
		title: 'endDate',
		description: 'The date when you stopped working in this role',
		examples: ['2012-01-01'],
	}),

	responsibilities: Schema.propertySignature(Schema.Array(TrimmedNonEmpty)).annotations({
		title: 'responsibilities',
		description: 'Specify multiple responsibilities',
		examples: [['code owner of x']],
	}),

	highlights: Schema.optionalWith(Schema.NonEmptyArray(TrimmedNonEmpty), {
		exact: true,
	}).annotations({
		title: 'highlights',
		description: 'Specify multiple accomplishments',
		examples: [['Increased profits by 20% from 2011-2012 through viral advertising']],
	}),

	technologies: Schema.optionalWith(Schema.NonEmptyArray(Schema.NonEmptyTrimmedString), {
		exact: true,
	}).annotations({
		title: 'technologies',
		description: 'Specify multiple technologies used',
		examples: [['React', 'Node.js']],
	}),
}) {}
