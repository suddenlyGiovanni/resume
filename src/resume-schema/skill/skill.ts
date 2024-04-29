import * as S from '@effect/schema/Schema'

import { TrimmedNonEmpty } from '@/schema-primitive/index.js'

export const Skill = S.Struct({
	keywords: S.Array(
		TrimmedNonEmpty.annotations({
			title: 'keyword',
			examples: ['Rust'],
		}),
	).annotations({
		title: 'keywords',
		description: 'List some keywords pertaining to this skill',
		examples: [['Rust', 'Java']],
	}),

	level: S.optional(
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
})

export type Skill = S.Schema.Encoded<typeof Skill>
export type SkillType = S.Schema.Type<typeof Skill>
