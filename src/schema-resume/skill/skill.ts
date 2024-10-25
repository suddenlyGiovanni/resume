import { Schema } from 'effect'

export class Skill extends Schema.Class<Skill>('Skill')({
	keywords: Schema.Array(
		Schema.NonEmptyTrimmedString.annotations({
			title: 'keyword',
			examples: ['Rust'],
		}),
	).annotations({
		title: 'keywords',
		description: 'List some keywords pertaining to this skill',
		examples: [['Rust', 'Java']],
	}),

	level: Schema.optionalWith(
		Schema.NonEmptyTrimmedString.annotations({
			title: 'level',
			description: 'Level of expertise',
			examples: ['Master', 'Intermediate'],
		}),
		{ exact: true },
	),

	name: Schema.NonEmptyTrimmedString.annotations({
		title: 'name',
		description: 'Name of the skill',
		examples: ['Web Development'],
	}),
}) {}
