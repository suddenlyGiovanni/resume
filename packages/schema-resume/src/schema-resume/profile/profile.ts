import { Schema } from 'effect'
import { UrlString } from '../../schema-primitive/index.ts'

export class Profile extends Schema.Class<Profile>('Profile')({
	network: Schema.propertySignature(Schema.NonEmptyTrimmedString).annotations({
		description: 'The name of the social network',
		examples: ['Facebook', 'Twitter'],
		title: 'network',
	}),

	url: Schema.propertySignature(UrlString).annotations({
		description: 'The URL of the profile on the social network',
		examples: ['http://twitter.example.com/neutralthoughts'],
		title: 'url',
	}),

	username: Schema.propertySignature(Schema.NonEmptyTrimmedString).annotations({
		description: 'The username of the profile on the social network',
		examples: ['neutralthoughts'],
		title: 'username',
	}),
}) {}
