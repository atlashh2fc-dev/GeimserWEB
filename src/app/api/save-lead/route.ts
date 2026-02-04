import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Usamos las variables de entorno del servidor.
// Idealmente usar SUPABASE_SERVICE_ROLE_KEY si RLS bloquea al cliente anónimo.
// Si no hay service key, se usa la anon key (que debería funcionar si las policies están bien).
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { id, ...data } = body;

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
