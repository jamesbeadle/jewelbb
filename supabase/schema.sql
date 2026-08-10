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

-- ---------- Projects (portfolio) ----------------------------------

create table if not exists public.projects (
	id uuid primary key default gen_random_uuid(),
	slug text not null unique,
	name text not null,
	meta_title text not null default '',
	meta_description text not null default '',
	subtitle text not null default '',
	description text not null default '',
	gallery jsonb not null default '[]'::jsonb,
	cross_link text not null default '',
	accessible boolean not null default false,
	sort_order int not null default 100,
	created_at timestamptz not null default now()
);

alter table public.projects enable row level security;

-- ---------- Seed: current projects (only if table is empty) -------

insert into public.projects (slug, name, meta_title, meta_description, subtitle, description, gallery, cross_link, accessible, sort_order)
select * from (values
	('twickenham', 'Twickenham', 'Twickenham Project | Jewel Bespoke Build Ltd | Accessible Living Extension & Refurbishment', 'Ground floor extension and full internal refurbishment in Twickenham, designed for accessible living with a lift, bespoke sanitaryware and refined finishes.', 'Accessible Living, Ground Floor Extension and a Full Internal Refurbishment', 'The Twickenham project by Jewel Bespoke Build Ltd features a thoughtfully designed ground floor extension and full internal refurbishment, tailored to support accessible, modern living. Our team reconfigured the layout to create a more open and practical flow throughout the home, improving both usability and comfort. Key elements include the installation of a lift to enhance accessibility between floors, alongside bespoke sanitaryware and carefully selected finishes that elevate the overall interior. The design balances functionality with understated elegance, resulting in a home that is both highly practical and refined in its finish.', '["/images/projects/twickenham/01.jpg", "/images/projects/twickenham/02.jpg", "/images/projects/twickenham/03.jpg", "/images/projects/twickenham/04.jpg", "/images/projects/twickenham/05.jpg", "/images/projects/twickenham/06.jpg", "/images/projects/twickenham/07.jpg", "/images/projects/twickenham/08.jpg", "/images/projects/twickenham/09.jpg"]'::jsonb, 'kingston', true, 10),
	('hamptoncourt', 'Hampton Court', 'Hampton Court Project | Jewel Bespoke Build Ltd | Period Extension & Garage Conversion', 'Period rear extension, garage conversion and full refurbishment in Hampton Court, with open-plan living, bi-fold doors and a bespoke glazed staircase.', 'Period Rear Extension, Garage Conversion, Full Internal Refurbishment & External Landscaping', 'Discover the Hampton Court project by Jewel Bespoke Build Ltd, featuring a period rear home extension, garage conversion, and full internal refurbishment that blend charm with modern style. Our expert Surrey builders created an open-plan kitchen and dining area that flows seamlessly into the living space, extending to a landscaped entertaining area through corner opening bi-fold doors. A bespoke glazed staircase with the original mahogany handrail elegantly connects the floors, merging timeless elegance with contemporary design. The garage conversion adds independent living space, highlighting our dedication to quality craftsmanship in bespoke construction.', '["/images/projects/hamptoncourt/01.jpg", "/images/projects/hamptoncourt/02.jpg", "/images/projects/hamptoncourt/03.jpg", "/images/projects/hamptoncourt/04.jpg", "/images/projects/hamptoncourt/05.jpg", "/images/projects/hamptoncourt/06.jpg"]'::jsonb, 'bromley', false, 20),
	('ashtead', 'Ashtead', 'Ashtead Project | Jewel Bespoke Build Ltd | Two-Storey Side Extension & Modernisation', 'Two-storey side extension and full refurbishment in Ashtead with a luxurious master suite, vaulted entrance, cedar cladding and anthracite aluminium windows.', 'Two storey side extension with internal reconfiguration and modernisation throughout.', 'We''re pleased to present the full refurbishment of this updated home in Ashtead, Surrey. Key upgrades include enlarged windows with sleek anthracite aluminum frames, allowing more natural light and adding a modern edge. A two-storey side home extension provides a luxurious master suite with an ensuite and dressing area. The ground floor features a new garage and rear study, enhancing functionality and kerb appeal. A vaulted entrance with a glass balustrade Juliet balcony creates a striking sense of space, while high-quality finishes throughout, including a new WC, elevate the interior. The exterior is unified with cedar cladding, repointed brickwork, fresh K Render, and grey windows.', '["/images/projects/ashtead/01.jpg", "/images/projects/ashtead/02.jpg", "/images/projects/ashtead/03.jpg", "/images/projects/ashtead/04.jpg", "/images/projects/ashtead/05.jpg", "/images/projects/ashtead/06.jpg"]'::jsonb, 'cranleigh', false, 30),
	('surbiton', 'Surbiton', 'Surbiton Project | Jewel Bespoke Build Ltd | Rear Loft Extension & Refurbishment', 'Rear loft extension and full internal refurbishment in Surbiton, adding a spacious bedroom with elegant ensuite and revitalised, modern living areas.', 'Rear loft extension and full internal refurbishment works', 'The Surbiton project by Jewel Bespoke Build Ltd features a stunning rear loft extension and full internal refurbishment, designed to enhance space and functionality. Modern finishes and exceptional craftsmanship elevate the home''s aesthetic, blending style with practicality. The loft extension provides a spacious bedroom with an elegant ensuite, while the internal refurbishment revitalises the living areas. Every detail has been carefully considered to create a comfortable and sophisticated living environment, tailored to the client''s vision.', '["/images/projects/surbiton/01.jpg", "/images/projects/surbiton/02.jpg", "/images/projects/surbiton/03.jpg", "/images/projects/surbiton/04.jpg", "/images/projects/surbiton/05.jpg", "/images/projects/surbiton/06.jpg"]'::jsonb, 'cranleigh', false, 40),
	('ewelleast', 'Ewell East', 'Ewell East Project | Jewel Bespoke Build Ltd | Accessible Living Double-Storey Extension', 'Double storey front extension and full refurbishment of a 5-bed Ewell East home, designed for accessible living with step-free access and open-plan spaces.', 'Accessible Living, Double Storey Extension to the Front and Full House Refurbishment', 'The Ewell East project by Jewel Bespoke Build Ltd is a stunning example of bespoke construction in Surrey. This 5 bedroom, 4 bathroom home has been thoughtfully transformed with a double storey front home extension and a full refurbishment designed for accessible living. Our expert Surrey builders have incorporated step free access and widened doorways throughout, along with a bright, open-plan kitchen and dining area that maximises natural light and flow. The double height vaulted entrance hall and winding staircase add a touch of grandeur, while premium fixtures and luxury finishes combine elegance with functionality. This project is a perfect blend of contemporary living and accessibility, showcasing the quality and craftsmanship that define Jewel Bespoke Build Ltd.', '["/images/projects/ewelleast/01.jpg", "/images/projects/ewelleast/02.jpg", "/images/projects/ewelleast/03.jpg", "/images/projects/ewelleast/04.jpg", "/images/projects/ewelleast/05.jpg", "/images/projects/ewelleast/06.jpg"]'::jsonb, 'sutton', true, 50),
	('kingston', 'Kingston', 'Kingston Project | Jewel Bespoke Build Ltd | Accessible Refurbishment & Hydrotherapy Pool', 'Full internal and external refurbishment in Kingston with accessibility adaptations, a hydrotherapy pool, herringbone flooring and Crittall-style doors.', 'Full internal and external refurbishment with accessibility adaptations, hydrotherapy pool installation, and bespoke high-end finishes throughout.', 'The Kingston project by Jewel Bespoke Build Ltd features a full-property refurbishment with a focus on accessibility and bespoke detailing. Key upgrades include bathrooms adapted to meet disability access requirements and the installation of a specialist hydrotherapy pool, blending therapeutic function with refined design. Internally, high-end finishes like herringbone flooring and bespoke Crittall-style steel doors enhance both aesthetics and durability. Externally, the transformation includes a landscaped garden, smooth resin driveway, and handcrafted oak-framed carport, combining elegance with practicality. This project exemplifies our commitment to blending accessibility with luxury in every aspect of bespoke construction.', '["/images/projects/kingston/01.jpg", "/images/projects/kingston/02.jpg", "/images/projects/kingston/03.jpg", "/images/projects/kingston/04.jpg", "/images/projects/kingston/05.jpg", "/images/projects/kingston/06.jpg", "/images/projects/kingston/07.jpg", "/images/projects/kingston/08.jpg", "/images/projects/kingston/09.jpg"]'::jsonb, 'cranleigh', true, 60),
	('godalming', 'Godalming', 'Godalming Project | Jewel Bespoke Build Ltd | Oak-Frame Extension & Interior Refurbishment', 'Single-storey oak-frame extension and full interior refurbishment in Godalming, with a vaulted ceiling, bespoke joinery and steel Crittall windows and doors.', 'Single-story oak-frame extension and full interior refurbishment, featuring a vaulted ceiling, bespoke joinery, and high-end fit-out, including a boot room, WC, and utility space.', 'The Godalming project by Jewel Bespoke Build Ltd showcases a stunning single-story oak-frame home extension with a vaulted ceiling, bespoke joinery, and luxurious finishes. This project includes a sophisticated boot room, WC, and utility space, highlighted by industrial chic steel Crittall windows and doors that flood the space with natural light. The design merges modern functionality with timeless elegance, reflecting quality bespoke construction.', '["/images/projects/godalming/01.jpg", "/images/projects/godalming/02.jpg", "/images/projects/godalming/03.jpg", "/images/projects/godalming/04.jpg", "/images/projects/godalming/05.jpg", "/images/projects/godalming/06.jpg"]'::jsonb, 'cheam', false, 70),
	('cobham', 'Cobham', 'Cobham Project | Jewel Bespoke Build Ltd | Open-Plan Kitchen & Full Refurbishment', 'Full renovation in Cobham creating an open-plan kitchen and dining space with an 11-metre steel beam, wireless systems and high-end finishes throughout.', 'Open-plan kitchen and dining area, full internal refurbishment, and modern wireless system integration', 'The Cobham refurbishment by Jewel Bespoke Build Ltd showcases the expertise of Surrey''s leading bespoke builders, transforming a divided home into a spacious, open plan living area. This full renovation features an 11-metre custom steel beam, creating an expansive kitchen and dining space equipped with state of the art wireless systems. High-end finishes and luxury upgrades throughout the kitchen, utilities, and bathrooms offer a sophisticated fusion of modern functionality and timeless elegance, highlighting our commitment to creating exceptional living spaces.', '["/images/projects/cobham/01.jpg", "/images/projects/cobham/02.jpg", "/images/projects/cobham/03.jpg", "/images/projects/cobham/04.jpg", "/images/projects/cobham/05.jpg", "/images/projects/cobham/06.jpg"]'::jsonb, 'cranleigh', false, 80),
	('puttenham', 'Puttenham', 'Puttenham Project | Jewel Bespoke Build Ltd | Open-Plan Rear Extension & Refurbishment', 'Open-plan rear extension and full internal refurbishment in Puttenham, blending indoor and outdoor living with modern finishes and quality craftsmanship.', 'Open Plan Rear extension and full internal refurbishment works.', 'The Puttenham project by Jewel Bespoke Build Ltd features a striking open-plan rear home extension and full internal refurbishment, designed to enhance both space and functionality. The seamless flow between indoor and outdoor areas is complemented by modern finishes and high quality craftsmanship. Every detail has been carefully considered to create a stylish, contemporary living environment, balancing comfort and sophistication.', '["/images/projects/puttenham/01.jpg", "/images/projects/puttenham/02.jpg", "/images/projects/puttenham/03.jpg", "/images/projects/puttenham/04.jpg", "/images/projects/puttenham/05.jpg", "/images/projects/puttenham/06.jpg"]'::jsonb, 'cranleigh', false, 90),
	('guildford', 'Guildford', 'Guildford Project | Jewel Bespoke Build Ltd | Rear Extension & Bespoke Joinery', 'Rear extension and ground floor refurbishment in Guildford with an open kitchen, natural stone flooring, Crittall doors and bespoke joinery throughout.', 'Rear extension and refurbishment of kitchen/ utility and study which includes bespoke joinery throughout', 'The Guildford project by Jewel Bespoke Build Ltd features a refined rear home extension and ground floor refurbishment, blending modern functionality with classic elegance. Our expert Surrey builders expanded the kitchen into an open, welcoming space, complemented by luxurious natural stone flooring. Key design features include internal and external Crittall doors that maximise natural light, along with custom joinery for tailored storage solutions. This project combines contemporary design with practical elegance, enhancing the home''s living experience.', '["/images/projects/guildford/01.jpg", "/images/projects/guildford/02.jpg", "/images/projects/guildford/03.jpg", "/images/projects/guildford/04.jpg", "/images/projects/guildford/05.jpg", "/images/projects/guildford/06.jpg"]'::jsonb, 'ashtead', false, 100),
	('sutton', 'Sutton', 'Sutton Project | Jewel Bespoke Build Ltd | Accessible Front & Rear Extension', 'Single storey front and rear extension and full refurbishment of a 4-bed Sutton home, with widened doorways and open-plan spaces for accessible living.', 'Accessible Living, Single Storey Front and Rear Extension', 'Explore the Sutton project by Jewel Bespoke Build Ltd, featuring accessible living solutions through a single storey front and rear home extension and a full refurbishment of a 4 bedroom house. Our skilled Surrey builders have enhanced accessibility with widened doorways and open-plan spaces that blend seamlessly with the existing structure. A customisable outhouse adds versatile space, demonstrating our commitment to comfort and inclusivity. This project exemplifies how our bespoke contractors combine practical solutions with thoughtful design in Surrey bespoke construction.', '["/images/projects/sutton/01.jpg", "/images/projects/sutton/02.jpg", "/images/projects/sutton/03.jpg", "/images/projects/sutton/04.jpg", "/images/projects/sutton/05.jpg", "/images/projects/sutton/06.jpg"]'::jsonb, 'ewelleast', true, 110),
	('cranleigh', 'Cranleigh', 'Cranleigh Project | Jewel Bespoke Build Ltd | Hand-Crafted Oak Extension & Refurbishment', 'Hand-crafted rear oak extension and full internal refurbishment in Cranleigh, with custom kitchens, oak bi-folding doors and a luxurious sunken spa.', 'Hand crafted rear oak extension and full internal refurbishment works', 'The Cranleigh project by Jewel Bespoke Build Ltd features a beautifully crafted rear oak home extension and comprehensive internal refurbishment. Our skilled Surrey builders blend traditional timber framing with modern precision, incorporating custom kitchens, refined oak finishes, and natural stone accents. Key highlights include oak bi-folding doors that open to an ambient outdoor space with a luxurious sunken spa. This exceptional Surrey construction reflects our commitment to quality craftsmanship and sophisticated design, creating a truly remarkable home.', '["/images/projects/cranleigh/01.jpg", "/images/projects/cranleigh/02.jpg", "/images/projects/cranleigh/03.jpg", "/images/projects/cranleigh/04.jpg", "/images/projects/cranleigh/05.jpg", "/images/projects/cranleigh/06.jpg"]'::jsonb, 'hamptoncourt', false, 120),
	('cheam', 'Cheam', 'Cheam Project | Jewel Bespoke Build Ltd | Rear Extension & Smart Home Refurbishment', 'Single-storey rear extension and full refurbishment of a 4-bed, 3-bath Cheam home, with a bespoke kitchen, premium finishes and a smart home system.', 'Rear extension and full house refurbishment, 4 bedrooms and 3 bathrooms', 'The Cheam project by Jewel Bespoke Build Ltd features a full refurbishment of a four bedroom, three bathroom home, including a single-storey rear home extension that enhances both functionality and aesthetics. Our expert Surrey builders have transformed the rear of the property into modern, inviting living spaces, centered around a bespoke kitchen and utility area. With premium finishes and a state of the art smart home system for lighting, heating, and security, this project exemplifies contemporary living and highlights our commitment to quality as trusted bespoke contractors.', '["/images/projects/cheam/01.jpg", "/images/projects/cheam/02.jpg", "/images/projects/cheam/03.jpg", "/images/projects/cheam/04.jpg", "/images/projects/cheam/05.jpg", "/images/projects/cheam/06.jpg"]'::jsonb, 'guildford', false, 130),
	('bromley', 'Bromley', 'Bromley Project | Jewel Bespoke Build Ltd | New Project Coming Soon', 'A new Jewel Bespoke Build project in Bromley. Full details and photos coming soon. Explore our other completed projects across Surrey in the meantime.', 'New project — coming soon', 'Details of this project are coming soon.', '[]'::jsonb, 'cobham', false, 140)
) as seed(slug, name, meta_title, meta_description, subtitle, description, gallery, cross_link, accessible, sort_order)
where not exists (select 1 from public.projects);

