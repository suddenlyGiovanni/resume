import { Schema } from 'effect'

import { TrimmedNonEmpty } from '../../schema-primitive/index.ts'

export class Reference extends Schema.Class<Reference>('Reference')({
	name: Schema.propertySignature(Schema.NonEmptyTrimmedString).annotations({
		description: 'The name of the reference',
		examples: ['Timothy Cook'],
		title: 'name',
	}),

	reference: Schema.optionalWith(TrimmedNonEmpty, { exact: true }).annotations({
		description: 'The reference text',
		examples: [
			'Joe blogs was a great employee, who turned up to work at least once a week. He exceeded my expectations when it came to doing nothing.',
		],
		title: 'reference',
	}),
}) {}
