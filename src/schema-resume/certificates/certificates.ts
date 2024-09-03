import { Schema } from '@effect/schema'

import { StringDate, UrlString } from '../../schema-primitive/index.js'

export class Certificate extends Schema.Class<Certificate>('Certificate')({
	name: Schema.optionalWith(
		Schema.NonEmptyTrimmedString.annotations({
			title: 'Name',
			description: 'name of the certificate',
			examples: ['e.g. Certified Kubernetes Administrator'],
		}),
		{ exact: true },
	),

	date: Schema.optionalWith(
		StringDate.annotations({
			title: 'date',
		}),
		{ exact: true },
	),

	url: Schema.optionalWith(
		UrlString.annotations({
			title: 'url',
			description: 'the url of the certificate',
			examples: ['http://example.com/cert.pdf'],
		}),
		{ exact: true },
	),

	issuer: Schema.optionalWith(
		Schema.NonEmptyTrimmedString.annotations({
			title: 'issuer',
			description: 'issuer of the certificate',
			examples: ['e.g. CNCF'],
		}),
		{ exact: true },
	),
}) {}
