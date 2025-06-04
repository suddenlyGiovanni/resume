import { Schema } from 'effect'
// @ts-types="@types/json-schema"
import type { JSONSchema7 } from 'json-schema'

import { omit } from '../trimmed-non-empty/index.ts'

const email =
	<A extends string>(annotations?: Schema.Annotations.Filter<A>) =>
	<I, R>(self: Schema.Schema<A, I, R>) => {
		const regex = /^(?!\.)(?!.*\.\.)([A-Z0-9_+-.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9-]*\.)+[A-Z]{2,}$/i
		const pattern = regex.source
		return self.pipe(
			Schema.filter((maybeEmail): maybeEmail is A => regex.test(maybeEmail), {
				// biome-ignore lint/suspicious/noExplicitAny: this is needed.
				arbitrary: () => fc => fc.stringMatching(regex) as any,
				description: `an Email address string matching the pattern ${pattern}`,
				examples: ['<local-part>@<domain>' as A, 'foo@bar.com' as A, 'foo.bar@baz.com' as A],
				jsonSchema: {
					format: 'email',
					pattern,
					...annotations?.jsonSchema,
				} satisfies JSONSchema7,
				message: issue => `expected an Email address string matching the pattern ${pattern}, got "${issue.actual}"`,
				typeId: { annotation: { regex }, id: Schema.PatternSchemaId },
				...(annotations ? omit(annotations, 'jsonSchema') : {}),
			}),
		)
	}

export interface Email extends Schema.Annotable<Email, string> {}

export const Email: Email = Schema.String.pipe(
	email({
		identifier: 'Email',
		title: 'Email',
	}),
)
