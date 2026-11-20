-- Rewards: one board per signed-in teacher, with their kids and prize wheel.
-- Applied to the "roshie rewards" Supabase project on 2026-11-20.

create table public.boards (
  user_id uuid primary key default auth.uid() references auth.users (id) on delete cascade,
  per_spin smallint not null default 5 check (per_spin between 1 and 10),
  free_spins boolean not null default false,
  sound boolean not null default true,
  active_kid uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.kids (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  position smallint not null default 0,
  name text not null check (char_length(name) between 1 and 24),
  color text not null check (char_length(color) <= 16),
  stars integer not null default 0 check (stars >= 0),
  spent integer not null default 0 check (spent >= 0),
  won integer not null default 0 check (won >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index kids_user_position_idx on public.kids (user_id, position);

create table public.prizes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  position smallint not null default 0,
  name text not null check (char_length(name) <= 24),
  icon text not null default 'star' check (char_length(icon) <= 16),
  color text not null default 'yellow' check (char_length(color) <= 16),
  image_path text check (char_length(image_path) <= 200),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index prizes_user_position_idx on public.prizes (user_id, position);

-- keep updated_at fresh
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;
revoke execute on function public.touch_updated_at() from public, anon, authenticated;

create trigger boards_touch_updated_at before update on public.boards for each row execute function public.touch_updated_at();
create trigger kids_touch_updated_at before update on public.kids for each row execute function public.touch_updated_at();
create trigger prizes_touch_updated_at before update on public.prizes for each row execute function public.touch_updated_at();

-- access: signed-in teachers only, and only their own rows
revoke all on public.boards, public.kids, public.prizes from anon;
grant select, insert, update, delete on public.boards, public.kids, public.prizes to authenticated;

alter table public.boards enable row level security;
alter table public.kids enable row level security;
alter table public.prizes enable row level security;

create policy "Teachers read own board" on public.boards for select to authenticated using ((select auth.uid()) = user_id);
create policy "Teachers add own board" on public.boards for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "Teachers update own board" on public.boards for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "Teachers delete own board" on public.boards for delete to authenticated using ((select auth.uid()) = user_id);

create policy "Teachers read own kids" on public.kids for select to authenticated using ((select auth.uid()) = user_id);
create policy "Teachers add own kids" on public.kids for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "Teachers update own kids" on public.kids for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "Teachers delete own kids" on public.kids for delete to authenticated using ((select auth.uid()) = user_id);

create policy "Teachers read own prizes" on public.prizes for select to authenticated using ((select auth.uid()) = user_id);
create policy "Teachers add own prizes" on public.prizes for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "Teachers update own prizes" on public.prizes for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "Teachers delete own prizes" on public.prizes for delete to authenticated using ((select auth.uid()) = user_id);

-- prize photos: private bucket, each teacher writes only inside their own folder (<user id>/...)
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('prize-photos', 'prize-photos', false, 1048576, array['image/webp', 'image/jpeg', 'image/png']);

create policy "Teachers read own prize photos" on storage.objects for select to authenticated
  using (bucket_id = 'prize-photos' and (storage.foldername(name))[1] = (select auth.uid())::text);
create policy "Teachers upload own prize photos" on storage.objects for insert to authenticated
  with check (bucket_id = 'prize-photos' and (storage.foldername(name))[1] = (select auth.uid())::text);
create policy "Teachers delete own prize photos" on storage.objects for delete to authenticated
  using (bucket_id = 'prize-photos' and (storage.foldername(name))[1] = (select auth.uid())::text);
