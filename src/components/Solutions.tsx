
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import {
  MessageSquare,
  Users,
  Code,
  ArrowRight,
  Zap,
  Shield,
  Camera,
  BarChart3,
  SunMedium,
  CheckCircle,
  X,
  TrendingUp,
  Target,
  Layers,
  Layout,
  Globe,
  Smartphone,
  Headphones,
  Search,
  Award,
  LucideIcon
} from 'lucide-react';

// --- DEFINICIONES DE TIPOS (TYPESCRIPT) ---
interface Benefit {
  icon: LucideIcon;
  title: string;
  text: string;
}

interface ModalTabContent {
  services: string[];
  methodology: { step: string; description: string }[];
  impact: { metric: string; value: string; description: string }[];
}

interface Solution {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  keyPoints: string[];
  bgImage: string;
  modalContent: {
    description: string;
    benefits: Benefit[];
    tabs: ModalTabContent;
  };
}

interface SolutionModalProps {
  solution: Solution;
  onClose: () => void;
}

// Icono auxiliar para 'Scaling' que no estaba importado, usando TrendingUp como fallback visual si no existe
const Scaling = TrendingUp;

// --- DATOS ROBUSTOS PARA VERTICALES DE NEGOCIO ---
const solutions: Solution[] = [
  {
    id: 'cx',
    icon: MessageSquare,
    title: "Experiencia de Cliente y Contact Center",
    description: "Diseñamos y operamos canales de atención, soporte y ventas para que cada interacción tenga continuidad, criterio y seguimiento.",
    keyPoints: ["Atención omnicanal", "Soporte especializado", "Ventas y retención", "Gestión de leads"],
    bgImage: "/assets/images/service-cx-contact-center.png",
    modalContent: {
      description: "Transformamos tu centro de contacto en un centro de experiencia. No solo respondemos llamadas o mensajes; diseñamos viajes de cliente fluidos que aumentan la lealtad y el valor de vida del cliente.",
      benefits: [
        { icon: Target, title: "Omnicanalidad Real", text: "WhatsApp, redes sociales, teléfono o web. Tus clientes eligen el canal, nosotros mantenemos el contexto." },
        { icon: TrendingUp, title: "Eficiencia Operativa", text: "Reducimos tiempos de espera y aumentamos la resolución al primer contacto mediante enrutamiento inteligente." },
        { icon: Layers, title: "Trato Personalizado", text: "Cada interacción es una oportunidad. Utilizamos datos para dar un trato único a cada cliente." }
      ],
      tabs: {
        services: [
          "Atención al Cliente Inbound/Outbound",
          "Soporte Técnico Especializado",
          "Gestión de Ventas y Retención",
          "Moderación de Contenidos y Redes Sociales",
          "Encuestas de Satisfacción (NPS/CSAT)"
        ],
        methodology: [
          { step: "Diagnóstico", description: "Analizamos tus canales actuales y puntos de dolor." },
          { step: "Diseño", description: "Creamos scripts y flujos de atención a medida." },
          { step: "Implementación", description: "Despliegue rápido con formación intensiva de agentes." },
          { step: "Optimización", description: "Mejora continua basada en analítica de interacciones." }
        ],
        impact: [
          { metric: "+25%", value: "CSAT", description: "Mejora promedio en satisfacción." },
          { metric: "-30%", value: "AHT", description: "Reducción en tiempo operativo." },
          { metric: "90%", value: "FCR", description: "Resolución al primer contacto." }
        ]
      }
    }
  },
  {
    id: 'tech',
    icon: Code,
    title: "Tecnología, Automatización e IA",
    description: "Construimos sistemas, sitios, integraciones y automatizaciones que ordenan procesos, reducen fricción y aceleran decisiones.",
    keyPoints: ["Webs y apps", "CRM y flujos", "Integraciones", "Automatización con IA"],
    bgImage: "/assets/images/service-software-ai.png",
    modalContent: {
      description: "La tecnología no debe ser una barrera, sino un acelerador. Creamos ecosistemas digitales que automatizan lo rutinario y potencian lo estratégico, adaptándonos 100% a tu lógica de negocio.",
      benefits: [
        { icon: Layout, title: "Webs de Alto Impacto", text: "Sitios rápidos, seguros y diseñados para convertir visitantes en clientes." },
        { icon: Zap, title: "Automatización", text: "Liberamos a tu equipo de tareas repetitivas mediante bots y flujos de trabajo inteligentes." },
        { icon: Smartphone, title: "Movilidad Total", text: "Apps nativas y progresivas para llevar tu negocio al bolsillo de tus usuarios." }
      ],
      tabs: {
        services: [
          "Desarrollo Web Full Stack (React, Next.js)",
          "Aplicaciones Móviles (iOS/Android)",
          "Implementación y Personalización de CRM",
          "Integración de APIs y Sistemas Legados",
          "Automatización de Procesos (RPA)"
        ],
        methodology: [
          { step: "Discovery", description: "Entendemos a fondo tus requerimientos y objetivos." },
          { step: "Agile Dev", description: "Sprints cortos con entregables funcionales cada semana." },
          { step: "QA Riguroso", description: "Pruebas exhaustivas de rendimiento y seguridad." },
          { step: "Despliegue", description: "Puesta en producción sin interrupciones." }
        ],
        impact: [
          { metric: "100%", value: "Digital", description: "Procesos manuales digitalizados." },
          { metric: "x2", value: "Conversión", description: "Aumento en leads cualificados." },
          { metric: "-40%", value: "Costos", description: "Reducción en costos operativos." }
        ]
      }
    }
  },
  {
    id: 'bpo',
    icon: Users,
    title: "Talento, BPO y Operación",
    description: "Aportamos equipos y soporte operativo para escalar atención, administración y procesos críticos sin sobredimensionar estructura.",
    keyPoints: ["Staffing especializado", "BPO operativo", "Gestión administrativa", "Escalabilidad"],
    bgImage: "/assets/images/service-talent-ti.png",
    modalContent: {
      description: "El talento es el motor de cualquier empresa. Te ayudamos a encontrar, gestionar y retener a los mejores profesionales, absorbiendo la carga administrativa para que tú te enfoques en crecer.",
      benefits: [
        { icon: Award, title: "Expertos Listos", text: "Accede a una base de talento pre-calificado en tecnología y operaciones." },
        { icon: Scaling, title: "Escalabilidad", text: "Aumenta o reduce tu equipo según la demanda de tus proyectos." },
        { icon: Shield, title: "Cumplimiento Total", text: "Nos encargamos de todo el marco legal y laboral." }
      ],
      tabs: {
        services: [
          "Staffing de TI y Perfiles Digitales",
          "Outsourcing de Procesos de Negocio (BPO)",
          "Reclutamiento y Selección Especializada",
          "Gestión de Nómina y Administración",
          "Evaluaciones de Desempeño y Clima"
        ],
        methodology: [
          { step: "Perfilamiento", description: "Definimos las competencias clave del rol." },
          { step: "Sourcing", description: "Búsqueda activa en nuestra red de talento." },
          { step: "Filtro Técnico", description: "Evaluaciones técnicas y psicométricas." },
          { step: "Onboarding", description: "Acompañamiento en la integración al equipo." }
        ],
        impact: [
          { metric: "<48h", value: "SLA", description: "Tiempo promedio de presentación de candidatos." },
          { metric: "95%", value: "Retención", description: "Tasa de permanencia del talento." },
          { metric: "Zero", value: "Riesgo", description: "Contingencia laboral asumida por nosotros." }
        ]
      }
    }
  },
  {
    id: 'security',
    icon: Camera,
    title: "Seguridad Integral y Continuidad",
    description: "Integramos vigilancia, monitoreo y protección física para resguardar activos críticos y mantener la operación disponible.",
    keyPoints: ["CCTV inteligente", "Monitoreo 24/7", "Seguridad física", "Protección 360"],
    bgImage: "/assets/images/service-security.png",
    modalContent: {
      description: "La continuidad exige anticiparse. Diseñamos capas de seguridad electrónica y física para reducir exposición, monitorear eventos y responder antes de que un riesgo afecte la operación.",
      benefits: [
        { icon: Shield, title: "Resiliencia Operacional", text: "Protección para activos, instalaciones y procesos críticos." },
        { icon: Camera, title: "Vigilancia Inteligente", text: "CCTV y analítica para mejorar cobertura, trazabilidad y respuesta." },
        { icon: Target, title: "Respuesta Centralizada", text: "Monitoreo y gestión de eventos con criterios claros de escalamiento." }
      ],
      tabs: {
        services: ["CCTV con analítica", "Monitoreo centralizado 24/7", "Seguridad física", "Protección electrónica y perimetral"],
        methodology: [
          { step: "Levantamiento", description: "Identificamos activos críticos, puntos vulnerables y prioridades operativas." },
          { step: "Diseño", description: "Definimos arquitectura de seguridad física y electrónica." },
          { step: "Implementación", description: "Instalamos y conectamos sistemas con protocolos de monitoreo." },
          { step: "Operación", description: "Mantenemos seguimiento y mejora continua de la protección." }
        ],
        impact: [
          { metric: "24/7", value: "Monitoreo", description: "Cobertura operativa permanente." },
          { metric: "360", value: "Protección", description: "Capas físicas y electrónicas integradas." },
          { metric: "Menos", value: "Riesgo", description: "Detección temprana y respuesta ordenada." }
        ]
      }
    }
  },
  {
    id: 'data',
    icon: BarChart3,
    title: "Data Intelligence y Crecimiento",
    description: "Usamos scoring, georreferenciación y modelos propios para priorizar oportunidades comerciales y acelerar el funnel.",
    keyPoints: ["Scoring predictivo", "Georreferenciación", "Big Data", "Modelos propios"],
    bgImage: "/assets/images/service-data-intelligence.png",
    modalContent: {
      description: "No se trata de acumular bases de datos, sino de encontrar el lead correcto en menos tiempo. Convertimos datos crudos en señales comerciales accionables.",
      benefits: [
        { icon: Target, title: "Mejor Priorización", text: "Segmentos y leads ordenados por probabilidad de conversión." },
        { icon: TrendingUp, title: "Mayor ROI Comercial", text: "Menos tiempo perdido y mejor foco de la fuerza de ventas." },
        { icon: Layers, title: "Datos Accionables", text: "Modelos adaptados al negocio, territorio y objetivo comercial." }
      ],
      tabs: {
        services: ["Scoring de BDD predictivo", "Georreferenciación avanzada", "Modelos de inteligencia propios", "Big Data con partners"],
        methodology: [
          { step: "Datos", description: "Revisamos fuentes, calidad, cobertura y variables disponibles." },
          { step: "Modelo", description: "Diseñamos scoring y segmentación según intención comercial." },
          { step: "Activación", description: "Entregamos priorización usable para ventas y operación." },
          { step: "Optimización", description: "Ajustamos el modelo con resultados reales." }
        ],
        impact: [
          { metric: "Mejor", value: "Lead", description: "Priorización por potencial real." },
          { metric: "Menor", value: "Ciclo", description: "Reducción del tiempo de adquisición." },
          { metric: "Más", value: "ROI", description: "Foco comercial basado en datos." }
        ]
      }
    }
  },
  {
    id: 'energy',
    icon: SunMedium,
    title: "Eficiencia Energética y ESG",
    description: "Diseñamos soluciones solares, eficiencia eléctrica y rutas energéticas para reducir costos y avanzar en sostenibilidad.",
    keyPoints: ["Plantas solares", "Eficiencia eléctrica", "Consultoría energética", "Metas ESG"],
    bgImage: "/assets/images/energy-efficiency-real.png",
    modalContent: {
      description: "La energía también es una palanca de rentabilidad. Apoyamos a empresas que quieren reducir costos operativos y avanzar hacia una matriz más eficiente y sostenible.",
      benefits: [
        { icon: SunMedium, title: "Ahorro Energético", text: "Soluciones fotovoltaicas y eficiencia para reducir consumo y costos." },
        { icon: TrendingUp, title: "ROI Operacional", text: "Proyectos diseñados con foco en retorno e impacto medible." },
        { icon: Shield, title: "Ruta ESG", text: "Avance concreto hacia metas ambientales y descarbonización." }
      ],
      tabs: {
        services: ["Plantas solares industriales", "Ingeniería de eficiencia", "Consultoría energética", "Roadmaps renovables"],
        methodology: [
          { step: "Auditoría", description: "Medimos consumo, oportunidades y restricciones técnicas." },
          { step: "Diseño", description: "Proponemos una solución energética ajustada al sitio y demanda." },
          { step: "Implementación", description: "Coordinamos ejecución con foco en continuidad operativa." },
          { step: "Seguimiento", description: "Medimos ahorro, desempeño y avance ESG." }
        ],
        impact: [
          { metric: "Menos", value: "Costo", description: "Reducción de gasto energético." },
          { metric: "Más", value: "ESG", description: "Avance ambiental concreto." },
          { metric: "ROI", value: "Medible", description: "Evaluación económica del proyecto." }
        ]
      }
    }
  }
];



