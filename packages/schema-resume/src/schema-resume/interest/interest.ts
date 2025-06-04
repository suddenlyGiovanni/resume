import { Schema } from 'effect'

export class Interest extends Schema.Class<Interest>('Interest')({
	keywords: Schema.optionalWith(Schema.Array(Schema.NonEmptyTrimmedString), {
		exact: true,
	}).annotations({
		description: 'List some keywords pertaining to this interest',
		examples: [['philosophy', 'distributed systems']],
		title: 'keywords',
	}),

	name: Schema.optionalWith(Schema.NonEmptyTrimmedString, { exact: true }).annotations({
		description: 'Interest name',
		examples: ['Philosophy'],
		title: 'name',
	}),
}) {}
