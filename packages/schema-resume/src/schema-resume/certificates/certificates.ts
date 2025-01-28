import { Schema } from 'effect'

import { StringDate, UrlString } from '../../schema-primitive/index.ts'

export class Certificate extends Schema.Class<Certificate>('Certificate')({
	name: Schema.optionalWith(Schema.NonEmptyTrimmedString, { exact: true }).annotations({
		title: 'Name',
		description: 'name of the certificate',
		examples: ['e.g. Certified Kubernetes Administrator'],
	}),

	date: Schema.optionalWith(StringDate, { exact: true }).annotations({
		title: 'date',
	}),

	url: Schema.optionalWith(UrlString, { exact: true }).annotations({
		title: 'url',
		description: 'the url of the certificate',
		examples: ['http://example.com/cert.pdf'],
	}),

	issuer: Schema.optionalWith(Schema.NonEmptyTrimmedString, { exact: true }).annotations({
		title: 'issuer',
		description: 'issuer of the certificate',
		examples: ['e.g. CNCF'],
	}),
}) {}
