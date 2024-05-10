---
"@suddenlygiovanni/resume": minor
---

Upgrade `@effect/schema` dependency to v0.67.0

## Summary

The changes mostly pertained to the use of the `@effect/schema` library. The actions ranged from
updates and clarifications in `@effect/schema` type annotations, simplifications of `@effect/schema`
import statements, the removal of unused imports from `@effect/schema`, and an update in supported
versions of the `@effect/schema` peer dependency.

## Changes

- The supported versions for the `@effect/schema` peer dependency in `package.json` was updated,
	with only version "~0.67.0" now supported.
- This might restrict the use of the library along with other libraries or projects that require
	different versions of `@effect/schema`. It is recommended to check any project that uses this
	library for compatibility.

- Import statements across the `schema-resume` module have been simplified by directly
	importing `JSONSchema` and `Schema` from `@effect/schema`.
- These changes should make the import statements cleaner and more straightforward, enhancing code
	readability and maintainability.

- Type and method imports in test files have been restructured, and now those entities are directly
	imported from `@effect/schema`.
- This improvement in the structure of the import statements should make the test files easier to
	read and maintain.

## Impact

The new changes should not cause any major breaking changes. Yet, it is crucial that all tests are
executed to assure that the newest changes to `@effect/schema` haven't inadvertently introduced any
issues. Affected areas should be thoroughly tested, given the changes to `@effect/schema` import
structuring, type annotations, and peer dependency versioning.
