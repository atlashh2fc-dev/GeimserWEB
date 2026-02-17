import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/server/supabaseAdmin';
import { rateLimit } from '@/lib/server/rateLimit';

function getClientIp(req: NextRequest): string {
    const xff = req.headers.get('x-forwarded-for');
    if (xff) return xff.split(',')[0].trim();
    const realIp = req.headers.get('x-real-ip');
    if (realIp) return realIp.trim();
    const cfIp = req.headers.get('cf-connecting-ip');
    if (cfIp) return cfIp.trim();
    return 'unknown';
}

let cachedDefaultTenantId: string | null = null;

async function getDefaultTenantId(): Promise<string> {
    if (cachedDefaultTenantId) return cachedDefaultTenantId;
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase.from('tenants').select('id').eq('slug', 'geimser').single();
    if (error) throw error;
    if (!data?.id) throw new Error('Default tenant not found (slug=geimser)');
    cachedDefaultTenantId = data.id as string;
    return cachedDefaultTenantId;
}

export async function GET() {
    return NextResponse.json({
        ok: true,
        message: '/api/save-lead is alive',
        timestamp: new Date().toISOString(),
    });
}

export async function POST(request: NextRequest) {
    try {
        const ip = getClientIp(request);
        const limit = rateLimit(`save-lead:ip:${ip}`, { limit: 30, windowMs: 60_000 });
        if (!limit.allowed) {
            return NextResponse.json({ error: 'Rate limited' }, { status: 429 });
        }

        const body = await request.json();
        const { id, ...data } = body;

        if (!data.mensaje && !data.correo) {
            return NextResponse.json(
                { error: 'Faltan datos mínimos (mensaje o correo)' },
                { status: 400 }
            );
        }

        const tenantId = await getDefaultTenantId();
        const supabase = getSupabaseAdmin();

        const leadToSave = {
            tenant_id: tenantId,
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
                .eq('tenant_id', tenantId)
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
        console.error('❌ [API SAVE LEAD] Error:', error?.message || error);
        return NextResponse.json(
            {
                error: error.message || 'Error interno del servidor'
            },
            { status: 500 }
        );
    }
}
