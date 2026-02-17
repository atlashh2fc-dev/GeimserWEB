import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/server/supabaseAdmin';

function isAdminRequest(req: NextRequest): boolean {
  return req.cookies.get('geimser_admin_auth')?.value === 'true';
}

function parseRangeDays(value: string | null): 7 | 30 | 90 {
  const n = Number(value);
  if (n === 7 || n === 30 || n === 90) return n;
  return 30;
}

export async function GET(req: NextRequest) {
  if (!isAdminRequest(req)) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  const url = new URL(req.url);
  const tenantSlug = (url.searchParams.get('tenant') || 'global').trim();
  const rangeDays = parseRangeDays(url.searchParams.get('rangeDays'));

  const now = new Date();
  const dateTo = now.toISOString();
  const dateFrom = new Date(now.getTime() - rangeDays * 24 * 60 * 60 * 1000).toISOString();

  const supabase = getSupabaseAdmin();

  const { data: tenants, error: tenantsError } = await supabase
    .from('tenants')
    .select('id, name, slug, status')
    .order('name', { ascending: true });
  if (tenantsError) {
    return NextResponse.json({ ok: false, error: tenantsError.message }, { status: 500 });
  }

  let scope: 'global' | 'tenant' = 'global';
  let tenant: { id: string; name: string; slug: string } | null = null;

  if (tenantSlug && tenantSlug !== 'global') {
    const { data: t, error: tenantError } = await supabase
      .from('tenants')
      .select('id, name, slug')
      .eq('slug', tenantSlug)
      .single();
    if (tenantError) {
      return NextResponse.json({ ok: false, error: 'Tenant not found' }, { status: 404 });
    }
    tenant = { id: t.id as string, name: t.name as string, slug: t.slug as string };
    scope = 'tenant';
  }

  const { data: kpisRows, error: kpisError } =
    scope === 'global'
      ? await supabase.rpc('get_global_kpis', { date_from: dateFrom, date_to: dateTo })
      : await supabase.rpc('get_tenant_kpis', { p_tenant_id: tenant!.id, date_from: dateFrom, date_to: dateTo });
  if (kpisError) {
    return NextResponse.json({ ok: false, error: kpisError.message }, { status: 500 });
  }
  const kpis = Array.isArray(kpisRows) ? kpisRows[0] : kpisRows;

  const { data: timeseries, error: tsError } = await supabase.rpc('get_activity_timeseries', {
    scope,
    p_tenant_id: scope === 'tenant' ? tenant!.id : null,
    date_from: dateFrom,
    date_to: dateTo,
  });
  if (tsError) {
    return NextResponse.json({ ok: false, error: tsError.message }, { status: 500 });
  }

  const { data: topTenants, error: topError } =
    scope === 'global'
      ? await supabase.rpc('get_top_tenants', { date_from: dateFrom, date_to: dateTo, limit_count: 10 })
      : { data: null, error: null };
  if (topError) {
    return NextResponse.json({ ok: false, error: topError.message }, { status: 500 });
  }

  const leadsQuery = supabase
    .from('leads_comerciales')
    .select(
      scope === 'global'
        ? 'id, created_at, nombre, correo, telefono, empresa, mensaje, tipo_interes, fuente, estado, tenant_id, tenants(name, slug)'
        : 'id, created_at, nombre, correo, telefono, empresa, mensaje, tipo_interes, fuente, estado, tenant_id',
    )
    .order('created_at', { ascending: false })
    .limit(50);

  const { data: latestLeads, error: leadsError } =
    scope === 'tenant' ? await leadsQuery.eq('tenant_id', tenant!.id) : await leadsQuery;
  if (leadsError) {
    return NextResponse.json({ ok: false, error: leadsError.message }, { status: 500 });
  }

  return NextResponse.json({
    ok: true,
    scope,
    tenant,
    rangeDays,
    dateFrom,
    dateTo,
    tenants,
    kpis,
    topTenants: topTenants ?? [],
    timeseries: timeseries ?? [],
    latestLeads: latestLeads ?? [],
  });
}

