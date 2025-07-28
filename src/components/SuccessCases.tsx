
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { TrendingUp, Users, Award, BarChart3, Target, Zap, Quote, Building, ArrowRight } from 'lucide-react';

// --- Sub-componente para las métricas con barras animadas ---
const MetricBar = ({ label, before, after, isPercentage = false }: { label: string, before: number, after: number, isPercentage?: boolean }) => {
    const max = isPercentage ? 100 : Math.max(before, after) * 1.2;
    const beforeWidth = (before / max) * 100;
    const afterWidth = (after / max) * 100;

    return (
        <div>
            <div className="flex justify-between items-center text-sm mb-1.5">
                <span className="text-gray-300">{label}</span>
                <span className="font-semibold text-white">{after}{isPercentage && '%'}</span>
            </div>
            <div className="w-full bg-gray-700/50 rounded-full h-4 relative p-1">
                <div className="absolute top-1 left-1 h-2 bg-gray-500 rounded-full" style={{ width: `calc(${beforeWidth}% - 0.5rem)` }} />
                <motion.div
                    className="absolute top-1 left-1 h-2 bg-cyan-400 rounded-full"
                    initial={{ width: `calc(${beforeWidth}% - 0.5rem)` }}
                    whileInView={{ width: `calc(${afterWidth}% - 0.5rem)` }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                    viewport={{ once: true }}
                />
            </div>
        </div>
    );
};


// --- DATOS ---
const successCases = [
    {
      company: "Banco Nacional", industry: "Servicios Financieros",
      challenge: "Reducir tiempos de espera y mejorar la satisfacción del cliente en atención telefónica.",
      solution: "Implementación de sistema omnicanal con IA y automatización inteligente para priorizar y resolver consultas de forma eficiente.",
      results: { satisfaction: 45, responseTime: -60, efficiency: 80, cost: -35 },
      testimonial: { text: "Geimser transformó nuestra operación. Los resultados superaron las expectativas y el ROI fue evidente desde el primer mes.", author: "María González", position: "Directora de Experiencia Cliente" },
      metrics: [ { label: "Satisfacción Cliente", before: 65, after: 94, isPercentage: true }, { label: "Tiempo Promedio Respuesta (seg)", before: 480, after: 180 }, { label: "Llamadas Procesadas/día (miles)", before: 5, after: 12 } ]
    },
    {
      company: "RetailMax", industry: "Retail y eCommerce",
      challenge: "Gestionar el masivo aumento de consultas durante temporadas altas y Black Friday sin sacrificar la calidad del servicio.",
      solution: "Despliegue de una plataforma cloud elástica con chatbots transaccionales y optimización de la fuerza de trabajo.",
      results: { satisfaction: 38, responseTime: -55, efficiency: 120, cost: -28 },
      testimonial: { text: "Manejamos 300% más consultas sin contratar personal adicional. La tecnología de Geimser fue la clave de nuestro éxito.", author: "Carlos Mendoza", position: "Gerente de Operaciones" },
      metrics: [ { label: "Resolución Primer Contacto", before: 45, after: 78, isPercentage: true }, { label: "Consultas Simultáneas Máx.", before: 200, after: 800 }, { label: "Disponibilidad del Sistema", before: 95, after: 99.9, isPercentage: true } ]
    },
    {
      company: "TelecomPlus", industry: "Telecomunicaciones",
      challenge: "Integrar múltiples canales de atención (redes, chat, voz) y reducir la alta tasa de escalamientos técnicos.",
      solution: "Solución omnicanal con base de conocimiento unificada e IA predictiva para asistir a los agentes en tiempo real.",
      results: { satisfaction: 52, responseTime: -70, efficiency: 95, cost: -42 },
      testimonial: { text: "La integración fue perfecta. Nuestros agentes ahora tienen toda la información en una sola pantalla y los clientes están más satisfechos.", author: "Ana Rodríguez", position: "VP Customer Experience" },
      metrics: [ { label: "Tasa de Escalamiento Técnico", before: 35, after: 12, isPercentage: true }, { label: "NPS Score", before: 32, after: 67 }, { label: "Canales Integrados", before: 3, after: 8 } ]
    }
];

// --- Componente Principal ---
export default function SuccessCases() {
  const [activeCase, setActiveCase] = useState(0);
  const activeCaseData = successCases[activeCase];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCase((prev) => (prev + 1) % successCases.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const containerVariants: Variants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemVariants: Variants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

  return (
    <section className="py-24 sm:py-32 px-6 bg-[#0B0F19] text-gray-300 relative overflow-hidden">
      <div className="absolute inset-0 z-0 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(ellipse,white,transparent_70%)] opacity-30"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="inline-flex items-center px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-6">
            <Award className="w-4 h-4 mr-2" />
            Casos de Éxito
          </motion.div>
          <motion.h2 variants={itemVariants} className="text-4xl lg:text-5xl font-bold text-white tracking-tight mb-6">
            Resultados que <span className="text-cyan-400">Inspiran Confianza</span>
          </motion.h2>
          <motion.p variants={itemVariants} className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Descubre cómo hemos ayudado a empresas líderes a transformar sus operaciones y alcanzar resultados extraordinarios.
          </motion.p>
        </motion.div>

        {/* --- Selector de Casos y Panel de Detalles --- */}
        <div className="relative p-8 rounded-2xl bg-gradient-to-br from-gray-900/80 to-gray-800/50 border border-white/10">
            {/* Selector */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
                {successCases.map((case_, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveCase(index)}
                        className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-300 border ${
                            activeCase === index
                            ? 'bg-cyan-500/15 border-cyan-500/30'
                            : 'bg-white/5 border-transparent hover:bg-white/10'
                        }`}
                    >
                        <Building className="w-5 h-5 mr-3 text-gray-400" />
                        {case_.company}
                    </button>
                ))}
            </div>

            {/* Contenido del Caso Activo */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeCase}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    className="grid lg:grid-cols-12 gap-8 items-start"
                >
                    {/* Columna Izquierda: Contexto */}
                    <div className="lg:col-span-5 space-y-6">
                        <div className="p-6 rounded-xl bg-white/5">
                            <h4 className="font-bold text-white mb-3 flex items-center"><Target className="w-5 h-5 mr-2 text-red-400/80"/>Desafío</h4>
                            <p className="text-gray-400 text-sm leading-relaxed">{activeCaseData.challenge}</p>
                        </div>
                        <div className="p-6 rounded-xl bg-white/5">
                            <h4 className="font-bold text-white mb-3 flex items-center"><Zap className="w-5 h-5 mr-2 text-green-400/80"/>Nuestra Solución</h4>
                            <p className="text-gray-400 text-sm leading-relaxed">{activeCaseData.solution}</p>
                        </div>
                    </div>

                    {/* Columna Derecha: Resultados */}
                    <div className="lg:col-span-7 p-6 rounded-xl bg-white/5">
                        <h4 className="font-bold text-white mb-6 flex items-center"><BarChart3 className="w-5 h-5 mr-2 text-cyan-400"/>Métricas de Impacto</h4>
                        <div className="space-y-5">
                            {activeCaseData.metrics.map(m => <MetricBar key={m.label} {...m} />)}
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>

        {/* Testimonio Destacado */}
        <div className="mt-12 p-8 md:p-12 rounded-2xl bg-white/5 border border-white/10">
            <Quote className="w-10 h-10 text-cyan-400 mb-6 opacity-50" />
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeCase}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <blockquote className="text-xl lg:text-2xl text-white leading-relaxed lg:leading-relaxed mb-6 italic">
                        "{activeCaseData.testimonial.text}"
                    </blockquote>
                    <div className="flex items-center">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold mr-4 text-xl">
                            {activeCaseData.testimonial.author.charAt(0)}
                        </div>
                        <div>
                            <p className="text-white font-semibold">{activeCaseData.testimonial.author}</p>
                            <p className="text-gray-400 text-sm">{activeCaseData.testimonial.position}</p>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
