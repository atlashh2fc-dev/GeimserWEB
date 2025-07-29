'use client';

import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { Network, ArrowRight, Globe, Zap, Shield, Users } from 'lucide-react';

const partners = [
  {
    id: 'siptel',
    name: 'Siptel',
    role: 'Infraestructura Core',
    description: 'Sostiene la infraestructura tecnológica y de telecomunicaciones del ecosistema, garantizando un 99.99% de uptime y conectividad global.',
    capabilities: ['Cloud Infrastructure', 'Global Connectivity', 'Enterprise Security'],
    position: { x: 20, y: 15 },
    icon: Shield,
    color: 'from-cyan-400 to-blue-500'
  },
  {
    id: 'vocalcom',
    name: 'Vocalcom',
    role: 'Experiencia Cliente',
    description: 'Partner global de CRM, aportando soluciones omnicanal de clase mundial a nuestra plataforma.',
    capabilities: ['Omnichannel CRM', 'Customer Journey', 'Analytics'],
    position: { x: 75, y: 20 },
    icon: Users,
    color: 'from-cyan-400 to-teal-500'
  },
  {
    id: 'neotel',
    name: 'Neotel',
    role: 'Integración Empresarial',
    description: 'Proveedor líder de plataformas CRM integradas para una gestión de clientes fluida y centralizada.',
    capabilities: ['CRM Integration', 'Data Unification', 'Process Automation'],
    position: { x: 25, y: 70 },
    icon: Network,
    color: 'from-blue-400 to-cyan-500'
  },
  {
    id: 'altius',
    name: 'Altius Ignite',
    role: 'Inteligencia Operacional',
    description: 'Socio estratégico en Business Process Outsourcing (BPO) a escala internacional e implementación de IA aplicada.',
    capabilities: ['AI Implementation', 'Global BPO', 'Process Intelligence'],
    position: { x: 70, y: 75 },
    icon: Zap,
    color: 'from-teal-400 to-cyan-500'
  }
];

const connections = [
  { from: 'siptel', to: 'vocalcom', strength: 0.9 },
  { from: 'siptel', to: 'neotel', strength: 0.8 },
  { from: 'vocalcom', to: 'altius', strength: 0.85 },
  { from: 'neotel', to: 'altius', strength: 0.9 },
  { from: 'siptel', to: 'altius', strength: 0.7 },
  { from: 'vocalcom', to: 'neotel', strength: 0.75 }
];

