# Resume

This is my personal resume data; It is based on an extension of the resume.json schema published
by https://jsonresume.org .

It is follow sem ver versioning, where in the form of

- MAJOR version when a new entry is added or modified in a braking way, such as:
	- e.g. a transition to a new job
	- e.g. new education entry
	- etc...
- MINOR version when a entry is extended with new details in a backward compatible manner, such as:
	- e.g. new role within the same company
	- e.g. new responsibilities within the same company
	- e.g. new achievement within the same company
	- e.g. new certification
	- etc...
- PATCH version when bug fixes are added in a backward compatible way such as:
	- e.g. fixing a typo
	- e.g. change in the formatting
	- e.g. small rephrasing of existing concepts without changes to the content
	- etc...

## CI/CD

### Requirements:
- git `main` branch must only composed of released versions (tags)
- each change ending merged in main needs to:
  - change the semver version number
  - update the change log with corresponding description
  - tag that commit with corresponding version number
