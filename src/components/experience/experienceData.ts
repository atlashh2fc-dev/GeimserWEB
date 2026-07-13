export type ExperienceProduct = {
  id: string;
  number: string;
  shortName: string;
  name: string;
  category: string;
  statement: string;
  description: string;
  color: string;
  url: string;
  capabilities: string[];
  object: 'server' | 'learning' | 'legal' | 'network';
};

export const experienceProducts: ExperienceProduct[] = [
  {
    id: 'itsm',
    number: '01',
    shortName: 'ITSM',
    name: 'ITSM Control Center',
    category: 'Operaciones TI',
    statement: 'De ticket a resolución, sin perder contexto.',
    description: 'Una torre de control para solicitudes, activos, acuerdos de servicio e incidentes.',
    color: '#5DE7FF',
    url: process.env.NEXT_PUBLIC_ITSM_URL || 'https://itsm.geimser.cl/',
    capabilities: ['Mesa de ayuda', 'SLA en tiempo real', 'Gestión de activos'],
    object: 'server',
  },
  {
    id: 'learning',
    number: '02',
    shortName: 'Aprende',
    name: 'Learning Suite',
    category: 'Talento y aprendizaje',
    statement: 'Aprendizaje que avanza al ritmo de cada equipo.',
    description: 'Rutas, contenidos y progreso en una experiencia continua de desarrollo.',
    color: '#B79AFF',
    url: process.env.NEXT_PUBLIC_LEARNING_SUITE_URL || 'https://aprende.geimser.cl/login',
    capabilities: ['Rutas personalizadas', 'Biblioteca viva', 'Certificación'],
    object: 'learning',
  },
  {
    id: 'legal',
    number: '03',
    shortName: 'SuitS',
    name: 'SuitS Legal',
    category: 'Legal operations',
    statement: 'Cada caso bajo control. Cada decisión a tiempo.',
    description: 'Expedientes, documentos, plazos y trazabilidad jurídica conectados.',
    color: '#55F2B0',
    url: process.env.NEXT_PUBLIC_SUITS_LEGAL_URL || 'https://suits.altiusignite.com/',
    capabilities: ['Expedientes', 'Plazos críticos', 'Trazabilidad documental'],
    object: 'legal',
  },
  {
    id: 'crm',
    number: '04',
    shortName: 'Atlas',
    name: 'Atlas CRM',
    category: 'Crecimiento comercial',
    statement: 'Cada relación comercial, siempre en movimiento.',
    description: 'Contactos, oportunidades y conversaciones reunidos en una visión accionable.',
    color: '#FFBE68',
    url: process.env.NEXT_PUBLIC_CRM_URL || 'https://atlas.geimser.cl/login',
    capabilities: ['Pipeline vivo', 'Vista 360°', 'Seguimiento comercial'],
    object: 'network',
  },
];
