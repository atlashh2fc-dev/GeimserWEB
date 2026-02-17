-- Multi-tenant (MV) migration for Geimser2025 (Next.js + Supabase)
-- Paste into Supabase SQL Editor and run once.

begin;

-- 1) Core tenants
create table if not exists public.tenants (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  status text not null default 'active',
  domain text null,
  created_at timestamptz not null default now(),
  constraint tenants_status_check check (status in ('active', 'inactive'))
);

-- 2) Per-tenant API keys (store only hash)
create table if not exists public.tenant_api_keys (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  secret_hash text not null unique,
  label text null,
  active boolean not null default true,
  last_used_at timestamptz null,
  created_at timestamptz not null default now()
);

create index if not exists tenant_api_keys_tenant_id_idx on public.tenant_api_keys(tenant_id);
create index if not exists tenant_api_keys_active_idx on public.tenant_api_keys(active) where active = true;

-- 3) Optional membership mapping for RLS (future-proof)
create table if not exists public.tenant_members (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references public.tenants(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null default 'tenant_user',
  created_at timestamptz not null default now(),
  constraint tenant_members_role_check check (role in ('tenant_user', 'admin')),
  constraint tenant_members_unique unique (tenant_id, user_id)
);

create index if not exists tenant_members_user_id_idx on public.tenant_members(user_id);
create index if not exists tenant_members_tenant_id_idx on public.tenant_members(tenant_id);

-- 4) Add tenant_id to tenant-scoped entities (current schema: leads_comerciales only)
alter table public.leads_comerciales
  add column if not exists tenant_id uuid null references public.tenants(id);

-- 5) Seed default tenant + backfill existing data
insert into public.tenants (name, slug, status)
values ('Geimser', 'geimser', 'active')
on conflict (slug) do nothing;

update public.leads_comerciales
set tenant_id = (select id from public.tenants where slug = 'geimser')
where tenant_id is null;

alter table public.leads_comerciales
  alter column tenant_id set not null;

create index if not exists leads_comerciales_tenant_created_at_idx
  on public.leads_comerciales(tenant_id, created_at desc);

create index if not exists leads_comerciales_tenant_fecha_creacion_idx
  on public.leads_comerciales(tenant_id, fecha_creacion desc);

-- 6) RPCs for dashboard aggregations (security invoker: respects RLS)
create or replace function public.get_global_kpis(date_from timestamptz, date_to timestamptz)
returns table (
  total_leads bigint,
  leads_in_range bigint,
  leads_7d bigint,
  leads_30d bigint,
  leads_today bigint
)
language sql
stable
set search_path = public
as $$
  select
    (select count(*) from public.leads_comerciales) as total_leads,
    (select count(*) from public.leads_comerciales
      where created_at >= date_from and created_at < date_to) as leads_in_range,
    (select count(*) from public.leads_comerciales
      where created_at >= (now() - interval '7 days')) as leads_7d,
    (select count(*) from public.leads_comerciales
      where created_at >= (now() - interval '30 days')) as leads_30d,
    (select count(*) from public.leads_comerciales
      where created_at >= date_trunc('day', now())) as leads_today;
$$;

create or replace function public.get_tenant_kpis(p_tenant_id uuid, date_from timestamptz, date_to timestamptz)
returns table (
  total_leads bigint,
  leads_in_range bigint,
  leads_7d bigint,
  leads_30d bigint,
  leads_today bigint
)
language sql
stable
set search_path = public
as $$
  select
    (select count(*) from public.leads_comerciales where tenant_id = p_tenant_id) as total_leads,
    (select count(*) from public.leads_comerciales
      where tenant_id = p_tenant_id and created_at >= date_from and created_at < date_to) as leads_in_range,
    (select count(*) from public.leads_comerciales
      where tenant_id = p_tenant_id and created_at >= (now() - interval '7 days')) as leads_7d,
    (select count(*) from public.leads_comerciales
      where tenant_id = p_tenant_id and created_at >= (now() - interval '30 days')) as leads_30d,
    (select count(*) from public.leads_comerciales
      where tenant_id = p_tenant_id and created_at >= date_trunc('day', now())) as leads_today;
$$;

