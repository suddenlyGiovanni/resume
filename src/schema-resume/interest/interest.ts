import { Schema } from '@effect/schema'

import { TrimmedNonEmpty } from '../../schema-primitive/index.js'

export class Interest extends Schema.Class<Interest>('Interest')({
	keywords: Schema.optionalWith(
		Schema.Array(
			TrimmedNonEmpty.annotations({
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
		TrimmedNonEmpty.annotations({
			title: 'name',
			description: 'Interest name',
			examples: ['Philosophy'],
		}),
		{ exact: true },
	),
}) {}
