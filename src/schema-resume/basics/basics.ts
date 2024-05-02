import * as S from '@effect/schema/Schema'

import { Email, Phone, TrimmedNonEmpty, UrlString } from '../../schema-primitive/index.js'
import { Location } from '../location/location.js'
import { Profile } from '../profile/profile.js'

export class Basics extends S.Class<Basics>('Basics')({
	email: Email,

	image: S.optional(
		UrlString.annotations({
			title: 'image',
			description: 'URL to a image in JPEG or PNG format (as per RFC 3986)',
		}),
		{ exact: true },
	),

	label: TrimmedNonEmpty.annotations({
		title: 'label',
		description: 'Label',
		examples: ['Web Developer'],
	}),

	location: Location,

	name: TrimmedNonEmpty.annotations({
		title: 'name',
		description: 'Your full name',
		examples: ['Thomas Anderson'],
	}),

	phone: S.optional(
		Phone.annotations({
			title: 'phone',
			description:
				'Phone numbers are stored as strings so use any format you like, as long as it is a valid phone number. E.164 format is recommended.',
			examples: ['712-117-2923'],
		}),
		{ exact: true },
	),

	profiles: S.Array(Profile).annotations({
		title: 'profiles',
		description: 'Specify any number of social networks that you participate in',
	}),

	summary: TrimmedNonEmpty.annotations({
		title: 'summary',
		description: 'Write a short 2-3 sentence biography about yourself',
		examples: ['Web Developer with a passion for web-based applications'],
	}),

	url: S.optional(
		UrlString.annotations({
			title: 'url',
			description: 'URL (as per RFC 3986) to your website, e.g. personal homepage',
			examples: ['http://thomasanderson.com'],
		}),
		{
			exact: true,
		},
	),
}) {}
