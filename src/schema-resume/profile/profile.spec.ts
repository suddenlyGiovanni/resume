import { JSONSchema, Schema } from '@effect/schema'

import { describe, expect, test } from 'vitest'

import { Profile } from './profile.js'

describe('Profile', () => {
	const profileInput: typeof Profile.Type = {
		network: 'Facebook',
		url: 'http://twitter.example.com/neutralthoughts',
		username: 'neutralthoughts',
	}

	describe('decode', () => {
		const parse = Schema.decodeUnknownSync(Profile)

		test('network', () => {
			expect(() => parse({ ...profileInput, network: '' })).toThrow()
			expect(() => parse({ ...profileInput, network: '  ' })).toThrow()
			expect(() => parse({ ...profileInput, network: 'Twitter' })).not.toThrow()
		})

		test('url', () => {
			expect(() => parse({ ...profileInput, url: '' })).toThrow()
			expect(() => parse({ ...profileInput, url: '  ' })).toThrow()
			expect(() => parse({ ...profileInput, url: 'http://localhost:8080' })).not.toThrow()
		})

		test('username', () => {
			expect(() => parse({ ...profileInput, username: '' })).toThrow()
			expect(() => parse({ ...profileInput, username: '  ' })).toThrow()
			expect(() => parse({ ...profileInput, username: 'realdonaldtrump' })).not.toThrow()
		})
	})

	test('JSONSchema', () => {
		expect(JSON.stringify(JSONSchema.make(Profile), null, '\t')).toMatchFileSnapshot(
			'profile-schema.snapshot.json',
		)
	})
})
