-- Demo dataset (50 conversaciones) para Geimser Intelligence Dashboard
-- Ejecuta en Supabase -> SQL Editor (en el proyecto nuevo).
-- Opcional: TRUNCATE para partir limpio.

begin;

-- (Opcional) borra todo para demo limpio
-- truncate table public.leads_comerciales restart identity;

-- Asegura que Realtime incluya la tabla (si tu proyecto lo permite)
do $$
begin
  begin
    execute 'alter publication supabase_realtime add table public.leads_comerciales';
  exception
    when duplicate_object then
      null;
    when undefined_object then
      null;
    when insufficient_privilege then
      null;
  end;
end$$;

with
  industries as (
    select array[
      'Retail',
      'Telecomunicaciones',
      'Servicios Financieros',
      'Salud',
      'Educación',
      'Logística'
    ] as v
  ),
  interests as (
    select array[
      'Outsourcing Contact Center',
      'Omnicanalidad',
      'Chatbot IA',
      'Voice Bot',
      'Speech Analytics',
      'CRM a medida'
    ] as v
  ),
  companies as (
    select array[
      'RetailNova',
      'TelcoAndes',
      'FinanciaPro',
      'Clínica Centralis',
      'EduCampus',
      'LogiSur',
      'MarketPlus',
      'AseguraYa',
      'Universidad Horizonte',
      'SaludVida'
    ] as v
  ),
  names as (
    select array[
      'Camila Rojas',
      'Sebastián Muñoz',
      'Valentina Pérez',
      'Diego Soto',
      'Fernanda Castillo',
      'Tomás González',
      'Javiera Silva',
      'Matías Herrera',
      'Paula Díaz',
      'Andrés Valdés'
    ] as v
  ),
  seed as (
    select
      i,
      (now() - (random() * interval '90 days')) as ts,
      (select v from industries) as ind,
      (select v from interests) as intr,
      (select v from companies) as comp,
      (select v from names) as nm
    from generate_series(1, 50) as i
  )
insert into public.leads_comerciales (
  created_at,
  fecha_creacion,
  nombre,
  correo,
  telefono,
  empresa,
  mensaje,
  tipo_interes,
  fuente,
  estado,
  conversacion_completa
)
select
  ts as created_at,
  ts as fecha_creacion,
  nm[1 + (i % array_length(nm, 1))] as nombre,
  case
    when (i % 5) in (0, 1, 2) then
      lower(regexp_replace(nm[1 + (i % array_length(nm, 1))], '\s+', '.', 'g')) || '+' || i::text || '@' ||
      case when (i % 2) = 0 then 'empresa.cl' else 'corp.cl' end
    else null
  end as correo,
  case
    when (i % 5) in (0, 1) then
      '+569' || lpad((80000000 + (i * 791))::text, 8, '0')
    else null
  end as telefono,
  comp[1 + (i % array_length(comp, 1))] as empresa,
  case (i % 6)
    when 0 then 'Necesito una cotización para operación inbound/outbound.'
    when 1 then 'Queremos bajar tiempos de espera y mejorar NPS.'
    when 2 then 'Buscamos implementar chatbot/voicebot con integración a CRM.'
    when 3 then 'Tenemos picos estacionales y necesitamos escalabilidad rápida.'
    when 4 then 'Necesitamos omnicanal (RRSS + WhatsApp + llamadas) con reporting.'
    else 'Queremos speech analytics para calidad y cumplimiento.'
  end as mensaje,
  intr[1 + (i % array_length(intr, 1))] as tipo_interes,
  'Demo Seed (Dashboard)' as fuente,
  case
    when (i % 7) = 0 then 'cerrado'
    when (i % 7) = 1 then 'contactado'
    else 'pendiente'
  end as estado,
  format(
    'user: Hola, soy %s de %s (%s). Tenemos %s agentes y hoy tenemos %s.%s---%sassistant: Gracias por escribir. En Geimser360 ayudamos a optimizar operaciones con escalabilidad rápida y tecnología (omnichannel, bots, speech analytics). En casos similares logramos -40%% en tiempos de resolución y +15%% NPS. ¿Cuántas interacciones mensuales manejan y en qué canales?%s---%suser: Hoy manejamos aprox. %s interacciones/mes. ¿Cuánto tarda la implementación y cómo cobran?%s---%sassistant: Podemos partir con diagnóstico express y una propuesta en 48–72h. Implementación típica 2–6 semanas según integraciones. Para enviarte una propuesta ajustada, ¿me compartes tu email corporativo y teléfono/WhatsApp?',
    nm[1 + (i % array_length(nm, 1))],
    comp[1 + (i % array_length(comp, 1))],
    ind[1 + (i % array_length(ind, 1))],
    case (i % 4) when 0 then '45' when 1 then '80' when 2 then '120' else '200' end,
    case (i % 4)
      when 0 then 'tiempos de espera altos en peak'
      when 1 then 'alta tasa de abandono en IVR'
      when 2 then 'baja conversión en outbound'
      else 'costos operativos creciendo'
    end,
    E'\n',
    E'\n',
    E'\n',
    E'\n',
    case (i % 4) when 0 then '35.000' when 1 then '60.000' when 2 then '120.000' else '250.000' end,
    E'\n',
    E'\n'
  ) as conversacion_completa
from seed;

commit;

