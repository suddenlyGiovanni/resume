import * as S from '@effect/schema/Schema'
import type { JSONSchema7 } from 'json-schema'

import { omit } from '../trimmed-non-empty/trimmed-non-empty.js'

const email =
	<A extends string>(annotations?: S.Annotations.Filter<A>) =>
	<I, R>(self: S.Schema<A, I, R>) => {
		const regex = /^(?!\.)(?!.*\.\.)([A-Z0-9_+-.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9-]*\.)+[A-Z]{2,}$/i
		const pattern = regex.source
		return self.pipe(
			S.filter((maybeEmail): maybeEmail is A => regex.test(maybeEmail), {
				typeId: { id: S.PatternTypeId, annotation: { regex } },
				description: `an Email address string matching the pattern ${pattern}`,
				message: issue =>
					`expected an Email address string matching the pattern ${pattern}, got "${issue.actual}"`,
				jsonSchema: {
					format: 'email',
					pattern,
					...annotations?.jsonSchema,
				} satisfies JSONSchema7,
				examples: ['<local-part>@<domain>' as A, 'foo@bar.com' as A, 'foo.bar@baz.com' as A],

				// biome-ignore lint/suspicious/noExplicitAny: this is needed.
				arbitrary: () => fc => fc.stringMatching(regex) as any,
				...(annotations ? omit(annotations, 'jsonSchema') : {}),
			}),
		)
	}

export interface Email extends S.Annotable<Email, string> {}

export const Email: Email = S.String.pipe(
	email({
		identifier: 'Email',
		title: 'Email',
	}),
)
