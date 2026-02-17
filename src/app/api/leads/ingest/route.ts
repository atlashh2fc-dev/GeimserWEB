import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/server/supabaseAdmin';
import { rateLimit } from '@/lib/server/rateLimit';
import { createHash } from 'crypto';

export const runtime = 'nodejs';

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

function normalizeToken(raw: string): string {
  const t = raw.trim();
  if (t.length >= 2) {
    const first = t[0];
    const last = t[t.length - 1];
    if ((first === '"' && last === '"') || (first === "'" && last === "'")) {
      return t.slice(1, -1).trim();
    }
  }
  return t;
}

function sha256Hex(value: string): string {
  return createHash('sha256').update(value, 'utf8').digest('hex');
}

function badRequest(error: string, details?: unknown) {
  return NextResponse.json({ ok: false, error, details }, { status: 400 });
}

export async function GET() {
  return NextResponse.json({ ok: true, service: 'leads_ingest', timestamp: new Date().toISOString() });
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const tokenRaw = bearerToken(req);

  if (!tokenRaw) {
    console.log('[INGEST] missing_token', { ip });
    return NextResponse.json({ ok: false, error: 'missing_token' }, { status: 401 });
  }

  const token = normalizeToken(tokenRaw);
  if (token !== tokenRaw) {
    console.log('[INGEST] token_normalized', { ip, rawLen: tokenRaw.length, normalizedLen: token.length });
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
    console.log('[INGEST] bad_payload_invalid_json', { ip });
    return badRequest('bad_payload');
  }

  const name =
    typeof payload?.name === 'string'
      ? payload.name.trim()
      : typeof payload?.nombre === 'string'
        ? payload.nombre.trim()
        : null;
  const message =
    typeof payload?.message === 'string'
      ? payload.message.trim()
      : typeof payload?.mensaje === 'string'
        ? payload.mensaje.trim()
        : null;
  const email =
    typeof payload?.email === 'string'
      ? payload.email.trim()
      : typeof payload?.correo === 'string'
        ? payload.correo.trim()
        : null;
  const phone =
    typeof payload?.phone === 'string'
      ? payload.phone.trim()
      : typeof payload?.telefono === 'string'
        ? payload.telefono.trim()
        : null;

  if (!name || !message || (!email && !phone)) {
    console.log('[INGEST] bad_payload_missing_fields', {
      ip,
      hasName: Boolean(name),
      hasMessage: Boolean(message),
      hasEmail: Boolean(email),
      hasPhone: Boolean(phone),
    });
    return badRequest('bad_payload');
  }

  const source =
    typeof payload?.source === 'string'
      ? payload.source.trim()
      : typeof payload?.fuente === 'string'
        ? payload.fuente.trim()
        : 'API Ingest';
  const conversationText = typeof payload?.conversacion_completa === 'string' ? payload.conversacion_completa : null;
  const metaRaw = payload?.meta ?? payload?.metadata ?? null;
  const metaText =
    metaRaw === null || metaRaw === undefined
      ? null
      : typeof metaRaw === 'string'
        ? metaRaw
        : (() => {
            try {
              return JSON.stringify(metaRaw);
            } catch {
              return '[unserializable meta]';
            }
          })();

  try {
    const supabase = getSupabaseAdmin();
    const hash = sha256Hex(token);

    const { data: apiKeyRow, error: apiKeyError } = await supabase
      .from('tenant_api_keys')
      .select('id, tenant_id, active')
      .eq('secret_hash', hash)
      .eq('active', true)
      .maybeSingle();

    if (apiKeyError) {
      console.error('[INGEST] token_lookup_error', { ip, hash8: hash.slice(0, 8), error: apiKeyError.message });
      return NextResponse.json({ ok: false, error: 'internal_error' }, { status: 500 });
    }

    if (!apiKeyRow?.tenant_id || !apiKeyRow?.id) {
      console.log('[INGEST] invalid_token', { ip, hash8: hash.slice(0, 8), matched: false });
      return NextResponse.json({ ok: false, error: 'invalid_token' }, { status: 401 });
    }

    const tenantId = apiKeyRow.tenant_id as string;
    const apiKeyId = apiKeyRow.id as string;

    console.log('[INGEST] token_ok', { ip, hash8: hash.slice(0, 8), matched: true, tenantId });

    const leadToInsert = {
      tenant_id: tenantId,
      nombre: name,
      correo: email,
      telefono: phone,
      empresa: typeof payload?.empresa === 'string' ? payload.empresa.trim() : null,
      mensaje: message,
      tipo_interes: typeof payload?.tipo_interes === 'string' ? payload.tipo_interes.trim() : 'Consulta General',
      fuente: source,
      estado: typeof payload?.estado === 'string' ? payload.estado.trim() : 'pendiente',
      conversacion_completa: metaText ?? conversationText,
      fecha_creacion: new Date().toISOString(),
    };

    const { data, error } = await supabase.from('leads_comerciales').insert([leadToInsert]).select('id').single();
    if (error) {
      console.error('[INGEST] insert_error', {
        ip,
        tenantId,
        hash8: hash.slice(0, 8),
        message: error.message,
        details: (error as any)?.details ?? null,
        hint: (error as any)?.hint ?? null,
        code: (error as any)?.code ?? null,
      });
      return NextResponse.json({ ok: false, error: 'internal_error' }, { status: 500 });
    }

    try {
      const { error: updateError } = await supabase
        .from('tenant_api_keys')
        .update({ last_used_at: new Date().toISOString() })
        .eq('id', apiKeyId);
      if (updateError) {
        console.error('[INGEST] last_used_at_update_error', { ip, apiKeyId, hash8: hash.slice(0, 8), message: updateError.message });
      }
    } catch (e: any) {
      console.error('[INGEST] last_used_at_update_exception', { ip, apiKeyId, hash8: hash.slice(0, 8), message: String(e?.message || e) });
    }

    return NextResponse.json({ ok: true, lead_id: data?.id ?? null, tenant_id: tenantId });
  } catch (e: any) {
    console.error('[INGEST] unhandled_exception', { ip, message: String(e?.message || e) });
    return NextResponse.json({ ok: false, error: 'internal_error' }, { status: 500 });
  }
}
