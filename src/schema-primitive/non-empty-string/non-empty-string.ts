import * as S from '@effect/schema/Schema'

export interface NonEmptyString extends S.Annotable<NonEmptyString, string> {}
/**
 * Constructs a string schema that removes whitespaces from the beginning and
 * end of the string, while asserting that the string is not empty.
 *
 * @param annotations - optional annotations to be added to the schema
 * @category constructors
 */
export const nonEmptyString = (annotations?: S.Annotations.Schema<string>): NonEmptyString =>
	S.String.annotations(
		annotations ?? {
			identifier: 'NonEmptyString',
			title: 'non empty string',
			description: 'a non empty string',
			examples: ["' test string  '", "'test string'"],
		},
	).pipe(S.compose(S.Trim), S.nonEmpty())
