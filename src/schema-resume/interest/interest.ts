import { Schema } from 'effect'

export class Interest extends Schema.Class<Interest>('Interest')({
	keywords: Schema.optionalWith(Schema.Array(Schema.NonEmptyTrimmedString), {
		exact: true,
	}).annotations({
		title: 'keywords',
		description: 'List some keywords pertaining to this interest',
		examples: [['philosophy', 'distributed systems']],
	}),

	name: Schema.optionalWith(Schema.NonEmptyTrimmedString, { exact: true }).annotations({
		title: 'name',
		description: 'Interest name',
		examples: ['Philosophy'],
	}),
}) {}
