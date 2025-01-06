import { Schema } from 'effect'
import type { JSONSchema7 } from 'json-schema'

import { omit } from '../trimmed-non-empty/index.ts'

/**
 * Verifies that a string is a valid URL (as per RFC 3986).
 * Note. This combinator does not make any transformations, it only validates.
 *
 * @category string filters
 */
const validUrlString =
	<A extends string>(annotations?: Schema.Annotations.Filter<A>) =>
	<I, R>(self: Schema.Schema<A, I, R>): Schema.Schema<A, I, R> =>
		self.pipe(
			Schema.filter(
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
					jsonSchema: { format: 'uri', ...annotations?.jsonSchema } satisfies JSONSchema7,
					...(annotations ? omit(annotations, 'jsonSchema') : {}),
				},
			),
		)

export interface UrlString extends Schema.Annotable<UrlString, string> {}

export const UrlString: UrlString = Schema.String.pipe(
	validUrlString({
		identifier: 'UrlString',
		title: 'UrlString',
	}),
)
