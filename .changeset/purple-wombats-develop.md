---
"@suddenlygiovanni/resume": major
---

Change the module entry points: `resume-schema` -> `schema-resume`

```diff
- import { Resume as ResumeSchema, type ResumeType } from '@suddenlygiovanni/resume/resume-schema'
+ import { Resume as ResumeSchema, type ResumeType } from '@suddenlygiovanni/resume/schema-resume'

import { Email } from '@suddenlygiovanni/resume/schema-primitive'
```
