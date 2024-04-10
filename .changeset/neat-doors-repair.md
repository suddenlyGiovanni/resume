---
"@suddenly-giovanni/resume": patch
---

Add `resume.yml` to enable easier editing of resume content.

- **Convert `resume.json` to `resume.yml`**: We've introduced a comprehensive resume in YAML format, transitioning the storage of the resume data from using JSON to YAML for convenience, which makes it easier to manage.
- **Update and optimize `resume.yml` formatting**: We've made changes to the `resume.yml` document to improve readability by minimizing breaks in sentences and thoughts, transforming multi-line summaries and highlight points into single-line paragraphs where appropriate.
- **Add `resume.yml` to package.json exports**: In our `package.json` file, we've included the `resume.yml` file in the exports section, which can now be correctly referenced for any necessary imports.
