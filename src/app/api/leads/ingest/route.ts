import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/server/supabaseAdmin';
import { rateLimit } from '@/lib/server/rateLimit';
import { resolveTenantIdFromBearerToken } from '@/lib/server/tenantAuth';

function getClientIp(req: NextRequest): string {
  const xff = req.headers.get('x-forwarded-for');
  if (xff) return xff.split(',')[0].trim();
  const realIp = req.headers.get('x-real-ip');
  if (realIp) return realIp.trim();
  const cfIp = req.headers.get('cf-connecting-ip');
  if (cfIp) return cfIp.trim();
  return 'unknown';
}

function bearerToken(req: NextRequest): string | null {
  const raw = req.headers.get('authorization');
  if (!raw) return null;
  const value = raw.trim();
  const parts = value.split(/\s+/g);
  if (parts.length < 2) return null;
  if (parts[0].toLowerCase() !== 'bearer') return null;
  return parts.slice(1).join(' ').trim() || null;
}

function badRequest(message: string, details?: unknown) {
  return NextResponse.json({ ok: false, error: message, details }, { status: 400 });
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const token = bearerToken(req);

  if (!token) {
    return NextResponse.json({ ok: false, error: 'Missing Bearer token' }, { status: 401 });
  }

  const ipLimit = rateLimit(`ingest:ip:${ip}`, { limit: 60, windowMs: 5 * 60_000 });
  if (!ipLimit.allowed) {
    return NextResponse.json(
      { ok: false, error: 'Rate limited' },
      {
        status: 429,
        headers: {
          'Retry-After': Math.ceil((ipLimit.resetAt - Date.now()) / 1000).toString(),
        },
      },
    );
  }

  const tokenLimit = rateLimit(`ingest:token:${token.slice(0, 12)}`, { limit: 240, windowMs: 5 * 60_000 });
  if (!tokenLimit.allowed) {
    return NextResponse.json({ ok: false, error: 'Rate limited' }, { status: 429 });
  }

  let payload: any;
  try {
    payload = await req.json();
  } catch {
    return badRequest('Invalid JSON');
  }

  const mensaje = typeof payload?.mensaje === 'string' ? payload.mensaje.trim() : null;
  const correo = typeof payload?.correo === 'string' ? payload.correo.trim() : null;

  if (!mensaje && !correo) {
    return badRequest('Missing required fields: mensaje or correo');
  }

  const nombre = typeof payload?.nombre === 'string' ? payload.nombre.trim() : null;
  const telefono = typeof payload?.telefono === 'string' ? payload.telefono.trim() : null;
  const empresa = typeof payload?.empresa === 'string' ? payload.empresa.trim() : null;
  const tipo_interes = typeof payload?.tipo_interes === 'string' ? payload.tipo_interes.trim() : 'Consulta General';
  const fuente = typeof payload?.fuente === 'string' ? payload.fuente.trim() : 'API Ingest';
  const estado = typeof payload?.estado === 'string' ? payload.estado.trim() : 'pendiente';
  const conversacion_completa =
    typeof payload?.conversacion_completa === 'string' ? payload.conversacion_completa : null;

  try {
    const { tenantId, apiKeyId } = await resolveTenantIdFromBearerToken(token);
    const supabase = getSupabaseAdmin();

    const leadToInsert = {
      tenant_id: tenantId,
      nombre: nombre || 'Usuario',
      correo,
      telefono,
      empresa,
      mensaje,
      tipo_interes,
      fuente,
      estado,
      conversacion_completa,
      fecha_creacion: new Date().toISOString(),
    };

    const { data, error } = await supabase.from('leads_comerciales').insert([leadToInsert]).select('id').single();
    if (error) throw error;

    await supabase
      .from('tenant_api_keys')
      .update({ last_used_at: new Date().toISOString() })
      .eq('id', apiKeyId);

    return NextResponse.json({ ok: true, id: data?.id ?? null });
  } catch (e: any) {
    const message = String(e?.message || 'Internal error');
    const status = message === 'Invalid API token' ? 401 : 500;
    return NextResponse.json({ ok: false, error: message }, { status });
  }
}
