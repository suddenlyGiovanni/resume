import { Schema } from 'effect'
import { UrlString } from '../../schema-primitive/index.js'

export class Profile extends Schema.Class<Profile>('Profile')({
	network: Schema.propertySignature(Schema.NonEmptyTrimmedString).annotations({
		title: 'network',
		description: 'The name of the social network',
		examples: ['Facebook', 'Twitter'],
	}),

	url: Schema.propertySignature(UrlString).annotations({
		title: 'url',
		description: 'The URL of the profile on the social network',
		examples: ['http://twitter.example.com/neutralthoughts'],
	}),

	username: Schema.propertySignature(Schema.NonEmptyTrimmedString).annotations({
		title: 'username',
		description: 'The username of the profile on the social network',
		examples: ['neutralthoughts'],
	}),
}) {}
