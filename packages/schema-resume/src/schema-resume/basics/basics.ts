import { Schema } from 'effect'

import { Email, Phone, TrimmedNonEmpty, UrlString } from '../../schema-primitive/index.ts'
import { Location } from '../location/location.ts'
import { Profile } from '../profile/profile.ts'

export class Basics extends Schema.Class<Basics>('Basics')({
	email: Email,

	image: Schema.optionalWith(UrlString, { exact: true }).annotations({
		description: 'URL to a image in JPEG or PNG format (as per RFC 3986)',
		title: 'image',
	}),

	label: Schema.propertySignature(Schema.NonEmptyTrimmedString).annotations({
		description: 'Label',
		examples: ['Web Developer'],
		title: 'label',
	}),

	location: Location,

	name: Schema.propertySignature(Schema.NonEmptyTrimmedString).annotations({
		description: 'Your full name',
		examples: ['Thomas Anderson'],
		title: 'name',
	}),

	phone: Schema.optionalWith(Phone, { exact: true }).annotations({
		description:
			'Phone numbers are stored as strings so use any format you like, as long as it is a valid phone number. E.164 format is recommended.',
		examples: ['712-117-2923'],
		title: 'phone',
	}),

	profiles: Schema.Array(Profile).annotations({
		description: 'Specify any number of social networks that you participate in',
		title: 'profiles',
	}),

	summary: Schema.propertySignature(TrimmedNonEmpty).annotations({
		description: 'Write a short 2-3 sentence biography about yourself',
		examples: ['Web Developer with a passion for web-based applications'],
		title: 'summary',
	}),

	url: Schema.optionalWith(UrlString, { exact: true }).annotations({
		description: 'URL (as per RFC 3986) to your website, e.g. personal homepage',
		examples: ['http://thomasanderson.com'],
		title: 'url',
	}),
}) {}
