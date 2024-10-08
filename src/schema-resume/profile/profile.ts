import { Schema } from '@effect/schema'
import { UrlString } from '../../schema-primitive/index.js'

export class Profile extends Schema.Class<Profile>('Profile')({
	network: Schema.NonEmptyTrimmedString.annotations({
		title: 'network',
		description: 'The name of the social network',
		examples: ['Facebook', 'Twitter'],
	}),

	url: UrlString.annotations({
		title: 'url',
		description: 'The URL of the profile on the social network',
		examples: ['http://twitter.example.com/neutralthoughts'],
	}),

	username: Schema.NonEmptyTrimmedString.annotations({
		title: 'username',
		description: 'The username of the profile on the social network',
		examples: ['neutralthoughts'],
	}),
}) {}
