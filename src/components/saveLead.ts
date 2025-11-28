import { createClient } from '@supabase/supabase-js';

// Configuración de Supabase (opcional)
const hasSupabaseConfig = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export interface LeadData {
  nombre?: string;
  correo?: string;
  telefono?: string;
  empresa?: string;
  mensaje: string;
  tipo_interes: string;
}

export async function saveLead(data: LeadData): Promise<void> {
  try {
    // Validar que al menos tengamos información mínima
    if (!data.mensaje && !data.correo) {
      console.warn('⚠️ Lead no guardado: falta información mínima');
      return;
    }

    const leadToSave = {
      nombre: data.nombre || 'Usuario del chat',
      correo: data.correo || null,
      telefono: data.telefono || null,
      empresa: data.empresa || null,
      mensaje: data.mensaje,
      tipo_interes: data.tipo_interes,
      fuente: 'Chat Widget Geimser',
      estado: 'pendiente',
      fecha_creacion: new Date().toISOString(),
      // Campos adicionales para tracking
      user_agent: typeof window !== 'undefined' ? window.navigator.userAgent : null,
      url_origen: typeof window !== 'undefined' ? window.location.href : null,
    };

    // Guardado en Supabase (si está configurado)
    if (hasSupabaseConfig) {
      try {
        const { data: result, error } = await supabase
          .from('leads_comerciales')
          .insert([leadToSave])
          .select();

        if (error) {
          console.warn('⚠️ Error al guardar lead en Supabase:', error.message);
        } else {
          console.log('✅ Lead guardado exitosamente en Supabase:', result);
        }
      } catch (dbError) {
        console.warn('⚠️ Error de red al guardar lead en Supabase:', dbError);
      }
    } else {
      console.warn('⚠️ Supabase no está configurado, se omite guardado en base de datos');
    }

    // Opcional: Enviar notificación adicional (webhook, email, etc.)
    const leadForNotification = {
      ...leadToSave,
      conversacion_completa: (data as any).conversacion_completa || null,
    };
    await notifyNewLead(leadForNotification);
    
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
  }
}

// Función auxiliar para notificar nuevo lead (opcional)
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
