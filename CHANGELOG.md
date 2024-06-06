# @suddenly-giovanni/resume

## 12.1.4

### Patch Changes

- fd87aca: Refactor work experience at `Bettermarks Gmbh`

## 12.1.3

### Patch Changes

- 630dd89: update effect packages to v0.67.13

## 12.1.2

### Patch Changes

- 90203bf: update effect packages to v0.67.12

## 12.1.1

### Patch Changes

- 64d888b: Resume Update: Proficiency, Grammar, and Content Enhancements for Caya

  Area: Resume Proficiencies. Change: Replaced CoffeeScript with ActionScript in technologies section.
  Area: Resume Language. Change: Improved grammar and word choice for better clarity and readability.
  Area: Resume Content. Change: Refined responsibilities and highlights sections with specification of
  roles and accomplishments

## 12.1.0

### Minor Changes

- 3cf2b2f: update `@effect/schema` to v0.67.5
- 3cf2b2f: chore(deps): update effect packages v0.67.9

## 12.0.0

### Major Changes

- 990290f: Add work experience at `Caya Gmbh`

## 11.3.0

### Minor Changes

- 9531367: update `@effect/schema` to v0.67.5

## 11.2.0

### Minor Changes

- dfecf31: Upgrade `@effect/schema` dependency to v0.67.0

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

## 11.1.0

### Minor Changes

- 4cf5f7f: Removed the `techStack` field from the Work schema and adjusted the relevant JSON schema and tests to support this change.

## 11.0.4

### Patch Changes

- 15d635b: update effect schema and peers to v0.66.16

## 11.0.3

### Patch Changes

- 3d8551d: Configuration Update:
  The baseUrl and paths settings in the TypeScript configuration file (tsconfig.json) have been
  deactivated (commented out) to default TypeScript's module resolution strategy back to its default,
  and to avoid any conflicts with other module resolution settings in the project.

  Import Refactoring:
  Absolute imports in the src directory have been replaced with relative imports in an effort to
  prevent import issues and enhance code modularity.
  Additionally, this refactoring aims to improve the overall consistency of the project.

## 11.0.2

### Patch Changes

- e047a2d: fix peer dependencies ranges

  ```diff
  "peerDependencies": {
  -		"@effect/schema": "~0.66.12",
  +		"@effect/schema": "~0.66.13",
  -		"effect": "~3.1.0"
  +		"effect": "^3.1.1"
  	},
  ```

## 11.0.1

### Patch Changes

- ad219ad: chore(deps): update effect packages

  ```diff
  -   "effect": "3.1.0",
  +   "effect": "3.1.1",

  -	"@effect/schema": "0.66.12",
  +	"@effect/schema": "0.66.13",

  ```

## 11.0.0

### Major Changes

- 61af9bf: Change the module entry points: `resume-schema` -> `schema-resume`

  ```diff
  - import { Resume as ResumeSchema, type ResumeType } from '@suddenlygiovanni/resume/resume-schema'
  + import { Resume as ResumeSchema, type ResumeType } from '@suddenlygiovanni/resume/schema-resume'

  import { Email } from '@suddenlygiovanni/resume/schema-primitive'
  ```

## 10.1.1

### Patch Changes

- 6da7139: Derive `schema.json` for resume.yml directly from code

## 10.1.0

### Minor Changes

- 56b6fd6: Remove start and end date from work schema.
  - the same information can now be derived from the Role schema.
  - the changes in schema have also been reflected in the `resume.yml`

## 10.0.2

### Patch Changes

- d63aad6: ## `schema-primitive`

  - existing member have been refactored to enable custom annotations
  - ne primitive have been added focusing only on type filtering, no transformations

  ## `resume-schema`

  - dropped all transformation schemas in favour of filtering ones
  - switch from struct based api to class based one instead

  ***

  - new primitive exports have been added to both internal and public module api
  - @effect/schema and effect have been updated
  - @effect/schema and effect have been marked as peerDependencies. Now you need to check that they
    are correctly installed

