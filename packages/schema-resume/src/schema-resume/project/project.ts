import { Schema } from 'effect'

import { StringDate, TrimmedNonEmpty, UrlString } from '../../schema-primitive/index.ts'

export class Project extends Schema.Class<Project>('Project')({
	description: Schema.optionalWith(TrimmedNonEmpty, { exact: true }).annotations({
		description: 'Short summary of project',
		examples: ['Collated works of 2017'],
		title: 'description',
	}),

	endDate: Schema.optionalWith(StringDate, { exact: true }),

	entity: Schema.optionalWith(Schema.NonEmptyTrimmedString, { exact: true }).annotations({
		description: 'Specify the relevant company/entity affiliations',
		examples: ['Greenpeace', 'Microsoft'],
		title: 'entity',
	}),

	highlights: Schema.optionalWith(Schema.Array(TrimmedNonEmpty), { exact: true }).annotations({
		description: 'Specify multiple features',
		examples: [['Directs you close but not quite there']],
		title: 'highlights',
	}),

	keywords: Schema.optionalWith(Schema.Array(Schema.NonEmptyTrimmedString), {
		exact: true,
	}).annotations({
		description: 'Specify special elements involved',
		examples: [['AngularJS', 'elements']],
		title: 'keywords',
	}),

	name: Schema.optionalWith(Schema.NonEmptyTrimmedString, { exact: true }).annotations({
		description: 'Name of the project',
		examples: ['The World Wide Web'],
		title: 'name',
	}),

	roles: Schema.optionalWith(Schema.Array(Schema.NonEmptyTrimmedString), {
		exact: true,
	}).annotations({
		description: 'Specify your role on this project or in company',
		examples: [['Team Lead', 'Speaker', 'Writer']],
		title: 'roles',
	}),

	startDate: Schema.optionalWith(StringDate, { exact: true }),

	type: Schema.optionalWith(Schema.NonEmptyTrimmedString, { exact: true }).annotations({
		description: 'Type of project',
		examples: ['volunteering', 'presentation', 'talk', 'application', 'conference'],
		title: 'type',
	}),

	url: Schema.optionalWith(UrlString, { exact: true }).annotations({
		description: 'URL (as per RFC 3986) to the project page',
		examples: ['http://www.computer.org.csdl/mags/co/1996/10/rx069-abs.html'],
		title: 'url',
	}),
}) {}
