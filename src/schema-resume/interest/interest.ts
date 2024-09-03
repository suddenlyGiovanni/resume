import { Schema } from '@effect/schema'

export class Interest extends Schema.Class<Interest>('Interest')({
	keywords: Schema.optionalWith(
		Schema.Array(
			Schema.NonEmptyTrimmedString.annotations({
				title: 'keyword',
				examples: ['philosophy'],
			}),
		).annotations({
			title: 'keywords',
			description: 'List some keywords pertaining to this interest',
			examples: [['philosophy', 'distributed systems']],
		}),
		{ exact: true },
	),

	name: Schema.optionalWith(
		Schema.NonEmptyTrimmedString.annotations({
			title: 'name',
			description: 'Interest name',
			examples: ['Philosophy'],
		}),
		{ exact: true },
	),
}) {}
