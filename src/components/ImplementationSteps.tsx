
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Search, FileText, Settings, Rocket, BarChart3, CheckCircle, ArrowRight, Clock, Users, Target, Zap } from 'lucide-react';

// --- DATOS ---
const steps = [
    { icon: Search, title: "Análisis y Diagnóstico", duration: "1-2 Semanas", description: "Evaluamos tu ecosistema actual para identificar oportunidades clave y definir un roadmap claro hacia el éxito.", activities: ["Auditoría de procesos y tecnología", "Análisis de KPIs y métricas", "Identificación de 'pain points'", "Definición de objetivos SMART"], deliverables: ["Reporte de diagnóstico", "Roadmap de implementación", "Análisis ROI proyectado"] },
    { icon: FileText, title: "Diseño de la Solución", duration: "2-3 Semanas", description: "Creamos la arquitectura de una solución a medida, perfectamente alineada con tus objetivos de negocio.", activities: ["Diseño de arquitectura de sistemas", "Modelado de flujos de trabajo", "Selección de stack tecnológico", "Planificación de integración"], deliverables: ["Documento de arquitectura técnica", "Prototipos funcionales (PoC)", "Plan de proyecto detallado"] },
    { icon: Settings, title: "Configuración e Integración", duration: "3-4 Semanas", description: "Nuestro equipo de ingenieros configura, personaliza e integra todas las herramientas necesarias en tu entorno.", activities: ["Configuración de plataformas cloud", "Integración vía APIs con sistemas existentes", "Desarrollo de customizaciones", "Pruebas de integración exhaustivas"], deliverables: ["Ambiente de Staging funcional", "Documentación técnica para APIs", "Reportes detallados de testing"] },
    { icon: Rocket, title: "Lanzamiento y Capacitación", duration: "1-2 Semanas", description: "Desplegamos la solución en producción con un plan de 'Go-Live' controlado y capacitamos a tus equipos.", activities: ["Migración de datos segura", "Capacitación a usuarios finales y admin.", "Puesta en producción controlada", "Monitoreo post-lanzamiento"], deliverables: ["Sistema en producción", "Usuarios capacitados y autónomos", "Manuales de usuario y guías"] },
    { icon: BarChart3, title: "Optimización Continua", duration: "Permanente", description: "Más allá del lanzamiento, monitoreamos y optimizamos proactivamente para maximizar el valor y adaptarnos a futuro.", activities: ["Monitoreo de rendimiento 24/7", "Análisis de comportamiento de usuario", "Implementación de optimizaciones", "Soporte técnico especializado"], deliverables: ["Reportes de rendimiento mensuales", "Recomendaciones estratégicas", "Ciclos de actualizaciones y mejoras"] }
];

const benefits = [
    { icon: Clock, title: "Implementación Rápida", description: "Go-Live en 6-12 semanas promedio" },
    { icon: Users, title: "Equipo Experto", description: "Consultores e ingenieros certificados" },
    { icon: Target, title: "Resultados Garantizados", description: "ROI medible y positivo en meses" },
    { icon: Zap, title: "Soporte Continuo", description: "Acompañamiento proactivo 24/7" }
];

