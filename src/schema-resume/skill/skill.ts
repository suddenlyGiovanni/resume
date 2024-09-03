import { Schema } from '@effect/schema'

import { TrimmedNonEmpty } from '../../schema-primitive/index.js'

export class Skill extends Schema.Class<Skill>('Skill')({
	keywords: Schema.Array(
		TrimmedNonEmpty.annotations({
			title: 'keyword',
			examples: ['Rust'],
		}),
	).annotations({
		title: 'keywords',
		description: 'List some keywords pertaining to this skill',
		examples: [['Rust', 'Java']],
	}),

	level: Schema.optionalWith(
		TrimmedNonEmpty.annotations({
			title: 'level',
			description: 'Level of expertise',
			examples: ['Master', 'Intermediate'],
		}),
		{ exact: true },
	),

	name: TrimmedNonEmpty.annotations({
		title: 'name',
		description: 'Name of the skill',
		examples: ['Web Development'],
	}),
}) {}
