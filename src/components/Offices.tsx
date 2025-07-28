
'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { MapPin, Users, Building, Globe, Award, Star, CheckCircle, Banknote, Waypoints, Briefcase } from 'lucide-react';

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
    ],
    mapNodes: [
        { icon: Waypoints, label: "Metro Bellas Artes" },
        { icon: Banknote, label: "Centro Financiero" },
        { icon: Briefcase, label: "Partners & Clientes" },
        { icon: Globe, label: "Conectividad Vial" },
    ]
};

const globalStats = [
    { icon: Building, label: "Sedes", value: "3" },
    { icon: Users, label: "Colaboradores", value: "275+" },
    { icon: Globe, label: "Operaciones", value: "Global" },
    { icon: Award, label: "Certificaciones", value: "15+" },
];

// --- Componente Principal ---
export default function Offices() {

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <section className="py-24 sm:py-32 px-6 bg-[#0B0F19] text-gray-300 relative overflow-hidden">
      <div className="absolute inset-0 z-0 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(ellipse_at_center,white,transparent_60%)] opacity-30"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="inline-flex items-center px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-6">
            <MapPin className="w-4 h-4 mr-2" />
            Nuestra Sede Central
          </motion.div>
          <motion.h2 variants={itemVariants} className="text-4xl lg:text-5xl font-bold text-white tracking-tight mb-6">
            Un Espacio Privilegiado a <span className="text-cyan-400">Medida</span>
          </motion.h2>
          <motion.p variants={itemVariants} className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Nuestro centro de operaciones en el corazón de Santiago está diseñado para la innovación, la colaboración y el crecimiento.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            
            {/* --- Columna Izquierda: Detalles de la Oficina --- */}
            <motion.div 
              className="lg:col-span-6"
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, ease: 'easeOut' }} viewport={{ once: true }}
            >
              <div className="p-8 rounded-2xl bg-white/5 border border-white/10 h-full">
                  <h3 className="text-2xl font-bold text-white mb-2">{santiagoOffice.city}: Sede Central</h3>
                  <p className="text-md text-cyan-400 font-semibold mb-6">{santiagoOffice.address}</p>
                  <p className="text-gray-300 mb-8 leading-relaxed">{santiagoOffice.mainDescription}</p>
                  
                  <div className="space-y-6 border-t border-white/10 pt-6">
                      {santiagoOffice.highlights.map((highlight) => {
                          const Icon = highlight.icon;
                          return (
                          <div key={highlight.title}>
                              <h4 className="font-bold text-white mb-3 text-lg flex items-center">
                                  <Icon className="w-5 h-5 mr-3 text-cyan-400" />
                                  {highlight.title}
                              </h4>
                              <ul className="space-y-2 pl-8">
                                  {highlight.points.map(point => (
                                      <li key={point} className="flex items-start">
                                        <CheckCircle className="w-4 h-4 mr-3 mt-1 text-green-400/80 flex-shrink-0" />
                                        <span className="text-gray-400">{point}</span>
                                      </li>
                                  ))}
                              </ul>
                          </div>
                          );
                      })}
                  </div>
              </div>
            </motion.div >

            {/* --- Columna Derecha: NUEVA VISUALIZACIÓN: Basada en Grid CSS (más robusta) --- */}
            <div className="lg:col-span-6 flex items-center justify-center min-h-[450px]">
                <motion.div
                  className="w-full max-w-md h-[450px] grid grid-cols-3 grid-rows-3 gap-4 items-center justify-items-center"
                  initial="hidden" whileInView="visible" variants={{
                      visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
                  }}
                  viewport={{ once: true, amount: 0.5 }}
                >
                    {/* Nodos Satélite en la parrilla */}
                    <motion.div variants={itemVariants} className="col-start-2 row-start-1 text-center">
                       <div className="p-3 rounded-full bg-gray-800/80 border border-white/10"><Waypoints className="w-6 h-6 text-cyan-400 mx-auto" /></div>
                       <p className="text-xs text-white whitespace-nowrap mt-2">Metro Bellas Artes</p>
                    </motion.div>

                    <motion.div variants={itemVariants} className="col-start-3 row-start-2 text-center">
                       <div className="p-3 rounded-full bg-gray-800/80 border border-white/10"><Banknote className="w-6 h-6 text-cyan-400 mx-auto" /></div>
                       <p className="text-xs text-white whitespace-nowrap mt-2">Centro Financiero</p>
                    </motion.div>

                    <motion.div variants={itemVariants} className="col-start-2 row-start-3 text-center">
                       <div className="p-3 rounded-full bg-gray-800/80 border border-white/10"><Briefcase className="w-6 h-6 text-cyan-400 mx-auto" /></div>
                       <p className="text-xs text-white whitespace-nowrap mt-2">Partners & Clientes</p>
                    </motion.div>

                    <motion.div variants={itemVariants} className="col-start-1 row-start-2 text-center">
                       <div className="p-3 rounded-full bg-gray-800/80 border border-white/10"><Globe className="w-6 h-6 text-cyan-400 mx-auto" /></div>
                       <p className="text-xs text-white whitespace-nowrap mt-2">Conectividad Vial</p>
                    </motion.div>

                    {/* Nodo Central */}
                    <motion.div 
                        className="col-start-2 row-start-2 text-center flex flex-col items-center justify-center"
                        initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <div className="relative w-28 h-28 flex items-center justify-center">
                            <div className="absolute w-full h-full rounded-full bg-cyan-500/20 animate-ping delay-500"></div>
                            <div className="w-5 h-5 rounded-full bg-cyan-400 border-2 border-white shadow-2xl shadow-cyan-500"></div>
                        </div>
                        <p className="mt-2 font-bold text-white text-lg">Geimser HQ</p>
                    </motion.div>
                </motion.div>
            </div>
        </div>
        
        {/* --- Estadísticas Globales --- */}
        <div className="mt-24">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {globalStats.map(stat => (
                   <div key={stat.label} className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                     <div className="flex items-center justify-center space-x-2">
                        <stat.icon className="w-5 h-5 text-cyan-400" />
                        <span className="text-gray-300">{stat.label}</span>
                     </div>
                     <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
                   </div>
                ))}
            </div>
        </div>
      </div>
    </section>
  );
}
