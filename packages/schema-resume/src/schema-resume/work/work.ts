import { Schema } from 'effect'

import { Email, Phone, TrimmedNonEmpty, UrlString } from '../../schema-primitive/index.ts'
import { Role } from './role.ts'

export class Work extends Schema.Class<Work>('Work')({
	contact: Schema.optionalWith(
		Schema.Struct({
			email: Email,
			name: Schema.propertySignature(Schema.NonEmptyTrimmedString).annotations({
				description: 'The name and role of the contact person',
				examples: ['Mark Zuckerberg (CTO)'],
				title: 'name',
			}),

			phone: Schema.optionalWith(Phone, { exact: true }),
		}),
		{ exact: true },
	),

	description: Schema.propertySignature(TrimmedNonEmpty).annotations({
		description: 'A short description of the company',
		examples: ['Social Media Company', 'Educational Software Company'],
		title: 'description',
	}),

	location: Schema.optionalWith(Schema.NonEmptyTrimmedString, { exact: true }).annotations({
		description: 'Location of the company',
		examples: ['Menlo Park, CA'],
		title: 'location',
	}),

	name: Schema.propertySignature(Schema.NonEmptyTrimmedString).annotations({
		description: 'Name of the company',
		examples: ['Facebook'],
		title: 'name',
	}),

	roles: Schema.propertySignature(Schema.NonEmptyArray(Role)).annotations({
		description: 'The roles you had at the company, in reverse chronological order',
		title: 'roles',
	}),

	summary: Schema.optionalWith(TrimmedNonEmpty, { exact: true }).annotations({
		description:
			'A brief introduction of what the company does; a tagline, a mission statement, an elevator pitch; something that gives a sense of the company in a few words',
		examples: [
			'An educational software company that helps students learn through interactive games',
			'Help users to handle all their administrative tasks digitally with ease.',
		],
		title: 'summary',
	}),

	url: Schema.optionalWith(UrlString, { exact: true }),
}) {}
