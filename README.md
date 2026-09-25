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
- **Projects** — edit portfolio projects and galleries. Reorder with the ▲/▼ arrows on the list, and **Hide** a project to take it off the site (portfolio, homepage, sitemap and its own page) without deleting it — **Show** brings it back.
- **Page text** — edit the headings, intros and SEO titles/descriptions of the homepage, About, Services (including each service's title and description), Portfolio, Our community, Contact, News and the call-to-action band. Only changed fields are stored; anything untouched keeps the built-in copy from `src/lib/content/pages.ts`, and each field or whole page can be restored to the original.
- **Badges** — the accreditation/partnership logo strip on the homepage (Considerate Constructors, SafeContractor, etc.). Add, hide, reorder, replace or delete badges; hiding keeps the badge on file so it can be brought back later. Requires the `badges` table — on an existing database run the additive migration `supabase/2026-08-31-badges.sql` once (fresh setups get it from `schema.sql`).
- **Brochures** — a full brochure builder. Compose print-quality brochures page by page from designed templates (cover, philosophy, team, services, three-page project spreads, process, testimonials, back cover), keep them in draft, and make one **active** — that's what visitors see at `/brochure` and download as a PDF. PDFs are rendered server-side with headless Chromium, so the output is identical to the designed A4 pages every time (no browser print dialogs involved). Photos upload straight to Supabase Storage at full resolution via signed URLs. Requires running `supabase/2026-08-19-brochures.sql` once (see below).

Content lives in Supabase; uploaded images go to a public `media` storage bucket.

**Setup (once):**

1. In the Supabase dashboard open **SQL Editor**, paste the contents of `supabase/schema.sql`, and Run. This creates the tables, locks them down with RLS, creates the storage bucket, and seeds the current team + a starter brochure. Then run `supabase/2026-08-19-brochures.sql` the same way — it adds the `brochures` / `brochure_pages` tables used by the brochure builder. (Existing database? Don't re-run `schema.sql` — see *Database migrations* below.)
2. In **Project Settings → API**, copy the **Project URL** and the **service_role** key into the `SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY` env vars (locally in `.env`, and on Vercel).
3. Set `ADMIN_USERNAME` / `ADMIN_PASSWORD` (and ideally `ADMIN_SESSION_SECRET`) env vars for the admin login.

If Supabase isn't configured the public site still works — `/about` falls back to the static team data in `src/lib/data/team.ts` and `/brochure` renders a basic fallback.

The service_role key bypasses row-level security — it must only ever live in env vars (never commit it; `.env` is gitignored).

### Database migrations

`schema.sql` is for a **fresh** database. On the live database, apply changes with the dated, standalone files in `supabase/` instead — each is additive, idempotent and safe to re-run:

| File | Adds |
| --- | --- |
| `2026-08-12-enquiries.sql` | `enquiries` table (quote form inbox) |
| `2026-08-19-brochures.sql` | `brochures` + `brochure_pages` (brochure builder) |
| `2026-08-31-badges.sql` | `badges` table + seed |
| `2026-09-04-security-hardening.sql` | RLS on every table, public API roles revoked, `admin_login_attempts` table (see Security) |
| `2026-09-25-page-content.sql` | `page_content` table (Page text editor) + `projects.visible` (hide projects) |

## Security

**Database.** Every table has row-level security enabled with **no policies**. The site's server code authenticates with the `service_role` key, which bypasses RLS; the public `anon`/`authenticated` keys are never used and see nothing. As a second layer, `2026-09-04-security-hardening.sql` also revokes the table privileges Supabase grants those public roles by default (and stops future tables getting them), so even if RLS were switched off by mistake the public keys still couldn't read or write anything. The script ends with a report — every table should show `rls_enabled = true`, `policies = 0`, `anon_access = false`, `service_role_access = true`. If a table is ever meant to be read with the anon key, it needs both a policy *and* an explicit `grant select on public.<table> to anon`.

**Admin area (`/admin`).** Guarded in `src/hooks.server.ts` for every request whose path starts with `/admin` (except the login page): the `jb_admin` cookie must carry a valid, unexpired HMAC-SHA256 signature. The cookie is `HttpOnly`, `Secure`, `SameSite=Lax` and lasts 8 hours; SvelteKit's built-in origin check protects the login/logout forms from CSRF. Credentials and signatures are compared in constant time. The login is rate-limited — after **5 failed attempts from one IP within 15 minutes** further attempts are refused until the window passes (attempts are logged in `admin_login_attempts`, so the limit survives redeploys; a wrong password also costs a one-second delay). Every `/admin` response is sent with `Cache-Control: no-store`, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: same-origin` and `X-Robots-Tag: noindex`. Failed and refused logins appear in the Vercel function logs as `Admin login failed for <ip>` / `Admin login refused for <ip>`.

To sign every admin out at once (e.g. after a shared laptop goes missing), change `ADMIN_SESSION_SECRET` in Vercel and redeploy.

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
