-- Bloomsize: site content + admin. Run once in Supabase -> SQL Editor.

create table if not exists public.site_texts (
  key text primary key,
  value text not null,
  updated_at timestamptz not null default now()
);
create table if not exists public.site_images (
  key text primary key,
  url text not null,
  updated_at timestamptz not null default now()
);
create table if not exists public.admins (
  user_id uuid primary key references auth.users(id) on delete cascade
);

alter table public.site_texts enable row level security;
alter table public.site_images enable row level security;
alter table public.admins enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$;
grant execute on function public.is_admin() to anon, authenticated;

drop policy if exists "texts read" on public.site_texts;
drop policy if exists "texts insert" on public.site_texts;
drop policy if exists "texts update" on public.site_texts;
drop policy if exists "texts delete" on public.site_texts;
create policy "texts read" on public.site_texts for select to anon, authenticated using (true);
create policy "texts insert" on public.site_texts for insert to authenticated with check (public.is_admin());
create policy "texts update" on public.site_texts for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "texts delete" on public.site_texts for delete to authenticated using (public.is_admin());

drop policy if exists "images read" on public.site_images;
drop policy if exists "images insert" on public.site_images;
drop policy if exists "images update" on public.site_images;
drop policy if exists "images delete" on public.site_images;
create policy "images read" on public.site_images for select to anon, authenticated using (true);
create policy "images insert" on public.site_images for insert to authenticated with check (public.is_admin());
create policy "images update" on public.site_images for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "images delete" on public.site_images for delete to authenticated using (public.is_admin());

insert into storage.buckets (id, name, public)
values ('site', 'site', true)
on conflict (id) do update set public = true;

drop policy if exists "site files read" on storage.objects;
drop policy if exists "site files insert" on storage.objects;
drop policy if exists "site files update" on storage.objects;
drop policy if exists "site files delete" on storage.objects;
create policy "site files read" on storage.objects for select to anon, authenticated using (bucket_id = 'site');
create policy "site files insert" on storage.objects for insert to authenticated with check (bucket_id = 'site' and public.is_admin());
create policy "site files update" on storage.objects for update to authenticated using (bucket_id = 'site' and public.is_admin()) with check (bucket_id = 'site' and public.is_admin());
create policy "site files delete" on storage.objects for delete to authenticated using (bucket_id = 'site' and public.is_admin());

-- AFTER you create your user in Authentication -> Users, run this line with YOUR email:
-- insert into public.admins (user_id) select id from auth.users where email = 'YOUR_EMAIL_HERE' on conflict do nothing;
