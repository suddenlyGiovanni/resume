import { Schema } from 'effect'

import { TrimmedNonEmpty } from '../../schema-primitive/index.js'

export class Reference extends Schema.Class<Reference>('Reference')({
	name: Schema.propertySignature(Schema.NonEmptyTrimmedString).annotations({
		title: 'name',
		description: 'The name of the reference',
		examples: ['Timothy Cook'],
	}),

	reference: Schema.optionalWith(TrimmedNonEmpty, { exact: true }).annotations({
		title: 'reference',
		description: 'The reference text',
		examples: [
			'Joe blogs was a great employee, who turned up to work at least once a week. He exceeded my expectations when it came to doing nothing.',
		],
	}),
}) {}
