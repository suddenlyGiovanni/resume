import { Schema } from 'effect'

import { Award } from './award/award.ts'
import { Basics } from './basics/basics.ts'
import { Certificate } from './certificates/certificates.ts'
import { Education } from './education/education.ts'
import { Interest } from './interest/interest.ts'
import { Language } from './language/language.ts'
import { Project } from './project/project.ts'
import { Publication } from './publication/publication.ts'
import { Reference } from './reference/reference.ts'
import { Skill } from './skill/skill.ts'
import { Volunteer } from './volunteer/volunteer.ts'
import { Work } from './work/work.ts'

export class Resume extends Schema.Class<Resume>('Resume')({
	$schema: Schema.String.annotations({
		title: '$schema',
		description: 'link to the version of the schema that can validate the resume',
		examples: ['http://jsonresume.org/schema'],
	}),

	awards: Schema.optionalWith(Schema.Array(Award), { exact: true }).annotations({
		title: 'awards',
		description: 'Specify any awards you have received throughout your professional career',
	}),

	basics: Basics,

	certificates: Schema.optionalWith(Schema.Array(Certificate), { exact: true }).annotations({
		title: 'certificates',
		description: 'Specify any certificates you have received throughout your professional career',
	}),

	education: Schema.Array(Education),

	interests: Schema.optionalWith(Schema.Array(Interest), { exact: true }),

	languages: Schema.optionalWith(Schema.Array(Language), { exact: true }).annotations({
		title: 'languages',
		description: 'List any other languages you speak',
	}),

	projects: Schema.optionalWith(Schema.Array(Project), { exact: true }).annotations({
		title: 'projects',
		description: 'Specify career projects',
	}),

	publications: Schema.optionalWith(Schema.Array(Publication), { exact: true }).annotations({
		title: 'publications',
		description: 'Specify your publications through your career',
	}),

	references: Schema.optionalWith(Schema.Array(Reference), { exact: true }).annotations({
		title: 'references',
		description: 'List references you have received',
	}),

	skills: Schema.Array(Skill).annotations({
		title: 'skills',
		description: 'List out your professional skill-set',
	}),

	volunteer: Schema.optionalWith(Schema.Array(Volunteer), { exact: true }),

	work: Schema.Array(Work),
}) {}
