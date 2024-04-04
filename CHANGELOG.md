# @suddenly-giovanni/resume

## 0.0.2

### Patch Changes

- 689c1c0: Add manual trigger to release workflow
- 2c775ff: Set up changeset cli and CI

  - Introduced GitHub Action workflow for code checkout, setup of Node.js with pnpm, dependencies installation, caching and release automation.
  - Enhanced pull request checks workflow for validating the presence of changesets before merging into main branch.
  - Setup and documented `@changesets/cli` build tool for versioning and publishing code.
  - Add`@changesets/cli` package along with several other related packages added to project dependencies.
