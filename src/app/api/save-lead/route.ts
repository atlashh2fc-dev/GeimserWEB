import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

function getSupabaseDiagnostics() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    let hostname: string | null = null;
    let origin: string | null = null;
    let urlValid = false;
    let urlLooksLikeSupabaseProjectUrl: boolean | null = null;

    if (supabaseUrl) {
        try {
            const parsed = new URL(supabaseUrl);
            hostname = parsed.hostname;
            origin = parsed.origin;
            urlValid = true;
            urlLooksLikeSupabaseProjectUrl = /(^|\.)supabase\.(co|in)$/i.test(parsed.hostname);
        } catch {
            urlValid = false;
        }
    }

    return {
        urlDefined: !!supabaseUrl,
        urlPrefix: supabaseUrl ? supabaseUrl.substring(0, 8) : 'N/A',
        hostname,
        origin,
        urlValid,
        urlLooksLikeSupabaseProjectUrl,
        serviceKeyDefined: !!supabaseServiceKey,
        anonKeyDefined: !!supabaseAnonKey,
        pingSuccess: false,
    };
}

export async function GET() {
    const diagnostics = getSupabaseDiagnostics();
    let ping: { ok: boolean; status?: number; error?: string; cause?: string | null } | null = null;

    if (diagnostics.origin) {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 4000);
        try {
            const res = await fetch(`${diagnostics.origin}/auth/v1/health`, {
                method: 'GET',
                signal: controller.signal,
            });
            diagnostics.pingSuccess = res.ok;
            ping = { ok: res.ok, status: res.status };
        } catch (e: any) {
            const cause: any = e?.cause;
            diagnostics.pingSuccess = false;
            ping = {
                ok: false,
                error: String(e?.message ?? 'fetch failed'),
                cause: cause?.code || cause?.message || null,
            };
        } finally {
            clearTimeout(timeout);
        }
    }

    return NextResponse.json({
        ok: true,
        message: 'Diagnóstico de Supabase para /api/save-lead',
        diagnostics,
        ping,
        hint:
            diagnostics.urlDefined && diagnostics.urlValid && diagnostics.urlLooksLikeSupabaseProjectUrl === false
                ? 'NEXT_PUBLIC_SUPABASE_URL parece NO ser la "Project URL" de Supabase. Usa la que aparece en Supabase → Settings → API → Project URL (ej: https://<project-ref>.supabase.co).'
                : undefined,
        timestamp: new Date().toISOString(),
    });
}

export async function POST(request: NextRequest) {
    // 1. Logs de depuración para diagnóstico "de raíz"
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    const diagnostics = getSupabaseDiagnostics();

    console.log('🔧 [API SAVE LEAD] Diagnósticos:', diagnostics);

    if (!supabaseUrl || (!supabaseServiceKey && !supabaseAnonKey)) {
        return NextResponse.json(
            { error: 'Error de configuración: Faltan variables', diagnostics },
            { status: 500 }
        );
    }

    // Validación básica de URL
    try {
        new URL(supabaseUrl);
        diagnostics.urlValid = true;
    } catch (e) {
        return NextResponse.json(
            { error: 'URL de Supabase inválida', diagnostics },
            { status: 500 }
        );
    }

    // 2. Inicializar cliente
    // Preferimos Service Role para saltar RLS, si no, Anon Key.
    const targetKey = supabaseServiceKey || supabaseAnonKey || '';

    try {
        const supabase = createClient(supabaseUrl, targetKey, {
            auth: {
                persistSession: false,
                autoRefreshToken: false,
                detectSessionInUrl: false
            }
        });

        // Test de conectividad simple
        try {
            const parsed = new URL(supabaseUrl);
            // Endpoint "safe" para probar reachability (si la URL es correcta).
            await fetch(`${parsed.origin}/auth/v1/health`, { method: 'GET' });
            diagnostics.pingSuccess = true;
        } catch (pingError: any) {
            const cause: any = pingError?.cause;
            console.error('❌ [API SAVE LEAD] Error de conectividad con Supabase:', pingError.message);
            return NextResponse.json(
                {
                    error: 'Error de conexión con Supabase (DNS/Red)',
                    details: pingError.message,
                    cause: cause?.code || cause?.message || null,
                    hint:
                        diagnostics.urlLooksLikeSupabaseProjectUrl === false
                            ? 'Revisa NEXT_PUBLIC_SUPABASE_URL: debe ser la "Project URL" (Supabase → Settings → API), ej https://<project-ref>.supabase.co (no la URL del panel app.supabase.com).'
                            : 'Revisa DNS/red del hosting o si el dominio de Supabase es correcto.',
                    diagnostics
                },
                { status: 502 }
            );
        }

        const body = await request.json();
        const { id, ...data } = body;

        console.log('📦 [API SAVE LEAD] Recibiendo datos:', {
            tieneId: !!id,
            nombre: data.nombre,
            correo: data.correo
        });
        if (!data.mensaje && !data.correo) {
            return NextResponse.json(
                { error: 'Faltan datos mínimos (mensaje o correo)' },
                { status: 400 }
            );
        }

        const leadToSave = {
            nombre: data.nombre || 'Usuario del chat',
            correo: data.correo || null,
            telefono: data.telefono || null,
            empresa: data.empresa || null,
            mensaje: data.mensaje,
            tipo_interes: data.tipo_interes || 'Consulta General',
            fuente: data.fuente || 'Chat Widget Geimser',
            estado: data.estado || 'pendiente',
            fecha_creacion: new Date().toISOString(),
            conversacion_completa: data.conversacion_completa
        };

        let result;

        // Si viene un ID, intentamos actualizar
        if (id) {
            const { data: updateData, error: updateError } = await supabase
                .from('leads_comerciales')
                .update(leadToSave)
                .eq('id', id)
                .select();

            if (updateError) throw updateError;
            result = updateData;
        } else {
            // Insertar nuevo
            const { data: insertData, error: insertError } = await supabase
                .from('leads_comerciales')
                .insert([leadToSave])
                .select();

            if (insertError) throw insertError;
            result = insertData;
        }

        return NextResponse.json({
            success: true,
            id: result?.[0]?.id,
            data: result?.[0]
        });

    } catch (error: any) {
        console.error('❌ [API SAVE LEAD] Error:', error);
        return NextResponse.json(
            {
                error: error.message || 'Error interno del servidor',
                details: error.details || error.hint || 'No details',
                diagnostics
            },
            { status: 500 }
        );
    }
}
