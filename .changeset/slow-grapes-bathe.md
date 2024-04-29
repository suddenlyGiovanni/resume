---
"@suddenlygiovanni/resume": patch
---

## `schema-primitive`

- existing member have been refactored to enable custom annotations
- ne primitive have been added focusing only on type filtering, no transformations

## `resume-schema`

- dropped all transformation schemas in favour of filtering ones
- switch from struct based api to class based one instead

___

- new primitive exports have been added to both internal and public module api
- @effect/schema and effect have been updated
- @effect/schema and effect have been marked as peerDependencies. Now you need to check that they
	are correctly installed
