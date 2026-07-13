export type ExperienceProduct = {
  id: string;
  number: string;
  shortName: string;
  name: string;
  category: string;
  statement: string;
  description: string;
  color: string;
  capabilities: string[];
  demoFeatures: string[];
  mark?: string;
  markScale?: [number, number];
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
    color: '#08A8D8',
    capabilities: ['Mesa de ayuda', 'SLA en tiempo real', 'Gestión de activos'],
    demoFeatures: [
      'Mesa de ayuda con tickets, prioridades y responsables visibles.',
      'Seguimiento de SLA y tiempos de respuesta en tiempo real.',
      'Inventario conectado de activos, usuarios y ubicaciones.',
      'Panel operativo para anticipar incidentes y cuellos de botella.',
    ],
    mark: '/assets/experience/itsm-mark.png',
    markScale: [0.5, 0.58],
  },
  {
    id: 'learning',
    number: '02',
    shortName: 'Aprende',
    name: 'Learning Suite',
    category: 'Talento y aprendizaje',
    statement: 'Aprendizaje que avanza al ritmo de cada equipo.',
    description: 'Rutas, contenidos y progreso en una experiencia continua de desarrollo.',
    color: '#DEA66D',
    capabilities: ['Rutas personalizadas', 'Biblioteca viva', 'Certificación'],
    demoFeatures: [
      'Ruta personal de aprendizaje con progreso y próximos hitos.',
      'Biblioteca centralizada de cursos, cápsulas y recursos.',
      'Seguimiento de equipos, participación y avance individual.',
      'Certificados y evidencia de competencias completadas.',
    ],
  },
  {
    id: 'legal',
    number: '03',
    shortName: 'SuitS',
    name: 'SuitS Legal',
    category: 'Legal operations',
    statement: 'Cada caso bajo control. Cada decisión a tiempo.',
    description: 'Expedientes, documentos, plazos y trazabilidad jurídica conectados.',
    color: '#28D4F2',
    capabilities: ['Expedientes', 'Plazos críticos', 'Trazabilidad documental'],
    demoFeatures: [
      'Vista ejecutiva de causas, clientes y actividad del estudio.',
      'Agenda jurídica con alertas de plazos y audiencias críticas.',
      'Expediente digital con documentos y trazabilidad completa.',
      'Auditor asistido por IA para revisión de documentos legales.',
    ],
    mark: '/assets/experience/suits-mark.png',
    markScale: [1, 1],
  },
  {
    id: 'crm',
    number: '04',
    shortName: 'Atlas',
    name: 'Atlas CRM',
    category: 'Crecimiento comercial',
    statement: 'Cada relación comercial, siempre en movimiento.',
    description: 'Contactos, oportunidades y conversaciones reunidos en una visión accionable.',
    color: '#2B8CFF',
    capabilities: ['Pipeline vivo', 'Vista 360°', 'Seguimiento comercial'],
    demoFeatures: [
      'Pipeline comercial visual desde prospecto hasta cierre.',
      'Ficha 360° con contactos, conversaciones y próximos pasos.',
      'Agenda de actividades y seguimiento del equipo de ventas.',
      'Indicadores de oportunidades, proyección y conversión.',
    ],
    mark: '/assets/experience/atlas-mark.png',
    markScale: [0.76, 0.76],
  },
];
