import { Schema } from 'effect'

export class Language extends Schema.Class<Language>('Language')({
	fluency: Schema.optionalWith(Schema.NonEmptyTrimmedString, { exact: true }).annotations({
		description: 'e.g. Fluent, Beginner',
		examples: ['Fluent', 'Beginner', 'Intermediate', 'Advanced', 'Native'],
		title: 'fluency',
	}),

	language: Schema.optionalWith(Schema.NonEmptyTrimmedString, { exact: true }).annotations({
		description: 'e.g. English, Spanish',
		examples: ['English', 'Spanish'],
		title: 'language',
	}),
}) {}
