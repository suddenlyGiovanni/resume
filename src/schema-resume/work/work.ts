import { Schema } from '@effect/schema'

import { Email, Phone, TrimmedNonEmpty, UrlString } from '../../schema-primitive/index.js'
import { Role } from './role.js'

export class Work extends Schema.Class<Work>('Work')({
	contact: Schema.optionalWith(
		Schema.Struct({
			name: TrimmedNonEmpty.annotations({
				title: 'name',
				description: 'The name and role of the contact person',
				examples: ['Mark Zuckerberg (CTO)'],
			}),

			email: Email,

			phone: Schema.optionalWith(Phone, { exact: true }),
		}),
		{ exact: true },
	),

	description: TrimmedNonEmpty.annotations({
		title: 'description',
		description: 'A short description of the company',
		examples: ['Social Media Company', 'Educational Software Company'],
	}),

	location: Schema.optionalWith(
		TrimmedNonEmpty.annotations({
			title: 'location',
			description: 'Location of the company',
			examples: ['Menlo Park, CA'],
		}),
		{ exact: true },
	),

	name: TrimmedNonEmpty.annotations({
		title: 'name',
		description: 'Name of the company',
		examples: ['Facebook'],
	}),

	roles: Schema.NonEmptyArray(Role).annotations({
		title: 'roles',
		description: 'The roles you had at the company, in reverse chronological order',
	}),

	summary: Schema.optionalWith(
		TrimmedNonEmpty.annotations({
			title: 'summary',
			description:
				'A brief introduction of what the company does; a tagline, a mission statement, an elevator pitch; something that gives a sense of the company in a few words',
			examples: [
				'An educational software company that helps students learn through interactive games',
				'Help users to handle all their administrative tasks digitally with ease.',
			],
		}),
		{ exact: true },
	),

	url: Schema.optionalWith(UrlString, { exact: true }),
}) {}
