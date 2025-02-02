import { Schema } from 'effect'

import { TrimmedNonEmpty, omit } from '../../schema-primitive/index.ts'

const countryCode =
	<A extends string>(annotations?: Schema.Annotations.Filter<A>) =>
	<I, R>(self: Schema.Schema<A, I, R>): Schema.refine<A, Schema.Schema<A, I, R>> => {
		const regex = /^[A-Z]{2}$/
		const pattern = regex.source
		return self.pipe(
			Schema.filter(
				(a): a is A => {
					if (a.trim().length !== 2) {
						return false
					}
					return regex.test(a)
				},
				{
					description: 'Country code as per ISO-3166-1 ALPHA-2',
					examples: ['US' as A, 'AU' as A, 'IN' as A],
					message: issue =>
						`expected a country code as per ISO-3166-1 ALPHA-2, got "${issue.actual}"`,
					jsonSchema: {
						minLength: 2,
						maxLength: 2,
						pattern,
						...annotations?.jsonSchema,
					},
					...(annotations ? omit(annotations, 'jsonSchema') : {}),
				},
			),
		)
	}

export class Location extends Schema.Class<Location>('Location')({
	address: Schema.optionalWith(TrimmedNonEmpty, { exact: true }).annotations({
		title: 'address',
		description: 'To add multiple address lines, use "\\n".',
		examples: ['1234 Glücklichkeit Straße\nHinterhaus 5. Etage li.'],
	}),

	city: Schema.propertySignature(Schema.NonEmptyTrimmedString).annotations({
		title: 'city',
		description: 'City',
		examples: ['Berlin', 'New York', 'San Francisco'],
	}),

	countryCode: Schema.String.pipe(
		countryCode({
			identifier: 'countryCode',
			title: 'countryCode',
		}),
	),

	postalCode: Schema.optionalWith(Schema.NonEmptyTrimmedString, { exact: true }).annotations({
		title: 'postalCode',
		description: 'European postal code',
		examples: ['12209'],
	}),

	region: Schema.optionalWith(Schema.NonEmptyTrimmedString, { exact: true }).annotations({
		title: 'region',
		description: 'The general region where you live. Can be a US state, or a province',
		examples: ['California', 'Quebec'],
	}),
}) {}
