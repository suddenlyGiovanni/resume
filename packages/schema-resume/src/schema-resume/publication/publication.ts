import { Schema } from 'effect'

import { StringDate, TrimmedNonEmpty, UrlString } from '../../schema-primitive/index.js'

export class Publication extends Schema.Class<Publication>('Publication')({
	name: Schema.optionalWith(Schema.NonEmptyTrimmedString, { exact: true }).annotations({
		title: 'name',
		description: 'The name of the publication',
		examples: ['The World Wide Web'],
	}),

	publisher: Schema.optionalWith(Schema.NonEmptyTrimmedString, { exact: true }).annotations({
		title: 'publisher',
		description: 'The publisher of the publication',
		examples: ['IEEE', 'Computer Magazine'],
	}),

	releaseDate: Schema.optionalWith(StringDate, { exact: true }),

	summary: Schema.optionalWith(TrimmedNonEmpty, { exact: true }).annotations({
		title: 'summary',
		description: 'Short summary of publication',
		examples: ['Discussion of the World Wide Web, HTTP, HTML'],
	}),

	url: Schema.optionalWith(UrlString, { exact: true }).annotations({
		title: 'url',
		description: 'URL (as per RFC 3986) to the publication',
		examples: ['http://www.computer.org.example.com/csdl/mags/co/1996/10/rx069-abs.html'],
	}),
}) {}
