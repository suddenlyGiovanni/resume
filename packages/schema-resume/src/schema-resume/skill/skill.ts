import { Schema } from 'effect'

export class Skill extends Schema.Class<Skill>('Skill')({
	keywords: Schema.propertySignature(Schema.Array(Schema.NonEmptyTrimmedString)).annotations({
		description: 'List some keywords pertaining to this skill',
		examples: [['Rust', 'Java']],
		title: 'keywords',
	}),

	level: Schema.optionalWith(Schema.NonEmptyTrimmedString, { exact: true }).annotations({
		description: 'Level of expertise',
		examples: ['Master', 'Intermediate'],
		title: 'level',
	}),

	name: Schema.propertySignature(Schema.NonEmptyTrimmedString).annotations({
		description: 'Name of the skill',
		examples: ['Web Development'],
		title: 'name',
	}),
}) {}
