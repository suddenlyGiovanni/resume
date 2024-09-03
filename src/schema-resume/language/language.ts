import { Schema } from '@effect/schema'

export class Language extends Schema.Class<Language>('Language')({
	fluency: Schema.optionalWith(
		Schema.NonEmptyTrimmedString.annotations({
			title: 'fluency',
			description: 'e.g. Fluent, Beginner',
			examples: ['Fluent', 'Beginner', 'Intermediate', 'Advanced', 'Native'],
		}),
		{ exact: true },
	),

	language: Schema.optionalWith(
		Schema.NonEmptyTrimmedString.annotations({
			title: 'language',
			description: 'e.g. English, Spanish',
			examples: ['English', 'Spanish'],
		}),
		{ exact: true },
	),
}) {}
