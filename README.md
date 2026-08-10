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

## Admin area & Supabase content

The site has a lightweight CMS at **`/admin`** (discrete link in the footer):

- **Staff** — add/edit/reorder/delete team members shown on `/about`, including photo uploads.
- **Brochure** — edit the sections of `/brochure`, a print-ready page visitors can save as a PDF. The footer "View our brochure" link points here.

Content lives in Supabase; uploaded images go to a public `media` storage bucket.

**Setup (once):**

1. In the Supabase dashboard open **SQL Editor**, paste the contents of `supabase/schema.sql`, and Run. This creates the tables, locks them down with RLS, creates the storage bucket, and seeds the current team + a starter brochure.
2. In **Project Settings → API**, copy the **Project URL** and the **service_role** key into the `SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY` env vars (locally in `.env`, and on Vercel).
3. Set `ADMIN_USERNAME` / `ADMIN_PASSWORD` (and ideally `ADMIN_SESSION_SECRET`) env vars for the admin login.

If Supabase isn't configured the public site still works — `/about` falls back to the static team data in `src/lib/data/team.ts` and `/brochure` renders a basic fallback.

The service_role key bypasses row-level security — it must only ever live in env vars (never commit it; `.env` is gitignored).

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

## Images

All site images are self-hosted — nothing depends on Wix any more:

- `static/images/` — logo, hero shots, accreditation badges, team photos and the
  seeded project galleries (served straight from Vercel's CDN).
- Supabase Storage (`media` bucket) — photos uploaded through `/admin`
  (staff photos and new project gallery images).

The Wix account can be cancelled once DNS has been moved.

## Notes

- The old Wix "Members" area was intentionally not migrated.
- Portfolio projects are editable in `/admin` → Projects (stored in Supabase;
  `src/lib/data/projects.ts` is the fallback used until Supabase is connected).
- All pages are prerendered (static) except `/api/contact` (serverless function for the form).
- The sitemap is generated at build time at `/sitemap.xml`.
