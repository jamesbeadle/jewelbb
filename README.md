# Jewel Bespoke Build — jewelbb.co.uk

Rebuild of [jewelbb.co.uk](https://www.jewelbb.co.uk) in **SvelteKit** (Svelte 5), replacing the old Wix site. Deploys to **Vercel**.

## Local development

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build
npm run preview    # preview the production build
npm run check      # type-check svelte + ts
```

## Project structure

```
src/
  lib/
    data/          # ALL site content lives here — edit these to change the site
      site.ts        # contact details, social links, navigation
      services.ts    # the six services
      team.ts        # team member bios
      projects.ts    # the 14 project/area pages (galleries, descriptions)
      testimonials.ts
      images.ts      # central image registry (currently Wix CDN URLs)
    posts/         # blog posts — one markdown file each; add a file to publish
    components/    # header, footer, gallery, contact form, etc.
  routes/          # one folder per page; [area] renders all project pages
```

### Publishing a blog post

Add `src/lib/posts/my-new-post.md`:

```markdown
---
title: "My New Post"
date: 2026-08-07
slug: my-new-post
author: Jewel Bespoke Build
description: "Short summary shown on the news page and in Google results."
---

Post body in markdown…
```

Commit and push — the post appears at `/post/my-new-post` and in the sitemap automatically.

## Deploying to Vercel (first time)

1. Push this repo to GitHub.
2. In [vercel.com](https://vercel.com) → **Add New → Project** → import the repo. Vercel auto-detects SvelteKit; no settings needed.
3. **Environment variables** (Project → Settings → Environment Variables) — needed for the contact form:
   - `RESEND_API_KEY` — from [resend.com](https://resend.com) (free tier). Verify the `jewelbb.co.uk` domain in Resend so email lands reliably.
   - `CONTACT_TO_EMAIL` — e.g. `sales@jewelbb.co.uk`
   - `CONTACT_FROM_EMAIL` — e.g. `website@jewelbb.co.uk` (must be on the verified domain; until then omit and the Resend test sender is used)
4. Deploy, then check the preview URL thoroughly.

### Pointing the domain

In Vercel → Project → Settings → Domains, add `www.jewelbb.co.uk` and `jewelbb.co.uk`. Then at your DNS provider (currently managed via Wix):

- `www` → CNAME → `cname.vercel-dns.com`
- apex (`jewelbb.co.uk`) → A record → `76.76.21.21`

Vercel shows the exact records to set and verifies them live. Old Wix URLs are preserved (`/copy-of-privacy-policy` 301-redirects to `/terms-and-conditions`).

## Content still hosted on Wix

Images (and the brochure PDF) are currently hot-linked from `static.wixstatic.com` — they keep working while the Wix account exists. **Before cancelling Wix**, download the images into `static/images/` and update `src/lib/data/images.ts` + `src/lib/data/projects.ts` accordingly (the registry was designed to make this a find-and-replace job).

## Notes

- The old Wix "Members" area was intentionally not migrated.
- All pages are prerendered (static) except `/api/contact` (serverless function for the form).
- The sitemap is generated at build time at `/sitemap.xml`.
