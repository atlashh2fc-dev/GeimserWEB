'use client';

import React, { useState, useEffect } from 'react';
import AssistantModal from './AssistantModal';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, TrendingUp, Sparkles, Zap } from 'lucide-react'; // Se importa el nuevo icono 'Bot'

const FloatingChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  // Mostrar tooltip con mensaje de neuromarketing
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    if (isHovered && !isOpen) {
      timeoutId = setTimeout(() => {
        setShowTooltip(true);
      }, 700);
    } else {
      setShowTooltip(false);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isHovered, isOpen]);

  const handleToggleChat = () => {
    console.log('🚀 [GEIMSER WIDGET] Iniciando consulta comercial:', !isOpen);
    setIsOpen(!isOpen);
    setShowTooltip(false);
  };

  return (
    <>
      {/* Modal del consultor */}
      <AnimatePresence>
        {isOpen && (
          <AssistantModal 
            isOpen={isOpen} 
            onClose={() => setIsOpen(false)} 
          />
        )}
      </AnimatePresence>

      {/* Tooltip de neuromarketing (ajustado al nuevo color) */}
      <AnimatePresence>
        {showTooltip && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-6 z-40 max-w-sm pointer-events-none"
          >
            <div className="relative">
              {/* ✅ CAMBIO: Gradiente de color actualizado, sin morado */}
              <div className="bg-neutral-800/50 backdrop-blur-2xl border border-white/10 text-sm px-5 py-4 rounded-2xl shadow-2xl">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-white/10">
                    <TrendingUp className="w-5 h-5 text-cyan-300" />
                  </div>
                  <div>
                    <div className="font-bold text-cyan-200 mb-1">Consulta Estratégica Digital</div>
                    <div className="/80 leading-relaxed">
                      Reduce costos <span className="font-semibold text-emerald-300">40%</span> y aumenta productividad <span className="font-semibold text-emerald-300">30%</span>
                    </div>
                    <div className="text-xs text-cyan-300/80 mt-2 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Análisis con nuestro IA GeimserBot
                    </div>
                  </div>
                </div>
              </div>
              {/* Flecha del tooltip */}
              <div className="absolute -bottom-1 right-6 w-3 h-3 bg-neutral-800/50 border-r border-b border-white/10 transform rotate-45 backdrop-blur-sm"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botón flotante principal con el nuevo diseño */}
      <motion.div
        className="fixed bottom-6 right-6 z-40"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.5 }}
      >
        <motion.button
          onClick={handleToggleChat}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          // ✅ CAMBIO: Gradiente de color actualizado a cian-azul. Se eliminó el morado.
          className={`relative group p-4 rounded-full shadow-2xl transition-all duration-300 ${
            isOpen 
              ? 'bg-gradient-to-br from-red-500 to-red-600' 
              : 'bg-gradient-to-br from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600'
          } backdrop-blur-xl border-2 ${isOpen ? 'border-red-300/30' : 'border-white/10'}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label={isOpen ? "Cerrar consultor" : "Abrir consultor digital"}
        >
          {/* Efectos de vidrio */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 via-transparent to-black/20"></div>
          
          {/* ✅ CAMBIO: Animaciones de pulso actualizadas a la nueva paleta de colores */}
          {!isOpen && (
            <>
              <motion.div
                className="absolute inset-0 rounded-full bg-blue-400/30"
                animate={{ scale: [1, 1.35, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div
                className="absolute inset-0 rounded-full bg-cyan-400/20"
                animate={{ scale: [1, 1.45, 1] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5, ease: 'easeInOut' }}
              />
            </>
          )}
          
          {/* Icono principal con animación de cambio */}
          <div className="relative z-10">
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-7 h-7 drop-shadow-lg" />
                </motion.div>
              ) : (
                <motion.div
                  key="open"
                  initial={{ rotate: 90, opacity: 0, scale: 0.8 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: -90, opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                  className="relative"
                >
                  {/* ✅ CAMBIO: Icono actualizado a 'Bot' para una apariencia más moderna y digital */}
                  <Bot className="w-7 h-7 drop-shadow-lg" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ❌ REMOVIDO: Se eliminaron la insignia "PRO" y el punto indicador para un diseño más limpio */}

        </motion.button>

        {/* Texto del botón en hover mejorado */}
        <AnimatePresence>
          {isHovered && !isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 10, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute right-full top-1/2 -translate-y-1/2 mr-4 hidden md:block pointer-events-none"
            >
              <div className="bg-neutral-800/60 backdrop-blur-xl border border-white/10 text-sm px-4 py-3 rounded-2xl whitespace-nowrap shadow-2xl">
                <div className="font-bold text-cyan-200">Consultor Digital</div>
                <div className="/80 text-xs mt-1">GeimserBot 🚀 • disponible 24/7</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Mensaje flotante de valor */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ delay: 12, duration: 0.5 }}
            className="fixed bottom-32 right-6 z-30 max-w-xs pointer-events-none"
          >
            <motion.div
              animate={{ 
                y: [0, -8, 0],
                scale: [1, 1.02, 1]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="bg-gradient-to-r from-emerald-600/90 to-emerald-700/90 backdrop-blur-2xl border border-emerald-400/20 text-sm px-4 py-3 rounded-2xl shadow-2xl"
            >
              <div className="flex items-center gap-3">
                <div className="p-1.5 rounded-lg bg-emerald-400/20">
                  <TrendingUp className="w-4 h-4 text-emerald-200" />
                </div>
                <div>
                  <div className="font-semibold text-emerald-100">+25% conversiones</div>
                  <div className="text-emerald-200/80 text-xs">Promedio de nuestros clientes</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingChatWidget;