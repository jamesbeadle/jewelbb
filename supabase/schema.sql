-- ============================================================
-- Jewel Bespoke Build — content schema
-- Run this once in Supabase → SQL Editor → New query → Run
-- Safe to re-run (idempotent-ish; seeds only insert when empty)
-- ============================================================

-- ---------- Tables ------------------------------------------------

create table if not exists public.team_members (
	id uuid primary key default gen_random_uuid(),
	name text not null,
	role text not null default '',
	bio text not null default '',
	photo_url text not null default '',
	sort_order int not null default 100,
	created_at timestamptz not null default now()
);

create table if not exists public.brochure_sections (
	id uuid primary key default gen_random_uuid(),
	title text not null default '',
	subtitle text not null default '',
	body text not null default '',          -- markdown
	image_url text not null default '',
	sort_order int not null default 100,
	created_at timestamptz not null default now()
);

-- ---------- Row Level Security ------------------------------------
-- RLS is ON with no policies: only the service_role key (used by the
-- website's server code) can read/write. The anon key has no access.

alter table public.team_members enable row level security;
alter table public.brochure_sections enable row level security;

-- ---------- Storage bucket for uploaded images --------------------
-- Public bucket so uploaded photos can be served directly on the site.

insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

-- ---------- Seed: current team (only if table is empty) -----------

insert into public.team_members (name, role, bio, photo_url, sort_order)
select * from (values
	('Nigel Reilly', 'CEO', 'Nigel leads with strategic vision and dedication, ensuring every project exceeds client expectations. His proactive approach, commitment to quality, and ability to inspire collaboration drive innovation and excellence, making his leadership the cornerstone of the team''s success and continued growth.', 'https://static.wixstatic.com/media/d5755f_137c0d5c48df4493aaa4acf5ce2dd481~mv2.png', 10),
	('Les Reilly', 'Founder', 'With extensive industry expertise and a passion for craftsmanship, Les founded Jewel on principles of quality, trust, and attention to detail. His hands-on approach and commitment to excellence have shaped the company, inspiring the team to uphold the highest standards in every project.', 'https://static.wixstatic.com/media/d5755f_34c569d7f44e4ade9566c3a8378fe91c~mv2.png', 20),
	('Jeremy Ferendinos', 'Finance Director', 'Jeremy specialises in strategic planning, resource optimisation, and risk management, particularly in construction. He streamlines financial processes, enhances cash flow, and ensures long-term sustainability. Committed to driving growth, he fosters collaboration to align financial strategy with business goals.', 'https://static.wixstatic.com/media/2f83b8_73169794d5c54a8ebde2fe99e133aa91~mv2.png', 30),
	('Neil Kerr', 'Senior Project Manager', 'With a focus on clear communication and detail, Neil leads our projects on site – coordinating teams, managing programmes and working closely with clients to deliver smooth, high-quality builds.', 'https://static.wixstatic.com/media/2f83b8_56d2e99a03184e0f80231b916346447a~mv2.png', 40),
	('Jack Easty', 'Carpenter', 'As a site-based carpenter, Jack supports our projects with high-quality workmanship and attention to detail. The grandson of founder Les and son of CEO Nigel, he is proudly building his career within the family business, gaining experience across a range of bespoke residential projects.', 'https://static.wixstatic.com/media/2f83b8_9c2075ebbd654f8583b985a27ed50980~mv2.jpg', 50),
	('Katy Hicks', 'Health & Safety Officer', 'Katy oversees the implementation of Jewel Bespoke Build''s health and safety policy on all active sites, making sure employees, subcontractors and visitors can work safely and that legal requirements are met. She coordinates site inductions, inspections, PPE registers, toolbox talks, accident and incident reporting, and ensures that competent people, safe systems of work, and up-to-date risk assessments and method statements are in place across each project.', 'https://static.wixstatic.com/media/2f83b8_4d2e527e4e544d0b9c6397bb1ad238d4~mv2.jpg', 60),
	('Chloe Hicks', 'Accounts Manager', 'Chloe brings extensive experience in financial management, overseeing accounts and ensuring accurate, efficient processes. She is skilled in budgeting, financial reporting, and cash flow management, playing a key role in maintaining financial stability and supporting strategic growth for the team and projects.', 'https://static.wixstatic.com/media/2f83b8_542f37aae05b442eb07140884b5342d8~mv2.jpg', 70),
	('Katie Prentice', 'Administrator', 'Katie provides essential administrative support, helping with daily operations, organising tasks, and ensuring efficiency across teams. Her attention to detail and organisational skills are key to keeping everything running smoothly.', 'https://static.wixstatic.com/media/2f83b8_897c9c89d46547d5b44fa45a7579ee0a~mv2.jpg', 80),
	('Sofia Sarkus', 'Marketing Manager', 'Sofia develops and delivers the marketing strategy, showcasing our bespoke projects to the right audiences across all channels. She manages our online presence, content and campaigns, helping to build brand awareness and turn interest into high-quality enquiries for the team.', 'https://static.wixstatic.com/media/2f83b8_bfe66c602fb649f5af36e6a00520a98f~mv2.jpg', 90)
) as seed(name, role, bio, photo_url, sort_order)
where not exists (select 1 from public.team_members);

-- ---------- Seed: brochure sections (only if table is empty) ------

insert into public.brochure_sections (title, subtitle, body, sort_order)
select * from (values
	('Jewel Bespoke Build Ltd', 'Bespoke construction · Surrey & the South of England',
	 E'**Family-run. 65+ years of combined experience.**\n\nLuxury custom homes, extensions, loft conversions and full renovations — delivered with meticulous care, craftsmanship and attention to detail.', 10),
	('Who we are', 'A family business built on trust',
	 E'Founded by Surrey natives Les and Nigel Reilly, Jewel Bespoke Build Ltd is a trusted bespoke building company specialising in luxury, custom homes that reflect your unique taste and lifestyle.\n\nOur dedicated team — including in-house Project Managers and personal Site Managers — delivers every project with transparency, precision and top-tier craftsmanship, supported by advanced project management software and clear weekly updates.', 20),
	('Our services', '',
	 E'- **New Build Homes** — bespoke residences, customised to your needs and budget\n- **Full House Refurbishments** — every detail managed, from structural work to final finishes\n- **Extensions** — high-quality home extensions tailored to your vision\n- **Loft Conversions** — stunning, functional space, seamlessly delivered\n- **Basement Conversions** — living areas, gyms and wine cellars beneath your home\n- **Accessible Living** — bespoke builds designed with architects and occupational therapists', 30),
	('Our commitment', 'Community & sustainability',
	 E'We are proud sponsors of Epsom & Ewell Colts FC — over 1,100 players across 80 teams — and partner with Ecologi to plant **100 trees for every project**, helping to offset our carbon footprint.\n\nAccredited by the Considerate Constructors Scheme and SafeContractor; Best of Houzz 2021 for Service.', 40),
	('Let''s talk about your project', '',
	 E'**Call us** — 0208 109 1015\n\n**Email us** — sales@jewelbb.co.uk\n\n**Visit us** — Argent House, Surbiton, Surrey, KT6 7LD\n\nwww.jewelbb.co.uk', 50)
) as seed(title, subtitle, body, sort_order)
where not exists (select 1 from public.brochure_sections);
