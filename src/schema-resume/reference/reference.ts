import { Schema } from '@effect/schema'

import { TrimmedNonEmpty } from '../../schema-primitive/index.js'

export class Reference extends Schema.Class<Reference>('Reference')({
	name: Schema.NonEmptyTrimmedString.annotations({
		title: 'name',
		description: 'The name of the reference',
		examples: ['Timothy Cook'],
	}),

	reference: Schema.optionalWith(
		TrimmedNonEmpty.annotations({
			title: 'reference',
			description: 'The reference text',
			examples: [
				'Joe blogs was a great employee, who turned up to work at least once a week. He exceeded my expectations when it came to doing nothing.',
			],
		}),
		{ exact: true },
	),
}) {}
