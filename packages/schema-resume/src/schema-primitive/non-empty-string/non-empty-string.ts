import { Schema } from 'effect'

export interface NonEmptyString extends Schema.Annotable<NonEmptyString, string> {}
/**
 * Constructs a string schema that removes whitespaces from the beginning and
 * end of the string, while asserting that the string is not empty.
 *
 * @param annotations - optional annotations to be added to the schema
 * @category constructors
 */
export const nonEmptyString = (annotations?: Schema.Annotations.Schema<string>): NonEmptyString =>
	Schema.String.annotations(
		annotations ?? {
			identifier: 'NonEmptyString',
			title: 'non empty string',
			description: 'a non empty string',
			examples: ["' test string  '", "'test string'"],
		},
	).pipe(Schema.compose(Schema.Trim), Schema.nonEmptyString())
