# @suddenly-giovanni/resume

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
