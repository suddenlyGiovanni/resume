import * as S from '@effect/schema/Schema'

import { StringDate, TrimmedNonEmpty, UrlString } from '../../schema-primitive/index.js'

export class Certificate extends S.Class<Certificate>('Certificate')({
	name: S.optional(
		TrimmedNonEmpty.annotations({
			title: 'Name',
			description: 'name of the certificate',
			examples: ['e.g. Certified Kubernetes Administrator'],
		}),
		{ exact: true },
	),

	date: S.optional(
		StringDate.annotations({
			title: 'date',
		}),
		{ exact: true },
	),

	url: S.optional(
		UrlString.annotations({
			title: 'url',
			description: 'the url of the certificate',
			examples: ['http://example.com/cert.pdf'],
		}),
		{ exact: true },
	),

	issuer: S.optional(
		TrimmedNonEmpty.annotations({
			title: 'issuer',
			description: 'issuer of the certificate',
			examples: ['e.g. CNCF'],
		}),
		{ exact: true },
	),
}) {}
