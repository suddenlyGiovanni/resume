import * as S from '@effect/schema/Schema'

import { nonEmptyString } from '@/schema-primitive/index.ts'

export const Reference = S.Struct({
	name: nonEmptyString({
		title: 'name',
		description: 'The name of the reference',
		examples: ['Timothy Cook'],
	}),

	reference: S.optional(
		nonEmptyString({
			title: 'reference',
			description: 'The reference text',
			examples: [
				'Joe blogs was a great employee, who turned up to work at least once a week. He exceeded my expectations when it came to doing nothing.',
			],
		}),
		{ exact: true },
	),
})

export type Reference = S.Schema.Encoded<typeof Reference>
