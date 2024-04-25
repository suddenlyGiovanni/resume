import * as S from '@effect/schema/Schema'
import { pipe } from 'effect/Function'

// Function to convert the human-readable phone number into its E.164 format
function toE164<A extends string>(phone: A): string {
	// Replace '00' with '+' at the beginning
	const e164Phone = phone.startsWith('00') ? `+${phone.slice(2)}` : phone
	// Remove all non-digit characters except the '+' at the beginning
	return e164Phone.replace(/(?!^\+)\D/g, '')
}

const E164Regex = /^\+[1-9]\d{1,14}$/

// Function to validate the E.164 formatted number
function isValidE164<A extends string>(phone: A): boolean {
	// E.164 format: up to 15 digits, starting with '+'

	return E164Regex.test(phone)
}

const phonePredicate = <A extends string>(phone: A): phone is A => pipe(phone, toE164, isValidE164)

export interface Phone extends S.Annotable<Phone, string> {}

export const Phone: Phone = S.compose(
	// The phone number should be a non-empty string
	S.Trim,
	S.NonEmpty,
)
	.pipe(
		// Convert the phone number to E.164 format and validate it
		S.filter(phonePredicate, {
			message: ({ actual }) => `Invalid E.164 phone number: "${String(actual)}"`,
			jsonSchema: { pattern: E164Regex.source },
		}),
	)
	.annotations({
		identifier: 'Phone',
		title: 'Phone',
		description: 'Phone number that can be coveted to a valid E.164 format',
		examples: [
			'+4907121172923',
			'+441632960961',
			'+353861234567',
			'00353861234567',
			'+39 02 1234567',
			'+1-800-123-4567',
			'+1 800 123 4567',
			'+49 (0) 216 554 1036',
		],
	})
