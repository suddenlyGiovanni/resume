import { Schema } from '@effect/schema'

import { StringDate, TrimmedNonEmpty } from '../../schema-primitive/index.js'

export class Award extends Schema.Class<Award>('Award')({
	awarder: Schema.optional(
		TrimmedNonEmpty.annotations({
			title: 'awarder',
			description: 'The name of the award given',
			examples: ['Time Magazine'],
		}),
		{ exact: true },
	),

	date: Schema.optional(
		StringDate.annotations({
			title: 'date',
			description: 'Date of the award',
		}),
		{ exact: true },
	),

	summary: Schema.optional(
		TrimmedNonEmpty.annotations({
			title: 'summary',
			description: 'A brief summary of the award',
			examples: ['Received for my work with Quantum Physics'],
		}),
		{ exact: true },
	),

	title: Schema.optional(
		TrimmedNonEmpty.annotations({
			title: 'title',
			description: 'Title of the award',
			examples: ['One of the 100 greatest minds of the century'],
		}),
		{ exact: true },
	),
}) {}