## 10.0.1

### Patch Changes

- 7f3931f: Add build step and publish workflow to GHA

## 10.0.0

### Major Changes

- a387e64: Derive resume schema from '@effect/schema'

  - resume schema is computed out of the this fn `JSONSchema.make(Schema.encodedSchema(ResumeSchema))`
  - both top level and nested schemas are exposed from the package
  - CI validates with integration tests changes of `resume.yml` against the schema definition.

### Minor Changes

- a387e64: Update the schema and corresponding resume fields

## 9.0.1

### Patch Changes

- 3f2fe5b:
  - Deleted deprecated `resume.json`
  - Upgraded pnpm to v9

## 9.0.0

### Major Changes

- 719d10c: Reflect work entry in resume semver versioning

  - [Bettermarks Gmbh](./resume.yml:31), Software Developer, '2021-04-01' / '2021-10-31'

## 8.0.0

### Major Changes

- 0346d2b: Reflect work entry in resume semver versioning

  - [ToolTime Gmbh](./resume.yml:60), Senior Frontend Engineer, '2019-09-01' / '2020-02-29'

## 7.0.0

### Major Changes

- 21b63c0: Reflect work entry in resume semver versioning

  - [Appico Gmbh](./resume.yml:95), Full Stack Web Developer, '2018-01-01' / '2018-12-31'
  - [Appico Gmbh](./resume.yml:80), React Native Developer, '2019-01-01' / '2019-02-28'

## 6.0.0

### Major Changes

- 74d6dd5: Reflect work entry in resume semver versioning

  - [MadeByEnka](./resume.yml:113), Front-end Web Developer, '2016-10-01' / '2017-06-30'

## 5.0.0

### Major Changes

- 55b7b52: Reflect work entry in resume semver versioning

  - [Ravalico Real Estate s.a.s](./resume.yml:123), Front-end Web Developer, '2015-10-01' / '
    2016-10-30'

## 4.0.0

### Major Changes

- 4fb81ca: Reflect work entry in resume semver versioning

  - Ravalico Real Estate s.a.s, Real Estate Agent

## 3.0.0

### Major Changes

- 64cf550: Reflect education entry in resume semver versioning

  - [SPICED Academy](./resume.yml:135), Coding Bootcamp - '2017-06-01' / '2017-09-30'

## 2.0.0

### Major Changes

- d116574: Reflect education entry in resume semver versioning

  - [Innovation Factory](./resume.yml:149), AREA Science Park - '2015-04-01' / '2015-05-30'

## 1.0.0

### Major Changes

- 05a69fe: Reflect education entry in resume semver versioning

  - [Università degli studi di Trieste](./resume.yml:159) - '2011-09-01' / '2014-09-01'

## 0.0.3

### Patch Changes

- dcce2d4: Add `resume.yml` to enable easier editing of resume content.

  - **Convert `resume.json` to `resume.yml`**: We've introduced a comprehensive resume in YAML
    format, transitioning the storage of the resume data from using JSON to YAML for convenience,
    which makes it easier to manage.
  - **Update and optimize `resume.yml` formatting**: We've made changes to the `resume.yml` document
    to improve readability by minimizing breaks in sentences and thoughts, transforming multi-line
    summaries and highlight points into single-line paragraphs where appropriate.
  - **Add `resume.yml` to package.json exports**: In our `package.json` file, we've included
    the `resume.yml` file in the exports section, which can now be correctly referenced for any
    necessary imports.

## 0.0.2

### Patch Changes

- 689c1c0: Add manual trigger to release workflow
- 2c775ff: Set up changeset cli and CI

  - Introduced GitHub Action workflow for code checkout, setup of Node.js with pnpm, dependencies
    installation, caching and release automation.
  - Enhanced pull request checks workflow for validating the presence of changesets before merging
    into main branch.
  - Setup and documented `@changesets/cli` build tool for versioning and publishing code.
  - Add`@changesets/cli` package along with several other related packages added to project
    dependencies.
