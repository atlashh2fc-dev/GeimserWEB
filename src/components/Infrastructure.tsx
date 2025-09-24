'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { 
  Server, 
  Cloud, 
  Shield, 
  Database,
  Network,
  Layers,
  Zap,
  Activity,
  Globe,
  CheckCircle
} from 'lucide-react';

// --- DATOS ---
const infrastructureComponents = [
  {
    icon: Cloud,
    title: "Nube Elástica de Alta Disponibilidad",
    description: "Nuestra arquitectura cloud-native sobre AWS y Azure garantiza un 99.99% de uptime y escalabilidad automática para responder a cualquier demanda.",
    stats: { label: "Uptime SLA", value: 99.99, unit: "%" },
    features: ["Auto-scaling & Load Balancing", "CDN Global de baja latencia", "Multi-Región y Failover", "Infraestructura como Código (IaC)"],
  },
  {
    icon: Shield,
    title: "Seguridad Perimetral y End-to-End",
    description: "Implementamos un modelo de seguridad 'Zero Trust' con protección multicapa, cumpliendo con los más altos estándares internacionales como ISO 27001 y SOC 2.",
    stats: { label: "Incidentes Mitigados", value: 99.9, unit: "%" },
    features: ["Encriptación AES-256 en tránsito y reposo", "Web Application Firewall (WAF)", "Protección Anti-DDoS Avanzada", "Monitoreo de Seguridad 24/7"],
  },
  {
    icon: Database,
    title: "Gestión de Datos Escalable",
    description: "Procesamos y almacenamos petabytes de información con bases de datos optimizadas para baja latencia y alta concurrencia, con backups en tiempo real.",
    stats: { label: "Latencia de DB", value: 90, unit: "ms", inverse: true }, // 'inverse' para la barra de progreso
    features: ["Bases de datos SQL y NoSQL", "Data Lakes para analítica", "Backup y recuperación instantánea", "Procesamiento en tiempo real"],
  },
  {
    icon: Network,
    title: "Red Global de Ultra Baja Latencia",
    description: "Una red global de fibra óptica con nodos de borde (Edge) estratégicamente ubicados para garantizar la menor latencia posible para tus usuarios.",
    stats: { label: "Ancho de Banda", value: 100, unit: "Gbps" },
    features: ["Conectividad Tier-1", "Edge Computing", "Redundancia Multi-CDN", "Optimización de rutas de red"],
  }
];

const techStack = ["Kubernetes", "Docker", "Terraform", "Ansible", "PostgreSQL", "Redis", "Elasticsearch", "Prometheus", "Grafana", "Nginx"];
const certifications = ["ISO 27001", "SOC 2 Type II", "PCI DSS Level 1", "GDPR Compliant", "HIPAA Compliant"];

