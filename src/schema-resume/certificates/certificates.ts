import { Schema } from '@effect/schema'

import { StringDate, TrimmedNonEmpty, UrlString } from '../../schema-primitive/index.js'

export class Certificate extends Schema.Class<Certificate>('Certificate')({
	name: Schema.optional(
		TrimmedNonEmpty.annotations({
			title: 'Name',
			description: 'name of the certificate',
			examples: ['e.g. Certified Kubernetes Administrator'],
		}),
		{ exact: true },
	),

	date: Schema.optional(
		StringDate.annotations({
			title: 'date',
		}),
		{ exact: true },
	),

	url: Schema.optional(
		UrlString.annotations({
			title: 'url',
			description: 'the url of the certificate',
			examples: ['http://example.com/cert.pdf'],
		}),
		{ exact: true },
	),

	issuer: Schema.optional(
		TrimmedNonEmpty.annotations({
			title: 'issuer',
			description: 'issuer of the certificate',
			examples: ['e.g. CNCF'],
		}),
		{ exact: true },
	),
}) {}
