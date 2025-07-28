import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function saveLead(data: {
  nombre: string;
  correo: string;
  telefono?: string;
  mensaje: string;
  tipo_interes: string;
}) {
  const { error } = await supabase.from('leads_comerciales').insert({
    ...data,
    fuente: 'Sitio Web Geimser',
    estado: 'pendiente',
  });

  if (error) console.error('❌ Error al guardar lead:', error.message);
}