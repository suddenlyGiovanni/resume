import { Schema } from 'effect'

export const ISODateString: Schema.refine<
	Schema.Schema.Type<Schema.Schema<string, string, never>>,
	Schema.Schema<string, string, never>
> = Schema.compose(Schema.Trim, Schema.NonEmptyString)
	.pipe(
		Schema.pattern(
			/^[0-9]{4}-((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01])|(0[469]|11)-(0[1-9]|[12][0-9]|30)|(02)-(0[1-9]|[12][0-9]))T(0[0-9]|1[0-9]|2[0-3]):(0[0-9]|[1-5][0-9]):(0[0-9]|[1-5][0-9])\.[0-9]{3}Z$/,
		),
	)
	.annotations({
		description: 'Using ISO 8601',
		examples: ['2012-04-05T10:00:00.000Z'],
		title: 'date',
	})
