import { ParseResult, Schema } from 'effect'
// @ts-types="@types/json-schema"
import type { JSONSchema7 } from 'json-schema'

// biome-ignore lint/style/useNamingConvention: this case is correct
export interface ISO8601DateString extends Schema.Annotable<ISO8601DateString, string> {}

const annotations = {
	identifier: 'ISO8601DateString',
	title: 'ISO 8601 Date string',
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
} satisfies Schema.Annotations.Schema<string>
/**
 * A string ISO 8601 date Schema.
 * Given any string date, it validates it to be a valid input for the Date constructor,
 * and then it converts it to a string in the ISO 8601 format.
 *
 * biome-ignore lint/style/useNamingConvention: this case is correct
 */
export const ISO8601DateString: ISO8601DateString = Schema.transformOrFail(
	Schema.Date,
	Schema.String,
	{
		decode: date => ParseResult.succeed(date.toISOString()),
		encode: (maybeIsoStringDate, _, ast) =>
			Number.isNaN(Date.parse(maybeIsoStringDate))
				? ParseResult.fail(
						new ParseResult.Type(ast, maybeIsoStringDate, `Invalid date: ${maybeIsoStringDate}`),
					)
				: ParseResult.succeed(new Date(maybeIsoStringDate)),
		strict: true,
	},
).annotations({
	...annotations,
	jsonSchema: {
		title: annotations.title,
		description: annotations.description,
		format: 'date-time',
		type: 'string',
	} satisfies JSONSchema7,
})
