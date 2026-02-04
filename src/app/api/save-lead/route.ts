import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: NextRequest) {
    // 1. Logs de depuración para diagnóstico "de raíz"
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    // Diagnósticos
    const diagnostics = {
        urlDefined: !!supabaseUrl,
        urlPrefix: supabaseUrl ? supabaseUrl.substring(0, 8) : 'N/A',
        serviceKeyDefined: !!supabaseServiceKey,
        anonKeyDefined: !!supabaseAnonKey,
        urlValid: false,
        pingSuccess: false
    };

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
            await fetch(supabaseUrl, { method: 'HEAD' });
            diagnostics.pingSuccess = true;
        } catch (pingError: any) {
            console.error('❌ [API SAVE LEAD] Error de conectividad con Supabase:', pingError.message);
            return NextResponse.json(
                {
                    error: 'Error de conexión con Supabase (DNS/Red)',
                    details: pingError.message,
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
