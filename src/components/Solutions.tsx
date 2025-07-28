'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
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
  CheckCircle
} from 'lucide-react';

// --- DATOS (sin cambios) ---
const solutions = [
    {
      icon: MessageSquare,
      title: "Gestión de Interacción Omnicanal",
      description: "Centralizamos todas las conversaciones con tus clientes —WhatsApp, email, web y redes sociales— en una plataforma unificada e inteligente.",
      keyPoints: ["Plataforma Unificada", "Reducción de Tiempos de Respuesta", "Experiencia de Cliente Coherente", "Analítica Cross-Channel"],
      bgImage: "/assets/images/customer-service.jpg"
    },
    {
      icon: Bot,
      title: "Automatización con IA Conversacional",
      description: "Implementamos asistentes virtuales y chatbots que resuelven consultas 24/7, aprendiendo y mejorando con cada interacción.",
      keyPoints: ["Disponibilidad 24/7", "Procesamiento de Lenguaje Natural (NLP)", "Integración Nativa con CRM", "Escalamiento Automático de Consultas"],
      bgImage: "/assets/images/ai-technology.jpg"
    },
    {
      icon: BarChart3,
      title: "Inteligencia de Negocios y Analítica",
      description: "Transformamos datos de interacciones en insights accionables para optimizar tus estrategias y la toma de decisiones.",
      keyPoints: ["Dashboards en Tiempo Real", "Análisis de Sentimiento", "Identificación de Tendencias", "Optimización Basada en Datos"],
      bgImage: "/assets/images/data-center-blue.jpg"
    },
    {
      icon: Users,
      title: "Optimización de la Fuerza de Trabajo",
      description: "Herramientas avanzadas para la planificación, monitoreo y análisis de rendimiento de tus equipos de contact center.",
      keyPoints: ["Planificación Inteligente de Turnos", "Monitoreo de Productividad", "Reducción de Costos Operativos", "Mejora del Clima Laboral"],
      bgImage: "/assets/images/modern-office.jpg"
    },
    {
      icon: MessageCircle,
      title: "Asistentes Virtuales Avanzados",
      description: "Soluciones conversacionales que van más allá de las respuestas simples, gestionando tareas complejas y personalizando la atención.",
      keyPoints: ["Personalización a Gran Escala", "Aprendizaje Automático Continuo", "Reducción de Carga Operativa", "Mejora del CSAT"],
      bgImage: "/assets/images/digital-transformation.jpg"
    },
    {
      icon: Code,
      title: "Desarrollo y Personalización de CRM",
      description: "Creamos soluciones tecnológicas y adaptamos tu CRM para que se ajuste perfectamente a los flujos de trabajo de tu negocio.",
      keyPoints: ["Desarrollo a la Medida", "Integración Transparente con APIs", "Flujos de Trabajo Optimizados", "Escalabilidad Garantizada"],
      bgImage: "/assets/images/team-hero.jpg"
    }
  ];

// --- Componente Principal ---
export default function Solutions() {
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
    <section className="py-24 sm:py-32 px-6 bg-[#0B0F19] text-gray-300 relative overflow-hidden">
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
          <motion.h2 variants={itemVariants} className="text-4xl lg:text-5xl font-bold text-white tracking-tight mb-6">
            Tecnología que Potencia la <span className="text-cyan-400">Experiencia Humana</span>
          </motion.h2>
          <motion.p variants={itemVariants} className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Desde la automatización inteligente hasta el análisis de datos, nuestras soluciones están diseñadas para integrarse, optimizar y elevar cada punto de contacto con tus clientes.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {solutions.map((solution, index) => {
            const Icon = solution.icon;
            
            return (
              <div key={index} className="group relative">
                 {/* Borde con gradiente en hover (AHORA DETRÁS DEL CONTENIDO) */}
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-600 opacity-0 group-hover:opacity-80 transition-opacity duration-300" />
                
                <div className="relative h-full rounded-2xl p-6 bg-[#0F1422] overflow-hidden">
                    {/* Imagen de fondo */}
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-all duration-500 ease-in-out opacity-20 group-hover:opacity-30" // <-- AJUSTE 1: Mayor opacidad
                      style={{ backgroundImage: `url('${solution.bgImage}')` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F1422] via-[#0F1422]/80 to-transparent"></div>
                  
                    {/* Contenido (AHORA CON Z-INDEX PARA ESTAR AL FRENTE) */}
                    <div className="relative h-full flex flex-col z-10">
                      <div className="p-3 rounded-lg bg-gray-700/50 border border-gray-600/50 w-max mb-6">
                        <Icon className="w-8 h-8 text-cyan-400" />
                      </div>
                      
                      <h3 className="text-xl font-bold text-white mb-3 transition-colors duration-300 group-hover:text-cyan-300">
                        {solution.title}
                      </h3>
                      
                      <p className="text-gray-400 mb-6 leading-relaxed flex-grow">
                        {solution.description}
                      </p>
                      
                      <div className="space-y-2 mb-8">
                        {solution.keyPoints.slice(0, 3).map((point, i) => (
                          <div key={i} className="flex items-center text-sm">
                            <CheckCircle className="w-4 h-4 mr-3 text-cyan-500/70 flex-shrink-0" />
                            <span>{point}</span>
                          </div>
                        ))}
                      </div>
                      
                      <button className="flex items-center justify-between w-full mt-auto px-4 py-2 bg-gray-500/10 border border-gray-500/30 rounded-lg text-sm font-medium text-gray-300 group-hover:text-white group-hover:border-cyan-500/50 transition-all duration-300">
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
                <h3 className="text-2xl font-bold text-white mb-4">
                    ¿Listo para dar el siguiente paso?
                </h3>
                <p className="text-gray-400 mb-8 leading-relaxed">
                    Hablemos de tus desafíos. Nuestro equipo de expertos puede diseñar una prueba de concepto o una demostración adaptada a tus necesidades.
                </p>
                <button className="inline-flex items-center px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-900/50">
                    Solicitar una Demostración
                    <ArrowRight className="w-5 h-5 ml-2" />
                </button>
            </div>
        </div>
      </div>
    </section>
  );
}