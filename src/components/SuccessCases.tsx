
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { TrendingUp, Users, Award, BarChart3, Target, Zap, Quote, Building, ArrowRight, Minus, Plus } from 'lucide-react';

// --- (CORREGIDO) Sub-componente para las métricas con el diseño original ---
const MetricBar = ({ label, before, after, isPercentage = false, unit = '' }: { label: string, before: number, after: number, isPercentage?: boolean, unit?: string }) => {
    // **LA CORRECCIÓN ESTÁ AQUÍ**
    // Se ajusta la escala máxima para acomodar valores > 100% y evitar el desbordamiento.
    const max = isPercentage ? Math.max(100, before, after) : Math.max(before, after, 1) * 1.2;

    const beforeWidth = (before / max) * 100;
    const afterWidth = (after / max) * 100;

    return (
        <div>
            <div className="flex justify-between items-center text-sm mb-1.5">
                <span className="text-gray-300">{label}</span>
                <span className="font-semibold ">{after.toLocaleString()}{unit}{isPercentage && '%'}</span>
            </div>
            <div className="w-full bg-gray-700/50 rounded-full h-4 relative p-1">
                {/* Barra gris de 'antes' */}
                { before > 0 && <div className="absolute top-1 left-1 h-2 bg-gray-500 rounded-full" style={{ width: `calc(${beforeWidth}% - 0.5rem)` }} /> }
                {/* Barra cian animada de 'después' */}
                <motion.div
                    className="absolute top-1 left-1 h-2 bg-cyan-400 rounded-full"
                    initial={{ width: `calc(${before > 0 ? beforeWidth : 0}% - 0.5rem)` }}
                    whileInView={{ width: `calc(${afterWidth}% - 0.5rem)` }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                    viewport={{ once: true }}
                />
            </div>
        </div>
    );
};

// --- Sub-componente para los resultados clave ---
const ResultCard = ({ value, label, isPercentage = true }: { value: number, label: string, isPercentage?: boolean }) => {
    const isPositive = value >= 0;
    return (
        <div className="text-center p-4 bg-white/5 rounded-lg">
            <div className={`text-3xl font-bold flex items-center justify-center ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                {isPositive ? <Plus className="w-6 h-6 mr-1" /> : <Minus className="w-6 h-6 mr-1" />}
                {Math.abs(value)}
                {isPercentage && <span className="text-2xl">%</span>}
            </div>
            <div className="text-xs text-muted mt-1">{label}</div>
        </div>
    );
};


// --- DATOS ACTUALIZADOS DEL DOCUMENTO PDF ---
const successCases = [
    {
      company: "Servicios Financieros",
      industry: "Optimización y CX",
      challenge: "Mejorar la satisfacción y reducir los tiempos de respuesta en consultas financieras complejas.",
      solution: "Implementamos un CX Journey completo con CRM, IA y chatbots, además de monitoreo en tiempo real de las interacciones para asegurar la calidad y el cumplimiento.",
      results: { satisfaction: 15, responseTime: -40, efficiency: 30, cost: -25 },
      testimonial: { text: "La capacidad de Geimser para optimizar nuestros procesos más complejos fue sobresaliente. Vimos un aumento en la productividad y en el NPS de forma casi inmediata.", author: "Directora de Experiencia Cliente", position: "Cliente del Sector Financiero" },
      metrics: [
          { label: "Productividad de Agentes", before: 100, after: 130, isPercentage: true },
          { label: "Tiempo de Resolución", before: 10, after: 6, unit: ' min' },
          { label: "Puntaje NPS (Net Promoter Score)", before: 40, after: 46 },
      ]
    },
    {
      company: "Contact Center",
      industry: "Ventas y Soporte",
      challenge: "Aumentar las conversiones en campañas de ventas outbound y gestionar un volumen escalable de 500 a más de 5,000 llamadas.",
      solution: "Se diseñó una estrategia omnicanal con scripts de venta personalizados para la venta de intangibles, un programa de capacitación intensiva y monitoreo diario de los KPIs.",
      results: { satisfaction: 25, responseTime: -20, efficiency: 25, cost: -18 },
      testimonial: { text: "Su estrategia omnicanal nos permitió no solo manejar un mayor volumen, sino también mejorar nuestras conversiones de venta de intangibles de manera notable.", author: "Jefe de Ventas y Operaciones", position: "Cliente del Sector Retail" },
      metrics: [
          { label: "Tasa de Conversión (Ventas Outbound)", before: 8, after: 10, isPercentage: true },
          { label: "Tiempo de Espera Inbound", before: 180, after: 144, unit: ' seg' },
          { label: "Capacidad de llamadas gestionadas", before: 500, after: 5000 },
      ]
    },
    {
      company: "Gestión Educativa",
      industry: "Admisión y Atención",
      challenge: "Manejar la alta demanda estacional durante los procesos de admisión y matrícula, garantizando una atención estudiantil rápida, eficiente y de calidad.",
      solution: "Se desplegó una infraestructura con escalabilidad rápida para habilitar 300 posiciones en tiempo récord y se implementó una gestión omnicanal con flujos optimizados para priorizar solicitudes críticas y auditorías de calidad continuas.",
      results: { satisfaction: 40, responseTime: -40, efficiency: 100, cost: -35 },
      testimonial: { text: "En el período más crítico del año, Geimser nos proporcionó la escalabilidad y eficiencia necesarias para gestionar un volumen de interacciones sin precedentes (+2M de llamadas), superando todas nuestras metas.", author: "Director de Admisiones", position: "Cliente del Sector Educativo" },
      metrics: [
          { label: "Llamadas Gestionadas (en 4 días)", before: 100000, after: 2000000 },
          { label: "Reducción en Tiempos de Espera", before: 100, after: 60, isPercentage: true },
          { label: "Nuevas Posiciones Desplegadas", before: 0, after: 300 },
      ]
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
    <section className="py-24 sm:py-32 px-6 bg-[var(--surface)] text-gray-300 relative overflow-hidden">
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
          <motion.h2 variants={itemVariants} className="text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            Resultados que <span className="text-cyan-400">Inspiran Confianza</span>
          </motion.h2>
          <motion.p variants={itemVariants} className="text-lg text-muted max-w-3xl mx-auto leading-relaxed">
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
                        <Building className="w-5 h-5 mr-3 text-muted" />
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
                    {/* Columna Izquierda: Contexto y Resultados Clave */}
                    <div className="lg:col-span-5 space-y-6">
                        <div className="p-6 rounded-xl bg-white/5">
                            <h4 className="font-bold mb-3 flex items-center"><Target className="w-5 h-5 mr-2 text-red-400/80"/>Desafío</h4>
                            <p className="text-muted text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: activeCaseData.challenge }}></p>
                        </div>
                        <div className="p-6 rounded-xl bg-white/5">
                            <h4 className="font-bold mb-3 flex items-center"><Zap className="w-5 h-5 mr-2 text-green-400/80"/>Nuestra Solución</h4>
                            <p className="text-muted text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: activeCaseData.solution }}></p>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <ResultCard value={activeCaseData.results.satisfaction} label="Satisfacción" />
                            <ResultCard value={activeCaseData.results.responseTime} label="Tiempo Respuesta" />
                            <ResultCard value={activeCaseData.results.efficiency} label="Eficiencia" />
                            <ResultCard value={activeCaseData.results.cost} label="Reducción Costos" />
                        </div>
                    </div>

                    {/* Columna Derecha: Métricas de Impacto */}
                    <div className="lg:col-span-7 p-6 rounded-xl bg-white/5">
                        <h4 className="font-bold mb-6 flex items-center"><BarChart3 className="w-5 h-5 mr-2 text-cyan-400"/>Métricas de Impacto</h4>
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
                    <blockquote className="text-xl lg:text-2xl leading-relaxed lg:leading-relaxed mb-6 italic">
                        "{activeCaseData.testimonial.text}"
                    </blockquote>
                    <div className="flex items-center">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center font-bold mr-4 text-xl">
                            {activeCaseData.testimonial.author.charAt(0)}
                        </div>
                        <div>
                            <p className=" font-semibold">{activeCaseData.testimonial.author}</p>
                            <p className="text-muted text-sm">{activeCaseData.testimonial.position}</p>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
