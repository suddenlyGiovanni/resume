import * as S from '@effect/schema/Schema'

import { TrimmedNonEmpty } from '@/schema-primitive/index.js'

export class Location extends S.Class<Location>('Location')({
	address: S.optional(
		TrimmedNonEmpty.annotations({
			title: 'address',
			description: 'To add multiple address lines, use "\\n".',
			examples: ['1234 Glücklichkeit Straße\nHinterhaus 5. Etage li.'],
		}),
		{ exact: true },
	),

	city: TrimmedNonEmpty.annotations({
		title: 'city',
		description: 'City',
		examples: ['Berlin', 'New York', 'San Francisco'],
	}),

	countryCode: S.String.pipe(S.trimmed(), S.length(2), S.uppercased()).annotations({
		title: 'countryCode',
		description: 'Country code as per ISO-3166-1 ALPHA-2',
		examples: ['US', 'AU', 'IN'],
	}),

	postalCode: S.optional(
		TrimmedNonEmpty.annotations({
			title: 'postalCode',
			description: 'European postal code',
			examples: ['12209'],
		}),
		{
			exact: true,
		},
	),

	region: S.optional(
		TrimmedNonEmpty.annotations({
			title: 'region',
			description: 'The general region where you live. Can be a US state, or a province',
			examples: ['California', 'Quebec'],
		}),
		{ exact: true },
	),
}) {}
