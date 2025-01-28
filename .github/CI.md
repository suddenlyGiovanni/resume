# CI/CD

# Requirements:

- git `main` branch must only composed of released versions (tags)
- each change ending merged in main needs to:
	- change the semver version number
	- update the change log with corresponding description
	- tag that commit with corresponding version number

```mermaid
graph TB
	A[Start: Pull Request Created or Updated] --> B{Run Tests and Linters}
	B -->|Tests Pass| C[Pull Request Merged]
	B -->|Tests Fail| D[Fix Issues and Update Pull Request]
	D --> B
	C --> E[Increment Version Number and Update CHANGELOG.md]
	E --> F[Commit and Tag with Version Number]
	F --> G[New Tag Created]
	G --> H[Trigger Deployment Process]
	H --> I[Deployment Completed]
	I --> J[Send Notification]
	J --> K[End]
```
