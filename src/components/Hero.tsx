'use client';

import React, { useEffect, useState, useRef } from 'react';
import { ChevronRight, Award, GaugeCircle, Target, Landmark } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  const [activeVideo, setActiveVideo] = useState(1);
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);

  const stats = [
    { number: "+95%", label: "Índice de Satisfacción (CSAT)", icon: Award },
    { number: "99.99%", label: "Disponibilidad de Plataforma", icon: GaugeCircle },
    { number: "+85%", label: "Resolución en Primer Contacto", icon: Target },
    { number: "ROI Comprobado", label: "Para Clientes Enterprise", icon: Landmark }
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleVideoEnd = () => {
    setActiveVideo(current => (current === 1 ? 2 : 1));
  };

  useEffect(() => {
    const v1 = video1Ref.current;
    const v2 = video2Ref.current;
    if (!v1 || !v2) return;

    if (activeVideo === 1) {
      v2.style.opacity = '0';
      v1.style.opacity = '1';
      v1.play();
    } else {
      v1.style.opacity = '0';
      v2.style.opacity = '1';
      v2.play();
    }
  }, [activeVideo]);

  return (
    <section className="relative h-screen bg-black text-white overflow-hidden">
      {/* --- CAPAS DE FONDO --- */}
      <div className="absolute inset-0 z-0">
        <video
          ref={video1Ref}
          muted
          playsInline
          onEnded={handleVideoEnd}
          className="w-full h-full object-cover transition-opacity duration-1000"
          poster="/assets/images/team-hero-poster.jpg"
          src="/G1.mp4"
        />
        <video
          ref={video2Ref}
          muted
          playsInline
          onEnded={handleVideoEnd}
          className="absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000"
          style={{ opacity: 0 }}
          src="/G3.mp4"
        />
      </div>
      <div className="absolute inset-0 bg-black/60 z-10" />
      <div className="animated-grid absolute inset-0 z-20" />

      {/* --- CONTENIDO PRINCIPAL --- */}
      <div className="relative z-30 w-full h-full flex flex-col max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex-1 flex flex-col justify-center">
          <div className="max-w-3xl text-center md:text-left">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
            >
              La Evolución de la <span className="text-blue-500">Interacción</span> Humana y Digital.
            </motion.h1>

            <p
              className={`mt-6 text-lg leading-8 text-gray-300 transition-all duration-700 ease-out delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}
            >
              Diseñamos experiencias de cliente excepcionales a gran escala, fusionando el talento de nuestros expertos con la potencia de la inteligencia artificial.
            </p>

            <div
              className={`mt-10 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 transition-all duration-700 ease-out delay-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}
            >
              <button className="group relative px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg overflow-hidden transition-all duration-300 shadow-lg hover:shadow-blue-500/30 transform hover:scale-105">
                <span className="relative z-10 flex items-center">
                  Agendar Demostración
                  <ChevronRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </button>
              <button className="group relative px-6 py-3 bg-white/5 border border-white/20 text-white/90 font-semibold rounded-lg backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                Explorar Soluciones
              </button>
            </div>
          </div>
        </div>

        {/* --- SECCIÓN DE ESTADÍSTICAS --- */}
        <div
          className={`mt-auto w-full pb-8 pt-4 transition-opacity duration-1000 delay-500 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="group relative p-4 text-center rounded-xl bg-white/5 hover:bg-white/10 transition-colors duration-300">
                  <div className="absolute inset-0 rounded-xl p-px bg-white/10 group-hover:bg-gradient-to-br group-hover:from-blue-500 group-hover:to-transparent transition-all duration-300" />
                  <div className="relative z-10">
                    <Icon className="w-8 h-8 mx-auto mb-2 text-blue-500 transition-transform duration-300 group-hover:scale-110" />
                    <p className="text-xl sm:text-2xl font-bold text-white">{stat.number}</p>
                    <p className="text-xs sm:text-sm text-gray-400">{stat.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style jsx>{`
        .animated-grid {
          width: 100%;
          height: 100%;
          background-image: radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.1) 1px, transparent 0);
          background-size: 2rem 2rem;
          animation: move-grid 40s linear infinite;
        }
        @keyframes move-grid {
          from {
            background-position: 0 0;
          }
          to {
            background-position: 2rem 2rem;
          }
        }
      `}</style>
    </section>
  );
}