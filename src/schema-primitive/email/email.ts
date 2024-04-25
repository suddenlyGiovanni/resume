import * as S from '@effect/schema/Schema'

export interface Email extends S.Annotable<Email, string> {}

export const Email: Email = S.String.annotations({
	identifier: 'Email',
	title: 'email',
	description: 'Email address',
	examples: ['<local-part>@<domain>', 'foo@bar.com', 'foo.bar@baz.com'],
}).pipe(
	S.pattern(/^(?!\.)(?!.*\.\.)([A-Z0-9_+-.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9-]*\.)+[A-Z]{2,}$/i, {
		description: 'Email address',
	}),
	S.filter(_ => true, { jsonSchema: { format: 'email' } }),
)
