# @suddenly-giovanni/resume

## 1.0.0

### Major Changes

- 05a69fe: Reflect education entry in resume semver versioning

  - Università degli studi di Trieste - '2011-09-01' / '2014-09-01'

## 0.0.3

### Patch Changes

- dcce2d4: Add `resume.yml` to enable easier editing of resume content.

  - **Convert `resume.json` to `resume.yml`**: We've introduced a comprehensive resume in YAML format, transitioning the storage of the resume data from using JSON to YAML for convenience, which makes it easier to manage.
  - **Update and optimize `resume.yml` formatting**: We've made changes to the `resume.yml` document to improve readability by minimizing breaks in sentences and thoughts, transforming multi-line summaries and highlight points into single-line paragraphs where appropriate.
  - **Add `resume.yml` to package.json exports**: In our `package.json` file, we've included the `resume.yml` file in the exports section, which can now be correctly referenced for any necessary imports.

## 0.0.2

### Patch Changes

- 689c1c0: Add manual trigger to release workflow
- 2c775ff: Set up changeset cli and CI

  - Introduced GitHub Action workflow for code checkout, setup of Node.js with pnpm, dependencies installation, caching and release automation.
  - Enhanced pull request checks workflow for validating the presence of changesets before merging into main branch.
  - Setup and documented `@changesets/cli` build tool for versioning and publishing code.
  - Add`@changesets/cli` package along with several other related packages added to project dependencies.
