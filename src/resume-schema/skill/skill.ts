import * as S from '@effect/schema/Schema'

import { nonEmptyString } from '@/schema-primitive/index.js'

export const Skill = S.Struct({
	keywords: S.Array(
		nonEmptyString({
			title: 'keyword',
			examples: ['Rust'],
		}),
	).annotations({
		title: 'keywords',
		description: 'List some keywords pertaining to this skill',
		examples: [['Rust', 'Java']],
	}),

	level: S.optional(
		nonEmptyString({
			title: 'level',
			description: 'Level of expertise',
			examples: ['Master', 'Intermediate'],
		}),
		{ exact: true },
	),

	name: nonEmptyString({
		title: 'name',
		description: 'Name of the skill',
		examples: ['Web Development'],
	}),
})

export type Skill = S.Schema.Encoded<typeof Skill>
export type SkillType = S.Schema.Type<typeof Skill>
