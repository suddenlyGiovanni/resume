import { Resume } from '@suddenlygiovanni/schema-resume/schema-resume'

import { JSONSchema } from 'effect'
import { describe, expect, it } from 'vitest'

describe('Resume', () => {
	it('jsonSchema match its snapshot', async () => {
		await expect(JSON.stringify(JSONSchema.make(Resume), null, 2)).toMatchFileSnapshot(
			'../schema.json',
		)
	})
})
