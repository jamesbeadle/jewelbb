-- ============================================================
-- Migration: homepage hero slideshow (2026-09-25)
-- Run once in Supabase → SQL Editor → New query → Run.
--
-- ADDITIVE ONLY — creates one new table and seeds it with the
-- current homepage photo. Safe to re-run (create-if-missing; the
-- seed only inserts when the table is empty).
-- ============================================================

create table if not exists public.home_slides (
	id uuid primary key default gen_random_uuid(),
	image_url text not null default '',
	alt text not null default '',           -- describes the photo for screen readers / Google
	visible boolean not null default true,
	sort_order int not null default 100,
	created_at timestamptz not null default now()
);

-- RLS on, no policies: service role only, same as the other tables.
alter table public.home_slides enable row level security;
revoke all on public.home_slides from anon, authenticated;

-- Seed: the photo currently on the homepage (only if table is empty)
insert into public.home_slides (image_url, alt, visible, sort_order)
select '/images/site/home-hero.jpg', 'Recently completed Jewel Bespoke Build project', true, 10
where not exists (select 1 from public.home_slides);