// --- Sub-componente para las estadísticas ---
const StatBar = ({ label, value, unit, inverse = false }: { label: string, value: number, unit: string, inverse?: boolean }) => {
    const percentage = inverse ? 100 - (value / 120 * 100) : value; // Ajusta la escala si es necesario
    return (
      <div>
        <div className="flex justify-between items-end mb-1">
          <span className="text-sm text-muted">{label}</span>
          <span className="font-bold ">{value}{unit}</span>
        </div>
        <div className="w-full bg-gray-700/50 rounded-full h-1.5">
          <motion.div 
            className={`h-1.5 rounded-full ${inverse ? 'bg-yellow-400' : 'bg-cyan-400'}`}
            initial={{ width: 0 }}
            whileInView={{ width: `${percentage}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
          />
        </div>
      </div>
    );
};

// --- Componente Principal ---
export default function Infrastructure() {
  const [activeInfra, setActiveInfra] = useState(0);
  const activeComponent = infrastructureComponents[activeInfra];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 }
  };

  return (
    <section className="py-24 sm:py-32 px-6 bg-[var(--surface)] text-gray-300 relative overflow-hidden">
      {/* Fondo con grid sutil */}
      <div className="absolute inset-0 z-0 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(ellipse,white,transparent_70%)] opacity-30"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* --- Cabecera --- */}
        <motion.div 
          className="text-center mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="inline-flex items-center px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-6">
            <Server className="w-4 h-4 mr-2" />
            Nuestra Plataforma
          </motion.div>
          <motion.h2 variants={itemVariants} className="text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            Construida para el <span className="text-cyan-400">Rendimiento</span> y la <span className="text-cyan-400">Confianza</span>
          </motion.h2>
          <motion.p variants={itemVariants} className="text-lg text-muted max-w-3xl mx-auto leading-relaxed">
            Nuestra infraestructura no es solo un soporte, es una ventaja competitiva diseñada para ofrecer máxima disponibilidad, seguridad a toda prueba y una escalabilidad sin límites.
          </motion.p>
        </motion.div>

        {/* --- Panel Interactivo de Infraestructura --- */}
        <div className="grid lg:grid-cols-12 gap-8 mb-24 min-h-[500px]">
          <div className="lg:col-span-3">
            <div className="flex lg:flex-col gap-2 h-full">
              {infrastructureComponents.map((comp, index) => (
                <button
                  key={index}
                  onClick={() => setActiveInfra(index)}
                  className={`group w-full p-4 rounded-lg text-left transition-all duration-300 border ${
                    activeInfra === index 
                      ? 'bg-cyan-500/10 border-cyan-500/30' 
                      : 'bg-white/5 border-transparent hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center">
                    <comp.icon className={`w-6 h-6 mr-4 transition-colors flex-shrink-0 ${activeInfra === index ? 'text-cyan-400' : 'text-gray-500 group-hover:text-gray-300'}`} />
                    <span className={`font-semibold transition-colors text-sm md:text-base ${activeInfra === index ? '' : 'text-gray-300'}`}>{comp.title.split(' ')[0]}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-9 p-8 rounded-2xl bg-gradient-to-br from-gray-900/80 to-gray-800/50 border border-white/10 relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeInfra}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="flex flex-col h-full"
              >
                <div>
                  <h3 className="text-2xl font-bold mb-3">{activeComponent.title}</h3>
                  <p className="text-muted mb-8 leading-relaxed">{activeComponent.description}</p>
                  
                  <h4 className="font-semibold mb-4">Capacidades Clave</h4>
                  <div className="grid sm:grid-cols-2 gap-x-6 gap-y-3 mb-8">
                    {activeComponent.features.map((feature, i) => (
                      <div key={i} className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 mr-3 text-cyan-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-auto pt-8 border-t border-white/10">
                   <StatBar {...activeComponent.stats} />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* --- Hub Tecnológico: Stack y Certificaciones --- */}
        <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Elemento Central: Globo */}
            <motion.div 
              className="lg:col-span-4 flex items-center justify-center h-64 lg:h-full"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <div className="relative w-64 h-64">
                {/* Placeholder para un globo 3D o animación. Esto es una simulación con CSS. */}
                <div className="absolute inset-0 rounded-full border-2 border-cyan-500/30 animate-spin-slow"></div>
                <div className="absolute inset-4 rounded-full border border-cyan-500/20 animate-spin-slow-reverse"></div>
                <div className="absolute inset-8 rounded-full bg-cyan-500/10 blur-xl"></div>
                <Globe className="w-24 h-24 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-cyan-400"/>
              </div>
            </motion.div>

            {/* Paneles de Información */}
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Tech Stack */}
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <h3 className="font-bold mb-4 flex items-center"><Layers className="w-5 h-5 mr-2 text-cyan-400"/>Stack Tecnológico</h3>
                <div className="flex flex-wrap gap-2">
                  {techStack.map(tech => (
                    <span key={tech} className="px-3 py-1 bg-gray-700/50 text-sm text-gray-300 rounded-md">{tech}</span>
                  ))}
                </div>
              </div>
              {/* Certificaciones */}
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <h3 className="font-bold mb-4 flex items-center"><Shield className="w-5 h-5 mr-2 text-green-400"/>Certificaciones</h3>
                 <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    {certifications.map(cert => (
                      <div key={cert} className="flex items-center text-sm">
                        <CheckCircle className="w-3.5 h-3.5 mr-2 text-green-400/80 flex-shrink-0" />
                        <span>{cert}</span>
                      </div>
                    ))}
                 </div>
              </div>
            </div>
        </div>
      </div>
    </section>
  );
}