import * as S from '@effect/schema/Schema'

import { nonEmptyString } from '@/schema-primitive/index.ts'

export const Language = S.Struct({
	fluency: S.optional(
		nonEmptyString({
			title: 'fluency',
			description: 'e.g. Fluent, Beginner',
			examples: ['Fluent', 'Beginner', 'Intermediate', 'Advanced', 'Native'],
		}),
		{ exact: true },
	),

	language: S.optional(
		nonEmptyString({
			title: 'language',
			description: 'e.g. English, Spanish',
			examples: ['English', 'Spanish'],
		}),
		{ exact: true },
	),
})

export type Language = S.Schema.Encoded<typeof Language>
