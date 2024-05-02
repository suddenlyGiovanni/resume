import * as S from '@effect/schema/Schema'

import { TrimmedNonEmpty } from '../../schema-primitive/index.js'

export class Language extends S.Class<Language>('Language')({
	fluency: S.optional(
		TrimmedNonEmpty.annotations({
			title: 'fluency',
			description: 'e.g. Fluent, Beginner',
			examples: ['Fluent', 'Beginner', 'Intermediate', 'Advanced', 'Native'],
		}),
		{ exact: true },
	),

	language: S.optional(
		TrimmedNonEmpty.annotations({
			title: 'language',
			description: 'e.g. English, Spanish',
			examples: ['English', 'Spanish'],
		}),
		{ exact: true },
	),
}) {}
