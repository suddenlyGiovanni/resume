import { Schema } from 'effect'

import { StringDate, TrimmedNonEmpty, UrlString } from '../../schema-primitive/index.ts'

export class Publication extends Schema.Class<Publication>('Publication')({
	name: Schema.optionalWith(Schema.NonEmptyTrimmedString, { exact: true }).annotations({
		description: 'The name of the publication',
		examples: ['The World Wide Web'],
		title: 'name',
	}),

	publisher: Schema.optionalWith(Schema.NonEmptyTrimmedString, { exact: true }).annotations({
		description: 'The publisher of the publication',
		examples: ['IEEE', 'Computer Magazine'],
		title: 'publisher',
	}),

	releaseDate: Schema.optionalWith(StringDate, { exact: true }),

	summary: Schema.optionalWith(TrimmedNonEmpty, { exact: true }).annotations({
		description: 'Short summary of publication',
		examples: ['Discussion of the World Wide Web, HTTP, HTML'],
		title: 'summary',
	}),

	url: Schema.optionalWith(UrlString, { exact: true }).annotations({
		description: 'URL (as per RFC 3986) to the publication',
		examples: ['http://www.computer.org.example.com/csdl/mags/co/1996/10/rx069-abs.html'],
		title: 'url',
	}),
}) {}
