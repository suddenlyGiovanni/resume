import * as S from '@effect/schema/Schema'
import { omit } from '../trimmed-non-empty/trimmed-non-empty.js'

export const stringDate =
	<A extends string>(annotations?: S.Annotations.Filter<A>) =>
	<I, R>(self: S.Schema<A, I, R>) => {
		return self.pipe(
			S.filter(
				(maybeStringDate): maybeStringDate is A => {
					if (Number.isNaN(Date.parse(maybeStringDate))) {
						return false
					}
					const date = new Date(maybeStringDate)
					const formattedDate = `${date.getFullYear()}-${
						date.getMonth() + 1
					}-${date.getDate()}` as const
					return formattedDate === maybeStringDate
				},
				{
					description: 'a string that is a valid YYYY-MM-DD date',
					message: issue => `expected a sting date 'YYYY-MM-DD', got '${issue.actual}'`,
					jsonSchema: { minLength: 10, maxLength: 10, format: 'date', ...annotations?.jsonSchema },
					...(annotations ? omit(annotations, 'jsonSchema') : {}),
				},
			),
		)
	}

export interface StringDate extends S.Annotable<StringDate, string> {}

/**
 * String constructor that validates that given string date fulfils the YYYY-MM-DD specification
 * @categroy string constructor
 */
export const StringDate: StringDate = S.String.pipe(
	stringDate({
		identifier: 'StringDate',
		title: 'StringDate',
	}),
)
