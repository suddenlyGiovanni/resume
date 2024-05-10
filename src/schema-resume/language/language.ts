import { Schema } from '@effect/schema'

import { TrimmedNonEmpty } from '../../schema-primitive/index.js'

export class Language extends Schema.Class<Language>('Language')({
	fluency: Schema.optional(
		TrimmedNonEmpty.annotations({
			title: 'fluency',
			description: 'e.g. Fluent, Beginner',
			examples: ['Fluent', 'Beginner', 'Intermediate', 'Advanced', 'Native'],
		}),
		{ exact: true },
	),

	language: Schema.optional(
		TrimmedNonEmpty.annotations({
			title: 'language',
			description: 'e.g. English, Spanish',
			examples: ['English', 'Spanish'],
		}),
		{ exact: true },
	),
}) {}
