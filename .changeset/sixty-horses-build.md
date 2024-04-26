---
"@suddenly-giovanni/resume": major
---

Derive resume schema from '@effect/schema'

- resume schema is computed out of the this fn `JSONSchema.make(Schema.encodedSchema(ResumeSchema))`
- both top level and nested schemas are exposed from the package
- CI validates with integration tests changes of `resume.yml` against the schema definition.
