-- ============================================================
-- Migration: editable page text + hideable projects (2026-09-25)
-- Run once in Supabase → SQL Editor → New query → Run.
--
-- ADDITIVE ONLY — creates one new table and adds one column with a
-- default. Does not change any existing data. Safe to re-run.
-- ============================================================

-- Text edited in /admin → Page text. One row per page; `content` holds
-- only the fields that differ from the site's built-in copy.
create table if not exists public.page_content (
	page text primary key,
	content jsonb not null default '{}'::jsonb,
	updated_at timestamptz not null default now()
);

-- RLS on, no policies: service role only, same as the other tables.
alter table public.page_content enable row level security;
revoke all on public.page_content from anon, authenticated;

-- Projects can be hidden from the website without deleting them.
alter table public.projects add column if not exists visible boolean not null default true;
