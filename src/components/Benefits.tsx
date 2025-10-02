'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  motion,
  AnimatePresence,
  Variants,
  useInView,
  useMotionValue,
  useTransform,
  animate,
  useMotionValueEvent,
} from 'framer-motion';
import {
  TrendingUp,
  Clock,
  Shield,
  Users,
  Zap,
  Target,
  CheckCircle,
  Star,
  Award,
  Lightbulb,
  BarChart3,
} from 'lucide-react';

/* ===========================
   Sub-componente: AnimatedCounter
   =========================== */

interface AnimatedCounterProps {
  from?: number;
  to: number;
  suffix?: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ from = 0, to, suffix = '' }) => {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const [display, setDisplay] = useState<number>(from);
  useMotionValueEvent(rounded, 'change', (v) => setDisplay(v as number));

  useEffect(() => {
    if (inView) {
      const controls = animate(count, to, { duration: 2, ease: 'easeOut' });
      return () => controls.stop();
    }
  }, [inView, count, to]);

  return (
    <span ref={ref} className="inline-flex items-baseline">
      <motion.span>{display}</motion.span>
      {suffix && <span className="ml-1">{suffix}</span>}
    </span>
  );
};

/* ===========================
   Datos
   =========================== */

const mainBenefits = [
  { icon: TrendingUp, title: 'Incremento en Conversiones', value: 150, suffix: '%' },
  { icon: Clock, title: 'Reducción de Tiempos', value: 60, suffix: '%' },
  { icon: Shield, title: 'Disponibilidad Garantizada', value: 99.9, suffix: '%' },
  { icon: Users, title: 'Satisfacción del Cliente (CSAT)', value: 95, suffix: '%' },
];

const detailedBenefits = [
  {
    category: 'Operacional',
    icon: Zap,
    benefits: [
      'Automatización de procesos repetitivos',
      'Reducción de errores humanos',
      'Optimización de recursos',
      'Escalabilidad instantánea',
      'Integración con sistemas existentes',
    ],
  },
  {
    category: 'Financiero',
    icon: BarChart3,
    benefits: [
      'ROI positivo en 6 meses',
      'Reducción de costos operativos',
      'Incremento en ingresos',
      'Optimización de inversión tecnológica',
      'Modelo de pricing flexible',
    ],
  },
  {
    category: 'Estratégico',
    icon: Target,
    benefits: [
      'Ventaja competitiva sostenible',
      'Insights de negocio en tiempo real',
      'Toma de decisiones basada en datos',
      'Adaptabilidad a cambios del mercado',
      'Innovación continua',
    ],
  },
  {
    category: 'Experiencia',
    icon: Star,
    benefits: [
      'Experiencia omnicanal unificada',
      'Personalización a escala',
      'Respuesta inmediata 24/7',
      'Resolución proactiva de problemas',
      'Fidelización de clientes',
    ],
  },
];

const whyChooseUs = [
  {
    icon: Lightbulb,
    title: 'Innovación Constante',
    description: 'Siempre a la vanguardia de las últimas tecnologías y tendencias del mercado.',
  },
  {
    icon: Users,
    title: 'Equipo Experto y Certificado',
    description: 'Profesionales con años de experiencia real en la industria y sus desafíos.',
  },
  {
    icon: Shield,
    title: 'Soporte y Acompañamiento',
    description: 'Somos un socio estratégico que garantiza el éxito de tu implementación.',
  },
];

/* ===========================
   Componente Principal
   =========================== */

export default function Benefits() {
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % detailedBenefits.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="py-24 sm:py-32 px-6 bg-[var(--surface)] text-[var(--text)] relative overflow-hidden">
      <div className="absolute inset-0 z-0 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(ellipse,white,transparent_70%)] opacity-30"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Cabecera */}
        <motion.div
          className="text-center mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[var(--accent)] text-sm font-medium mb-6"
          >
            <Award className="w-4 h-4 mr-2" />
            Resultados Comprobados
          </motion.div>
          <motion.h2 variants={itemVariants} className="text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            Valor que se <span className="text-[var(--accent)]">Mide</span>, Confianza que se{' '}
            <span className="text-[var(--accent)]">Gana</span>
          </motion.h2>
          <motion.p variants={itemVariants} className="text-lg text-muted max-w-3xl mx-auto leading-relaxed">
            Nuestras soluciones no solo optimizan procesos, sino que generan un impacto medible en las métricas
            clave de tu negocio.
          </motion.p>
        </motion.div>

        {/* Hub de Resultados con Contadores */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mb-24">
          {mainBenefits.map((benefit) => (
            <div key={benefit.title} className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center">
              <div className="flex justify-center items-center mb-4">
                <benefit.icon className="w-8 h-8 text-[var(--accent)]" />
              </div>
              <div className="text-5xl font-bold">
                <AnimatedCounter to={benefit.value} suffix={benefit.suffix} />
              </div>
              <p className="text-muted mt-2">{benefit.title}</p>
            </div>
          ))}
        </div>

        {/* Beneficios detallados por categoría */}
        <div className="mb-24">
          <h3 className="text-3xl font-bold text-center mb-12">Un Impacto en Cada Área de tu Negocio</h3>

          <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8">
            {detailedBenefits.map((category, index) => {
              const isActive = activeTab === index;
              return (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`relative px-4 py-2 md:px-6 md:py-3 rounded-lg font-medium transition-colors duration-300 text-sm md:text-base ${
                    isActive ? 'text-[var(--accent)]' : 'text-muted hover:text-[var(--accent)]'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-tab-underline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                  <div className="relative z-10 flex items-center">
                    <category.icon className="w-5 h-5 mr-2" />
                    {category.category}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="max-w-4xl mx-auto p-8 rounded-2xl bg-white/5 border border-white/10 min-h-[280px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4"
              >
                {detailedBenefits[activeTab].benefits.map((benefit) => (
                  <div key={benefit} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-[var(--text-muted)]">{benefit}</span>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Tu Socio Estratégico */}
        <div className="p-8 md:p-12 rounded-3xl bg-[var(--surface-2)] border border-[color:rgba(16,21,36,0.08)] shadow-[0_28px_55px_rgba(15,23,42,0.12)]">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5">
              <h3 className="text-3xl font-bold mb-4">Tu Socio Estratégico</h3>
              <p className="text-muted leading-relaxed mb-6">
                Más que un proveedor, somos un aliado comprometido con tu crecimiento, basado en la innovación,
                experiencia y un soporte incondicional.
              </p>
              <a
                href="https://wa.me/56974159166"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-[var(--accent)] hover:bg-[#0f6fe6] text-white font-semibold rounded-lg transition-all duration-300 shadow-[0_18px_32px_rgba(10,132,255,0.35)]"
              >
                Comienza tu Transformación
              </a>
            </div>
            <div className="lg:col-span-7 grid grid-cols-1 gap-6">
              {whyChooseUs.map((item) => (
                <div key={item.title} className="flex items-start p-4 rounded-xl bg-white/5">
                  <item.icon className="w-8 h-8 mr-5 mt-1 text-[var(--accent)] flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1">{item.title}</h4>
                    <p className="text-muted text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