// --- Componente Principal ---
export default function ImplementationSteps() {
  const [activeStep, setActiveStep] = useState(0);
  const [activeDetailTab, setActiveDetailTab] = useState<'activities' | 'deliverables'>('activities');
  const activeStepData = steps[activeStep];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 5000); // Rota el paso principal cada 5 segundos
    return () => clearInterval(interval);
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-24 sm:py-32 px-6 bg-[var(--surface)] text-[var(--text)] relative overflow-hidden">
      <div className="absolute inset-0 z-0 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(ellipse,white,transparent_70%)] opacity-30"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="inline-flex items-center px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[var(--accent)] text-sm font-medium mb-6">
            <Rocket className="w-4 h-4 mr-2" />
            Nuestro Proceso
          </motion.div>
          <motion.h2 variants={itemVariants} className="text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            Un Roadmap Claro Hacia Tu <span className="text-[var(--accent)]">Transformación</span>
          </motion.h2>
          <motion.p variants={itemVariants} className="text-lg text-muted max-w-3xl mx-auto leading-relaxed">
            Nuestro proceso probado y transparente garantiza una implementación exitosa, minimizando riesgos y maximizando el retorno de tu inversión.
          </motion.p>
        </motion.div>

        {/* --- Roadmap Interactivo --- */}
        <div className="grid lg:grid-cols-12 gap-8 min-h-[600px]">
          {/* Columna Izquierda: Hitos del Proceso */}
          <div className="lg:col-span-4">
              <div className="relative h-full flex flex-col justify-between">
                {/* Línea de fondo */}
                <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-gray-800 hidden lg:block"></div>
                {/* Línea de progreso animada */}
                <motion.div 
                  className="absolute left-6 top-6 w-0.5 bg-cyan-400 hidden lg:block"
                  animate={{ height: `${(activeStep / (steps.length - 1)) * 100}%` }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                />

                {steps.map((step, index) => {
                  const isActive = activeStep === index;
                  return (
                    <div 
                      key={index}
                      className="relative flex items-center cursor-pointer"
                      onClick={() => setActiveStep(index)}
                    >
                      <motion.div
                        className="w-12 h-12 rounded-full flex items-center justify-center border-2"
                        animate={{
                          borderColor: isActive ? 'rgb(34 211 238 / 1)' : 'rgb(55 65 81 / 1)',
                          scale: isActive ? 1.1 : 1,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <step.icon className={`w-6 h-6 transition-colors ${isActive ? 'text-[var(--accent)]' : 'text-[var(--text-muted)]'}`} />
                      </motion.div>
                      <div className="ml-6">
                        <p className={`font-bold transition-colors ${isActive ? '' : 'text-muted'}`}>Paso {index + 1}</p>
                        <p className={`font-semibold transition-colors ${isActive ? 'text-[var(--accent)]' : 'text-[var(--text-muted)]'}`}>{step.title}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
          </div>
          
          {/* Columna Derecha: Detalles del Paso */}
          <div className="lg:col-span-8 p-8 rounded-2xl bg-[var(--surface-2)] border border-[color:rgba(16,21,36,0.08)] shadow-[0_26px_45px_rgba(15,23,42,0.1)] relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
              >
                  <span className="inline-block px-3 py-1 bg-cyan-500/10 text-[var(--accent)] text-sm rounded-full mb-4">
                    Duración: {activeStepData.duration}
                  </span>
                  <h3 className="text-3xl font-bold mb-3">{activeStepData.title}</h3>
                  <p className="text-muted mb-8 leading-relaxed">{activeStepData.description}</p>
                  
                  {/* Pestañas para Actividades y Entregables */}
                  <div className="flex border-b border-white/10 mb-6">
                      <button onClick={() => setActiveDetailTab('activities')} className={`px-4 py-2 font-medium text-sm transition-colors ${activeDetailTab === 'activities' ? 'text-[var(--accent)] border-b-2 border-cyan-400' : 'text-[var(--text-muted)] hover:text-[var(--text)]'}`}>Actividades Clave</button>
                      <button onClick={() => setActiveDetailTab('deliverables')} className={`px-4 py-2 font-medium text-sm transition-colors ${activeDetailTab === 'deliverables' ? 'text-[var(--accent)] border-b-2 border-cyan-400' : 'text-[var(--text-muted)] hover:text-[var(--text)]'}`}>Entregables</button>
                  </div>
                  
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeDetailTab}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3"
                    >
                       {activeStepData[activeDetailTab].map((item: string, i: number) => (
                          <div key={i} className="flex items-start text-sm">
                            {activeDetailTab === 'activities' 
                              ? <CheckCircle className="w-4 h-4 mr-3 text-green-400 mt-0.5 flex-shrink-0" />
                              : <ArrowRight className="w-4 h-4 mr-3 text-[var(--accent)] mt-0.5 flex-shrink-0" />
                            }
                            <span>{item}</span>
                          </div>
                       ))}
                    </motion.div>
                  </AnimatePresence>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        
        {/* Beneficios del Proceso */}
        <div className="mt-24">
            <h3 className="text-3xl font-bold text-center mb-12">Garantía de Éxito en Cada Proyecto</h3>
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {benefits.map(b => (
                    <div key={b.title} className="text-center p-6 rounded-2xl bg-white/5 border border-white/10">
                        <b.icon className="w-10 h-10 text-[var(--accent)] mx-auto mb-4" />
                        <h4 className="font-semibold mb-1">{b.title}</h4>
                        <p className="text-sm text-muted">{b.description}</p>
                    </div>
                ))}
            </div>
        </div>

      </div>
    </section>
  );
}
