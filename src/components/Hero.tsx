'use client';

import React, { useEffect, useState, useRef } from 'react';
import { ChevronRight, Award, GaugeCircle, Target, Landmark } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring, useInView, useMotionValue, useMotionTemplate, animate } from 'framer-motion';

// --- COMPONENTS FOR ANIMATIONS ---

const Counter = ({ from, to, duration = 2 }: { from: number; to: number; duration?: number }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(nodeRef, { once: true, margin: "-10px" });

  useEffect(() => {
    if (!nodeRef.current || !isInView) return;

    const node = nodeRef.current;

    // Si 'to' es decimal (ej: 99.9), manejamos decimales
    const isFloat = to % 1 !== 0;

    const controls = animate(from, to, {
      duration,
      ease: "easeOut",
      onUpdate(value) {
        node.textContent = isFloat ? value.toFixed(1) : Math.floor(value).toString();
      }
    });

    return () => controls.stop();
  }, [from, to, duration, isInView]);

  return <span ref={nodeRef}>{from}</span>;
};

const MagneticButton = ({ children, className, onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    x.set(middleX * 0.2); // Intensidad del efecto magnético
    y.set(middleY * 0.2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      className={className}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.button>
  );
};

const StaggeredText = ({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) => {
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: delay }
    })
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    },
    hidden: {
      opacity: 0,
      y: 20,
      filter: "blur(10px)",
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }
  } as const;

  return (
    <motion.div
      style={{ overflow: "hidden", display: "flex", flexWrap: "wrap", gap: "0.25em" }}
      variants={container}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {words.map((word, index) => (
        <motion.span variants={child} key={index} className="inline-block relative">
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default function Hero() {
  const [activeVideo, setActiveVideo] = useState(1);
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);

  // Parallax effect for video
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.5]);

  const stats = [
    { value: 95, prefix: "+", suffix: "%", label: "Índice de Satisfacción (CSAT)", icon: Award },
    { value: 99.9, prefix: "", suffix: "%", label: "Disponibilidad de Plataforma", icon: GaugeCircle },
    { value: 85, prefix: "+", suffix: "%", label: "Resolución en Primer Contacto", icon: Target },
    { value: 0, prefix: "ROI", suffix: "", label: "Monitorizado en Tiempo Real", icon: Landmark, isText: true } // Special case
  ];

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
    <section className="relative h-screen bg-black overflow-hidden perspective-1000">
      {/* --- CAPAS DE FONDO CON PARALLAX --- */}
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 z-0 will-change-transform"
      >
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
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent z-10" />
      <div className="absolute inset-0 bg-black/20 z-10" />
      <div className="animated-grid absolute inset-0 z-20 opacity-30 pointer-events-none" />

      {/* --- CONTENIDO PRINCIPAL --- */}
      <div className="relative z-30 w-full h-full flex flex-col max-w-7xl mx-auto px-6 lg:px-8 pt-32 xs:pt-40 md:pt-48 pb-12">
        <div className="flex-1 flex flex-col justify-center">
          <div className="max-w-4xl text-center md:text-left">

            {/* TITULO CON REVEAL */}
            <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-bold tracking-tighter text-white mb-6 drop-shadow-2xl">
              <StaggeredText
                text="La Evolución de la"
                className="justify-center md:justify-start"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, type: "spring", bounce: 0.5 }}
                className="inline-block"
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C6FF] to-[#0072FF] drop-shadow-[0_0_15px_rgba(0,198,255,0.5)]">
                  Interacción
                </span>
              </motion.div>
              <StaggeredText
                text="Humana y Digital."
                className="justify-center md:justify-start"
                delay={0.4}
              />
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="mt-6 text-xl leading-relaxed text-gray-300 max-w-2xl mx-auto md:mx-0 font-light"
            >
              Diseñamos experiencias de cliente excepcionales a gran escala, fusionando el talento de nuestros expertos con la potencia de la inteligencia artificial.
            </motion.p>

            {/* BOTONES MAGNETICOS */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.8 }}
              className={`mt-10 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-6`}
            >
              <MagneticButton className="group relative px-8 py-4 bg-[#00B8F1] text-black font-bold rounded-xl overflow-hidden shadow-[0_0_20px_rgba(0,184,241,0.3)] hover:shadow-[0_0_30px_rgba(0,184,241,0.5)] transition-shadow">
                {/* Shine Effect */}
                <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-40 group-hover:animate-shine" />

                <span className="relative z-10 flex items-center gap-2">
                  Agendar Demostración
                  <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </MagneticButton>

              <MagneticButton className="px-8 py-4 bg-white text-black font-extrabold rounded-xl hover:bg-gray-200 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                Explorar Soluciones
              </MagneticButton>
            </motion.div>
          </div>
        </div>

        {/* --- SECCIÓN DE ESTADÍSTICAS ANIMADAS --- */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8, ease: "easeOut" }}
          className="w-full mt-auto"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="group relative p-4 text-center rounded-xl bg-transparent border border-white/10 transition-all duration-300 backdrop-blur-md hover:bg-white/5 hover:border-cyan-500/30 hover:shadow-[0_0_20px_rgba(0,184,241,0.1)]"
                >
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

                  <div className="relative z-10 flex flex-col items-center">
                    <div className="mb-2 p-2 rounded-full bg-white/5 group-hover:bg-[#00B8F1]/20 transition-colors duration-300 border border-white/10 group-hover:border-[#00B8F1]/30">
                      <Icon className="w-5 h-5 text-[#00B8F1]" />
                    </div>

                    <p className="text-2xl sm:text-3xl font-bold text-white mb-0.5 flex items-center justify-center gap-0.5">
                      {stat.prefix}
                      {!stat.isText ? (
                        <Counter from={0} to={stat.value} duration={2.5} />
                      ) : (
                        <span>High</span>
                      )}
                      {stat.suffix}
                    </p>
                    <p className="text-[10px] sm:text-xs text-gray-400 font-medium uppercase tracking-wide leading-tight">{stat.label}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* --- STYLES FOR SHINE ANIMATION & GRID --- */}
      <style jsx>{`
        .animated-grid {
          background-image: radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.1) 1px, transparent 0);
          background-size: 3rem 3rem;
          mask-image: linear-gradient(to bottom, black 40%, transparent 100%);
        }
      `}</style>
    </section>
  );
}
