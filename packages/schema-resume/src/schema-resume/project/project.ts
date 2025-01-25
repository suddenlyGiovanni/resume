import { Schema } from 'effect'

import { StringDate, TrimmedNonEmpty, UrlString } from '../../schema-primitive/index.ts'

export class Project extends Schema.Class<Project>('Project')({
	description: Schema.optionalWith(TrimmedNonEmpty, { exact: true }).annotations({
		title: 'description',
		description: 'Short summary of project',
		examples: ['Collated works of 2017'],
	}),

	endDate: Schema.optionalWith(StringDate, { exact: true }),

	entity: Schema.optionalWith(Schema.NonEmptyTrimmedString, { exact: true }).annotations({
		title: 'entity',
		description: 'Specify the relevant company/entity affiliations',
		examples: ['Greenpeace', 'Microsoft'],
	}),

	highlights: Schema.optionalWith(Schema.Array(TrimmedNonEmpty), { exact: true }).annotations({
		title: 'highlights',
		description: 'Specify multiple features',
		examples: [['Directs you close but not quite there']],
	}),

	keywords: Schema.optionalWith(Schema.Array(Schema.NonEmptyTrimmedString), {
		exact: true,
	}).annotations({
		title: 'keywords',
		description: 'Specify special elements involved',
		examples: [['AngularJS', 'elements']],
	}),

	name: Schema.optionalWith(Schema.NonEmptyTrimmedString, { exact: true }).annotations({
		title: 'name',
		description: 'Name of the project',
		examples: ['The World Wide Web'],
	}),

	roles: Schema.optionalWith(Schema.Array(Schema.NonEmptyTrimmedString), {
		exact: true,
	}).annotations({
		title: 'roles',
		description: 'Specify your role on this project or in company',
		examples: [['Team Lead', 'Speaker', 'Writer']],
	}),

	startDate: Schema.optionalWith(StringDate, { exact: true }),

	type: Schema.optionalWith(Schema.NonEmptyTrimmedString, { exact: true }).annotations({
		title: 'type',
		description: 'Type of project',
		examples: ['volunteering', 'presentation', 'talk', 'application', 'conference'],
	}),

	url: Schema.optionalWith(UrlString, { exact: true }).annotations({
		title: 'url',
		description: 'URL (as per RFC 3986) to the project page',
		examples: ['http://www.computer.org.csdl/mags/co/1996/10/rx069-abs.html'],
	}),
}) {}
