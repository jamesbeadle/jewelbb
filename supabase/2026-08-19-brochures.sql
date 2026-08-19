-- ============================================================
-- Brochure builder (added 2026-08-19)
--
-- Run this once in the Supabase SQL Editor.
--
-- A brochure is a document made of ordered, typed pages that
-- mirror the designed 2026 print brochure (cover, philosophy,
-- team, services, project spreads, gallery, testimonials,
-- back cover ...). Page content is stored as JSON so each
-- template can carry its own fields.
--
-- Several brochures can exist at once (drafts, yearly
-- editions); at most ONE can be "active" — that's the one
-- shown at /brochure and served as the public PDF.
--
-- The old public.brochure_sections table is superseded but is
-- intentionally NOT dropped here, so nothing breaks mid-deploy.
-- Once the new builder is live you can remove it with:
--   drop table if exists public.brochure_sections;
-- ============================================================

create table if not exists public.brochures (
	id uuid primary key default gen_random_uuid(),
	title text not null default 'Untitled brochure',
	status text not null default 'draft' check (status in ('draft', 'active')),
	created_at timestamptz not null default now(),
	updated_at timestamptz not null default now()
);

-- At most one active brochure at any time.
create unique index if not exists brochures_one_active
	on public.brochures ((true))
	where status = 'active';

create table if not exists public.brochure_pages (
	id uuid primary key default gen_random_uuid(),
	brochure_id uuid not null references public.brochures (id) on delete cascade,
	template text not null,
	content jsonb not null default '{}'::jsonb,
	sort_order int not null default 100,
	created_at timestamptz not null default now()
);

create index if not exists brochure_pages_brochure
	on public.brochure_pages (brochure_id, sort_order);

-- RLS on with no policies: service-role key (server code) only,
-- same as every other table in this project.
alter table public.brochures enable row level security;
alter table public.brochure_pages enable row level security;