export default function PartnersEcosystem() {
  const [activePartner, setActivePartner] = useState<string | null>(null);
  const [hoveredConnection, setHoveredConnection] = useState<string | null>(null);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.15, 
        delayChildren: 0.3,
        duration: 0.8
      } 
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.8, 
        ease: [0.25, 0.46, 0.45, 0.94] 
      } 
    }
  };

  const getConnectionPath = (from: typeof partners[0], to: typeof partners[0]) => {
    const fromX = from.position.x;
    const fromY = from.position.y;
    const toX = to.position.x;
    const toY = to.position.y;
    
    const midX = (fromX + toX) / 2;
    const midY = (fromY + toY) / 2;
    
    return `M ${fromX} ${fromY} Q ${midX} ${midY - 10} ${toX} ${toY}`;
  };

  return (
    <section className="py-24 px-6 bg-[#0B0F19] text-white relative overflow-hidden">
      {/* Background Elements - Matching Geimser style */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(0,212,255,0.08),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_80%,rgba(0,212,255,0.05),transparent_50%)]"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header - Matching Geimser typography */}
        <motion.div 
          className="text-center mb-20"
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, amount: 0.3 }} 
          variants={containerVariants}
        >
          <motion.div 
            variants={itemVariants} 
            className="inline-flex items-center px-4 py-2 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 text-sm font-medium mb-8"
          >
            <Globe className="w-4 h-4 mr-2" />
            Conoce a Geimser
          </motion.div>
          
          <motion.h2 
            variants={itemVariants} 
            className="text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-white"
          >
            Un Ecosistema Estratégico de{' '}
            <span className="text-cyan-400">
              Partners Globales
            </span>
          </motion.h2>
          
          <motion.p 
            variants={itemVariants} 
            className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
          >
            Nuestra fortaleza se basa en alianzas estratégicas con líderes de la industria, 
            garantizando soluciones robustas, escalables y siempre a la vanguardia tecnológica.
          </motion.p>
        </motion.div>

        {/* Ecosystem Visualization */}
        <motion.div 
          className="relative mb-20"
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, amount: 0.2 }} 
          variants={containerVariants}
        >
          {/* Interactive Network Map */}
          <div className="relative h-96 bg-[#1A2332]/50 rounded-2xl border border-cyan-400/10 backdrop-blur-sm overflow-hidden">
            {/* SVG Connections */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              {connections.map((connection, index) => {
                const fromPartner = partners.find(p => p.id === connection.from);
                const toPartner = partners.find(p => p.id === connection.to);
                if (!fromPartner || !toPartner) return null;
                
                const isActive = activePartner === connection.from || activePartner === connection.to;
                const isHovered = hoveredConnection === `${connection.from}-${connection.to}`;
                
                return (
                  <motion.path
                    key={`${connection.from}-${connection.to}`}
                    d={getConnectionPath(fromPartner, toPartner)}
                    stroke={isActive || isHovered ? "#00D4FF" : "rgba(0, 212, 255, 0.2)"}
                    strokeWidth={isActive || isHovered ? "0.8" : "0.4"}
                    fill="none"
                    className="transition-all duration-300"
                    onMouseEnter={() => setHoveredConnection(`${connection.from}-${connection.to}`)}
                    onMouseLeave={() => setHoveredConnection(null)}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.5, delay: index * 0.2 }}
                  />
                );
              })}
            </svg>

            {/* Partner Nodes */}
            {partners.map((partner, index) => {
              const IconComponent = partner.icon;
              const isActive = activePartner === partner.id;
              
              return (
                <motion.div
                  key={partner.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                  style={{ 
                    left: `${partner.position.x}%`, 
                    top: `${partner.position.y}%` 
                  }}
                  variants={itemVariants}
                  onMouseEnter={() => setActivePartner(partner.id)}
                  onMouseLeave={() => setActivePartner(null)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className={`relative w-16 h-16 rounded-xl bg-gradient-to-br ${partner.color} p-0.5 shadow-2xl`}>
                    <div className="w-full h-full bg-[#0B1426] rounded-[10px] flex items-center justify-center">
                      <IconComponent className="w-7 h-7 text-cyan-400" />
                    </div>
                    
                    {/* Pulse Effect */}
                    <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${partner.color} opacity-0 group-hover:opacity-30 animate-pulse`}></div>
                  </div>
                  
                  {/* Tooltip */}
                  <motion.div
                    className={`absolute left-1/2 transform -translate-x-1/2 px-3 py-2 bg-[#1A2332] rounded-lg border border-cyan-400/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10 ${
                      partner.position.y < 50 ? 'top-full mt-3' : 'bottom-full mb-3'
                    }`}
                    initial={{ y: partner.position.y < 50 ? -10 : 10, opacity: 0 }}
                    animate={{ y: 0, opacity: isActive ? 1 : 0 }}
                  >
                    <div className="text-sm font-semibold text-white">{partner.name}</div>
                    <div className="text-xs text-gray-400">{partner.role}</div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Partner Details Grid */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, amount: 0.2 }} 
          variants={containerVariants}
        >
          {partners.map((partner) => {
            const IconComponent = partner.icon;
            const isActive = activePartner === partner.id;
            
            return (
              <motion.div
                key={partner.id}
                variants={itemVariants}
                className={`group relative rounded-2xl p-8 bg-[#1A2332]/50 border transition-all duration-500 ${
                  isActive 
                    ? 'border-cyan-400/50 shadow-2xl shadow-cyan-400/10' 
                    : 'border-cyan-400/10 hover:border-cyan-400/20'
                }`}
                onMouseEnter={() => setActivePartner(partner.id)}
                onMouseLeave={() => setActivePartner(null)}
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${partner.color} p-0.5 flex-shrink-0`}>
                    <div className="w-full h-full bg-[#0B1426] rounded-[10px] flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-cyan-400" />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-1">{partner.name}</h3>
                    <p className="text-sm text-gray-400 font-medium">{partner.role}</p>
                  </div>
                  
                  <ArrowRight className={`w-5 h-5 text-gray-400 transition-all duration-300 ${
                    isActive ? 'translate-x-1 text-cyan-400' : 'group-hover:translate-x-1'
                  }`} />
                </div>
                
                <p className="text-gray-300 leading-relaxed mb-6">
                  {partner.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {partner.capabilities.map((capability, index) => (
                    <span 
                      key={capability}
                      className="px-3 py-1.5 bg-cyan-400/10 text-xs text-cyan-300 rounded-lg border border-cyan-400/20 font-medium"
                    >
                      {capability}
                    </span>
                  ))}
                </div>
                
                {/* Gradient Overlay on Hover */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${partner.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`}></div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA - Matching Geimser button style */}
        <motion.div 
          className="mt-20 text-center"
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, amount: 0.3 }} 
          variants={containerVariants}
        >
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-cyan-500 to-cyan-400 rounded-xl text-[#0B1426] font-semibold shadow-2xl shadow-cyan-400/25 hover:shadow-cyan-400/40 transition-all duration-300 group"
          >
            <Network className="w-5 h-5" />
            <span>Descubre cómo nuestro ecosistema potencia tu negocio</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
