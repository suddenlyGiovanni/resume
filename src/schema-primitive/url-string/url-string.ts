import * as S from '@effect/schema/Schema'

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
					message: () => 'Invalid URL string',
					jsonSchema: { format: 'uri' },
					...annotations,
				},
			),
		)

export interface UrlString extends S.Annotable<UrlString, string> {}

export const UrlString: UrlString = S.String.annotations({
	identifier: 'UrlString',
	title: 'url',
	description: 'URL string that fulfills the URL requirements (as per RFC 3986)',
	examples: [
		'https://example.com',
		'https://example.com/#section',
		'http://example.com:8080',
		'http://🍌🍌🍌.ws',
		'https://www.übercool.de',
	],
}).pipe(validUrlString())
