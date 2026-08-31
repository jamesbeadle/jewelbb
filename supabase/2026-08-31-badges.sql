-- ============================================================
-- Migration: homepage accreditation badges (2026-08-31)
-- Run once in Supabase → SQL Editor → New query → Run.
--
-- ADDITIVE ONLY — creates one new table and seeds it. Does not
-- touch team_members, projects, brochures, enquiries, RTW or any
-- existing data. Safe to re-run (create-if-missing; the seed only
-- inserts when the table is empty).
-- ============================================================

create table if not exists public.badges (
	id uuid primary key default gen_random_uuid(),
	label text not null default '',        -- alt text / accessible name
	image_url text not null default '',
	visible boolean not null default true,
	sort_order int not null default 100,
	created_at timestamptz not null default now()
);

-- RLS on, no policies: service role only, same as the other tables.
alter table public.badges enable row level security;

-- Seed: the five badges currently on the site (only if table is empty)
insert into public.badges (label, image_url, visible, sort_order)
select * from (values
	('Considerate Constructors Scheme accreditation', '/images/badges/considerate-constructors.png', true, 10),
	('SafeContractor accreditation', '/images/badges/safecontractor.png', true, 20),
	('Best of Houzz 2021 — Service', '/images/badges/houzz.png', true, 30),
	('Buildertrend construction management software', '/images/badges/buildertrend.png', true, 40),
	('Official sponsor of Epsom & Ewell Colts FC', '/images/badges/ee-colts.jpg', true, 50)
) as seed(label, image_url, visible, sort_order)
where not exists (select 1 from public.badges);
