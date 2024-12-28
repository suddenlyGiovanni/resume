import { Schema } from 'effect'

export class Language extends Schema.Class<Language>('Language')({
	fluency: Schema.optionalWith(Schema.NonEmptyTrimmedString, { exact: true }).annotations({
		title: 'fluency',
		description: 'e.g. Fluent, Beginner',
		examples: ['Fluent', 'Beginner', 'Intermediate', 'Advanced', 'Native'],
	}),

	language: Schema.optionalWith(Schema.NonEmptyTrimmedString, { exact: true }).annotations({
		title: 'language',
		description: 'e.g. English, Spanish',
		examples: ['English', 'Spanish'],
	}),
}) {}
