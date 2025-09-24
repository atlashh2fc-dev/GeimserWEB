
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { 
  MessageSquare, 
  Bot, 
  BarChart3, 
  Users, 
  MessageCircle, 
  Code,
  ArrowRight,
  Sparkles,
  Zap,
  Shield,
  Clock,
  CheckCircle,
  X,
  TrendingUp,
  Target,
  Layers,
  LucideIcon // Importar LucideIcon para tipado
} from 'lucide-react';

// --- DEFINICIONES DE TIPOS (TYPESCRIPT) ---
interface Benefit {
  icon: LucideIcon;
  text: string;
}

interface ModalContent {
  title: string;
  benefits: Benefit[];
  tech: string;
  kpis: string;
}

interface Solution {
  icon: LucideIcon;
  title: string;
  description: string;
  keyPoints: string[];
  bgImage: string;
  modalContent: ModalContent;
}

interface SolutionModalProps {
  solution: Solution;
  onClose: () => void;
}

// --- DATOS ENRIQUECIDOS CON INFORMACIÓN PARA EL MODAL ---
const solutions: Solution[] = [
    {
      icon: MessageSquare,
      title: "Gestión de Interacción Omnicanal",
      description: "Centralizamos todas las conversaciones con tus clientes —WhatsApp, email, web y redes sociales— en una plataforma unificada e inteligente.",
      keyPoints: ["Plataforma Unificada", "Reducción de Tiempos de Respuesta", "Experiencia de Cliente Coherente", "Analítica Cross-Channel"],
      bgImage: "/assets/images/customer-service.jpg",
      modalContent: {
        title: "Profundizando en la Omnicanalidad",
        benefits: [
          { icon: Target, text: "Visión 360° del Cliente: Unifica el historial de interacciones para que tus agentes tengan el contexto completo, sin importar el canal." },
          { icon: TrendingUp, text: "Incremento de la Tasa de Resolución en el Primer Contacto (FCR): Al tener toda la información a mano, los agentes resuelven problemas más rápido y eficientemente." },
          { icon: Layers, text: "Enrutamiento Inteligente Basado en Habilidades (Skill-Based Routing): Dirige automáticamente cada consulta al agente mejor preparado para resolverla, mejorando la calidad y velocidad del servicio." }
        ],
        tech: "Plataformas ACD/UFA, Integración con APIs de redes sociales, WebRTC, CRM.",
        kpis: "Reducción del Tiempo Medio Operativo (AHT), Aumento del First Contact Resolution (FCR), Mejora del Customer Satisfaction (CSAT)."
      }
    },
    {
      icon: Bot,
      title: "Automatización con IA Conversacional",
      description: "Implementamos asistentes virtuales y chatbots que resuelven consultas 24/7, aprendiendo y mejorando con cada interacción.",
      keyPoints: ["Disponibilidad 24/7", "Procesamiento de Lenguaje Natural (NLP)", "Integración Nativa con CRM", "Escalamiento Automático de Consultas"],
      bgImage: "/assets/images/ai-technology.jpg",
      modalContent: {
        title: "IA que Transforma Conversaciones",
        benefits: [
          { icon: Target, text: "Autoservicio Guiado: Permite a los clientes resolver dudas frecuentes y realizar transacciones simples por sí mismos, liberando a tus agentes para tareas de mayor valor." },
          { icon: TrendingUp, text: "Calificación y Captura de Leads: Los bots pueden calificar prospectos en tiempo real y recopilar datos clave, nutriendo tu embudo de ventas automáticamente." },
          { icon: Layers, text: "Transferencia Contextual al Agente: Cuando una consulta requiere intervención humana, el bot transfiere la conversación junto con todo el historial y contexto recopilado." }
        ],
        tech: "Motores de NLU/NLP, Machine Learning, Speech-to-Text (STT), Text-to-Speech (TTS).",
        kpis: "Tasa de Deflexión de Casos, Tasa de Contención del Bot, Reducción de Costos por Interacción."
      }
    },
    {
      icon: BarChart3,
      title: "Inteligencia de Negocios y Analítica",
      description: "Transformamos datos de interacciones en insights accionables para optimizar tus estrategias y la toma de decisiones.",
      keyPoints: ["Dashboards en Tiempo Real", "Análisis de Sentimiento", "Identificación de Tendencias", "Optimización Basada en Datos"],
      bgImage: "/assets/images/data-center-blue.jpg",
      modalContent: {
        title: "Decisiones Basadas en Datos",
        benefits: [
          { icon: Target, text: "Análisis de Causa Raíz: Identifica los motivos reales detrás de las consultas recurrentes, permitiéndote solucionar problemas de fondo y no solo los síntomas." },
          { icon: TrendingUp, text: "Voz del Cliente (VoC): Analiza transcripciones y chats para entender el sentimiento, las frustraciones y las expectativas de tus clientes a gran escala." },
          { icon: Layers, text: "Monitoreo de Calidad Automatizado: Utiliza IA para analizar el 100% de las interacciones (no solo una muestra) y asegurar el cumplimiento de guiones y protocolos de calidad." }
        ],
        tech: "Speech & Text Analytics, Business Intelligence (BI), Data Warehousing, Procesamiento de Big Data.",
        kpis: "Mejora del Net Promoter Score (NPS), Reducción de la Tasa de Abandono (Churn), Optimización de Procesos."
      }
    },
    {
      icon: Users,
      title: "Optimización de la Fuerza de Trabajo",
      description: "Herramientas avanzadas para la planificación, monitoreo y análisis de rendimiento de tus equipos de contact center.",
      keyPoints: ["Planificación Inteligente de Turnos", "Monitoreo de Productividad", "Reducción de Costos Operativos", "Mejora del Clima Laboral"],
      bgImage: "/assets/images/modern-office.jpg",
      modalContent: {
        title: "Maximizando el Potencial Humano",
        benefits: [
          { icon: Target, text: "Pronósticos de Demanda (Forecasting): Predice con precisión los volúmenes de interacciones para evitar tanto el exceso como la falta de personal." },
          { icon: TrendingUp, text: "Gestión de Adherencia en Tiempo Real: Asegura que los agentes cumplan con sus horarios planificados, optimizando la cobertura y reduciendo tiempos de espera." },
          { icon: Layers, text: "Gamificación y Coaching: Implementa mecánicas de juego y herramientas de coaching personalizadas basadas en el rendimiento para motivar y desarrollar a tu equipo." }
        ],
        tech: "Workforce Management (WFM) Software, Performance Analytics, Gamification Platforms.",
        kpis: "Precisión del Forecast, Nivel de Adherencia, Reducción del Absentismo, Employee Satisfaction (ESAT)."
      }
    },
    {
      icon: MessageCircle,
      title: "Asistentes Virtuales Avanzados",
      description: "Soluciones conversacionales que van más allá de las respuestas simples, gestionando tareas complejas y personalizando la atención.",
      keyPoints: ["Personalización a Gran Escala", "Aprendizaje Automático Continuo", "Reducción de Carga Operativa", "Mejora del CSAT"],
      bgImage: "/assets/images/digital-transformation.jpg",
      modalContent: {
        title: "Asistentes que Resuelven",
        benefits: [
          { icon: Target, text: "Automatización de Procesos Robóticos (RPA): El asistente puede ejecutar tareas en sistemas legados, como actualizar un CRM o consultar un estado de pedido, sin necesidad de APIs." },
          { icon: TrendingUp, text: "Gestión Proactiva: Inicia conversaciones para confirmar citas, notificar sobre envíos o realizar encuestas de satisfacción, mejorando la experiencia del cliente." },
          { icon: Layers, text: "Voicebots con Biometría de Voz: Autentica a los usuarios de forma segura y natural a través de su voz, agilizando procesos sensibles como transacciones financieras." }
        ],
        tech: "RPA, Biometría de Voz, Motores de Diálogo Avanzados, Integración con bases de conocimiento.",
        kpis: "Tasa de Éxito en Tareas Complejas, Reducción del Tiempo de Autenticación, Aumento de la Interacción Proactiva."
      }
    },
    {
      icon: Code,
      title: "Desarrollo y Personalización de CRM",
      description: "Creamos soluciones tecnológicas y adaptamos tu CRM para que se ajuste perfectamente a los flujos de trabajo de tu negocio.",
      keyPoints: ["Desarrollo a la Medida", "Integración Transparente con APIs", "Flujos de Trabajo Optimizados", "Escalabilidad Garantizada"],
      bgImage: "/assets/images/team-hero.jpg",
      modalContent: {
        title: "Un CRM Hecho para Ti",
        benefits: [
          { icon: Target, text: "Automatización de Flujos de Trabajo Específicos: Diseñamos reglas y procesos automáticos que reflejan exactamente cómo opera tu negocio, eliminando tareas manuales." },
          { icon: TrendingUp,text: "Consolidación de Herramientas: Integramos aplicaciones de terceros directamente en la interfaz del CRM para que tus agentes no tengan que cambiar de pantalla constantemente." },
          { icon: Layers, text: "Escalabilidad y Mantenimiento Evolutivo: Construimos soluciones robustas que crecen contigo y ofrecemos soporte para adaptarlas a futuras necesidades del negocio." }
        ],
        tech: "Desarrollo sobre plataformas líderes (Salesforce, HubSpot, etc.), Arquitectura de Microservicios, APIs REST/GraphQL.",
        kpis: "Reducción del Tiempo de Formación (Onboarding), Aumento de la Adopción del CRM, Mejora en la Productividad de Ventas/Servicio."
      }
    }
];

