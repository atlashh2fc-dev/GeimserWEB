-- Conversations table (to unblock external bot conversation updates)
-- Paste into Supabase SQL Editor and run once.

begin;

create table if not exists public.conversations (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  lead_id bigint null references public.leads_comerciales(id) on delete set null,
  status text not null default 'open',
  channel text null,
  user_name text null,
  user_email text null,
  user_phone text null,
  last_message text null,
  last_message_at timestamptz null,
  lead_sent boolean not null default false,
  meta jsonb null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists conversations_tenant_created_at_idx on public.conversations(tenant_id, created_at desc);
create index if not exists conversations_tenant_updated_at_idx on public.conversations(tenant_id, updated_at desc);
create index if not exists conversations_lead_id_idx on public.conversations(lead_id);

-- Ensure PostgREST roles have table privileges (RLS still applies)
grant select, insert, update, delete, references, trigger, truncate on table public.conversations to anon, authenticated, service_role;

-- updated_at trigger
create or replace function public.tg_set_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

do $$
begin
  if not exists (
    select 1
    from pg_trigger
    where tgname = 'set_conversations_updated_at'
  ) then
    create trigger set_conversations_updated_at
    before update on public.conversations
    for each row
    execute function public.tg_set_updated_at();
  end if;
end $$;

-- RLS
alter table public.conversations enable row level security;

drop policy if exists conversations_select on public.conversations;
create policy conversations_select
on public.conversations
for select
to authenticated
using (public.can_access_tenant(tenant_id));

drop policy if exists conversations_insert on public.conversations;
create policy conversations_insert
on public.conversations
for insert
to authenticated
with check (public.can_access_tenant(tenant_id));

drop policy if exists conversations_update on public.conversations;
create policy conversations_update
on public.conversations
for update
to authenticated
using (public.can_access_tenant(tenant_id))
with check (public.can_access_tenant(tenant_id));

commit;

