import * as S from '@effect/schema/Schema'

import { TrimmedNonEmpty } from '@/schema-primitive/index.js'

export class Interest extends S.Class<Interest>('Interest')({
	keywords: S.optional(
		S.Array(
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

	name: S.optional(
		TrimmedNonEmpty.annotations({
			title: 'name',
			description: 'Interest name',
			examples: ['Philosophy'],
		}),
		{ exact: true },
	),
}) {}
