import * as S from '@effect/schema/Schema'

/**
 * Omit a specific property from an object
 *
 * @template O - The object type
 * @template K - The key of the property to omit
 * @param {O} o - The object to omit the property from
 * @param {K} k - The key of the property to omit
 * @returns {Omit<O, K>} - The object without the omitted property
 */
export const omit = <O extends object, K extends keyof O>(o: O, k: K): Omit<O, K> =>
	Object.entries(o).reduce(
		(_o, [key, value]) =>
			key === k
				? _o
				: {
						..._o,
						[key]: value,
					},
		{} as Omit<O, K>,
	)

/**
 * String filter that validates that given string, after the removal of leading and trailing whitespaces, has a minimum length of 1
 * @category string filter
 */
export const trimmedNonEmpty =
	<A extends string>(annotations?: S.Annotations.Filter<A>) =>
	<I, R>(self: S.Schema<A, I, R>) => {
		const regex = /^[^\s].*[^\s]$/
		const pattern = regex.source

		return self.pipe(
			S.filter((a): a is A => a.trim().length >= 1, {
				description: 'a non-empty string with no leading or trailing whitespace',
				message: issue =>
					`expected a non-empty string with no leading or trailing whitespace, got "${issue.actual}"`,
				jsonSchema: { minLength: 1, pattern, ...annotations?.jsonSchema },
				...(annotations ? omit(annotations, 'jsonSchema') : {}),
			}),
		)
	}

export interface TrimmedNonEmpty extends S.Annotable<TrimmedNonEmpty, string> {}

/**
 * String constructor that validates that given string, after the removal of leading and trailing whitespaces, has a minimum length of 1
 * @categroy string constructor
 */
export const TrimmedNonEmpty: TrimmedNonEmpty = S.String.pipe(
	trimmedNonEmpty({
		identifier: 'TrimmedNonEmpty',
		title: 'TrimmedNonEmpty',
	}),
)
