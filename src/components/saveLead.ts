import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Lazy singleton — evita crash en SSR cuando las env vars no están disponibles
let _supabase: SupabaseClient | null = null;

function getSupabase(): SupabaseClient | null {
  if (typeof window === 'undefined') return null; // No ejecutar en SSR
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  if (!_supabase) _supabase = createClient(url, key);
  return _supabase;
}

const hasSupabaseConfig = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export interface LeadData {
  nombre?: string;
  correo?: string;
  telefono?: string;
  empresa?: string;
  mensaje: string;
  tipo_interes: string;
}

export async function saveLead(data: LeadData): Promise<any> {
  try {
    // Validar que al menos tengamos información mínima
    if (!data.mensaje && !data.correo) {
      console.warn('⚠️ Lead no guardado: falta información mínima');
      return null;
    }

    const payload = {
      ...data,
      // Si venía un ID en data (para update), lo pasamos al body
      id: (data as any).id
    };

    const response = await fetch('/api/save-lead', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('❌ Error guardando lead en servidor:', errorData);
      throw new Error(`Error servidor: ${response.status}`);
    }

    const responseData = await response.json();
    console.log('✅ Lead guardado exitosamente (API):', responseData);

    // Notificación adicional (opcional)
    // El propio endpoint podría encargarse, pero por ahora lo dejamos aquí si es necesario
    // OJO: notifyNewLead usa NEXT_PUBLIC_WEBHOOK_URL... 
    // Quizás notifyNewLead debería llamarse solo si es NUEVO o si se completó el correo.
    // Por ahora lo dejamos igual.

    return responseData.id || null;

  } catch (error) {
    console.error('❌ Error al guardar lead:', error);

    // Fallback: guardar en localStorage si falla cualquier parte del proceso
    try {
      const fallbackLeads = JSON.parse(localStorage.getItem('fallback_leads') || '[]');
      fallbackLeads.push({
        ...data,
        timestamp: new Date().toISOString(),
        saved_to_supabase: false
      });
      localStorage.setItem('fallback_leads', JSON.stringify(fallbackLeads));
      console.log('💾 Lead guardado en localStorage como fallback');
    } catch (fallbackError) {
      console.error('❌ Error en fallback:', fallbackError);
    }
    return null;
  }
}

// Función auxiliar para notificar nuevo lead (opcional)
// TODO: Considerar mover esto al servidor también
async function notifyNewLead(leadData: any): Promise<void> {
  try {
    // Aquí puedes agregar lógica adicional como:
    // - Enviar webhook a Slack/Discord
    // - Enviar email de notificación
    // - Integrar con CRM

    // Webhook opcional (por ejemplo Slack/Discord)
    if (process.env.NEXT_PUBLIC_WEBHOOK_URL) {
      await fetch(process.env.NEXT_PUBLIC_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: `🚀 Nuevo lead desde el chat: ${leadData.nombre} - ${leadData.correo}`,
          lead: leadData,
        }),
      });
    }

    // Envío de email a contacto@geimser.cl
    try {
      await fetch('/api/lead-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(leadData),
      });
    } catch (emailError) {
      console.warn('⚠️ Error al llamar a /api/lead-email:', emailError);
    }
  } catch (error) {
    console.warn('⚠️ Error al enviar notificación de nuevo lead:', error);
    // No lanzar error aquí para no afectar el guardado principal
  }
}

// Función para recuperar leads del fallback
export function getFallbackLeads(): any[] {
  try {
    return JSON.parse(localStorage.getItem('fallback_leads') || '[]');
  } catch {
    return [];
  }
}

// Función para limpiar leads del fallback después de sincronizar
export function clearFallbackLeads(): void {
  try {
    localStorage.removeItem('fallback_leads');
  } catch (error) {
    console.warn('⚠️ Error al limpiar fallback leads:', error);
  }
}

