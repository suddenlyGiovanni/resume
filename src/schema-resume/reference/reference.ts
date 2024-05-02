import * as S from '@effect/schema/Schema'

import { TrimmedNonEmpty } from '../../schema-primitive/index.js'

export class Reference extends S.Class<Reference>('Reference')({
	name: TrimmedNonEmpty.annotations({
		title: 'name',
		description: 'The name of the reference',
		examples: ['Timothy Cook'],
	}),

	reference: S.optional(
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
