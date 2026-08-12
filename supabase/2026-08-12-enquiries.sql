-- ------------------------------------------------------------------
-- Enquiries only — safe to run on a live database.
-- Adds the one new table needed for the /contact quote form and
-- /admin/enquiries. Touches NOTHING else: no seeds, no updates,
-- no other tables. Running it twice is harmless.
-- ------------------------------------------------------------------

create table if not exists public.enquiries (
	id uuid primary key default gen_random_uuid(),
	first_name text not null,
	last_name text not null,
	email text not null,
	phone text not null default '',
	message text not null,
	status text not null default 'new',     -- new | read | archived
	created_at timestamptz not null default now()
);

create index if not exists enquiries_created_at_idx
	on public.enquiries (created_at desc);

create index if not exists enquiries_status_idx
	on public.enquiries (status);

-- RLS on with no policies = only the service role key (used by the
-- site's server code) can read or write. Same as the other tables.
alter table public.enquiries enable row level security;
