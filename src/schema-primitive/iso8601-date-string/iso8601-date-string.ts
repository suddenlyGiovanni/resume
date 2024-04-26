import * as ParseResult from '@effect/schema/ParseResult'
import * as S from '@effect/schema/Schema'

export interface ISO8601DateString extends S.Annotable<ISO8601DateString, string> {}

/**
 * A string ISO 8601 date Schema.
 * Given any string date, it validates it to be a valid input for the Date constructor,
 * and then it converts it to a string in the ISO 8601 format.
 */
export const ISO8601DateString: ISO8601DateString = S.transformOrFail(
	S.Date,
	S.String.annotations({
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
	}),
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
)
