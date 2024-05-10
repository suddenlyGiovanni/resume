import { Schema } from '@effect/schema'

import { Award } from './award/award.js'
import { Basics } from './basics/basics.js'
import { Certificate } from './certificates/certificates.js'
import { Education } from './education/education.js'
import { Interest } from './interest/interest.js'
import { Language } from './language/language.js'
import { Project } from './project/project.js'
import { Publication } from './publication/publication.js'
import { Reference } from './reference/reference.js'
import { Skill } from './skill/skill.js'
import { Volunteer } from './volunteer/volunteer.js'
import { Work } from './work/work.js'

export class Resume extends Schema.Class<Resume>('Resume')({
	$schema: Schema.String.annotations({
		title: '$schema',
		description: 'link to the version of the schema that can validate the resume',
		examples: ['http://jsonresume.org/schema'],
	}),

	awards: Schema.optional(
		Schema.Array(Award).annotations({
			title: 'awards',
			description: 'Specify any awards you have received throughout your professional career',
		}),
		{ exact: true },
	),

	basics: Basics,

	certificates: Schema.optional(
		Schema.Array(Certificate).annotations({
			title: 'certificates',
			description: 'Specify any certificates you have received throughout your professional career',
		}),
		{ exact: true },
	),

	education: Schema.Array(Education),

	interests: Schema.optional(Schema.Array(Interest), { exact: true }),

	languages: Schema.optional(
		Schema.Array(Language).annotations({
			title: 'languages',
			description: 'List any other languages you speak',
		}),
		{ exact: true },
	),

	projects: Schema.optional(
		Schema.Array(Project).annotations({
			title: 'projects',
			description: 'Specify career projects',
		}),
		{ exact: true },
	),

	publications: Schema.optional(
		Schema.Array(Publication).annotations({
			title: 'publications',
			description: 'Specify your publications through your career',
		}),
		{ exact: true },
	),

	references: Schema.optional(
		Schema.Array(Reference).annotations({
			title: 'references',
			description: 'List references you have received',
		}),
		{ exact: true },
	),

	skills: Schema.Array(Skill).annotations({
		title: 'skills',
		description: 'List out your professional skill-set',
	}),

	volunteer: Schema.optional(Schema.Array(Volunteer), { exact: true }),

	work: Schema.Array(Work),
}) {}
