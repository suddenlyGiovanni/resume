---
"@suddenlygiovanni/resume": patch
---

Configuration Update:
The baseUrl and paths settings in the TypeScript configuration file (tsconfig.json) have been
deactivated (commented out) to default TypeScript's module resolution strategy back to its default,
and to avoid any conflicts with other module resolution settings in the project.

Import Refactoring:
Absolute imports in the src directory have been replaced with relative imports in an effort to
prevent import issues and enhance code modularity.
Additionally, this refactoring aims to improve the overall consistency of the project.
