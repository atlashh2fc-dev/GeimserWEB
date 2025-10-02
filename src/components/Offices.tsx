'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import dynamic from 'next/dynamic';
import { MapPin, Users, Building, Globe, Award, Star, CheckCircle } from 'lucide-react';

// --- DATOS ---
const santiagoOffice = {
    city: "Santiago",
    country: "Chile",
    isHeadquarters: true,
    address: "Merced 838, Santiago Centro",
    mainDescription: "Un espacio boutique diseñado para potenciar la productividad y el bienestar de nuestro equipo, con más de 70 posiciones de trabajo ergonómicas, oficinas privadas y áreas de co-work que promueven la sinergia.",
    highlights: [
      { 
        title: "Ubicación Premium", 
        icon: Star,
        points: ["Conectividad Total (Metro, avenidas principales)", "Zona de Alto Flujo comercial y de negocios", "Fácil acceso para clientes y partners"] 
      },
      { 
        title: "Infraestructura Profesional",
        icon: Building,
        points: ["Oficinas modernas diseñadas para la colaboración", "Entorno empresarial seguro y consolidado", "Cercanía a servicios clave"] 
      }
    ]
};

const globalStats = [
    { icon: Building, label: "Sede Central", value: "1" },
    { icon: Users, label: "Colaboradores", value: "275+" },
    { icon: Globe, label: "Operaciones", value: "Global" },
    { icon: Award, label: "Certificaciones", value: "15+" },
];

// --- Carga dinámica del nuevo mapa de MapLibre ---
const MapLibreMap = dynamic(() => import('./MapLibreMap'), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-slate-200 animate-pulse"></div>,
});


// --- Componente Principal ---
export default function Offices() {
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
      <div className="absolute inset-0 z-0 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(ellipse_at_center,white,transparent_60%)] opacity-30"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="inline-flex items-center px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[var(--accent)] text-sm font-medium mb-6">
            <MapPin className="w-4 h-4 mr-2" />
            Nuestra Sede Central
          </motion.div>
          <motion.h2 variants={itemVariants} className="text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            Un Espacio Privilegiado a <span className="text-[var(--accent)]">Medida</span>
          </motion.h2>
          <motion.p variants={itemVariants} className="text-lg text-muted max-w-3xl mx-auto leading-relaxed">
            Nuestro centro de operaciones en el corazón de Santiago está diseñado para la innovación, la colaboración y el crecimiento.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            
            <motion.div 
              className="lg:col-span-6"
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, ease: 'easeOut' }} viewport={{ once: true }}
            >
              <div className="p-8 rounded-2xl bg-white/5 border border-white/10 h-full">
                  <h3 className="text-2xl font-bold mb-2">{santiagoOffice.city}: Sede Central</h3>
                  <p className="text-md text-[var(--accent)] font-semibold mb-6">{santiagoOffice.address}</p>
                  <p className="text-[var(--text-muted)] mb-8 leading-relaxed">{santiagoOffice.mainDescription}</p>
                  
                  <div className="space-y-6 border-t border-white/10 pt-6">
                      {santiagoOffice.highlights.map((highlight) => {
                          const Icon = highlight.icon;
                          return (
                          <div key={highlight.title}>
                              <h4 className="font-bold mb-3 text-lg flex items-center">
                                  <Icon className="w-5 h-5 mr-3 text-[var(--accent)]" />
                                  {highlight.title}
                              </h4>
                              <ul className="space-y-2 pl-8">
                                  {highlight.points.map(point => (
                                      <li key={point} className="flex items-start">
                                        <CheckCircle className="w-4 h-4 mr-3 mt-1 text-green-400/80 flex-shrink-0" />
                                        <span className="text-muted">{point}</span>
                                      </li>
                                  ))}
                              </ul>
                          </div>
                          );
                      })}
                  </div>
              </div>
            </motion.div >

            <motion.div 
              className="lg:col-span-6 rounded-2xl overflow-hidden min-h-[450px] lg:h-full border border-white/10 shadow-[0_24px_48px_rgba(15,23,42,0.1)]"
              initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, ease: 'easeOut' }} viewport={{ once: true }}
            >
              <MapLibreMap />
            </motion.div>
        </div>
        
        <div className="mt-24">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {globalStats.map(stat => (
                   <div key={stat.label} className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                     <div className="flex items-center justify-center space-x-2">
                        <stat.icon className="w-5 h-5 text-[var(--accent)]" />
                        <span className="text-[var(--text-muted)]">{stat.label}</span>
                     </div>
                     <p className="text-3xl font-bold mt-1">{stat.value}</p>
                   </div>
                ))}
            </div>
        </div>
      </div>
    </section>
  );
}
