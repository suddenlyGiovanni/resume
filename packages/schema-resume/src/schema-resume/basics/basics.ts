import { Schema } from 'effect'

import { Email, Phone, TrimmedNonEmpty, UrlString } from '../../schema-primitive/index.js'
import { Location } from '../location/location.js'
import { Profile } from '../profile/profile.js'

export class Basics extends Schema.Class<Basics>('Basics')({
	email: Email,

	image: Schema.optionalWith(UrlString, { exact: true }).annotations({
		title: 'image',
		description: 'URL to a image in JPEG or PNG format (as per RFC 3986)',
	}),

	label: Schema.propertySignature(Schema.NonEmptyTrimmedString).annotations({
		title: 'label',
		description: 'Label',
		examples: ['Web Developer'],
	}),

	location: Location,

	name: Schema.propertySignature(Schema.NonEmptyTrimmedString).annotations({
		title: 'name',
		description: 'Your full name',
		examples: ['Thomas Anderson'],
	}),

	phone: Schema.optionalWith(Phone, { exact: true }).annotations({
		title: 'phone',
		description:
			'Phone numbers are stored as strings so use any format you like, as long as it is a valid phone number. E.164 format is recommended.',
		examples: ['712-117-2923'],
	}),

	profiles: Schema.Array(Profile).annotations({
		title: 'profiles',
		description: 'Specify any number of social networks that you participate in',
	}),

	summary: Schema.propertySignature(TrimmedNonEmpty).annotations({
		title: 'summary',
		description: 'Write a short 2-3 sentence biography about yourself',
		examples: ['Web Developer with a passion for web-based applications'],
	}),

	url: Schema.optionalWith(UrlString, { exact: true }).annotations({
		title: 'url',
		description: 'URL (as per RFC 3986) to your website, e.g. personal homepage',
		examples: ['http://thomasanderson.com'],
	}),
}) {}