// --- Componente Modal Robusto ---
const SolutionModal: React.FC<SolutionModalProps> = ({ solution, onClose }) => {
  const [activeTab, setActiveTab] = useState<'services' | 'methodology' | 'impact'>('services');

  if (!solution) return null;

  const { modalContent } = solution;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 30 }}
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header del Modal */}
          <div className="relative h-48 sm:h-64 bg-slate-900 overflow-hidden shrink-0">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-60"
              style={{ backgroundImage: `url('${solution.bgImage}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>

            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full backdrop-blur-md transition-all z-20"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="absolute bottom-0 left-0 p-8 z-10">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-cyan-500 rounded-lg shadow-lg shadow-cyan-500/30">
                  <solution.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-cyan-400 font-bold uppercase tracking-wider text-xs">Vertical de Negocio</span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-bold text-white mb-2">{solution.title}</h3>
              <p className="text-gray-300 max-w-2xl text-lg hidden sm:block">{solution.description}</p>
            </div>
          </div>

          {/* Cuerpo del Modal con Tabs */}
          <div className="flex-1 overflow-y-auto bg-gray-50 flex flex-col md:flex-row">

            {/* Sidebar / Tabs (Desktop) */}
            <div className="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r border-gray-200 p-4 md:p-6 shrink-0">
              <nav className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible no-scrollbar">
                <button
                  onClick={() => setActiveTab('services')}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all whitespace-nowrap ${activeTab === 'services' ? 'bg-cyan-50 text-cyan-600 font-semibold shadow-sm' : 'text-gray-500 hover:bg-gray-50'}`}
                >
                  <Layers className="w-5 h-5" />
                  Servicios
                </button>
                <button
                  onClick={() => setActiveTab('methodology')}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all whitespace-nowrap ${activeTab === 'methodology' ? 'bg-cyan-50 text-cyan-600 font-semibold shadow-sm' : 'text-gray-500 hover:bg-gray-50'}`}
                >
                  <Search className="w-5 h-5" />
                  Cómo Trabajamos
                </button>
                <button
                  onClick={() => setActiveTab('impact')}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all whitespace-nowrap ${activeTab === 'impact' ? 'bg-cyan-50 text-cyan-600 font-semibold shadow-sm' : 'text-gray-500 hover:bg-gray-50'}`}
                >
                  <TrendingUp className="w-5 h-5" />
                  Impacto & KPIs
                </button>
              </nav>

              <div className="mt-8 hidden md:block">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Beneficios Clave</h4>
                <div className="space-y-4">
                  {modalContent.benefits.map((benefit, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="mt-1 shrink-0 text-cyan-500">
                        <benefit.icon className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{benefit.title}</p>
                        <p className="text-xs text-gray-500 leading-relaxed">{benefit.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Contenido Dinámico */}
            <div className="flex-1 p-6 md:p-10">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                {activeTab === 'services' && (
                  <div>
                    <h4 className="text-2xl font-bold text-gray-900 mb-6">Nuestros Servicios</h4>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {modalContent.tabs.services.map((service, idx) => (
                        <div key={idx} className="flex items-center p-4 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                          <div className="w-10 h-10 rounded-full bg-cyan-100 text-cyan-600 flex items-center justify-center mr-4 shrink-0">
                            <CheckCircle className="w-5 h-5" />
                          </div>
                          <span className="font-medium text-gray-700">{service}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-8 p-6 bg-blue-50 rounded-2xl border border-blue-100">
                      <p className="text-blue-800 text-sm font-medium flex gap-2">
                        <Layers className="w-5 h-5" />
                        ¿No encuentras lo que buscas? Personalizamos cada solución a la medida de tu desafío.
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === 'methodology' && (
                  <div>
                    <h4 className="text-2xl font-bold text-gray-900 mb-6">Nuestra Metodología</h4>
                    <div className="space-y-6">
                      {modalContent.tabs.methodology.map((step, idx) => (
                        <div key={idx} className="relative pl-8 border-l-2 border-gray-200 last:border-l-0 pb-6 last:pb-0">
                          <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-cyan-500 ring-4 ring-white"></div>
                          <h5 className="text-lg font-bold text-gray-900 mb-1">{step.step}</h5>
                          <p className="text-gray-600">{step.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'impact' && (
                  <div>
                    <h4 className="text-2xl font-bold text-gray-900 mb-6">Impacto Generado</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                      {modalContent.tabs.impact.map((kpi, idx) => (
                        <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
                          <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600 mb-2">
                            {kpi.metric}
                          </div>
                          <div className="text-sm font-bold text-gray-800 uppercase tracking-wide mb-2">{kpi.value}</div>
                          <p className="text-xs text-gray-500">{kpi.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </div>

          {/* Footer del Modal */}
          <div className="p-4 md:p-6 bg-white border-t border-gray-100 flex justify-end shrink-0">
            <button
              onClick={() => window.open('https://wa.me/56974159166', '_blank')}
              className="bg-black text-white px-8 py-3 rounded-xl font-semibold hover:bg-gray-800 transition-colors flex items-center shadow-lg shadow-black/20"
            >
              Solicitar Asesoría
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};


// --- Componente Principal ---
export default function Solutions() {
  const [selectedSolution, setSelectedSolution] = useState<Solution | null>(null);

  const handleOpenModal = (solution: Solution) => {
    setSelectedSolution(solution);
  };

  const handleCloseModal = () => {
    setSelectedSolution(null);
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    },
    hover: {
      y: -10,
      scale: 1.02,
      transition: { type: "spring", stiffness: 400, damping: 10 }
    }
  };

  return (
    <>
      <section className="py-24 sm:py-32 px-6 bg-white relative overflow-hidden">
        {/* Fondo sutil para mantener limpieza visual */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-gray-50/50 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            className="text-center mb-24"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={containerVariants}
          >
            <motion.div variants={cardVariants} className="inline-flex items-center px-4 py-1.5 rounded-full bg-cyan-50 border border-cyan-100 text-cyan-600 text-sm font-bold mb-6 shadow-sm">
              <Layers className="w-4 h-4 mr-2" />
              Servicios & Soluciones
            </motion.div>
            <motion.h2 variants={cardVariants} className="text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 mb-6">
              Un catálogo claro para <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">resolver y escalar</span>
            </motion.h2>
            <motion.p variants={cardVariants} className="text-xl text-gray-500 max-w-3xl mx-auto leading-relaxed">
              Separamos el relato institucional de la oferta: aquí están las capacidades que activamos para mejorar atención, operación, tecnología y presencia profesional.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {solutions.map((solution: Solution) => {
              const Icon = solution.icon;

              return (
                <motion.div
                  key={solution.id}
                  variants={cardVariants}
                  whileHover="hover"
                  className="group relative h-full"
                >
                  <button
                    type="button"
                    onClick={() => handleOpenModal(solution)}
                    className="relative h-full w-full cursor-pointer overflow-hidden rounded-3xl border border-gray-100 bg-white p-8 text-left shadow-xl shadow-gray-200/50"
                  >

                    {/* Efecto de gradiente sutil en el fondo al hacer hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative z-10 flex flex-col h-full">
                      {/* Icono con estilo Premium */}
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30 mb-8 transform group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-8 h-8 text-white" />
                      </div>

                      <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-cyan-600 transition-colors">
                        {solution.title}
                      </h3>

                      <p className="text-gray-500 leading-relaxed mb-8 flex-grow">
                        {solution.description}
                      </p>

                      <ul className="space-y-3 mb-8">
                        {solution.keyPoints.slice(0, 3).map((point, i) => (
                          <li key={i} className="flex items-center text-sm font-medium text-gray-600">
                            <CheckCircle className="w-4 h-4 mr-3 text-cyan-500 flex-shrink-0" />
                            {point}
                          </li>
                        ))}
                      </ul>

                      <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between text-cyan-600 font-bold text-sm">
                        <span>Explorar solución</span>
                        <div className="w-8 h-8 rounded-full bg-cyan-50 flex items-center justify-center group-hover:bg-cyan-500 group-hover:text-white transition-all">
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </button>
                </motion.div>
              );
            })}
          </motion.div>

          {/* CTA Final */}
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto p-12 rounded-3xl bg-slate-900 text-white shadow-2xl relative overflow-hidden"
            >
              {/* Background accent */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="text-left">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">Armemos la combinación correcta para tu etapa</h3>
                  <p className="text-gray-300 text-lg">Partimos con diagnóstico y bajamos una ruta concreta de servicios, tecnología y operación.</p>
                </div>
                <a
                  href="https://wa.me/56974159166"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-8 py-4 bg-white text-slate-900 font-bold rounded-xl hover:bg-cyan-50 transition-colors shadow-lg transform hover:scale-105 duration-200"
                >
                  Hablar Ahora
                  <ArrowRight className="w-5 h-5 ml-2" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedSolution && (
          <SolutionModal solution={selectedSolution} onClose={handleCloseModal} />
        )}
      </AnimatePresence>
    </>
  );
}
