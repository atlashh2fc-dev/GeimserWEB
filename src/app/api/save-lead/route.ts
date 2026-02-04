import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: NextRequest) {
    // 1. Logs de depuración para diagnóstico "de raíz"
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    console.log('🔧 [API SAVE LEAD] Verificando configuración...');
    console.log('   - URL:', supabaseUrl ? 'Definida ✅' : 'FALTANTE ❌');
    console.log('   - Service Key:', supabaseServiceKey ? 'Definida ✅' : 'Faltante (usando fallback)');
    console.log('   - Anon Key:', supabaseAnonKey ? 'Definida ✅' : 'FALTANTE ❌');

    if (!supabaseUrl || (!supabaseServiceKey && !supabaseAnonKey)) {
        console.error('❌ [API SAVE LEAD] Error CRÍTICO de configuración: Faltan variables de entorno.');
        return NextResponse.json(
            { error: 'Error de configuración del servidor (Variables de entorno faltantes)' },
            { status: 500 }
        );
    }

    // 2. Inicializar cliente con la mejor llave disponible
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
                details: error.details || error.hint || 'No details'
            },
            { status: 500 }
        );
    }
}