// --- Componente Modal ---
const SolutionModal: React.FC<SolutionModalProps> = ({ solution, onClose }) => {
  if (!solution) return null;

  const { title, benefits, tech, kpis } = solution.modalContent;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 50 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-3xl bg-[#101625] border border-cyan-500/20 rounded-2xl shadow-2xl shadow-cyan-900/30 text-gray-300 overflow-hidden"
        >
          <div className="p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl lg:text-3xl font-bold mb-2">{title}</h3>
                <p className="text-cyan-400 font-semibold">{solution.title}</p>
              </div>
              <button onClick={onClose} className="p-2 rounded-full text-muted hover:bg-gray-700/50 hover: transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold mb-4 border-l-4 border-cyan-500 pl-3">Beneficios y Casos de Uso Clave</h4>
                <ul className="space-y-3">
                  {benefits.map((benefit: Benefit, i: number) => {
                    const Icon = benefit.icon;
                    return (
                      <motion.li 
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + i * 0.1 }}
                        className="flex items-start"
                      >
                        <Icon className="w-5 h-5 mr-4 mt-1 text-cyan-400 flex-shrink-0" />
                        <span>{benefit.text}</span>
                      </motion.li>
                    );
                  })}
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-3 border-l-4 border-cyan-500 pl-3">Tecnologías y Metodologías</h4>
                <p className="text-muted text-sm bg-gray-800/50 p-3 rounded-lg">{tech}</p>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-3 border-l-4 border-cyan-500 pl-3">KPIs Impactados</h4>
                <p className="text-muted text-sm bg-gray-800/50 p-3 rounded-lg">{kpis}</p>
              </div>
            </div>
          </div>
          <div className="h-1 bg-gradient-to-r from-cyan-500 to-blue-600"></div>
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
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <>
      <section className="py-24 sm:py-32 px-6 bg-[var(--surface)] text-gray-300 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(0,192,255,0.1),rgba(255,255,255,0))]"></div>
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            className="text-center mb-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="inline-flex items-center px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4 mr-2" />
              Nuestras Soluciones
            </motion.div>
            <motion.h2 variants={itemVariants} className="text-4xl lg:text-5xl font-bold tracking-tight mb-6">
              Tecnología que Potencia la <span className="text-cyan-400">Experiencia Humana</span>
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg text-muted max-w-3xl mx-auto leading-relaxed">
              Desde la automatización inteligente hasta el análisis de datos, nuestras soluciones están diseñadas para integrarse, optimizar y elevar cada punto de contacto con tus clientes.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
            {solutions.map((solution: Solution, index: number) => {
              const Icon = solution.icon;
              
              return (
                <div key={index} className="group relative">
                  <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-600 opacity-0 group-hover:opacity-80 transition-opacity duration-300" />
                  
                  <div className="relative h-full rounded-2xl p-6 bg-[#0F1422] overflow-hidden">
                      <div 
                        className="absolute inset-0 bg-cover bg-center transition-all duration-500 ease-in-out opacity-20 group-hover:opacity-30"
                        style={{ backgroundImage: `url('${solution.bgImage}')` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0F1422] via-[#0F1422]/80 to-transparent"></div>
                    
                      <div className="relative h-full flex flex-col z-10">
                        <div className="p-3 rounded-lg bg-gray-700/50 border border-gray-600/50 w-max mb-6">
                          <Icon className="w-8 h-8 text-cyan-400" />
                        </div>
                        
                        <h3 className="text-xl font-bold mb-3 transition-colors duration-300 group-hover:text-cyan-300">
                          {solution.title}
                        </h3>
                        
                        <p className="text-muted mb-6 leading-relaxed flex-grow">
                          {solution.description}
                        </p>
                        
                        <div className="space-y-2 mb-8">
                          {solution.keyPoints.slice(0, 3).map((point: string, i: number) => (
                            <div key={i} className="flex items-center text-sm">
                              <CheckCircle className="w-4 h-4 mr-3 text-cyan-500/70 flex-shrink-0" />
                              <span>{point}</span>
                            </div>
                          ))}
                        </div>
                        
                        <button 
                          onClick={() => handleOpenModal(solution)}
                          className="flex items-center justify-between w-full mt-auto px-4 py-2 bg-gray-500/10 border border-gray-500/30 rounded-lg text-sm font-medium text-gray-300 group-hover: group-hover:border-cyan-500/50 transition-all duration-300"
                        >
                          <span>Conocer más</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </button>
                      </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center">
              <div className="max-w-3xl mx-auto p-8 rounded-2xl bg-gradient-to-r from-gray-800/50 to-gray-900/30 border border-white/10">
                  <div className="flex items-center justify-center space-x-4 mb-6">
                      <Zap className="w-8 h-8 text-yellow-400/80" />
                      <Shield className="w-8 h-8 text-green-400/80" />
                      <Clock className="w-8 h-8 text-blue-400/80" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">
                      ¿Listo para dar el siguiente paso?
                  </h3>
                  <p className="text-muted mb-8 leading-relaxed">
                      Hablemos de tus desafíos. Nuestro equipo de expertos puede diseñar una prueba de concepto o una demostración adaptada a tus necesidades.
                  </p>
                  {/* --- INICIO DEL CAMBIO --- */}
                  <a 
                    href="https://wa.me/56974159166"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-cyan-600 hover:bg-cyan-500 font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-900/50"
                  >
                      Solicitar una Demostración
                      <ArrowRight className="w-5 h-5 ml-2" />
                  </a>
                  {/* --- FIN DEL CAMBIO --- */}
              </div>
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
