-- ============================================================
-- LinkForge — Supabase SQL Schema
-- Run this in: Supabase Dashboard > SQL Editor
-- ============================================================

-- 1. Profiles (linked to Supabase Auth)
create table if not exists profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  username    text unique not null,
  plan        text not null default 'free' check (plan in ('free', 'pro')),
  created_at  timestamptz not null default now()
);

-- 2. Pages
create table if not exists pages (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references profiles(id) on delete cascade,
  name        text not null,
  bio         text,
  avatar_url  text,
  theme       text not null default 'default' check (theme in ('default', 'dark', 'gradient', 'minimal')),
  created_at  timestamptz not null default now()
);

-- 3. Links
create table if not exists links (
  id          uuid primary key default gen_random_uuid(),
  page_id     uuid not null references pages(id) on delete cascade,
  title       text not null,
  url         text not null,
  icon        text,
  position    int not null default 0,
  is_active   boolean not null default true
);

-- 4. Clicks (analytics)
create table if not exists clicks (
  id          uuid primary key default gen_random_uuid(),
  link_id     uuid not null references links(id) on delete cascade,
  page_id     uuid not null references pages(id) on delete cascade,
  referrer    text,
  clicked_at  timestamptz not null default now()
);

-- ============================================================
-- Row Level Security (RLS)
-- ============================================================

alter table profiles enable row level security;
alter table pages enable row level security;
alter table links enable row level security;
alter table clicks enable row level security;

-- Profiles: users can only read/update their own
create policy "profiles_select_own" on profiles for select using (auth.uid() = id);
create policy "profiles_insert_own" on profiles for insert with check (auth.uid() = id);
create policy "profiles_update_own" on profiles for update using (auth.uid() = id);

-- Pages: owners can do everything; anyone can read (for public pages)
create policy "pages_select_public" on pages for select using (true);
create policy "pages_insert_own"   on pages for insert with check (auth.uid() = user_id);
create policy "pages_update_own"   on pages for update using (auth.uid() = user_id);
create policy "pages_delete_own"   on pages for delete using (auth.uid() = user_id);

-- Links: public read, owner write
create policy "links_select_public" on links for select using (true);
create policy "links_insert_own" on links for insert with check (
  auth.uid() = (select user_id from pages where id = page_id)
);
create policy "links_update_own" on links for update using (
  auth.uid() = (select user_id from pages where id = page_id)
);
create policy "links_delete_own" on links for delete using (
  auth.uid() = (select user_id from pages where id = page_id)
);

-- Clicks: anyone can insert, only owner can read
create policy "clicks_insert_anyone" on clicks for insert with check (true);
create policy "clicks_select_owner" on clicks for select using (
  auth.uid() = (select user_id from pages where id = page_id)
);

-- ============================================================
-- Auto-create profile on signup
-- ============================================================

create or replace function handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'username', 'user_' || substr(new.id::text, 1, 8))
  );
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();

-- ============================================================
-- Storage — Avatar uploads
-- ============================================================

insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true)
on conflict (id) do nothing;

create policy "avatars_public_read" on storage.objects
  for select using (bucket_id = 'avatars');

create policy "avatars_auth_upload" on storage.objects
  for insert with check (bucket_id = 'avatars' AND auth.role() = 'authenticated');

create policy "avatars_auth_delete" on storage.objects
  for delete using (bucket_id = 'avatars' AND auth.role() = 'authenticated');