import { Schema } from 'effect'
// @ts-types="npm:@types/json-schema"
import type { JSONSchema7 } from 'json-schema'

import { omit } from '../trimmed-non-empty/index.ts'

const phone =
	<A extends string>(annotations?: Schema.Annotations.Filter<A>) =>
	<I, R>(self: Schema.Schema<A, I, R>) => {
		const E164Regex = /^\+[1-9]\d{1,14}$/

		return self.pipe(
			Schema.filter(
				// E.164 format: up to 15 digits, starting with '+'a
				(maybePhone): maybePhone is A =>
					E164Regex.test(
						// Replace '00' with '+' at the beginning
						(maybePhone.startsWith('00') ? `+${maybePhone.slice(2)}` : maybePhone)
							// Remove all non-digit characters except the '+' at the beginning
							.replace(/(?!^\+)\D/g, ''),
					),
				{
					examples: [
						'+4907121172923' as A,
						'+441632960961' as A,
						'+353861234567' as A,
						'00353861234567' as A,
						'+39 02 1234567' as A,
						'+1-800-123-4567' as A,
						'+1 800 123 4567' as A,
						'+49 (0) 216 554 1036' as A,
					],
					description: 'a phone number conforming to the E.164 format standard',
					message: issue => `Invalid E.164 phone number: "${String(issue.actual)}"`,
					jsonSchema: {
						pattern: E164Regex.source,
						...annotations?.jsonSchema,
					} satisfies JSONSchema7,
					...(annotations ? omit(annotations, 'jsonSchema') : {}),
				},
			),
		)
	}

export interface Phone extends Schema.Annotable<Phone, string> {}
export const Phone: Phone = Schema.String.pipe(
	phone({
		title: 'PhoneString',
		identifier: 'PhoneString',
	}),
)
