'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { 
  Users, 
  Target, 
  Lightbulb, 
  Headphones, 
  BarChart3, 
  Settings,
  CheckCircle,
  Briefcase,
  Landmark, // Finanzas y Banca
  Phone, // Telecomunicaciones
  ShoppingCart, // Retail
  HeartPulse, // Salud
  GraduationCap, // Educación
  Shield, // Seguros
  Gem, // Minería
  Wrench // Servicios Generales y Utilities
} from 'lucide-react';

// --- DATOS ---
const specializations = [
  {
    icon: Lightbulb,
    title: "Tecnología e Innovación",
    description: "Desarrollamos e integramos soluciones de vanguardia, desde IA conversacional hasta CRMs líderes, para potenciar la eficiencia operativa.",
    features: ["Chatbots con IA Generativa", "Partnership con CRMs líderes", "Automatización Robótica de Procesos (RPA)", "Desarrollo a la medida"],
  },
  {
    icon: Headphones,
    title: "Gestión de Contact Centers",
    description: "Orquestamos operaciones de contacto de alto rendimiento, garantizando la excelencia en cada interacción a través de un monitoreo de calidad riguroso.",
    features: ["Operaciones Inbound/Outbound", "Aseguramiento de Calidad (QA)", "Mapeo de Experiencia de Cliente (CX)", "Gestión Inhouse y Nearshore"],
  },
  {
    icon: BarChart3,
    title: "Consultoría Estratégica",
    description: "Optimizamos tus procesos y estrategias basándonos en marcos de referencia globales como ISO y COPC para alcanzar la máxima eficiencia.",
    features: ["Alineación a Estándares ISO", "Implementación del Modelo COPC", "Optimización de Procesos de Negocio (BPO)", "Inteligencia de Negocios (BI)"],
  },
  {
    icon: Settings,
    title: "Outsourcing de Procesos",
    description: "Nos adaptamos como un socio estratégico para gestionar tus operaciones, maximizando el retorno de inversión con equipos especializados.",
    features: ["Talento Local y Deslocalizado", "Modelos de Adaptación Flexibles", "Maximización del ROI", "Escalabilidad Operativa"],
  }
];

// --- DATOS DE INDUSTRIAS MEJORADOS CON ICONOS ---
const industries = [
  { name: "Finanzas y Banca", icon: Landmark },
  { name: "Telecomunicaciones", icon: Phone },
  { name: "Retail y eCommerce", icon: ShoppingCart },
  { name: "Salud y Farma", icon: HeartPulse },
  { name: "Educación", icon: GraduationCap },
  { name: "Seguros y Reaseguros", icon: Shield },
  { name: "Minería", icon: Gem },
  { name: "Servicios y Utilities", icon: Wrench },
];

const whyUsItems = [
    { icon: Lightbulb, title: "Innovación Pragmática", description: "Tecnología de vanguardia aplicada para resolver desafíos de negocio reales." },
    { icon: Users, title: "Talento Multidisciplinario", description: "Expertos en CX, IA, y operaciones trabajando en sinergia para tu éxito." },
    { icon: Target, title: "Resultados Medibles", description: "Nuestro enfoque se centra en entregar métricas claras que demuestren el valor." },
];

