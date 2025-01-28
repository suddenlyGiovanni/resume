import { Schema } from 'effect'

import { StringDate, TrimmedNonEmpty } from '../../schema-primitive/index.ts'

export class Award extends Schema.Class<Award>('Award')({
	awarder: Schema.optionalWith(Schema.NonEmptyTrimmedString, { exact: true }).annotations({
		title: 'awarder',
		description: 'The name of the award given',
		examples: ['Time Magazine'],
	}),

	date: Schema.optionalWith(StringDate, { exact: true }).annotations({
		title: 'date',
		description: 'Date of the award',
	}),

	summary: Schema.optionalWith(TrimmedNonEmpty, { exact: true }).annotations({
		title: 'summary',
		description: 'A brief summary of the award',
		examples: ['Received for my work with Quantum Physics'],
	}),

	title: Schema.optionalWith(Schema.NonEmptyTrimmedString, { exact: true }).annotations({
		title: 'title',
		description: 'Title of the award',
		examples: ['One of the 100 greatest minds of the century'],
	}),
}) {}