create or replace function public.get_top_tenants(date_from timestamptz, date_to timestamptz, limit_count int)
returns table (
  tenant_id uuid,
  slug text,
  name text,
  leads_count bigint
)
language sql
stable
set search_path = public
as $$
  select
    t.id as tenant_id,
    t.slug,
    t.name,
    count(l.id) as leads_count
  from public.tenants t
  left join public.leads_comerciales l
    on l.tenant_id = t.id
   and l.created_at >= date_from
   and l.created_at < date_to
  where t.status = 'active'
  group by t.id, t.slug, t.name
  order by leads_count desc, t.name asc
  limit greatest(1, limit_count);
$$;

create or replace function public.get_activity_timeseries(
  scope text,
  p_tenant_id uuid,
  date_from timestamptz,
  date_to timestamptz
)
returns table (
  day date,
  leads_count bigint
)
language sql
stable
set search_path = public
as $$
  with bounds as (
    select
      date_trunc('day', date_from) as from_day,
      date_trunc('day', date_to) as to_day
  ),
  series as (
    select generate_series(
      (select from_day from bounds)::date,
      (select to_day from bounds)::date,
      interval '1 day'
    )::date as day
  ),
  filtered as (
    select
      date_trunc('day', l.created_at)::date as day,
      count(*)::bigint as c
    from public.leads_comerciales l
    where
      l.created_at >= (select from_day from bounds)
      and l.created_at < ((select to_day from bounds) + interval '1 day')
      and (
        scope = 'global'
        or (scope = 'tenant' and l.tenant_id = p_tenant_id)
      )
    group by 1
  )
  select s.day, coalesce(f.c, 0)::bigint as leads_count
  from series s
  left join filtered f using (day)
  order by s.day asc;
$$;

-- 7) Helper to create a tenant API key (returns plaintext secret ONCE)
create or replace function public.create_tenant_api_key(p_tenant_id uuid, p_label text default null)
returns table (
  api_key_id uuid,
  plaintext_secret text,
  secret_hash text
)
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_secret text := encode(gen_random_bytes(32), 'hex');
  v_hash text := encode(digest(v_secret, 'sha256'), 'hex');
  v_id uuid;
begin
  insert into public.tenant_api_keys (tenant_id, secret_hash, label, active)
  values (p_tenant_id, v_hash, p_label, true)
  returning id into v_id;

  return query select v_id, v_secret, v_hash;
end;
$$;

-- 8) RLS: enforce tenant scoping (service_role bypasses RLS; admin via tenant_members role='admin')
alter table public.tenants enable row level security;
alter table public.tenant_api_keys enable row level security;
alter table public.tenant_members enable row level security;
alter table public.leads_comerciales enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
stable
set search_path = public
as $$
  select exists (
    select 1
    from public.tenant_members tm
    where tm.user_id = auth.uid()
      and tm.role = 'admin'
  );
$$;

create or replace function public.can_access_tenant(p_tenant_id uuid)
returns boolean
language sql
stable
set search_path = public
as $$
  select public.is_admin()
  or exists (
    select 1
    from public.tenant_members tm
    where tm.user_id = auth.uid()
      and tm.tenant_id = p_tenant_id
  );
$$;

-- tenants: members can read their tenant; admins read all
drop policy if exists tenants_select on public.tenants;
create policy tenants_select
on public.tenants
for select
to authenticated
using (public.is_admin() or exists (
  select 1 from public.tenant_members tm where tm.user_id = auth.uid() and tm.tenant_id = tenants.id
));

-- tenant_members: user can read own memberships; admin can read all
drop policy if exists tenant_members_select on public.tenant_members;
create policy tenant_members_select
on public.tenant_members
for select
to authenticated
using (public.is_admin() or user_id = auth.uid());

-- tenant_api_keys: only admin
drop policy if exists tenant_api_keys_admin_all on public.tenant_api_keys;
create policy tenant_api_keys_admin_all
on public.tenant_api_keys
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

-- leads: tenant members can read/write their tenant; admin all
drop policy if exists leads_select on public.leads_comerciales;
create policy leads_select
on public.leads_comerciales
for select
to authenticated
using (public.can_access_tenant(tenant_id));

drop policy if exists leads_insert on public.leads_comerciales;
create policy leads_insert
on public.leads_comerciales
for insert
to authenticated
with check (public.can_access_tenant(tenant_id));

drop policy if exists leads_update on public.leads_comerciales;
create policy leads_update
on public.leads_comerciales
for update
to authenticated
using (public.can_access_tenant(tenant_id))
with check (public.can_access_tenant(tenant_id));

commit;