// --- Componente Principal ---
export default function About() {
  const [activeSpec, setActiveSpec] = useState(0);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };
  
  const industryListVariants: Variants = {
    visible: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const industryItemVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  const activeSpecialization = specializations[activeSpec];

  return (
    <section className="py-24 sm:py-32 px-6 bg-[var(--surface)] text-gray-300 relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-40">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(0,192,255,0.15),rgba(255,255,255,0))]"></div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* --- Cabecera y Misión --- */}
        <motion.div 
          className="grid md:grid-cols-12 gap-8 mb-24 md:mb-32"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <div className="md:col-span-8">
            <motion.div variants={itemVariants} className="inline-flex items-center px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-6">
              <Users className="w-4 h-4 mr-2" />
              Conoce a Geimser
            </motion.div>
            <motion.h2 variants={itemVariants} className="text-4xl lg:text-5xl font-bold tracking-tight mb-6">
              La Sinergia entre Talento Humano y Tecnología Avanzada.
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg text-muted max-w-3xl leading-relaxed">
              En Geimser, no solo gestionamos interacciones; diseñamos experiencias. Fusionamos la pericia de nuestro equipo con la potencia de la IA y la automatización para redefinir los estándares de la industria del contact center.
            </motion.p>
          </div>
          <motion.div variants={itemVariants} className="md:col-span-4 flex items-center justify-center">
            <div className="w-full p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm text-center">
              <Target className="w-10 h-10 mx-auto mb-4 text-cyan-400" />
              <h3 className="text-xl font-bold mb-2">Nuestra Misión</h3>
              <p className="text-muted leading-relaxed text-sm">
                Convertir desafíos complejos en oportunidades de crecimiento sostenible para nuestros clientes.
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* --- Panel de Especializaciones --- */}
        <div className="mb-24 md:mb-32">
          <h3 className="text-3xl font-bold text-center mb-12">Nuestras Áreas de <span className="text-cyan-400">Expertise</span></h3>
          <div className="grid lg:grid-cols-12 gap-8 min-h-[450px]">
            <div className="lg:col-span-4">
              <div className="flex flex-col gap-2">
                {specializations.map((spec, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveSpec(index)}
                    className={`group w-full p-4 rounded-lg text-left transition-all duration-300 border ${
                      activeSpec === index 
                        ? 'bg-cyan-500/10 border-cyan-500/30' 
                        : 'bg-white/5 border-transparent hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center">
                      <spec.icon className={`w-6 h-6 mr-4 transition-colors ${activeSpec === index ? 'text-cyan-400' : 'text-gray-500 group-hover:text-gray-300'}`} />
                      <span className={`font-semibold transition-colors ${activeSpec === index ? '' : 'text-gray-300'}`}>{spec.title}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="lg:col-span-8 p-8 rounded-2xl bg-gradient-to-br from-gray-900/50 to-gray-800/20 border border-white/10 relative overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSpec}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                >
                  <h4 className="text-2xl font-bold mb-3">{activeSpecialization.title}</h4>
                  <p className="text-muted mb-6 leading-relaxed">{activeSpecialization.description}</p>
                  <div className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
                    {activeSpecialization.features.map((feature, i) => (
                      <div key={i} className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 mr-3 text-cyan-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* --- Industrias y Por Qué Confiar --- */}
        <motion.div 
          className="grid lg:grid-cols-2 gap-16 items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
            <motion.div variants={itemVariants}>
                 <h3 className="text-3xl font-bold mb-6">Un Socio para <span className="text-cyan-400">Toda Industria</span></h3>
                 <p className="text-muted leading-relaxed mb-8">
                     Nuestra metodología flexible nos permite adaptarnos a las complejidades de diversos sectores, desde la alta tecnología hasta operaciones críticas en terreno, entregando siempre resultados consistentes.
                 </p>
                 <motion.div 
                    className="flex flex-wrap gap-3"
                    variants={industryListVariants}
                 >
                    {industries.map((industry) => {
                        const Icon = industry.icon;
                        return (
                            <motion.div 
                                key={industry.name} 
                                className="flex items-center px-4 py-2 bg-gray-700/30 rounded-full border border-gray-600/50 text-sm"
                                variants={industryItemVariants}
                            >
                               <Icon className="w-4 h-4 mr-2.5 text-cyan-400/70"/>
                               <span className="text-gray-300">{industry.name}</span>
                            </motion.div>
                        )
                    })}
                 </motion.div>
            </motion.div>
            <motion.div variants={itemVariants} className="grid grid-cols-1 gap-6">
                {whyUsItems.map((item, index) => {
                    const Icon = item.icon;
                    return (
                        <div key={index} className="flex items-start p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-300">
                             <Icon className="w-8 h-8 mr-5 mt-1 text-cyan-400 flex-shrink-0"/>
                             <div>
                                <h4 className="font-semibold mb-1">{item.title}</h4>
                                <p className="text-muted text-sm leading-relaxed">{item.description}</p>
                             </div>
                        </div>
                    )
                })}
            </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
