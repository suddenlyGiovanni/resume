import * as S from '@effect/schema/Schema'

import { nonEmptyString, UrlString } from '@/schema-primitive/index.ts'

export const Project = S.Struct({
	description: S.optional(
		nonEmptyString({
			title: 'description',
			description: 'Short summary of project',
			examples: ['Collated works of 2017'],
		}),
		{ exact: true },
	),

	endDate: S.optional(S.Date, { exact: true }),

	entity: S.optional(
		nonEmptyString({
			title: 'entity',
			description: 'Specify the relevant company/entity affiliations',
			examples: ['Greenpeace', 'Microsoft'],
		}),
		{ exact: true },
	),

	highlights: S.optional(
		S.Array(
			nonEmptyString({
				title: 'highlight',
				description: 'Specify multiple features',
				examples: ['Directs you close but not quite there'],
			}),
		).annotations({
			title: 'highlights',
			description: 'Specify multiple features',
		}),
		{ exact: true },
	),

	keywords: S.optional(
		S.Array(
			nonEmptyString({
				title: 'keyword',
				examples: ['AngularJS', 'elements'],
			}),
		).annotations({
			title: 'keywords',
			description: 'Specify special elements involved',
		}),
		{ exact: true },
	),

	name: S.optional(
		nonEmptyString({
			title: 'name',
			description: 'Name of the project',
			examples: ['The World Wide Web'],
		}),
		{ exact: true },
	),

	roles: S.optional(
		S.Array(
			nonEmptyString({
				title: 'role',
				examples: ['Team Lead', 'Speaker', 'Writer'],
			}),
		).annotations({
			title: 'roles',
			description: 'Specify your role on this project or in company',
		}),
		{ exact: true },
	),

	startDate: S.optional(S.Date, { exact: true }),

	type: S.optional(
		nonEmptyString({
			title: 'type',
			description: 'Type of project',
			examples: ['volunteering', 'presentation', 'talk', 'application', 'conference'],
		}),
		{ exact: true },
	),

	url: S.optional(
		UrlString.annotations({
			title: 'url',
			description: 'URL (as per RFC 3986) to the project page',
			examples: ['http://www.computer.org.csdl/mags/co/1996/10/rx069-abs.html'],
		}),
		{ exact: true },
	),
})

export type Project = S.Schema.Encoded<typeof Project>