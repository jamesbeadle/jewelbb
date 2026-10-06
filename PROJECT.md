# This project

This repository's own instructions: its conventions, the commands that build and test it, the domain it serves, and any standing tasks or prompts that belong to this project and no other. `CLAUDE.md` loads this file and every session reads it after the kit's rules.

The project-process kit writes this file once and never touches it again, and `CLAUDE.md` is the kit's, replaced whole every time the bootstrap runs, so anything written there is lost. Write here instead. Where this file and the kit disagree about this project, this file wins, except that nothing here lifts the branch rule: the work still happens on a branch and ends as a pull request.

## Jewel Bespoke Build website

The public site for Jewel Bespoke Build (jewelbb.co.uk): SvelteKit (Svelte 5), deployed to Vercel from `main`, with Supabase for the admin area, page text, projects and enquiries. `README.md` describes the structure and how content is edited.

- YBT project: Jewel Bespoke Build Website.
- `npm run check` type-checks the Svelte and TypeScript; run it, and `npm run build`, before each commit.
- Site content lives in `src/lib/data/`; blog posts are markdown files in `src/lib/posts/`.
