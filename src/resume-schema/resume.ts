import * as S from '@effect/schema/Schema'

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

export const Resume = S.Struct({
	$schema: S.String.annotations({
		title: '$schema',
		description: 'link to the version of the schema that can validate the resume',
		examples: ['http://jsonresume.org/schema'],
	}),

	awards: S.optional(
		S.Array(Award).annotations({
			title: 'awards',
			description: 'Specify any awards you have received throughout your professional career',
		}),
		{ exact: true },
	),

	basics: Basics,

	certificates: S.optional(
		S.Array(Certificate).annotations({
			title: 'certificates',
			description: 'Specify any certificates you have received throughout your professional career',
		}),
		{ exact: true },
	),

	education: S.Array(Education),

	interests: S.optional(S.Array(Interest), { exact: true }),

	languages: S.optional(
		S.Array(Language).annotations({
			title: 'languages',
			description: 'List any other languages you speak',
		}),
		{ exact: true },
	),

	projects: S.optional(
		S.Array(Project).annotations({
			title: 'projects',
			description: 'Specify career projects',
		}),
		{ exact: true },
	),

	publications: S.optional(
		S.Array(Publication).annotations({
			title: 'publications',
			description: 'Specify your publications through your career',
		}),
		{ exact: true },
	),

	references: S.optional(
		S.Array(Reference).annotations({
			title: 'references',
			description: 'List references you have received',
		}),
		{ exact: true },
	),

	skills: S.Array(Skill).annotations({
		title: 'skills',
		description: 'List out your professional skill-set',
	}),

	volunteer: S.optional(S.Array(Volunteer), { exact: true }),

	work: S.Array(Work),
})

export type Resume = S.Schema.Encoded<typeof Resume>
export type ResumeType = S.Schema.Type<typeof Resume>