-- ---------- One-off: repoint old Wix team photos to repo images ---
-- (No-op on fresh installs; fixes rows seeded before the Wix migration.)

update public.team_members set photo_url = '/images/team/nigel-reilly.png' where name = 'Nigel Reilly' and photo_url like 'https://static.wixstatic.com%';
update public.team_members set photo_url = '/images/team/les-reilly.png' where name = 'Les Reilly' and photo_url like 'https://static.wixstatic.com%';
update public.team_members set photo_url = '/images/team/jeremy-ferendinos.png' where name = 'Jeremy Ferendinos' and photo_url like 'https://static.wixstatic.com%';
update public.team_members set photo_url = '/images/team/neil-kerr.png' where name = 'Neil Kerr' and photo_url like 'https://static.wixstatic.com%';
update public.team_members set photo_url = '/images/team/jack-easty.jpg' where name = 'Jack Easty' and photo_url like 'https://static.wixstatic.com%';
update public.team_members set photo_url = '/images/team/katy-hicks.jpg' where name = 'Katy Hicks' and photo_url like 'https://static.wixstatic.com%';
update public.team_members set photo_url = '/images/team/chloe-hicks.jpg' where name = 'Chloe Hicks' and photo_url like 'https://static.wixstatic.com%';
update public.team_members set photo_url = '/images/team/katie-prentice.jpg' where name = 'Katie Prentice' and photo_url like 'https://static.wixstatic.com%';
update public.team_members set photo_url = '/images/team/sofia-sarkus.jpg' where name = 'Sofia Sarkus' and photo_url like 'https://static.wixstatic.com%';

-- ---------- Seed: current team (only if table is empty) -----------

insert into public.team_members (name, role, bio, photo_url, sort_order)
select * from (values
	('Nigel Reilly', 'CEO', 'Nigel leads with strategic vision and dedication, ensuring every project exceeds client expectations. His proactive approach, commitment to quality, and ability to inspire collaboration drive innovation and excellence, making his leadership the cornerstone of the team''s success and continued growth.', '/images/team/nigel-reilly.png', 10),
	('Les Reilly', 'Founder', 'With extensive industry expertise and a passion for craftsmanship, Les founded Jewel on principles of quality, trust, and attention to detail. His hands-on approach and commitment to excellence have shaped the company, inspiring the team to uphold the highest standards in every project.', '/images/team/les-reilly.png', 20),
	('Jeremy Ferendinos', 'Finance Director', 'Jeremy specialises in strategic planning, resource optimisation, and risk management, particularly in construction. He streamlines financial processes, enhances cash flow, and ensures long-term sustainability. Committed to driving growth, he fosters collaboration to align financial strategy with business goals.', '/images/team/jeremy-ferendinos.png', 30),
	('Neil Kerr', 'Senior Project Manager', 'With a focus on clear communication and detail, Neil leads our projects on site – coordinating teams, managing programmes and working closely with clients to deliver smooth, high-quality builds.', '/images/team/neil-kerr.png', 40),
	('Jack Easty', 'Carpenter', 'As a site-based carpenter, Jack supports our projects with high-quality workmanship and attention to detail. The grandson of founder Les and son of CEO Nigel, he is proudly building his career within the family business, gaining experience across a range of bespoke residential projects.', '/images/team/jack-easty.jpg', 50),
	('Katy Hicks', 'Health & Safety Officer', 'Katy oversees the implementation of Jewel Bespoke Build''s health and safety policy on all active sites, making sure employees, subcontractors and visitors can work safely and that legal requirements are met. She coordinates site inductions, inspections, PPE registers, toolbox talks, accident and incident reporting, and ensures that competent people, safe systems of work, and up-to-date risk assessments and method statements are in place across each project.', '/images/team/katy-hicks.jpg', 60),
	('Chloe Hicks', 'Accounts Manager', 'Chloe brings extensive experience in financial management, overseeing accounts and ensuring accurate, efficient processes. She is skilled in budgeting, financial reporting, and cash flow management, playing a key role in maintaining financial stability and supporting strategic growth for the team and projects.', '/images/team/chloe-hicks.jpg', 70),
	('Katie Prentice', 'Administrator', 'Katie provides essential administrative support, helping with daily operations, organising tasks, and ensuring efficiency across teams. Her attention to detail and organisational skills are key to keeping everything running smoothly.', '/images/team/katie-prentice.jpg', 80),
	('Sofia Sarkus', 'Marketing Manager', 'Sofia develops and delivers the marketing strategy, showcasing our bespoke projects to the right audiences across all channels. She manages our online presence, content and campaigns, helping to build brand awareness and turn interest into high-quality enquiries for the team.', '/images/team/sofia-sarkus.jpg', 90)
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

-- ---------- RTW submissions (added 2026-08-10) --------------------
-- One row per engaging company per completed check, written by the
-- server when a checker generates a register entry at /rtw.
-- Viewed (paginated) at /admin/rtw. RLS on, no policies: service
-- role only, same as the other tables.

create table if not exists public.rtw_submissions (
	id uuid primary key default gen_random_uuid(),
	group_id uuid not null,                 -- groups the rows of one generate click
	entity text not null,                   -- engaging company, e.g. JBB
	full_name text not null,
	trade text not null default '',
	engagement_type text not null,
	start_date date,
	check_method text not null default '',
	document_seen text not null default '',
	check_date date,
	checked_by text not null default '',
	outcome text not null default '',
	permission_expiry date,
	followup_due date,
	evidence_ref text not null default '',
	notes text not null default '',
	created_at timestamptz not null default now()
);

create index if not exists rtw_submissions_created_at_idx
	on public.rtw_submissions (created_at desc);

alter table public.rtw_submissions enable row level security;
