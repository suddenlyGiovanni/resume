import { Schema } from 'effect'

export class Skill extends Schema.Class<Skill>('Skill')({
	keywords: Schema.propertySignature(Schema.Array(Schema.NonEmptyTrimmedString)).annotations({
		title: 'keywords',
		description: 'List some keywords pertaining to this skill',
		examples: [['Rust', 'Java']],
	}),

	level: Schema.optionalWith(Schema.NonEmptyTrimmedString, { exact: true }).annotations({
		title: 'level',
		description: 'Level of expertise',
		examples: ['Master', 'Intermediate'],
	}),

	name: Schema.propertySignature(Schema.NonEmptyTrimmedString).annotations({
		title: 'name',
		description: 'Name of the skill',
		examples: ['Web Development'],
	}),
}) {}
