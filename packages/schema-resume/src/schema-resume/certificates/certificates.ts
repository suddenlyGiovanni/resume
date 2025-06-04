import { Schema } from 'effect'

import { StringDate, UrlString } from '../../schema-primitive/index.ts'

export class Certificate extends Schema.Class<Certificate>('Certificate')({
	date: Schema.optionalWith(StringDate, { exact: true }).annotations({
		title: 'date',
	}),

	issuer: Schema.optionalWith(Schema.NonEmptyTrimmedString, { exact: true }).annotations({
		description: 'issuer of the certificate',
		examples: ['e.g. CNCF'],
		title: 'issuer',
	}),
	name: Schema.optionalWith(Schema.NonEmptyTrimmedString, { exact: true }).annotations({
		description: 'name of the certificate',
		examples: ['e.g. Certified Kubernetes Administrator'],
		title: 'Name',
	}),

	url: Schema.optionalWith(UrlString, { exact: true }).annotations({
		description: 'the url of the certificate',
		examples: ['http://example.com/cert.pdf'],
		title: 'url',
	}),
}) {}
