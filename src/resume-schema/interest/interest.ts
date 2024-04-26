import * as S from '@effect/schema/Schema'

import { nonEmptyString } from '@/schema-primitive/index.js'

export const Interest = S.Struct({
	keywords: S.optional(
		S.Array(
			nonEmptyString({
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

	name: S.optional(
		nonEmptyString({
			title: 'name',
			description: 'Interest name',
			examples: ['Philosophy'],
		}),
		{ exact: true },
	),
})

export type Interest = S.Schema.Encoded<typeof Interest>
