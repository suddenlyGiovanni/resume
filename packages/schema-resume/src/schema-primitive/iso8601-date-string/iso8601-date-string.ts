import { ParseResult, Schema } from 'effect'
// @ts-types="@types/json-schema"
import type { JSONSchema7 } from 'json-schema'

export interface ISO8601DateString extends Schema.Annotable<ISO8601DateString, string> {}

const annotations = {
	description:
		'A date string conforming to the ISO 8601 format. valid inputs will be converter to fully qualified ISO 8601 strings.',
	examples: [
		'YYYY -> YYYY-MM-DDThh:mm:ss.sssZ',
		'YYYY-MM -> YYYY-MM-DDThh:mm:ss.sssZ',
		'YYYY-MM-DD -> YYYY-MM-DDThh:mm:ss.sssZ',
		'YYYY-MM-DD -> YYYY-MM-DDThh:mm:ss.sssZ',
		'YYYY-MM-DDThh:mm:ss.sss -> YYYY-MM-DDThh:mm:ss.sssZ',
		'YYYY-MM-DDThh:mm:ss.sssZ -> YYYY-MM-DDThh:mm:ss.sssZ',
		'YYYY-MM-DDThh:mm:ss.sss±[hh]:[mm] -> YYYY-MM-DDThh:mm:ss.sssZ',
		'YYYY-MM-DDThh:mm:ss.sss±[hh][mm] -> YYYY-MM-DDThh:mm:ss.sssZ',
	],
	identifier: 'ISO8601DateString',
	title: 'ISO 8601 Date string',
} satisfies Schema.Annotations.Schema<string>
/**
 * A string ISO 8601 date Schema.
 * Given any string date, it validates it to be a valid input for the Date constructor,
 * and then it converts it to a string in the ISO 8601 format.
 */
export const ISO8601DateString: ISO8601DateString = Schema.transformOrFail(Schema.Date, Schema.String, {
	decode: date => ParseResult.succeed(date.toISOString()),
	encode: (maybeIsoStringDate, _, ast) =>
		Number.isNaN(Date.parse(maybeIsoStringDate))
			? ParseResult.fail(new ParseResult.Type(ast, maybeIsoStringDate, `Invalid date: ${maybeIsoStringDate}`))
			: ParseResult.succeed(new Date(maybeIsoStringDate)),
	strict: true,
}).annotations({
	...annotations,
	jsonSchema: {
		description: annotations.description,
		format: 'date-time',
		title: annotations.title,
		type: 'string',
	} satisfies JSONSchema7,
})
