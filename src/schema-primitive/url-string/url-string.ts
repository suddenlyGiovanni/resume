import * as S from '@effect/schema/Schema'

import { omit } from '../trimmed-non-empty/trimmed-non-empty.js'

/**
 * Verifies that a string is a valid URL (as per RFC 3986).
 * Note. This combinator does not make any transformations, it only validates.
 *
 * @category string filters
 */
const validUrlString =
	<A extends string>(annotations?: S.Annotations.Filter<A>) =>
	<I, R>(self: S.Schema<A, I, R>): S.Schema<A, I, R> =>
		self.pipe(
			S.filter(
				(maybeUrl): maybeUrl is A => {
					try {
						new URL(maybeUrl)
						return true
					} catch (_) {
						return false
					}
				},
				{
					description: 'a string that fulfills the URL requirements (as per RFC 3986)',
					message: issue => `Invalid URL string; got: '${issue.actual}'`,
					examples: [
						'https://example.com' as A,
						'https://example.com/#section' as A,
						'http://example.com:8080' as A,
						'http://🍌🍌🍌.ws' as A,
						'https://www.übercool.de' as A,
					],
					jsonSchema: { format: 'uri', ...annotations?.jsonSchema },
					...(annotations ? omit(annotations, 'jsonSchema') : {}),
				},
			),
		)

export interface UrlString extends S.Annotable<UrlString, string> {}

export const UrlString: UrlString = S.String.pipe(
	validUrlString({
		identifier: 'UrlString',
		title: 'UrlString',
	}),
)
