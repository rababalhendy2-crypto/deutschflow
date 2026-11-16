-- DRAFT, NOT APPLIED. Needs the project owner's approval, and the live tables must be inspected first
-- (the deutschflow database was paused during the security review, so its current policies could not be read).
--
-- What it does, for the one table the app uses (public.user_docs):
--   1. Row level security on, and forced, so even the table owner role goes through the policies.
--   2. Each signed-in user can read, add, change and delete only rows whose user_id is their own id.
--      Anonymous visitors get nothing.
--   3. If a user turned on two-step sign-in, their rows need a session that passed the code check (aal2).
--      Users without two-step sign-in are not affected.
--   4. Server-side checks on what the browser sends: only the known document names, a JSON object body,
--      and at most 1 MB per document.

alter table public.user_docs enable row level security;
alter table public.user_docs force row level security;

-- Replace whatever policies exist today with the four below (review the old ones before running this).
do $$ declare p record; begin
  for p in select policyname from pg_policies where schemaname = 'public' and tablename = 'user_docs' loop
    execute format('drop policy %I on public.user_docs', p.policyname);
  end loop;
end $$;

create policy "own rows: read" on public.user_docs as permissive for select to authenticated
  using ((select auth.uid()) = user_id);
create policy "own rows: insert" on public.user_docs as permissive for insert to authenticated
  with check ((select auth.uid()) = user_id);
create policy "own rows: update" on public.user_docs as permissive for update to authenticated
  using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "own rows: delete" on public.user_docs as permissive for delete to authenticated
  using ((select auth.uid()) = user_id);

-- Two-step sign-in is enforced by the database, not only by the app screen.
create policy "two-step sign-in when enabled" on public.user_docs as restrictive for all to authenticated
  using (
    (select auth.jwt() ->> 'aal') = 'aal2'
    or not exists (select 1 from auth.mfa_factors f where f.user_id = (select auth.uid()) and f.status = 'verified')
  );

revoke all on public.user_docs from anon;

-- Input checks on the server. NOT VALID keeps existing rows as they are; new writes must pass.
alter table public.user_docs add constraint user_docs_name_allowed
  check (name in ('profile', 'progress', 'vocab', 'activity', 'custom')) not valid;
alter table public.user_docs add constraint user_docs_body_object
  check (jsonb_typeof(body) = 'object') not valid;
alter table public.user_docs add constraint user_docs_body_size
  check (pg_column_size(body) <= 1048576) not valid;
