import { Schema } from 'effect'
import type { JSONSchema7 } from 'json-schema'

import { omit } from '../trimmed-non-empty/index.js'

export const stringDate =
	<A extends string>(annotations?: Schema.Annotations.Filter<A>) =>
	<I, R>(self: Schema.Schema<A, I, R>) => {
		return self.pipe(
			Schema.filter(
				(maybeStringDate): maybeStringDate is A =>
					Number.isNaN(Date.parse(maybeStringDate))
						? false
						: new Date(maybeStringDate).toISOString().slice(0, 10) === maybeStringDate,
				{
					description: 'a string that is a valid YYYY-MM-DD date',
					message: issue => `expected a sting date 'YYYY-MM-DD', got '${issue.actual}'`,
					jsonSchema: {
						minLength: 10,
						maxLength: 10,
						format: 'date',
						...annotations?.jsonSchema,
					} satisfies JSONSchema7,
					...(annotations ? omit(annotations, 'jsonSchema') : {}),
				},
			),
		)
	}

export interface StringDate extends Schema.Annotable<StringDate, string> {}

/**
 * String constructor that validates that given string date fulfils the YYYY-MM-DD specification
 * @categroy string constructor
 */
export const StringDate: StringDate = Schema.String.pipe(
	stringDate({
		identifier: 'StringDate',
		title: 'StringDate',
	}),
)
