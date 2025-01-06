import { Schema } from 'effect'

import { Email, Phone, TrimmedNonEmpty, UrlString } from '../../schema-primitive/index.ts'
import { Role } from './role.ts'

export class Work extends Schema.Class<Work>('Work')({
	contact: Schema.optionalWith(
		Schema.Struct({
			name: Schema.propertySignature(Schema.NonEmptyTrimmedString).annotations({
				title: 'name',
				description: 'The name and role of the contact person',
				examples: ['Mark Zuckerberg (CTO)'],
			}),

			email: Email,

			phone: Schema.optionalWith(Phone, { exact: true }),
		}),
		{ exact: true },
	),

	description: Schema.propertySignature(TrimmedNonEmpty).annotations({
		title: 'description',
		description: 'A short description of the company',
		examples: ['Social Media Company', 'Educational Software Company'],
	}),

	location: Schema.optionalWith(Schema.NonEmptyTrimmedString, { exact: true }).annotations({
		title: 'location',
		description: 'Location of the company',
		examples: ['Menlo Park, CA'],
	}),

	name: Schema.propertySignature(Schema.NonEmptyTrimmedString).annotations({
		title: 'name',
		description: 'Name of the company',
		examples: ['Facebook'],
	}),

	roles: Schema.propertySignature(Schema.NonEmptyArray(Role)).annotations({
		title: 'roles',
		description: 'The roles you had at the company, in reverse chronological order',
	}),

	summary: Schema.optionalWith(TrimmedNonEmpty, { exact: true }).annotations({
		title: 'summary',
		description:
			'A brief introduction of what the company does; a tagline, a mission statement, an elevator pitch; something that gives a sense of the company in a few words',
		examples: [
			'An educational software company that helps students learn through interactive games',
			'Help users to handle all their administrative tasks digitally with ease.',
		],
	}),

	url: Schema.optionalWith(UrlString, { exact: true }),
}) {}
